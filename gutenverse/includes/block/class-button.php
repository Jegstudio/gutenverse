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

		$dynamic_url = isset( $this->attributes['dynamicUrl'] ) ? $this->attributes['dynamicUrl'] : array();
		$href        = apply_filters(
			'gutenverse_dynamic_generate_url',
			$url,
			$dynamic_url,
			$element_id
		);

		$dynamic_content = isset( $this->attributes['dynamicContent'] ) ? $this->attributes['dynamicContent'] : array();

		$title = apply_filters(
			'gutenverse_dynamic_generate_content',
			$content,
			$dynamic_content,
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
			$icon_html = $this->render_icon( $icon_type, $icon, $icon_svg );
		}

		$content_html = '<span>' . wp_kses_post( $title ) . '</span>';

		$inner_html = '';
		if ( 'before' === $icon_position ) {
			$inner_html = $icon_html . $content_html;
		} else {
			$inner_html = $content_html . $icon_html;
		}

		if ( 'link' === $role ) {
			$target_attr     = $link_target ? ' target="' . esc_attr( $link_target ) . '"' : '';
			$aria_label_attr = $aria_label ? ' aria-label="' . esc_attr( $aria_label ) . '"' : '';
			$rel_attr        = $rel ? ' rel="' . esc_attr( $rel ) . '"' : '';

			return '<a class="' . esc_attr( $button_class ) . '" href="' . esc_url( $href ) . '"' . $target_attr . $aria_label_attr . $rel_attr . '>' . $inner_html . '</a>';
		} else {
			$aria_label_attr = $aria_label ? ' aria-label="' . esc_attr( $aria_label ) . '"' : '';

			return '<button class="' . esc_attr( $button_class ) . '"' . $aria_label_attr . ' type="submit">' . $inner_html . '</button>';
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
		if ( ! empty( trim( $this->block_data->inner_html ) ) && apply_filters( 'gutenverse_force_dynamic', false ) ) {
			return $this->content;
		}
		$element_id      = $this->get_element_id();
		$display_classes = $this->set_display_classes();
		$animation_class = $this->set_animation_classes();
		$anchor          = isset( $this->attributes['anchor'] ) ? $this->attributes['anchor'] : '';

		$data_id = '';
		if ( isset( $this->attributes['advanceAnimation']['type'] ) && ! empty( $this->attributes['advanceAnimation']['type'] ) ) {
			$id_parts = explode( '-', $element_id );
			if ( count( $id_parts ) > 1 ) {
				$data_id = ' data-id="' . esc_attr( $id_parts[1] ) . '"';
			}
		}
		$id_attr    = ! empty( $anchor ) ? ' id="' . esc_attr( $anchor ) . '"' : '';
		$class_name = 'guten-element guten-button-wrapper ' . $element_id . $display_classes . $animation_class;
		$content    = '<div' . $id_attr . ' class="' . esc_attr( trim( $class_name ) ) . '"' . $data_id . '>' . $this->render_content() . '</div>';
		$content    = apply_filters( 'gutenverse_cursor_move_effect_script', $content, $this->attributes, $element_id );
		$content    = apply_filters( 'gutenverse_advance_animation_script', $content, $this->attributes, $element_id, 'buttons' );

		return $content;
	}
}
