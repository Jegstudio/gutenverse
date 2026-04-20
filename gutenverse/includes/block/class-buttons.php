<?php
/**
 * Buttons Block class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\block
 */

namespace Gutenverse\Block;

use Gutenverse\Framework\Block\Block_Abstract;

/**
 * Class Buttons Block
 *
 * @package gutenverse\block
 */
class Buttons extends Block_Abstract {

	/**
	 * Render content
	 *
	 * @param string $content .
	 * @param string $data_id .
	 * @return string
	 */
	public function render_content( $content, $data_id = '' ) {
		$orientation = isset( $this->attributes['orientation'] ) ? $this->attributes['orientation'] : 'horizontal';

		$class_name = 'guten-element guten-buttons ' . $orientation;

		return '<div class="' . esc_attr( $class_name ) . '"' . $data_id . '>' . $content . '</div>';
	}

	/**
	 * Render view in editor
	 */
	public function render_gutenberg() {
		return $this->render_content( '' );
	}

	/**
	 * Render view in frontend
	 */
	public function render_frontend() {
		$element_id      = $this->get_element_id();
		$display_classes = $this->set_display_classes();
		$animation_class = $this->set_animation_classes();
		$anchor          = isset( $this->attributes['anchor'] ) ? $this->attributes['anchor'] : '';

		$wrapper_class = 'guten-element guten-buttons-wrapper ' . $element_id . $display_classes . $animation_class;
		$data_id       = '';
		if ( isset( $this->attributes['advanceAnimation']['type'] ) && ! empty( $this->attributes['advanceAnimation']['type'] ) ) {
			$id_parts = explode( '-', $element_id );
			if ( count( $id_parts ) > 1 ) {
				$data_id = ' data-id="' . esc_attr( $id_parts[1] ) . '"';
			}
		}

		$id_attr = ! empty( $anchor ) ? ' id="' . esc_attr( $anchor ) . '"' : '';

		$content = '<div' . $id_attr . ' class="' . esc_attr( trim( $wrapper_class ) ) . '">' . $this->render_content( $this->get_inner_blocks_content(), $data_id ) . '</div>';
		$content = apply_filters( 'gutenverse_cursor_move_effect_script', $content, $this->attributes, $element_id );
		$content = apply_filters( 'gutenverse_advance_animation_script', $content, $this->attributes, $element_id, 'buttons' );

		return $content;
	}
}
