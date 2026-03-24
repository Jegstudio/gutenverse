<?php
/**
 * Animated Text Block class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\block
 */

namespace Gutenverse\Block;

use Gutenverse\Framework\Block\Block_Abstract;

/**
 * Class Animated Text Block
 *
 * @package gutenverse\block
 */
class Animated_Text extends Block_Abstract {

	/**
	 * Render content
	 *
	 * @return string
	 */
	public function render_content() {
		$style                = isset( $this->attributes['style'] ) ? $this->attributes['style'] : 'zoom';
		$text                 = isset( $this->attributes['text'] ) ? $this->attributes['text'] : 'Placeholder Text';
		$title_tag            = isset( $this->attributes['titleTag'] ) ? $this->attributes['titleTag'] : 'h2';
		$loop                 = isset( $this->attributes['loop'] ) ? $this->attributes['loop'] : true;
		$split_by_word        = isset( $this->attributes['splitByWord'] ) ? $this->attributes['splitByWord'] : false;
		$before_text_animated = isset( $this->attributes['beforeTextAnimated'] ) ? $this->attributes['beforeTextAnimated'] : 'Before ';
		$after_text_animated  = isset( $this->attributes['afterTextAnimated'] ) ? $this->attributes['afterTextAnimated'] : ' After';
		$text_type            = isset( $this->attributes['textType'] ) ? $this->attributes['textType'] : 'default';
		$rotation_texts       = isset( $this->attributes['rotationTexts'] ) ? $this->attributes['rotationTexts'] : array();
		$highlighted_style    = isset( $this->attributes['highlightedStyle'] ) ? $this->attributes['highlightedStyle'] : 'circle';
		$highlight_gradient   = isset( $this->attributes['highlightGradient'] ) ? $this->attributes['highlightGradient'] : array();
		$highlight_color_type = isset( $this->attributes['highlightColorType'] ) ? $this->attributes['highlightColorType'] : 'color';
		$highlight_color      = isset( $this->attributes['highlightColor'] ) ? $this->attributes['highlightColor'] : array();
		$animation_duration   = isset( $this->attributes['animationDuration'] ) ? (int) $this->attributes['animationDuration'] : 600;
		$display_duration     = isset( $this->attributes['displayDuration'] ) ? (int) $this->attributes['displayDuration'] : 1000;
		$transition_duration  = isset( $this->attributes['transitionDuration'] ) ? (int) $this->attributes['transitionDuration'] : 500;

		$animation_props = array(
			'loop'               => $loop,
			'splitByWord'        => $split_by_word,
			'style'              => $style,
			'textType'           => $text_type,
			'text'               => $text,
			'elementId'          => $this->get_element_id(),
			'rotationTexts'      => $rotation_texts,
			'highlightedStyle'   => $highlighted_style,
			'highlightGradient'  => $highlight_gradient,
			'highlightColorType' => $highlight_color_type,
			'highlightColor'     => $highlight_color,
			'animationDuration'  => $animation_duration,
			'displayDuration'    => $display_duration,
			'transitionDuration' => $transition_duration,
		);

		$output = '<' . esc_attr( $title_tag ) . ' data-animation=\'' . wp_json_encode( $animation_props ) . '\'>';
		$output .= '<span class="non-animated-text before-text">' . wp_kses_post( $before_text_animated ) . '</span>';
		$output .= '<span class="text-content">';
		$output .= '<span class="text-wrapper">';
		$output .= '<span class="letter">' . wp_kses_post( $text ) . '</span>';
		$output .= '</span>';
		$output .= '<span class="highlighted"></span>';
		$output .= '</span>';
		$output .= '<span class="non-animated-text after-text">' . wp_kses_post( $after_text_animated ) . '</span>';
		$output .= '</' . esc_attr( $title_tag ) . '>';

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
		$style           = isset( $this->attributes['style'] ) ? $this->attributes['style'] : 'zoom';

		$data_id = '';
		if ( isset( $this->attributes['advanceAnimation']['type'] ) && ! empty( $this->attributes['advanceAnimation']['type'] ) ) {
			$id_parts = explode( '-', $element_id );
			if ( count( $id_parts ) > 1 ) {
				$data_id = ' data-id="' . esc_attr( $id_parts[1] ) . '"';
			}
		}

		$class_name = 'guten-element guten-animated-text ' . $element_id . $display_classes . $animation_class . $custom_classes;

		if ( ! empty( $style ) && 'none' !== $style ) {
			$class_name .= ' style-' . $style;
		}

		$content = '<div class="' . esc_attr( trim( $class_name ) ) . '"' . $data_id . '>' . $this->render_content() . '</div>';
		$content = apply_filters( 'gutenverse_cursor_move_effect_script', $content, $this->attributes, $element_id );
		$content = apply_filters( 'gutenverse_advance_animation_script', $content, $this->attributes, $element_id, 'animated-text' );

		return $content;
	}
}
