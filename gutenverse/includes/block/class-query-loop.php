<?php
/**
 * Query Loop Block class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\block
 */

namespace Gutenverse\Block;

use Gutenverse\Framework\Block\Block_Abstract;

/**
 * Class Query Loop Block
 *
 * @package gutenverse\block
 */
class Query_Loop extends Block_Abstract
{
	/**
	 * Block instance.
	 *
	 * @var \WP_Block
	 */
	protected $block;

	/**
	 * Render
	 *
	 * @param array  $attributes Attributes.
	 * @param string $content    Content.
	 * @param object $fulldata   Full Data (Block Instance).
	 *
	 * @return mixed
	 */
	public function render($attributes, $content, $fulldata)
	{
		$this->block = $fulldata;
		return parent::render($attributes, $content, $fulldata);
	}

	/**
	 * Render content
	 *
	 * @return string
	 */
	public function render_content()
	{
		$display_classes = $this->set_display_classes();
		$animation_class = $this->set_animation_classes();
		$custom_classes = $this->get_custom_classes();
		$element_id = $this->get_element_id();

		// Build and run the query.
		$args = $this->build_query_args();
		$query = new \WP_Query($args);

		$class = array(
			$element_id,
			$display_classes,
			$animation_class,
			$custom_classes,
			'guten-query-loop',
			'guten-element',
		);

		$query_id = '';
		if (isset($this->attributes['elementId'])) {
			$element_id_parts = explode('-', $this->attributes['elementId']);
			if (isset($element_id_parts[1])) {
				$query_id = $element_id_parts[1];
			}
		}

		$current_page = 1;
		if (!empty($query_id) && isset($_GET['query-' . $query_id . '-page'])) { // phpcs:ignore WordPress.Security.NonceVerification.Recommended
			$current_page = max(1, intval($_GET['query-' . $query_id . '-page'])); // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		}
		elseif (\get_query_var('paged')) {
			$current_page = \get_query_var('paged');
		}
		elseif (\get_query_var('page')) {
			$current_page = \get_query_var('page');
		}

		// Build context with query results to pass to inner blocks.
		$block_context = $this->block->context ?? array();
		$block_context['gutenverse/queryPosts'] = $query->posts;
		$block_context['gutenverse/queryTotalPages'] = $query->max_num_pages;
		$block_context['gutenverse/queryId'] = $query_id;
		$block_context['gutenverse/queryPage'] = $current_page;

		// Render inner blocks with query results in context.
		$inner_content = '';
		if (isset($this->block->inner_blocks)) {
			foreach ($this->block->inner_blocks as $inner_block) {
				$new_block = new \WP_Block($inner_block->parsed_block, $block_context);
				$inner_content .= $new_block->render();
			}
		}

		return '<div class="' . implode(' ', array_filter($class)) . '">' . $inner_content . '</div>';
	}

	/**
	 * Build Query Arguments.
	 *
	 * @return array
	 */
	protected function build_query_args()
	{
		$post_type = isset($this->attributes['postType']) ? $this->attributes['postType'] : 'post';
		if (is_array($post_type) && isset($post_type['value'])) {
			$post_type = $post_type['value'];
		}

		$query_id = '';
		if (isset($this->attributes['elementId'])) {
			$element_id_parts = explode('-', $this->attributes['elementId']);
			if (isset($element_id_parts[1])) {
				$query_id = $element_id_parts[1];
			}
		}

		$current_page = 1;
		if (!empty($query_id) && isset($_GET['query-' . $query_id . '-page'])) { // phpcs:ignore WordPress.Security.NonceVerification.Recommended
			$current_page = max(1, intval($_GET['query-' . $query_id . '-page'])); // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		}
		elseif (\get_query_var('paged')) {
			$current_page = \get_query_var('paged');
		}
		elseif (\get_query_var('page')) {
			$current_page = \get_query_var('page');
		}

		$args = array(
			'post_type' => $post_type,
			'posts_per_page' => isset($this->attributes['numberPost']) ? $this->attributes['numberPost'] : 3,
			'post_status' => 'publish',
			'paged' => $current_page,
		);

		// Only set offset if explicitly configured to a non-zero value.
		// WP_Query ignores 'paged' when 'offset' is set (even to 0),
		// so we must omit it for normal pagination to work.
		$post_offset = isset($this->attributes['postOffset']) ? intval($this->attributes['postOffset']) : 0;
		if ($post_offset > 0) {
			$args['offset'] = $post_offset + (($current_page - 1) * $args['posts_per_page']);
		}

		// Sorting.
		$sort_by = isset($this->attributes['sortBy']) ? $this->attributes['sortBy'] : 'latest';
		switch ($sort_by) {
			case 'oldest':
				$args['order'] = 'ASC';
				$args['orderby'] = 'date';
				break;
			case 'alphabet_asc':
				$args['order'] = 'ASC';
				$args['orderby'] = 'title';
				break;
			case 'alphabet_desc':
				$args['order'] = 'DESC';
				$args['orderby'] = 'title';
				break;
			case 'random':
				$args['orderby'] = 'rand';
				break;
			case 'latest':
			default:
				$args['order'] = 'DESC';
				$args['orderby'] = 'date';
				break;
		}

		// Include/Exclude posts.
		if (!empty($this->attributes['includePost'])) {
			$args['post__in'] = array_column($this->attributes['includePost'], 'value');
		}
		if (!empty($this->attributes['excludePost'])) {
			$args['post__not_in'] = array_column($this->attributes['excludePost'], 'value');
		}

		// Taxonomies.
		$tax_query = array();

		// Categories.
		if (!empty($this->attributes['includeCategory'])) {
			$tax_query[] = array(
				'taxonomy' => 'category',
				'field' => 'term_id',
				'terms' => array_column($this->attributes['includeCategory'], 'value'),
			);
		}
		if (!empty($this->attributes['excludeCategory'])) {
			$tax_query[] = array(
				'taxonomy' => 'category',
				'field' => 'term_id',
				'terms' => array_column($this->attributes['excludeCategory'], 'value'),
				'operator' => 'NOT IN',
			);
		}

		// Tags.
		if (!empty($this->attributes['includeTag'])) {
			$tax_query[] = array(
				'taxonomy' => 'post_tag',
				'field' => 'term_id',
				'terms' => array_column($this->attributes['includeTag'], 'value'),
			);
		}
		if (!empty($this->attributes['excludeTag'])) {
			$tax_query[] = array(
				'taxonomy' => 'post_tag',
				'field' => 'term_id',
				'terms' => array_column($this->attributes['excludeTag'], 'value'),
				'operator' => 'NOT IN',
			);
		}

		// Author.
		if (!empty($this->attributes['includeAuthor'])) {
			$args['author__in'] = array_column($this->attributes['includeAuthor'], 'value');
		}

		// Custom Taxonomies.
		if (!empty($this->attributes['taxonomies'])) {
			foreach ($this->attributes['taxonomies'] as $taxonomy => $terms) {
				if (!empty($terms)) {
					$tax_query[] = array(
						'taxonomy' => $taxonomy,
						'field' => 'term_id',
						'terms' => array_column($terms, 'value'),
					);
				}
			}
		}

		// phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_tax_query -- Taxonomy query is required for filtering.
		if (!empty($tax_query)) {
			$tax_query['relation'] = 'AND';
			$args['tax_query'] = $tax_query;
		}

		// Meta Filters.
		if (!empty($this->attributes['metaFilters'])) {
			$meta_query = array();
			$relevance_map = array(
				'equal' => '=',
				'not_equal' => '!=',
				'include' => 'LIKE',
				'bigger' => '>',
				'smaller' => '<',
				'boolean' => '=',
			);

			foreach ($this->attributes['metaFilters'] as $filter) {
				if (!empty($filter['meta_name'])) {
					$compare = isset($relevance_map[$filter['relevance']]) ? $relevance_map[$filter['relevance']] : '=';
					$meta_item = array(
						'key' => $filter['meta_name'],
						'value' => isset($filter['meta_value']) ? $filter['meta_value'] : '',
						'compare' => $compare,
					);

					// For boolean, use NUMERIC type so 0/1 comparisons work.
					if ('boolean' === $filter['relevance']) {
						$meta_item['type'] = 'NUMERIC';
					}

					$meta_query[] = $meta_item;
				}
			}

			// phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_query -- Meta query is required for filtering.
			if ( ! empty( $meta_query ) ) {
				$meta_relation          = isset( $this->attributes['metaFilterRelation'] ) ? $this->attributes['metaFilterRelation'] : 'all';
				$meta_query['relation'] = 'all' === $meta_relation ? 'AND' : 'OR';
				$args['meta_query']     = $meta_query;
			}
		}

		return $args;
	}

	/**
	 * Render view in editor.
	 */
	public function render_gutenberg()
	{
		return $this->render_content();
	}

	/**
	 * Render view in frontend.
	 */
	public function render_frontend()
	{
		return $this->render_content();
	}
}