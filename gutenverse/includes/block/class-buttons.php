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
	 * @return string
	 */
	public function render_content( $content ) {
		$orientation = isset( $this->attributes['orientation'] ) ? $this->attributes['orientation'] : 'horizontal';

		$class_name = 'guten-element guten-buttons ' . $orientation;

		return '<div class="' . esc_attr( $class_name ) . '">' . $content . '</div>';
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
		$custom_classes  = $this->get_custom_classes();

		$wrapper_class = 'guten-element guten-buttons-wrapper ' . $element_id . $display_classes . $animation_class . $custom_classes;

		$content = '<div class="' . esc_attr( trim( $wrapper_class ) ) . '">' . $this->render_content( $this->content ) . '</div>';
		$content = apply_filters( 'gutenverse_cursor_move_effect_script', $content, $this->attributes, $element_id );
		$content = apply_filters( 'gutenverse_advance_animation_script', $content, $this->attributes, $element_id, 'buttons' );

		return $content;
	}
}
