<?php
/**
 * Tabs Block class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\block
 */

namespace Gutenverse\Block;

use Gutenverse\Framework\Block\Block_Abstract;

/**
 * Class Tabs Block
 *
 * @package gutenverse\block
 */
class Tabs extends Block_Abstract {

	/**
	 * Render the chevron SVG icons for mobile dropdown.
	 *
	 * @return string
	 */
	private function render_chevron_icons() {
		$output  = '<div class="gutenverse-icon-svg">';
		$output .= '<svg class="chevron-up-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M201.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 173.3 54.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z" /></svg>';
		$output .= '<svg class="chevron-down-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M201.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 338.7 54.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" /></svg>';
		$output .= '</div>';

		return $output;
	}

	/**
	 * Render tab heading items.
	 *
	 * @return string
	 */
	private function render_tab_heading() {
		$tabs = isset( $this->attributes['tabs'] ) ? $this->attributes['tabs'] : array();

		$output = '<div class="tab-heading">';
		foreach ( $tabs as $index => $tab ) {
			$tab_id       = isset( $tab['tabId'] ) ? $tab['tabId'] : '';
			$text         = isset( $tab['text'] ) ? $tab['text'] : '';
			$active_class = 0 === $index ? ' active' : '';

			$output .= '<div class="tab-heading-item' . $active_class . '" id="' . esc_attr( $tab_id ) . '" data-id="' . esc_attr( $tab_id ) . '">';
			$output .= '<span>' . wp_kses_post( $text ) . '</span>';
			$output .= '</div>';
		}
		$output .= '</div>';

		return $output;
	}

	/**
	 * Render mobile tab heading.
	 *
	 * @return string
	 */
	private function render_tab_heading_mobile() {
		$tabs = isset( $this->attributes['tabs'] ) ? $this->attributes['tabs'] : array();

		if ( empty( $tabs ) ) {
			return '';
		}

		$first_text = isset( $tabs[0]['text'] ) ? $tabs[0]['text'] : '';

		$output  = '<div class="tab-heading-mobile">';
		$output .= '<div class="tab-title">';
		$output .= '<span>' . wp_kses_post( $first_text ) . '</span>';
		$output .= $this->render_chevron_icons();
		$output .= '</div>';
		$output .= '<div class="tab-option">';

		foreach ( $tabs as $index => $tab ) {
			$tab_id       = isset( $tab['tabId'] ) ? $tab['tabId'] : '';
			$text         = isset( $tab['text'] ) ? $tab['text'] : '';
			$active_class = 0 === $index ? ' active' : '';

			$output .= '<div data-id="' . esc_attr( $tab_id ) . '" class="tab-option-item' . $active_class . '">';
			$output .= '<span>' . wp_kses_post( $text ) . '</span>';
			$output .= '</div>';
		}

		$output .= '</div>';
		$output .= '</div>';

		return $output;
	}

	/**
	 * Render content
	 *
	 * @return string
	 */
	public function render_content() {
		$output  = $this->render_tab_heading();
		$output .= $this->render_tab_heading_mobile();
		$output .= '<div class="tab-body">' . $this->get_inner_blocks_content() . '</div>';

		return $output;
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
		$tabs = isset( $this->attributes['tabs'] ) ? $this->attributes['tabs'] : array();

		if ( ! empty( trim( $this->block_data->inner_html ) ) && ( apply_filters( 'gutenverse_force_dynamic', false ) || empty( $tabs ) ) ) {
			return $this->content;
		}

		$element_id      = $this->get_element_id();
		$anchor          = isset( $this->attributes['anchor'] ) ? $this->attributes['anchor'] : '';
		$display_classes = $this->set_display_classes();
		$animation_class = $this->set_animation_classes();
		$custom_classes  = $this->get_custom_classes();
		$orientation     = isset( $this->attributes['orientation'] ) ? ' ' . $this->attributes['orientation'] : ' horizontal';

		$id_attr = ! empty( $anchor ) ? ' id="' . esc_attr( $anchor ) . '"' : '';

		$data_id = '';
		if ( isset( $this->attributes['advanceAnimation']['type'] ) && ! empty( $this->attributes['advanceAnimation']['type'] ) ) {
			$id_parts = explode( '-', $element_id );
			if ( count( $id_parts ) > 1 ) {
				$data_id = ' data-id="' . esc_attr( $id_parts[1] ) . '"';
			}
		}

		$class_name = trim( 'guten-element guten-tabs ' . $element_id . $orientation . $animation_class . $display_classes . $custom_classes );
		$content    = '<div' . $id_attr . ' class="' . esc_attr( $class_name ) . '"' . $data_id . '>' . $this->render_content() . '</div>';
		$content    = apply_filters( 'gutenverse_cursor_move_effect_script', $content, $this->attributes, $element_id );
		$content    = apply_filters( 'gutenverse_advance_animation_script', $content, $this->attributes, $element_id, 'tabs' );

		return $content;
	}
}
