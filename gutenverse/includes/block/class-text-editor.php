<?php
/**
 * Text Editor Block class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\block
 */

namespace Gutenverse\Block;

use Gutenverse\Framework\Block\Block_Abstract;

/**
 * Class Text Editor Block
 *
 * @package gutenverse\block
 */
class Text_Editor extends Block_Abstract {

	/**
	 * Render content
	 *
	 * @return string
	 */
	public function render_content() {
		return '<div class="text-content-inner">' . $this->get_inner_blocks_content() . '</div>';
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

		$element_id      = $this->get_element_id();
		$display_classes = $this->set_display_classes();
		$animation_class = $this->set_animation_classes();
		$anchor          = isset( $this->attributes['anchor'] ) ? $this->attributes['anchor'] : '';
		$dropcap         = isset( $this->attributes['dropcap'] ) && $this->attributes['dropcap'];

		$class_name = trim( 'guten-element gutenverse-text-editor ' . $element_id . ' ' . $animation_class . ' ' . $display_classes . ( $dropcap ? ' dropcap' : '' ) );

		$data_id = '';
		if ( isset( $this->attributes['advanceAnimation']['type'] ) && ! empty( $this->attributes['advanceAnimation']['type'] ) ) {
			$id_parts = explode( '-', $element_id );
			if ( count( $id_parts ) > 1 ) {
				$data_id = ' data-id="' . esc_attr( $id_parts[1] ) . '"';
			}
		}

		$id_attr = ! empty( $anchor ) ? ' id="' . esc_attr( $anchor ) . '"' : '';

		$content = '<div class="' . esc_attr( $class_name ) . '"' . $data_id . $id_attr . '>' . $this->render_content() . '</div>';
		$content = apply_filters( 'gutenverse_cursor_move_effect_script', $content, $this->attributes, $element_id );
		$content = apply_filters( 'gutenverse_advance_animation_script', $content, $this->attributes, $element_id, 'text-editor' );

		return $content;
	}
}
