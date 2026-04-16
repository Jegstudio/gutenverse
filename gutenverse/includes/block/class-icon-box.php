<?php
/**
 * Icon Box Block class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\block
 */

namespace Gutenverse\Block;

use Gutenverse\Framework\Block\Block_Abstract;

/**
 * Class Icon Box Block
 *
 * @package gutenverse\block
 */
class Icon_Box extends Block_Abstract {

	/**
	 * Render icon without aria-hidden attribute, matching JS renderIcon default behavior.
	 *
	 * @param string $type Icon type ('icon' or 'svg').
	 * @param string $icon Icon class name.
	 * @param string $svg  SVG data.
	 * @return string
	 */
	private function render_icon_no_aria( $type, $icon, $svg ) {
		if ( 'svg' === $type && ! empty( $svg ) ) {
			return $this->render_icon( $type, $icon, $svg );
		}

		if ( ! empty( $icon ) ) {
			return '<i class="' . esc_attr( $icon ) . '"></i>';
		}

		return '';
	}

	/**
	 * Wrap element in an anchor tag if URL is set.
	 *
	 * @param string $content   Element content.
	 * @param string $css_class Optional CSS class for the anchor.
	 * @return string
	 */
	private function wrap_href( $content, $css_class = '' ) {
		$url        = ! empty( $this->attributes['url'] ) ? $this->attributes['url'] : '';
		$target     = ! empty( $this->attributes['linkTarget'] ) ? $this->attributes['linkTarget'] : '';
		$rel        = ! empty( $this->attributes['rel'] ) ? $this->attributes['rel'] : '';
		$aria_label = ! empty( $this->attributes['anchorAriaLabel'] ) ? $this->attributes['anchorAriaLabel'] : '';

		if ( ! empty( $url ) ) {
			$dynamic_url = isset( $this->attributes['dynamicUrl'] ) ? $this->attributes['dynamicUrl'] : array();
			$href        = apply_filters(
				'gutenverse_dynamic_generate_url',
				$url,
				$dynamic_url,
				$this->get_element_id()
			);

			$aria_attr = ! empty( $aria_label ) ? ' aria-label="' . esc_attr( $aria_label ) . '"' : '';

			return '<a class="' . esc_attr( $css_class ) . '" href="' . esc_url( (string) $href ) . '" target="' . esc_attr( $target ) . '" rel="' . esc_attr( $rel ) . '"' . $aria_attr . '>' . $content . '</a>';
		}

		return $content;
	}

	/**
	 * Render the image for iconType = 'image'.
	 *
	 * @return string
	 */
	private function render_image() {
		$image      = isset( $this->attributes['image'] ) ? $this->attributes['image'] : array();
		$image_alt  = isset( $this->attributes['imageAlt'] ) ? $this->attributes['imageAlt'] : '';
		$alt_type   = isset( $this->attributes['altType'] ) ? $this->attributes['altType'] : 'custom';
		$image_load = isset( $this->attributes['imageLoad'] ) ? $this->attributes['imageLoad'] : '';
		$lazy_attr  = ( 'lazy' === $image_load ) ? ' loading="lazy"' : '';

		$alt_text = $image_alt;
		if ( 'original' === $alt_type ) {
			$alt_text = isset( $image['altOriginal'] ) ? $image['altOriginal'] : '';
		}

		$url    = isset( $image['image'] ) ? $image['image'] : '';
		$height = isset( $image['height'] ) ? $image['height'] : '';
		$width  = isset( $image['width'] ) ? $image['width'] : '';

		if ( ! empty( $url ) ) {
			$height_attr = ! empty( $height ) ? ' height="' . esc_attr( $height ) . '"' : '';
			$width_attr  = ! empty( $width ) ? ' width="' . esc_attr( $width ) . '"' : '';
			return '<img src="' . esc_url( $url ) . '" alt="' . esc_attr( $alt_text ) . '"' . $lazy_attr . $height_attr . $width_attr . ' />';
		}

		return '';
	}

