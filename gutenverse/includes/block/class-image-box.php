<?php
/**
 * Image Box Block class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\block
 */

namespace Gutenverse\Block;

use Gutenverse\Framework\Block\Block_Abstract;

/**
 * Class Image Box Block
 *
 * @package gutenverse\block
 */
class Image_Box extends Block_Abstract {

	/**
	 * Render the image figure HTML.
	 *
	 * @return string
	 */
	private function render_figure() {
		$image      = isset( $this->attributes['image'] ) ? $this->attributes['image'] : array();
		$image_alt  = isset( $this->attributes['imageAlt'] ) ? $this->attributes['imageAlt'] : '';
		$alt_type   = isset( $this->attributes['altType'] ) ? $this->attributes['altType'] : 'custom';
		$alt_orig   = isset( $this->attributes['altOriginal'] ) ? $this->attributes['altOriginal'] : '';
		$image_load = isset( $this->attributes['imageLoad'] ) ? $this->attributes['imageLoad'] : '';
		$lazy_attr  = ( 'lazy' === $image_load ) ? ' loading="lazy"' : '';

		$alt_text = $image_alt;
		if ( 'original' === $alt_type ) {
			$alt_text = $alt_orig;
		}

		$media    = isset( $image['media'] ) ? $image['media'] : array();
		$size     = isset( $image['size'] ) ? $image['size'] : 'full';
		$image_id = isset( $media['imageId'] ) ? $media['imageId'] : 0;
		$sizes    = isset( $media['sizes'] ) ? $media['sizes'] : array();

		if ( empty( $sizes ) ) {
			return '<img class="gutenverse-image-box-empty" src=""' . $lazy_attr . ' alt="' . esc_attr( $alt_text ) . '" />';
		}

		$image_src = isset( $sizes[ $size ] ) ? $sizes[ $size ] : array();
		if ( empty( $image_src ) ) {
			$image_src = isset( $sizes['full'] ) ? $sizes['full'] : array();
		}

		if ( $image_id && ! empty( $image_src ) ) {
			$url         = isset( $image_src['url'] ) ? $image_src['url'] : '';
			$height      = isset( $image_src['height'] ) ? $image_src['height'] : '';
			$width       = isset( $image_src['width'] ) ? $image_src['width'] : '';
			$height_attr = ! empty( $height ) ? ' height="' . esc_attr( $height ) . '"' : '';
			$width_attr  = ! empty( $width ) ? ' width="' . esc_attr( $width ) . '"' : '';
			return '<img class="gutenverse-image-box-filled" src="' . esc_url( $url ) . '"' . $height_attr . $width_attr . ' alt="' . esc_attr( $alt_text ) . '"' . $lazy_attr . ' />';
		}

		return '<img class="gutenverse-image-box-empty" src=""' . $lazy_attr . ' alt="' . esc_attr( $alt_text ) . '" />';
	}

	/**
	 * Wrap element in an anchor tag if URL is set.
	 *
	 * @param string $content .
	 * @param string $css_class CSS class for the anchor tag.
	 * @return string
	 */
	private function wrap_href( $content, $css_class = '' ) {
		$url         = ! empty( $this->attributes['url'] ) ? $this->attributes['url'] : '';
		$link_target = ! empty( $this->attributes['linkTarget'] ) ? $this->attributes['linkTarget'] : '';
		$rel         = ! empty( $this->attributes['rel'] ) ? $this->attributes['rel'] : '';
		$aria_label  = ! empty( $this->attributes['ariaLabel'] ) ? $this->attributes['ariaLabel'] : '';

		if ( ! empty( $url ) ) {
			$dynamic_url = isset( $this->attributes['dynamicUrl'] ) ? $this->attributes['dynamicUrl'] : array();
			$href        = apply_filters(
				'gutenverse_dynamic_generate_url',
				$url,
				$dynamic_url,
				$this->get_element_id()
			);

			$aria_attr = ! empty( $aria_label ) ? ' aria-label="' . esc_attr( $aria_label ) . '"' : '';

			return '<a class="' . esc_attr( $css_class ) . '" href="' . esc_url( (string) $href ) . '" target="' . esc_attr( $link_target ) . '"' . $aria_attr . ' rel="' . esc_attr( $rel ) . '">' . $content . '</a>';
		}

		return $content;
	}

