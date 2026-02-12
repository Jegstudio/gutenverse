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
class Query_Loop extends Block_Abstract {
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
	public function render( $attributes, $content, $fulldata ) {
		$this->block = $fulldata;
		return parent::render( $attributes, $content, $fulldata );
	}

	/**
	 * Render content
	 *
	 * @return string
	 */
	public function render_content() {
		$display_classes = $this->set_display_classes();
		$animation_class = $this->set_animation_classes();
		$custom_classes  = $this->get_custom_classes();
		$element_id      = $this->get_element_id();

		// Build and run the query.
		$args  = $this->build_query_args();
		$query = new \WP_Query( $args );

		$class = array(
			$element_id,
			$display_classes,
			$animation_class,
			$custom_classes,
			'guten-query-loop',
			'guten-element',
		);

		// Inner container for grid layout.
		$inner_class = array( 'guten-query-loop-container' );

		// Build context with query results to pass to inner blocks.
		$block_context                          = $this->block->context ?? array();
		$block_context['gutenverse/queryPosts'] = $query->posts;

		// Render inner blocks with query results in context.
		$inner_content = '';
		if ( isset( $this->block->inner_blocks ) ) {
			foreach ( $this->block->inner_blocks as $inner_block ) {
				$new_block      = new \WP_Block( $inner_block->parsed_block, $block_context );
				$inner_content .= $new_block->render();
			}
		}

		$content  = '<div class="' . implode( ' ', array_filter( $class ) ) . '">';
		$content .= '<div class="' . implode( ' ', $inner_class ) . '">' . $inner_content . '</div>';
		$content .= '</div>';

		return $content;
	}

	/**
	 * Build Query Arguments.
	 *
	 * @return array
	 */
	protected function build_query_args() {
		$post_type = isset( $this->attributes['postType'] ) ? $this->attributes['postType'] : 'post';
		if ( is_array( $post_type ) && isset( $post_type['value'] ) ) {
			$post_type = $post_type['value'];
		}

		$args = array(
			'post_type'      => $post_type,
			'posts_per_page' => isset( $this->attributes['numberPost'] ) ? $this->attributes['numberPost'] : 3,
			'offset'         => isset( $this->attributes['postOffset'] ) ? $this->attributes['postOffset'] : 0,
			'post_status'    => 'publish',
		);

		// Sorting.
		$sort_by = isset( $this->attributes['sortBy'] ) ? $this->attributes['sortBy'] : 'latest';
		switch ( $sort_by ) {
			case 'oldest':
				$args['order']   = 'ASC';
				$args['orderby'] = 'date';
				break;
			case 'alphabet_asc':
				$args['order']   = 'ASC';
				$args['orderby'] = 'title';
				break;
			case 'alphabet_desc':
				$args['order']   = 'DESC';
				$args['orderby'] = 'title';
				break;
			case 'random':
				$args['orderby'] = 'rand';
				break;
			case 'latest':
			default:
				$args['order']   = 'DESC';
				$args['orderby'] = 'date';
				break;
		}

		// Include/Exclude posts.
		if ( ! empty( $this->attributes['includePost'] ) ) {
			$args['post__in'] = array_column( $this->attributes['includePost'], 'value' );
		}
		if ( ! empty( $this->attributes['excludePost'] ) ) {
			$args['post__not_in'] = array_column( $this->attributes['excludePost'], 'value' );
		}

		// Taxonomies.
		$tax_query = array();

		// Categories.
		if ( ! empty( $this->attributes['includeCategory'] ) ) {
			$tax_query[] = array(
				'taxonomy' => 'category',
				'field'    => 'term_id',
				'terms'    => array_column( $this->attributes['includeCategory'], 'value' ),
			);
		}
		if ( ! empty( $this->attributes['excludeCategory'] ) ) {
			$tax_query[] = array(
				'taxonomy' => 'category',
				'field'    => 'term_id',
				'terms'    => array_column( $this->attributes['excludeCategory'], 'value' ),
				'operator' => 'NOT IN',
			);
		}

		// Tags.
		if ( ! empty( $this->attributes['includeTag'] ) ) {
			$tax_query[] = array(
				'taxonomy' => 'post_tag',
				'field'    => 'term_id',
				'terms'    => array_column( $this->attributes['includeTag'], 'value' ),
			);
		}
		if ( ! empty( $this->attributes['excludeTag'] ) ) {
			$tax_query[] = array(
				'taxonomy' => 'post_tag',
				'field'    => 'term_id',
				'terms'    => array_column( $this->attributes['excludeTag'], 'value' ),
				'operator' => 'NOT IN',
			);
		}

		// Author.
		if ( ! empty( $this->attributes['includeAuthor'] ) ) {
			$args['author__in'] = array_column( $this->attributes['includeAuthor'], 'value' );
		}

		// Custom Taxonomies.
		if ( ! empty( $this->attributes['taxonomies'] ) ) {
			foreach ( $this->attributes['taxonomies'] as $taxonomy => $terms ) {
				if ( ! empty( $terms ) ) {
					$tax_query[] = array(
						'taxonomy' => $taxonomy,
						'field'    => 'term_id',
						'terms'    => array_column( $terms, 'value' ),
					);
				}
			}
		}

		// phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_tax_query -- Taxonomy query is required for filtering.
		if ( ! empty( $tax_query ) ) {
			$tax_query['relation'] = 'AND';
			$args['tax_query']     = $tax_query;
		}

		return $args;
	}

	/**
	 * Render view in editor.
	 */
	public function render_gutenberg() {
		return $this->render_content();
	}

	/**
	 * Render view in frontend.
	 */
	public function render_frontend() {
		return $this->render_content();
	}
}
