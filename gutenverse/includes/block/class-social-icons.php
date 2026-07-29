<?php
/**
 * Social Icons Block class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\block
 */

namespace Gutenverse\Block;

use Gutenverse\Framework\Block\Block_Abstract;

/**
 * Class Social Icons Block
 *
 * @package gutenverse\block
 */
class Social_Icons extends Block_Abstract {
	/**
	 * Render content
	 *
	 * @return string
	 */
	public function render_content() {
		return $this->get_inner_blocks_content();
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
		$custom_classes  = $this->get_custom_classes();
		$shape           = isset( $this->attributes['shape'] ) ? $this->attributes['shape'] : 'rounded';
		$orientation     = isset( $this->attributes['orientation'] ) ? $this->attributes['orientation'] : 'horizontal';
		$color           = isset( $this->attributes['color'] ) ? $this->attributes['color'] : 'fill';
		$show_text       = ( isset( $this->attributes['showText'] ) && $this->attributes['showText'] ) ? 'show-text' : '';

		$anchor  = isset( $this->attributes['anchor'] ) ? $this->attributes['anchor'] : '';
		$id_attr = ! empty( $anchor ) ? ' id="' . esc_attr( $anchor ) . '"' : '';

		$data_id = '';
		if ( isset( $this->attributes['advanceAnimation']['type'] ) && ! empty( $this->attributes['advanceAnimation']['type'] ) ) {
			$id_parts = explode( '-', $element_id );
			if ( count( $id_parts ) > 1 ) {
				$data_id = ' data-id="' . esc_attr( $id_parts[1] ) . '"';
			}
		}

		$class_name = 'guten-element guten-social-icons ' . $element_id . ' ' . $shape . ' ' . $orientation . ' ' . $color . $display_classes . $animation_class . $custom_classes . ' ' . $show_text;

		$content = '<div' . $id_attr . ' class="' . esc_attr( trim( $class_name ) ) . '"' . $data_id . '>' . $this->render_content() . '</div>';
		$content = apply_filters( 'gutenverse_cursor_move_effect_script', $content, $this->attributes, $element_id );
		$content = apply_filters( 'gutenverse_advance_animation_script', $content, $this->attributes, $element_id, 'social-icons' );

		return $content;
	}
}
