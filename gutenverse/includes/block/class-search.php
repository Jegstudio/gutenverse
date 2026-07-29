<?php
/**
 * Search Block class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\block
 */

namespace Gutenverse\Block;

use Gutenverse\Framework\Block\Block_Abstract;

/**
 * Class Search Block
 *
 * @package gutenverse\block
 */
class Search extends Block_Abstract {

	/**
	 * Render the close icon.
	 *
	 * @return string
	 */
	private function render_close_icon() {
		$close_icon      = isset( $this->attributes['closeIcon'] ) ? $this->attributes['closeIcon'] : 'gtn gtn-x-line';
		$close_icon_type = isset( $this->attributes['closeIconType'] ) ? $this->attributes['closeIconType'] : 'icon';
		$close_icon_svg  = isset( $this->attributes['closeIconSVG'] ) ? $this->attributes['closeIconSVG'] : '';

		return '<div class="close-icon">' . $this->render_icon( $close_icon_type, $close_icon, $close_icon_svg ) . '</div>';
	}

	/**
	 * Render content
	 *
	 * @return string
	 */
	public function render_content() {
		$placeholder = isset( $this->attributes['inputPlaceholder'] ) ? $this->attributes['inputPlaceholder'] : 'Text Placeholder';
		$show_button = isset( $this->attributes['showButton'] ) ? $this->attributes['showButton'] : true;

		$output  = '<form class="gutenverse-search-form">';
		$output .= '<div class="search-input-container-outer">';
		$output .= '<div class="search-input-container">';
		$output .= '<input type="text" placeholder="' . esc_attr( $placeholder ) . '" name="s" class="gutenverse-search gutenverse-search-input" />';
		$output .= $this->render_close_icon();
		$output .= '</div>';
		$output .= '</div>';

		if ( $show_button ) {
			$output .= '<div class="guten-search-button-wrapper">' . $this->get_inner_blocks_content() . '</div>';
		}

		$output .= '</form>';

		return $output;
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

		$class_name = trim( 'guten-element ' . $element_id . ' guten-search' . $animation_class . $display_classes . $custom_classes );
		$content    = '<div' . $id_attr . ' class="' . esc_attr( $class_name ) . '"' . $data_id . '>' . $this->render_content() . '</div>';
		$content    = apply_filters( 'gutenverse_cursor_move_effect_script', $content, $this->attributes, $element_id );
		$content    = apply_filters( 'gutenverse_advance_animation_script', $content, $this->attributes, $element_id, 'search' );

		return $content;
	}
}
