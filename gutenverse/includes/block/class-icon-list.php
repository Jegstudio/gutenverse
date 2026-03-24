<?php
/**
 * Icon List Block class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\block
 */

namespace Gutenverse\Block;

use Gutenverse\Framework\Block\Block_Abstract;

/**
 * Class Icon List Block
 *
 * @package gutenverse\block
 */
class Icon_List extends Block_Abstract {

	/**
	 * Render content
	 *
	 * @return string
	 */
	public function render_content() {
		$display_inline = isset( $this->attributes['displayInline'] ) ? $this->attributes['displayInline'] : false;
		$display_class  = $display_inline ? 'inline-icon-list' : '';
		return '<div class="list-wrapper ' . $display_class . '">' . $this->content . '</div>';
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
		if ( ! empty( $this->content ) && apply_filters( 'gutenverse_static_to_dinamic_toggle', false ) ) {
			return $this->content;
		}
		$element_id      = $this->get_element_id();
		$display_classes = $this->set_display_classes();
		$animation_class = $this->set_animation_classes();
		$custom_classes  = $this->get_custom_classes();

		$data_id = '';
		if ( isset( $this->attributes['advanceAnimation']['type'] ) && ! empty( $this->attributes['advanceAnimation']['type'] ) ) {
			$id_parts = explode( '-', $element_id );
			if ( count( $id_parts ) > 1 ) {
				$data_id = ' data-id="' . esc_attr( $id_parts[1] ) . '"';
			}
		}
		$class_name = 'guten-element guten-icon-list ' . $element_id . $display_classes . $animation_class . $custom_classes;

		$content = '<div class="' . esc_attr( trim( $class_name ) ) . '"' . $data_id . '>' . $this->render_content() . '</div>';
		$content = apply_filters( 'gutenverse_cursor_move_effect_script', $content, $this->attributes, $element_id );
		$content = apply_filters( 'gutenverse_advance_animation_script', $content, $this->attributes, $element_id, 'icon-list' );
		return $content;
	}
}
