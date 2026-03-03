<?php
/**
 * Dynamic Pagination Numbers Block class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\block
 */

namespace Gutenverse\Block;

use Gutenverse\Framework\Block\Block_Abstract;

/**
 * Class Dynamic Pagination Numbers
 *
 * @package gutenverse\block
 */
class Dynamic_Pagination_Numbers extends Block_Abstract {

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

		$class = array(
			$display_classes,
			$animation_class,
			$custom_classes,
			'guten-dynamic-pagination-numbers',
		);

		$total_pages = $this->block->context['gutenverse/queryTotalPages'] ?? 1;
		$current     = $this->block->context['gutenverse/queryPage'] ?? 1;
		$mid_size    = isset( $this->attributes['midSize'] ) ? intval( $this->attributes['midSize'] ) : 2;
		$query_id    = $this->block->context['gutenverse/queryId'] ?? '';

		if ( $total_pages <= 1 ) {
			return '';
		}

		$base = \esc_url_raw( \add_query_arg( 'query-' . $query_id . '-page', '%#%', \get_pagenum_link( 1 ) ) );
		// If we do not have a query id setup, revert to default format.
		if ( empty( $query_id ) ) {
			$base = \str_replace( 999999999, '%#%', \esc_url_raw( \get_pagenum_link( 999999999 ) ) );
		}

		$paginate_args = array(
			'base'      => $base,
			'format'    => '?query-' . $query_id . '-page=%#%',
			'current'   => $current,
			'total'     => $total_pages,
			'prev_next' => false, // We use child blocks for prev/next.
			'type'      => 'array',
			'end_size'  => 1,
			'mid_size'  => $mid_size,
		);

		if ( empty( $query_id ) ) {
			unset( $paginate_args['format'] );
		}

		$page_links = \paginate_links( $paginate_args );

		if ( empty( $page_links ) ) {
			return '';
		}

		$inner_content = '';
		foreach ( $page_links as $link ) {
			// Replace default classes with what our frontend expects.
			// Current page.
			if ( strpos( $link, 'current' ) !== false ) {
				$link = \str_replace( "page-numbers current", "btn-pagination current", $link );
				$inner_content .= '<span class="btn-pagination current">' . \wp_strip_all_tags( $link ) . '</span>';
			} elseif ( strpos( $link, 'dots' ) !== false ) {
				$inner_content .= '<span>...</span>';
			} else {
				$link = \str_replace( "page-numbers", "btn-pagination", $link );
				$inner_content .= $link;
			}
		}

		return '<div class="guten_block_nav ' . \esc_attr( implode( ' ', array_filter( $class ) ) ) . '" data-page="' . \esc_attr( $current ) . '">' . $inner_content . '</div>';
	}

	/**
	 * Render view in frontend.
	 */
	public function render_frontend() {
		return $this->render_content();
	}
}
