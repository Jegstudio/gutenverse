<?php
/**
 * Heading Block class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\block
 */

namespace Gutenverse\Block;

use Gutenverse\Framework\Block\Block_Abstract;

/**
 * Class Heading Block
 *
 * @package gutenverse\block
 */
class Heading extends Block_Abstract {

	/**
	 * Render content
	 *
	 * @return string
	 */
	public function render_content() {
		return isset( $this->attributes['content'] ) ? $this->attributes['content'] : '';
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
		if ( ! empty( trim( $this->block_data->inner_html ) ) && apply_filters( 'gutenverse_force_dynamic', false ) ) {
			return $this->content;
		}
		$element_id           = $this->get_element_id();
		$display_classes      = $this->set_display_classes();
		$animation_class      = $this->set_animation_classes();
		$custom_classes       = $this->get_custom_classes();
		$content              = isset( $this->attributes['content'] ) ? $this->attributes['content'] : '';
		$content              = wp_kses_post( $content );
		$content_dynamic_list = isset( $this->attributes['dynamicDataList'] ) ? $this->attributes['dynamicDataList'] : array();

		$content = apply_filters(
			'gutenverse_dynamic_generate_dynamic_parse_list_php',
			$content,
			$content_dynamic_list
		);

		$anchor     = isset( $this->attributes['anchor'] ) ? $this->attributes['anchor'] : '';
		$class_name = trim( 'wp-block-gutenverse-heading guten-element ' . $element_id . ' ' . $animation_class . ' ' . $display_classes . ' ' . $custom_classes );
		$data_id    = '';
		if ( isset( $this->attributes['advanceAnimation']['type'] ) && ! empty( $this->attributes['advanceAnimation']['type'] ) ) {
			$id_parts = explode( '-', $element_id );
			if ( count( $id_parts ) > 1 ) {
				$data_id = ' data-id="' . esc_attr( $id_parts[1] ) . '"';
			}
		}
		$id_attr = ! empty( $anchor ) ? ' id="' . esc_attr( $anchor ) . '"' : '';
		$content = '<' . $this->get_tag_name() . $id_attr . ' class="' . esc_attr( $class_name ) . '"' . $data_id . '>' . $content . '</' . $this->get_tag_name() . '>';
		$content = apply_filters( 'gutenverse_cursor_move_effect_script', $content, $this->attributes, $element_id );
		$content = apply_filters( 'gutenverse_advance_animation_script', $content, $this->attributes, $element_id, 'heading' );

		return $content;
	}

	/**
	 * Get valid tag name
	 *
	 * @return string
	 */
	private function get_tag_name() {
		$type          = isset( $this->attributes['type'] ) ? (int) $this->attributes['type'] : 2;
		$allowed_types = array( 1, 2, 3, 4, 5, 6 );
		$type          = in_array( $type, $allowed_types, true ) ? $type : 2;
		return 'h' . $type;
	}
}
