<?php
/**
 * Fun Fact Block class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\block
 */

namespace Gutenverse\Block;

use Gutenverse\Framework\Block\Block_Abstract;

/**
 * Class Fun Fact Block
 *
 * @package gutenverse\block
 */
class Fun_Fact extends Block_Abstract {

	/**
	 * Render the icon box header (icon/svg/image).
	 *
	 * @return string
	 */
	private function render_header_content() {
		$icon_type  = isset( $this->attributes['iconType'] ) ? $this->attributes['iconType'] : 'icon';
		$icon       = isset( $this->attributes['icon'] ) ? $this->attributes['icon'] : 'fas fa-grip-horizontal';
		$icon_svg   = isset( $this->attributes['iconSVG'] ) ? $this->attributes['iconSVG'] : '';
		$image      = isset( $this->attributes['image'] ) ? $this->attributes['image'] : array();
		$image_alt  = isset( $this->attributes['imageAlt'] ) ? $this->attributes['imageAlt'] : '';
		$image_load = isset( $this->attributes['imageLoad'] ) ? $this->attributes['imageLoad'] : '';

		$inner_content = '';

		switch ( $icon_type ) {
			case 'icon':
			case 'svg':
				$inner_content = $this->render_icon( $icon_type, $icon, $icon_svg );
				break;
			case 'image':
				$url       = isset( $image['url'] ) ? $image['url'] : '';
				$lazy_attr = ( 'lazy' === $image_load ) ? ' loading="lazy"' : '';
				if ( ! empty( $url ) ) {
					$alt_attr = ! empty( $image_alt ) ? ' alt="' . esc_attr( $image_alt ) . '"' : '';
					$inner_content = '<img src="' . esc_url( $url ) . '"' . $alt_attr . $lazy_attr . ' />';
				}
				break;
		}

		if ( empty( $inner_content ) ) {
			return '';
		}

		return '<div class="icon-box"><div class="icon">' . $inner_content . '</div></div>';
	}

	/**
	 * Render content logic.
	 *
	 * @return string
	 */
	public function render_content() {
		$content_display     = isset( $this->attributes['contentDisplay'] ) ? $this->attributes['contentDisplay'] : 'block';
		$prefix              = isset( $this->attributes['prefix'] ) ? $this->attributes['prefix'] : '$';
		$suffix              = isset( $this->attributes['suffix'] ) ? $this->attributes['suffix'] : 'M';
		$number              = isset( $this->attributes['number'] ) ? $this->attributes['number'] : '';
		$safe_number         = isset( $this->attributes['safeNumber'] ) ? $this->attributes['safeNumber'] : '';
		$duration            = isset( $this->attributes['duration'] ) ? $this->attributes['duration'] : 3500;
		$number_format       = isset( $this->attributes['numberFormat'] ) ? $this->attributes['numberFormat'] : '';
		$number_right_space  = isset( $this->attributes['numberRightSpace'] ) ? $this->attributes['numberRightSpace'] : null;
		$title               = isset( $this->attributes['title'] ) ? $this->attributes['title'] : 'Fun Fact';
		$title_tag           = isset( $this->attributes['titleTag'] ) ? $this->attributes['titleTag'] : 'span';
		$supper              = isset( $this->attributes['supper'] ) ? $this->attributes['supper'] : '+';
		$show_supper         = isset( $this->attributes['showSupper'] ) && $this->attributes['showSupper'];
		$top_icon_content    = isset( $this->attributes['topIconContent'] ) ? $this->attributes['topIconContent'] : true;
		$bottom_icon_content = isset( $this->attributes['bottomIconContent'] ) ? $this->attributes['bottomIconContent'] : false;
		$hover_bottom        = isset( $this->attributes['hoverBottom'] ) && $this->attributes['hoverBottom'];
		$hover_direction     = isset( $this->attributes['hoverBottomDirection'] ) ? $this->attributes['hoverBottomDirection'] : 'left';

		$header_html = $this->render_header_content();

		$output = '<div class="fun-fact-inner">';
		if ( $top_icon_content ) {
			$output .= $header_html;
		}

		$output .= '<div class="content ' . esc_attr( $content_display ) . '">';
		$output .= '<div class="number-wrapper">';
		$output .= '<span class="prefix">' . esc_html( $prefix ) . '</span>';
		$number_spaces_attr = ( null !== $number_right_space ) ? ' data-number-spaces="' . esc_attr( wp_json_encode( $number_right_space ) ) . '"' : '';
		$output .= '<span class="number loaded" data-number-format="' . esc_attr( $number_format ) . '" data-safe="' . esc_attr( $safe_number ) . '" data-number="' . esc_attr( $number ) . '" data-duration="' . esc_attr( $duration ) . '"' . $number_spaces_attr . '></span>';
		$output .= '<span class="suffix">' . esc_html( $suffix ) . '</span>';
		if ( $show_supper ) {
			$output .= '<sup class="super">' . esc_html( $supper ) . '</sup>';
		}
		$output .= '</div>';

		$tag     = $this->check_tag( $title_tag, 'span' );
		$output .= '<' . $tag . ' class="title">' . wp_kses_post( $title ) . '</' . $tag . '>';
		$output .= '</div>';

		if ( $bottom_icon_content ) {
			$output .= $header_html;
		}
		$output .= '</div>';

		if ( $hover_bottom ) {
			$output .= '<div class="border-bottom"><div class="animated ' . esc_attr( $hover_direction ) . '"></div></div>';
		}

		return $output;
	}

	/**
	 * Render view in editor.
	 */
	public function render_gutenberg() {
		return $this->render_content();
	}

	/**
	 * Render view in frontend.
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

		$data_id = '';
		if ( isset( $this->attributes['advanceAnimation']['type'] ) && ! empty( $this->attributes['advanceAnimation']['type'] ) ) {
			$id_parts = explode( '-', $element_id );
			if ( count( $id_parts ) > 1 ) {
				$data_id = ' data-id="' . esc_attr( $id_parts[1] ) . '"';
			}
		}

		$id_attr    = ! empty( $anchor ) ? ' id="' . esc_attr( $anchor ) . '"' : '';
		$class_name = 'guten-element ' . $element_id . $animation_class . $display_classes . ' guten-fun-fact align-center hover-from-left' . $custom_classes;

		$content = '<div' . $id_attr . ' class="' . esc_attr( trim( $class_name ) ) . '"' . $data_id . '>' . $this->render_content() . '</div>';
		$content = apply_filters( 'gutenverse_cursor_move_effect_script', $content, $this->attributes, $element_id );
		$content = apply_filters( 'gutenverse_advance_animation_script', $content, $this->attributes, $element_id, 'fun-fact' );

		return $content;
	}
}