	/**
	 * Render icon HTML
	 *
	 * @param string $position Check if icon matches position.
	 * @return string
	 */
	private function render_title_icon( $position ) {
		$title_icon          = isset( $this->attributes['titleIcon'] ) ? $this->attributes['titleIcon'] : '';
		$title_icon_type     = isset( $this->attributes['titleIconType'] ) ? $this->attributes['titleIconType'] : 'icon';
		$title_icon_svg      = isset( $this->attributes['titleIconSVG'] ) ? $this->attributes['titleIconSVG'] : '';
		$title_icon_position = isset( $this->attributes['titleIconPosition'] ) ? $this->attributes['titleIconPosition'] : 'before';

		if ( $title_icon_position !== $position || empty( $title_icon ) ) {
			return '';
		}

		$pos_class = 'icon-position-' . $position;

		if ( 'svg' === $title_icon_type && ! empty( $title_icon_svg ) ) {
			return '<span class="image-box-icon ' . esc_attr( $pos_class ) . '">' . $title_icon_svg . '</span>';
		}

		return '<span class="image-box-icon ' . esc_attr( $pos_class ) . '"><i class="' . esc_attr( $title_icon ) . '"></i></span>';
	}

	/**
	 * Render content
	 *
	 * @return string
	 */
	public function render_content() {
		$title               = isset( $this->attributes['title'] ) ? $this->attributes['title'] : '';
		$description         = isset( $this->attributes['description'] ) ? $this->attributes['description'] : '';
		$title_tag           = isset( $this->attributes['titleTag'] ) ? $this->attributes['titleTag'] : 'h3';
		$title_icon_position = isset( $this->attributes['titleIconPosition'] ) ? $this->attributes['titleIconPosition'] : 'before';
		$hover_bottom        = isset( $this->attributes['hoverBottom'] ) && $this->attributes['hoverBottom'];
		$hover_direction     = isset( $this->attributes['hoverBottomDirection'] ) ? $this->attributes['hoverBottomDirection'] : 'left';
		$include_button      = isset( $this->attributes['includeButton'] ) && $this->attributes['includeButton'];

		$figure_html = $this->render_figure();

		$output  = '<div class="inner-container">';
		$output .= '<div class="image-box-header">';
		$output .= $this->wrap_href( $figure_html );
		$output .= '</div>';

		$output .= '<div class="image-box-body">';
		$output .= '<div class="body-inner">';

		if ( ! empty( $title ) ) {
			$title        = apply_filters(
				'gutenverse_dynamic_generate_dynamic_parse_list_php',
				$title,
				$this->attributes['titleDynamicList'] ?? array()
			);

			$title_class  = 'body-title icon-position-' . esc_attr( $title_icon_position );
			$title_inner  = $this->render_title_icon( 'before' );
			$title_inner .= '<span>' . wp_kses_post( $title ) . '</span>';
			$title_inner .= $this->render_title_icon( 'after' );
			$title_html   = '<' . esc_attr( $title_tag ) . ' class="' . esc_attr( $title_class ) . '">' . $title_inner . '</' . esc_attr( $title_tag ) . '>';
			$output      .= $this->wrap_href( $title_html );
		}

		if ( ! empty( $description ) ) {
			$description = apply_filters(
				'gutenverse_dynamic_generate_dynamic_parse_list_php',
				$description,
				$this->attributes['descriptionDynamicList'] ?? array()
			);

			$desc_html = '<p class="body-description">' . wp_kses_post( $description ) . '</p>';
			$output   .= $this->wrap_href( $desc_html );
		}

		if ( $include_button ) {
			$output .= $this->get_inner_blocks_content();
		}

		if ( $hover_bottom ) {
			$output .= '<div class="border-bottom"><div class="animated ' . esc_attr( $hover_direction ) . '"></div></div>';
		}

		$output .= '</div>';
		$output .= '</div>';
		$output .= '</div>';

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
		$anchor          = isset( $this->attributes['anchor'] ) ? $this->attributes['anchor'] : '';
		$display_classes = $this->set_display_classes();
		$animation_class = $this->set_animation_classes();
		$custom_classes  = $this->get_custom_classes();
		$content_style   = isset( $this->attributes['contentStyle'] ) ? $this->attributes['contentStyle'] : 'default';

		$id_attr = ! empty( $anchor ) ? ' id="' . esc_attr( $anchor ) . '"' : '';

		$data_id = '';
		if ( isset( $this->attributes['advanceAnimation']['type'] ) && ! empty( $this->attributes['advanceAnimation']['type'] ) ) {
			$id_parts = explode( '-', $element_id );
			if ( count( $id_parts ) > 1 ) {
				$data_id = ' data-id="' . esc_attr( $id_parts[1] ) . '"';
			}
		}

		$class_name = $element_id . ' guten-image-box guten-element style-' . $content_style . $display_classes . $animation_class . $custom_classes;

		$content = '<div' . $id_attr . ' class="' . esc_attr( trim( $class_name ) ) . '"' . $data_id . '>' . $this->render_content() . '</div>';
		$content = apply_filters( 'gutenverse_cursor_move_effect_script', $content, $this->attributes, $element_id );
		$content = apply_filters( 'gutenverse_advance_animation_script', $content, $this->attributes, $element_id, 'image-box' );

		return $content;
	}
}