	/**
	 * Render the icon box header (icon/svg/image).
	 *
	 * @return string
	 */
	private function render_icon_content() {
		$icon_type       = isset( $this->attributes['iconType'] ) ? $this->attributes['iconType'] : 'icon';
		$icon_style_mode = isset( $this->attributes['iconStyleMode'] ) ? $this->attributes['iconStyleMode'] : 'color';
		$element_id      = $this->get_element_id();
		$inner_content   = '';

		switch ( $icon_type ) {
			case 'icon':
				$icon          = isset( $this->attributes['icon'] ) ? $this->attributes['icon'] : 'far fa-user';
				$inner_content = '<i class="' . esc_attr( $icon ) . ' icon-style-' . esc_attr( $icon_style_mode ) . '"></i>';
				break;
			case 'svg':
				$icon_svg      = isset( $this->attributes['iconSVG'] ) ? $this->attributes['iconSVG'] : '';
				$grad          = isset( $this->attributes['iconGradient'] ) ? $this->attributes['iconGradient'] : false;
				$grad_hover    = isset( $this->attributes['iconGradientHover'] ) ? $this->attributes['iconGradientHover'] : false;
				$inner_content = $this->render_icon( 'svg', '', $icon_svg, $element_id, $grad, $grad_hover );
				break;
			case 'image':
				$inner_content = $this->render_image();
				break;
		}

		if ( empty( $inner_content ) ) {
			return '';
		}

		$class_extra = ( 'image' === $icon_type ) ? ' type-image' : '';

		return '<div class="icon-box icon-box-header">
					<div class="icon bg-style-' . esc_attr( $icon_style_mode ) . $class_extra . '">
						' . $inner_content . '
					</div>
				</div>';
	}

