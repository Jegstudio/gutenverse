<?php
/**
 * Accordions Block class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\block
 */

namespace Gutenverse\Block;

use Gutenverse\Framework\Block\Block_Abstract;

/**
 * Class Accordions Block
 *
 * @package gutenverse\block
 */
class Accordions extends Block_Abstract {

	/**
	 * Render content
	 *
	 * @return string
	 */
	public function render_content() {
		return '<div class="guten-accordions">' . $this->get_inner_blocks_content() . '</div>';
	}

	/**
	 * Render view in editor
	 */
	public function render_gutenberg() {
		return $this->render_content();
	}

	/**
	 * Render view in frontend
	 */
	public function render_frontend() {
		$element_id      = $this->get_element_id();
		$display_classes = $this->set_display_classes();
		$animation_class = $this->set_animation_classes();
		$anchor          = isset( $this->attributes['anchor'] ) ? $this->attributes['anchor'] : '';

		$data_id = '';
		if ( isset( $this->attributes['advanceAnimation']['type'] ) && ! empty( $this->attributes['advanceAnimation']['type'] ) ) {
			$id_parts = explode( '-', $element_id );
			if ( count( $id_parts ) > 1 ) {
				$data_id = ' data-id="' . esc_attr( $id_parts[1] ) . '"';
			}
		}
		$id_attr    = ! empty( $anchor ) ? ' id="' . esc_attr( $anchor ) . '"' : '';
		$class_name = 'guten-element guten-accordions-wrapper ' . $element_id . $display_classes . $animation_class;

		$content = '<div' . $id_attr . ' class="' . esc_attr( trim( $class_name ) ) . '"' . $data_id . '>' . $this->render_content() . '</div>';
		$content = apply_filters( 'gutenverse_cursor_move_effect_script', $content, $this->attributes, $element_id );
		$content = apply_filters( 'gutenverse_advance_animation_script', $content, $this->attributes, $element_id, 'accordions' );
		return $content;
	}
}
