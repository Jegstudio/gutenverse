<?php
/**
 * Icon Block class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\block
 */

namespace Gutenverse\Block;

use Gutenverse\Framework\Block\Block_Abstract;

/**
 * Class Icon Block
 *
 * @package gutenverse\block
 */
class Icon extends Block_Abstract {
	/**
	 * Render content
	 *
	 * @return string
	 */
	public function render_content() {
		$icon        = isset( $this->attributes['icon'] ) ? $this->attributes['icon'] : 'fab fa-wordpress';
		$icon_type   = isset( $this->attributes['iconType'] ) ? $this->attributes['iconType'] : 'icon';
		$icon_svg    = isset( $this->attributes['iconSVG'] ) ? $this->attributes['iconSVG'] : '';
		$url         = isset( $this->attributes['url'] ) ? $this->attributes['url'] : '';
		$aria_label  = isset( $this->attributes['ariaLabel'] ) ? $this->attributes['ariaLabel'] : '';
		$link_target = isset( $this->attributes['linkTarget'] ) ? $this->attributes['linkTarget'] : '';
		$rel         = isset( $this->attributes['rel'] ) ? $this->attributes['rel'] : '';
		$icon_shape  = isset( $this->attributes['iconShape'] ) ? $this->attributes['iconShape'] : 'rounded';
		$icon_view   = isset( $this->attributes['iconView'] ) ? $this->attributes['iconView'] : 'stacked';

		// Dynamic icon.
		$dynamic_icon = isset( $this->attributes['dynamicIcon'] ) ? $this->attributes['dynamicIcon'] : array();
		$default_icon = array(
			'type' => $icon_type,
			'icon' => $icon,
			'svg'  => $icon_svg,
		);
		$resolved     = apply_filters( 'gutenverse_dynamic_generate_icon', $default_icon, $dynamic_icon );

		if ( ! empty( $resolved ) && is_array( $resolved ) ) {
			$icon_type = isset( $resolved['type'] ) ? $resolved['type'] : $icon_type;
			if ( 'icon' === $icon_type ) {
				$icon = isset( $resolved['icon'] ) ? $resolved['icon'] : $icon;
			} else {
				$icon_svg = isset( $resolved['svg'] ) ? $resolved['svg'] : $icon_svg;
			}
		}

		if ( 'svg' === $icon_type ) {
			$icon_html = $this->render_icon( $icon_type, $icon, $icon_svg );
		} else {
			$icon_html = '<i class="' . esc_attr( $icon ) . '"></i>';
		}

		// Dynamic URL.
		$element_id  = $this->get_element_id();
		$dynamic_url = isset( $this->attributes['dynamicUrl'] ) ? $this->attributes['dynamicUrl'] : array();
		$href        = apply_filters( 'gutenverse_dynamic_generate_url', $url, $dynamic_url, $element_id );

		$wrapper_class = 'guten-icon-wrapper';
		if ( ! empty( $icon_shape ) ) {
			$wrapper_class .= ' ' . $icon_shape;
		}
		if ( ! empty( $icon_view ) ) {
			$wrapper_class .= ' ' . $icon_view;
		}

		if ( ! empty( $url ) ) {
			$link_attr     = array(
				'class'      => $wrapper_class,
				'href'       => $href,
				'target'     => $link_target,
				'rel'        => $rel,
				'aria-label' => $aria_label,
			);
			$link_attr_str = '';
			foreach ( $link_attr as $key => $val ) {
				if ( ! empty( $val ) ) {
					$link_attr_str .= ' ' . esc_attr( $key ) . '="' . esc_attr( $val ) . '"';
				}
			}
			$icon_wrapper = '<a' . $link_attr_str . '>' . $icon_html . '</a>';
		} else {
			$icon_wrapper = '<span class="' . esc_attr( $wrapper_class ) . '">' . $icon_html . '</span>';
		}

		return $icon_wrapper;
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
		$post_id         = ! empty( $this->context['postId'] ) ? esc_html( $this->context['postId'] ) : get_the_ID();
		$element_id      = $this->get_element_id();
		$anchor          = isset( $this->attributes['anchor'] ) ? $this->attributes['anchor'] : '';
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

		$id_attr    = ! empty( $anchor ) ? ' id="' . esc_attr( $anchor ) . '"' : '';
		$class_name = trim( 'guten-element wp-block-gutenverse-icon ' . $element_id . ' guten-icon' . $animation_class . $display_classes . $custom_classes );
		$content    = '<div' . $id_attr . ' class="' . esc_attr( $class_name ) . '"' . $data_id . '>' . $this->render_content() . '</div>';
		$content    = apply_filters( 'gutenverse_cursor_move_effect_script', $content, $this->attributes, $element_id );
		$content    = apply_filters( 'gutenverse_advance_animation_script', $content, $this->attributes, $element_id, 'icon' );

		return $content;
	}
}