	/**
	 * Render content logic.
	 *
	 * @return string
	 */
	public function render_content() {
		$title          = isset( $this->attributes['title'] ) ? $this->attributes['title'] : '';
		$description    = isset( $this->attributes['description'] ) ? $this->attributes['description'] : '';
		$title_tag      = isset( $this->attributes['titleTag'] ) ? $this->attributes['titleTag'] : 'h2';
		$show_title     = isset( $this->attributes['showTitle'] ) ? $this->attributes['showTitle'] : true;
		$show_desc      = isset( $this->attributes['showDesc'] ) ? $this->attributes['showDesc'] : true;
		$icon_position  = isset( $this->attributes['iconPosition'] ) ? $this->attributes['iconPosition'] : '';
		$overlay_dir    = isset( $this->attributes['iconBoxOverlayDirection'] ) ? $this->attributes['iconBoxOverlayDirection'] : 'left';
		$badge_show     = isset( $this->attributes['badgeShow'] ) && $this->attributes['badgeShow'];
		$watermark_show = isset( $this->attributes['watermarkShow'] ) && $this->attributes['watermarkShow'];
		$has_inner      = isset( $this->attributes['hasInnerBlocks'] ) && $this->attributes['hasInnerBlocks'];
		$icon_html      = $this->render_icon_content();
		$output         = '<div class="guten-icon-box-wrapper hover-from-' . esc_attr( $overlay_dir ) . '">';

		// Top/Side icons.
		if ( 'bottom' !== $icon_position ) {
			$output .= $this->wrap_href( $icon_html );
		}

		// Body content.
		if ( ! empty( $title ) || ! empty( $description ) ) {
			$output .= '<div class="icon-box icon-box-body">';

			if ( $show_title && ! empty( $title ) ) {
				$title              = wp_kses_post( $title );
				$title_dynamic_list = isset( $this->attributes['titleDynamicList'] ) ? $this->attributes['titleDynamicList'] : array();

				$title      = apply_filters(
					'gutenverse_dynamic_generate_dynamic_parse_list_php',
					$title,
					$title_dynamic_list
				);
				$tag        = $this->check_tag( $title_tag, 'h2' );
				$title_html = '<' . $tag . ' class="title">' . $title . '</' . $tag . '>';
				$output    .= $this->wrap_href( $title_html );
			}

			if ( $show_desc && ! empty( $description ) ) {
				$description              = wp_kses_post( $description );
				$description_dynamic_list = isset( $this->attributes['descriptionDynamicList'] ) ? $this->attributes['descriptionDynamicList'] : array();

				$description = apply_filters(
					'gutenverse_dynamic_generate_dynamic_parse_list_php',
					$description,
					$description_dynamic_list
				);
				$desc_html   = '<p class="icon-box-description">' . $description . '</p>';
				$output     .= $this->wrap_href( $desc_html );
			}

			if ( $has_inner ) {
				$output .= $this->get_inner_blocks_content();
			}

			$output .= '</div>';
		}

		// Bottom icon.
		if ( 'bottom' === $icon_position ) {
			$output .= $this->wrap_href( $icon_html );
		}

		// Badge.
		if ( $badge_show ) {
			$badge_text              = isset( $this->attributes['badge'] ) ? $this->attributes['badge'] : '';
			$badge_text              = wp_kses_post( $badge_text );
			$badge_text_dynamic_list = isset( $this->attributes['badgeDynamicList'] ) ? $this->attributes['badgeDynamicList'] : array();

			$badge_text = apply_filters(
				'gutenverse_dynamic_generate_dynamic_parse_list_php',
				$badge_text,
				$badge_text_dynamic_list
			);
			$badge_pos  = isset( $this->attributes['badgePosition'] ) ? $this->attributes['badgePosition'] : 'bottomcenter';
			$badge_html = '<div class="icon-box-badge ' . esc_attr( $badge_pos ) . '"><span class="badge-text">' . $badge_text . '</span></div>';
			$output    .= $this->wrap_href( $badge_html );
		}

		// Watermark.
		if ( $watermark_show ) {
			$w_icon  = isset( $this->attributes['watermarkIcon'] ) ? $this->attributes['watermarkIcon'] : 'far fa-map';
			$w_type  = isset( $this->attributes['watermarkIconType'] ) ? $this->attributes['watermarkIconType'] : 'icon';
			$w_svg   = isset( $this->attributes['watermarkIconSVG'] ) ? $this->attributes['watermarkIconSVG'] : '';
			$w_html  = '<div class="hover-watermark">' . $this->render_icon_no_aria( $w_type, $w_icon, $w_svg ) . '</div>';
			$output .= $this->wrap_href( $w_html );
		}

		$output .= '</div>';

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

		$element_id    = $this->get_element_id();
		$anchor        = isset( $this->attributes['anchor'] ) ? $this->attributes['anchor'] : '';
		$display_class = $this->set_display_classes();
		$anim_class    = $this->set_animation_classes();
		$custom_class  = $this->get_custom_classes();
		$icon_pos      = isset( $this->attributes['iconPosition'] ) ? $this->attributes['iconPosition'] : '';

		$data_id = '';
		if ( isset( $this->attributes['advanceAnimation']['type'] ) && ! empty( $this->attributes['advanceAnimation']['type'] ) ) {
			$id_parts = explode( '-', $element_id );
			if ( count( $id_parts ) > 1 ) {
				$data_id = ' data-id="' . esc_attr( $id_parts[1] ) . '"';
			}
		}

		$id_attr    = ! empty( $anchor ) ? ' id="' . esc_attr( $anchor ) . '"' : '';
		$class_name = trim( "guten-element $element_id $anim_class $display_class guten-icon-box icon-position-$icon_pos $custom_class" );

		$content = '<div' . $id_attr . ' class="' . esc_attr( $class_name ) . '"' . $data_id . '>' . $this->render_content() . '</div>';
		$content = apply_filters( 'gutenverse_cursor_move_effect_script', $content, $this->attributes, $element_id );
		$content = apply_filters( 'gutenverse_advance_animation_script', $content, $this->attributes, $element_id, 'icon-box' );

		return $content;
	}
}
