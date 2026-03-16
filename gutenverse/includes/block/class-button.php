<?php
/**
 * Button Block class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\block
 */

namespace Gutenverse\Block;

use Gutenverse\Framework\Block\Block_Abstract;

/**
 * Class Button Block
 *
 * @package gutenverse\block
 */
class Button extends Block_Abstract {

	/**
	 * Render content
	 *
	 * @return string
	 */
	public function render_content() {
		$content       = isset( $this->attributes['content'] ) ? $this->attributes['content'] : '';
		$url           = isset( $this->attributes['url'] ) ? $this->attributes['url'] : '#';
		$link_target   = isset( $this->attributes['linkTarget'] ) ? $this->attributes['linkTarget'] : '';
		$rel           = isset( $this->attributes['rel'] ) ? $this->attributes['rel'] : '';
		$button_type   = isset( $this->attributes['buttonType'] ) ? $this->attributes['buttonType'] : 'default';
		$button_size   = isset( $this->attributes['buttonSize'] ) ? $this->attributes['buttonSize'] : 'sm';
		$show_icon     = isset( $this->attributes['showIcon'] ) ? $this->attributes['showIcon'] : false;
		$icon          = isset( $this->attributes['icon'] ) ? $this->attributes['icon'] : 'fab fa-wordpress';
		$icon_type     = isset( $this->attributes['iconType'] ) ? $this->attributes['iconType'] : 'icon';
		$icon_svg      = isset( $this->attributes['iconSVG'] ) ? $this->attributes['iconSVG'] : '';
		$icon_position = isset( $this->attributes['iconPosition'] ) ? $this->attributes['iconPosition'] : 'before';
		$role          = isset( $this->attributes['role'] ) ? $this->attributes['role'] : 'link';
		$aria_label    = isset( $this->attributes['ariaLabel'] ) ? $this->attributes['ariaLabel'] : '';
		$element_id    = $this->get_element_id();

		$href = apply_filters(
			'gutenverse_dynamic_generate_dynamic_pattern_link',
			$url,
			'dynamicUrl',
			$this->attributes,
			$element_id
		);

		$title = apply_filters(
			'gutenverse_dynamic_generate_dynamic_pattern_content',
			$content,
			'dynamicContent',
			$this->attributes,
			$element_id
		);

		$button_class = 'guten-button';
		if ( $button_type && 'default' !== $button_type ) {
			$button_class .= ' guten-button-' . $button_type;
		}
		if ( $button_size ) {
			$button_class .= ' guten-button-' . $button_size;
		}

		$icon_html = '';
		if ( $show_icon ) {
			if ( 'icon' === $icon_type ) {
				$icon_html = '<i aria-hidden="true" class="fa-lg ' . esc_attr( $icon ) . '"></i>';
			} else {
				$icon_html = $this->render_icon( $icon_type, $icon, $icon_svg );
			}
		}

		$content_html = '<span>' . wp_kses_post( $title ) . '</span>';

		$inner_html = '';
		if ( 'before' === $icon_position ) {
			$inner_html = $icon_html . $content_html;
		} else {
			$inner_html = $content_html . $icon_html;
		}

		if ( 'link' === $role ) {
			return sprintf(
				'<a class="%1$s" href="%2$s" target="%3$s" rel="%4$s" aria-label="%5$s">%6$s</a>',
				esc_attr( $button_class ),
				esc_url( $href ),
				esc_attr( $link_target ),
				esc_attr( $rel ),
				esc_attr( $aria_label ),
				$inner_html
			);
		} else {
			return sprintf(
				'<button class="%1$s" type="submit" aria-label="%2$s">%3$s</button>',
				esc_attr( $button_class ),
				esc_attr( $aria_label ),
				$inner_html
			);
		}
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

		$class_name = 'guten-element guten-button-wrapper ' . $element_id . $display_classes . $animation_class . $custom_classes;
		$content    = '<div class="' . esc_attr( trim( $class_name ) ) . '">' . $this->render_content() . '</div>';
		$content    = apply_filters( 'gutenverse_cursor_move_effect_script', $content, $this->attributes, $element_id );
		$content    = apply_filters( 'gutenverse_advance_animation_script', $content, $this->attributes, $element_id, 'button' );

		return $content;
	}
}
