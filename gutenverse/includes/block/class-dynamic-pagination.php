<?php
/**
 * Dynamic Pagination Block class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\block
 */

namespace Gutenverse\Block;

use Gutenverse\Framework\Block\Block_Abstract;

/**
 * Class Dynamic Pagination
 *
 * @package gutenverse\block
 */
class Dynamic_Pagination extends Block_Abstract {

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
		$query_id        = $this->block->context['gutenverse/queryId'] ?? '';

		$class = array(
			$element_id,
			$display_classes,
			$animation_class,
			$custom_classes,
			'guten-dynamic-pagination',
			'guten-element',
		);
		$data_id = '';
		if ( isset( $this->attributes['elementId'] ) ) {
			$element_id_parts = explode( '-', $this->attributes['elementId'] );
			if ( isset( $element_id_parts[1] ) ) {
				$data_id = $element_id_parts[1];
			}
		}

		$inner_content = $this->content;

		if ( empty( $inner_content ) ) {
			return ''; // Don't render empty nav.
		}

		return '<nav class="' . \esc_attr( implode( ' ', array_filter( $class ) ) ) . '" data-id="' . \esc_attr( $data_id ) . '">' . $inner_content . '</nav>';
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
