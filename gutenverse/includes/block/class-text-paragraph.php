<?php
/**
 * Text Paragraph Block class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\block
 */

namespace Gutenverse\Block;

use Gutenverse\Framework\Block\Block_Abstract;

/**
 * Class Text Paragraph Block
 *
 * @package gutenverse\block
 */
class Text_Paragraph extends Block_Abstract {

	/**
	 * Render content
	 *
	 * @return string
	 */
	public function render_content() {
		$paragraph = isset( $this->attributes['paragraph'] ) ? $this->attributes['paragraph'] : '';

		$content = apply_filters(
			'gutenverse_dynamic_generate_dynamic_parse_list_php',
			$paragraph,
			$this->attributes['dynamicDataList'] ?? array()
		);

		$content   = wp_kses_post( $content );

		return $content;
	}

	/**
	 * Render view in editor
	 */
	public function render_gutenberg() {
		return null;
	}

	/**
	 * Render view in frontend
	 */
	public function render_frontend() {
		if ( ! empty( trim( $this->block_data->inner_html ) ) && apply_filters( 'gutenverse_force_dynamic', false ) ) {
			return $this->content;
		}

		$element_id      = $this->get_element_id();
		$anchor          = isset( $this->attributes['anchor'] ) ? $this->attributes['anchor'] : '';
		$display_classes = $this->set_display_classes();
		$animation_class = $this->set_animation_classes();
		$custom_classes  = $this->get_custom_classes();

		$id_attr = ! empty( $anchor ) ? ' id="' . esc_attr( $anchor ) . '"' : '';

		$data_id = '';
		if ( isset( $this->attributes['advanceAnimation']['type'] ) && ! empty( $this->attributes['advanceAnimation']['type'] ) ) {
			$id_parts = explode( '-', $element_id );
			if ( count( $id_parts ) > 1 ) {
				$data_id = ' data-id="' . esc_attr( $id_parts[1] ) . '"';
			}
		}

		$class_name = trim( 'guten-element gutenverse-text ' . $element_id . $animation_class . $display_classes . $custom_classes );
		$content    = '<p' . $id_attr . ' class="' . esc_attr( $class_name ) . '" aria-label="' . esc_attr__( 'Text Paragraph', 'gutenverse' ) . '"' . $data_id . '>' . $this->render_content() . '</p>';
		$content    = apply_filters( 'gutenverse_cursor_move_effect_script', $content, $this->attributes, $element_id );
		$content    = apply_filters( 'gutenverse_advance_animation_script', $content, $this->attributes, $element_id, 'text-paragraph' );

		return $content;
	}
}
