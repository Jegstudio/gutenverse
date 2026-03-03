<?php
/**
 * Dynamic Pagination Previous Block class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\block
 */

namespace Gutenverse\Block;

use Gutenverse\Framework\Block\Block_Abstract;

/**
 * Class Dynamic Pagination Previous
 *
 * @package gutenverse\block
 */
class Dynamic_Pagination_Previous extends Block_Abstract {

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
			'guten-dynamic-pagination-previous',
			'guten_block_nav',
		);

		$total_pages = $this->block->context['gutenverse/queryTotalPages'] ?? 1;
		$current     = $this->block->context['gutenverse/queryPage'] ?? 1;
		$query_id    = $this->block->context['gutenverse/queryId'] ?? '';
		$label       = isset( $this->attributes['label'] ) ? $this->attributes['label'] : __( 'Previous Page', 'gutenverse' );

		if ( $total_pages <= 1 ) {
			return '';
		}

		$a_class = 'btn-pagination prev';
		$url     = '#';

		if ( $current > 1 ) {
			if ( empty( $query_id ) ) {
				$url = \get_pagenum_link( $current - 1 );
			} else {
				$url = \add_query_arg( 'query-' . $query_id . '-page', $current - 1, \get_pagenum_link( 1 ) );
			}
		} else {
			return '';
		}

		$arrow = '';
		if ( isset( $this->block->context['gutenverse/paginationArrow'] ) && 'none' !== $this->block->context['gutenverse/paginationArrow'] ) {
			$arrow_type = $this->block->context['gutenverse/paginationArrow'];
			if ( 'arrow' === $arrow_type ) {
				$arrow = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false"><path d="M14.6 7l-1.2-1L8 12l5.4 6 1.2-1-4.6-5z"></path></svg>';
			} elseif ( 'chevron' === $arrow_type ) {
				$arrow = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false"><path d="M14.6 7l-1.2-1L8 12l5.4 6 1.2-1-4.6-5z"></path></svg>';
			}
		}

		$show_label = isset( $this->block->context['gutenverse/showLabel'] ) ? $this->block->context['gutenverse/showLabel'] : true;
		if ( ! $show_label ) {
			$label = '';
		}

		$inner_content = '<a href="' . \esc_url( $url ) . '" class="' . \esc_attr( $a_class ) . '" title="' . \esc_attr( $label ) . '">' . $arrow . ' <span class="wp-block-query-pagination-previous-arrow is-arrow-chevron" aria-hidden="true"></span> ' . \esc_html( $label ) . '</a>';

		return '<div class="' . \esc_attr( implode( ' ', array_filter( $class ) ) ) . '" data-page="' . \esc_attr( $current ) . '">' . $inner_content . '</div>';
	}

	/**
	 * Render view in frontend.
	 */
	public function render_frontend() {
		return $this->render_content();
	}
}
