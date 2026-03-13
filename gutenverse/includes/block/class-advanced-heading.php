<?php
/**
 * Advanced Heading Block class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\block
 */

namespace Gutenverse\Block;

use Gutenverse\Framework\Block\Block_Abstract;

/**
 * Class Advanced Heading Block
 *
 * @package gutenverse\block
 */
class Advanced_Heading extends Block_Abstract {

	/**
	 * Render content
	 *
	 * @return string
	 */
	public function render_content() {
		$title_tag  = isset( $this->attributes['titleTag'] ) ? $this->attributes['titleTag'] : 'h2';
		$sub_tag    = isset( $this->attributes['subTag'] ) ? $this->attributes['subTag'] : 'span';
		$text       = isset( $this->attributes['text'] ) ? $this->attributes['text'] : 'Heading ';
		$focus_text = isset( $this->attributes['focusText'] ) ? $this->attributes['focusText'] : 'Focused';
		$sub_text   = isset( $this->attributes['subText'] ) ? $this->attributes['subText'] : '';
		$show_sub   = isset( $this->attributes['showSub'] ) ? $this->attributes['showSub'] : 'bottom';
		$show_line  = isset( $this->attributes['showLine'] ) ? $this->attributes['showLine'] : 'before';

		$output = '';

		if ( 'top' === $show_line ) {
			$output .= '<div class="heading-line top"></div>';
		}

		if ( 'top' === $show_sub ) {
			$output .= '<' . esc_attr( $sub_tag ) . ' class="heading-subtitle">' . wp_kses_post( $sub_text ) . '</' . esc_attr( $sub_tag ) . '>';
		}

		if ( 'top' === $show_sub && 'between' === $show_line ) {
			$output .= '<div class="heading-line between"></div>';
		}

		$section_class = 'heading-section';
		if ( in_array( $show_line, array( 'top', 'bottom', 'between' ), true ) ) {
			$section_class .= ' outside-line';
		}

		$output .= '<div class="' . esc_attr( $section_class ) . '">';
		if ( 'before' === $show_line ) {
			$output .= '<div class="heading-line before"></div>';
		}

		$output .= '<' . esc_attr( $title_tag ) . ' class="heading-title">';
		$output .= '<span class="heading-title">' . wp_kses_post( $text ) . '</span>';
		$output .= '<span class="heading-focus">' . wp_kses_post( $focus_text ) . '</span>';
		$output .= '</' . esc_attr( $title_tag ) . '>';

		if ( 'after' === $show_line ) {
			$output .= '<div class="heading-line after"></div>';
		}
		$output .= '</div>';

		if ( 'bottom' === $show_sub && 'between' === $show_line ) {
			$output .= '<div class="heading-line between"></div>';
		}

		if ( 'bottom' === $show_sub ) {
			$output .= '<' . esc_attr( $sub_tag ) . ' class="heading-subtitle">' . wp_kses_post( $sub_text ) . '</' . esc_attr( $sub_tag ) . '>';
		}

		if ( 'bottom' === $show_line ) {
			$output .= '<div class="heading-line bottom"></div>';
		}

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

		$class_name = 'guten-element guten-advanced-heading ' . $element_id . $display_classes . $animation_class . $custom_classes;

		$content = '<div class="' . esc_attr( trim( $class_name ) ) . '"' . $data_id . '>' . $this->render_content() . '</div>';
		$content = apply_filters( 'gutenverse_cursor_move_effect_script', $content, $this->attributes, $element_id );
		$content = apply_filters( 'gutenverse_advance_animation_script', $content, $this->attributes, $element_id, 'advanced-heading' );
		return $content;
	}
}
