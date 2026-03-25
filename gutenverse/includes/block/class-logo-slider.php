<?php
/**
 * Logo Slider Block class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\block
 */

namespace Gutenverse\Block;

use Gutenverse\Framework\Block\Block_Abstract;

/**
 * Class Logo Slider Block
 *
 * @package gutenverse\block
 */
class Logo_Slider extends Block_Abstract {

	/**
	 * Render swiper data attributes
	 *
	 * @return string
	 */
	private function render_swiper_data() {
		$spacing          = $this->attributes['spacing'] ?? array();
		$item_showed      = $this->attributes['itemShowed'] ?? array();
		$loop             = $this->attributes['loop'] ?? false;
		$autoplay         = $this->attributes['autoplay'] ?? false;
		$autoplay_timeout = $this->attributes['autoplayTimeout'] ?? 2400;
		$show_nav         = $this->attributes['showNav'] ?? false;
		$show_arrow       = $this->attributes['showArrow'] ?? false;

		$breakpoints = array(
			0    => array(
				'spaceBetween'  => isset( $spacing['Mobile'] ) ? (int) $spacing['Mobile'] : 10,
				'slidesPerView' => isset( $item_showed['Mobile'] ) ? (int) $item_showed['Mobile'] : 1,
			),
			768  => array(
				'spaceBetween'  => isset( $spacing['Tablet'] ) ? (int) $spacing['Tablet'] : 10,
				'slidesPerView' => isset( $item_showed['Tablet'] ) ? (int) $item_showed['Tablet'] : 2,
			),
			1024 => array(
				'spaceBetween'  => isset( $spacing['Desktop'] ) ? (int) $spacing['Desktop'] : 10,
				'slidesPerView' => isset( $item_showed['Desktop'] ) ? (int) $item_showed['Desktop'] : 3,
			),
		);

		$data_str = '';
		if ( $loop ) {
			$data_str .= ' data-loop="true"';
		}
		if ( $autoplay ) {
			$data_str .= ' data-autoplay="true"';
		}
		$data_str .= ' data-timeout="' . esc_attr( $autoplay_timeout ) . '"';
		if ( $show_nav ) {
			$data_str .= ' data-nav="true"';
		}
		if ( $show_arrow ) {
			$data_str .= ' data-arrow="true"';
		}
		$data_str .= ' data-breakpoints="' . esc_attr( wp_json_encode( $breakpoints ) ) . '"';

		return $data_str;
	}

	/**
	 * Render content item
	 *
	 * @param array $logo Item data.
	 * @return string
	 */
	private function render_content_item( $logo ) {
		$image_load = isset( $logo['imageLoad'] ) ? $logo['imageLoad'] : '';
		$title      = isset( $logo['title'] ) ? $logo['title'] : '';
		$link       = isset( $logo['link'] ) ? $logo['link'] : '';

		// Normal Image.
		$src_detail   = $logo['src'] ?? array();
		$src          = is_array( $src_detail ) && isset( $src_detail['image'] ) ? $src_detail['image'] : ( is_string( $src_detail ) ? $src_detail : '' );
		$width        = $src_detail['width'] ?? '';
		$height       = $src_detail['height'] ?? '';
		$loading_attr = 'lazy' === $image_load ? ' loading="lazy"' : '';

		$normal_image = '<img class="main-image" src="' . esc_url( $src ) . '" alt="' . esc_attr( $title ) . '"' . $loading_attr . ( $width ? ' width="' . esc_attr( $width ) . '"' : '' ) . ( $height ? ' height="' . esc_attr( $height ) . '"' : '' ) . ' />';

		// Hover Image.
		$hover_src_detail = $logo['hoverSrc'] ?? array();
		$hover_src        = is_array( $hover_src_detail ) && isset( $hover_src_detail['image'] ) ? $hover_src_detail['image'] : ( is_string( $hover_src_detail ) ? $hover_src_detail : $src );
		$hover_width      = $hover_src_detail['width'] ?? $width;
		$hover_height     = $hover_src_detail['height'] ?? $height;

		$hover_image = '<img class="hover-image" src="' . esc_url( $hover_src ) . '" alt="' . esc_attr( $title ) . '"' . $loading_attr . ( $hover_width ? ' width="' . esc_attr( $hover_width ) . '"' : '' ) . ( $hover_height ? ' height="' . esc_attr( $hover_height ) . '"' : '' ) . ' />';

		$content_image = $normal_image . $hover_image;

		if ( ! empty( $link ) ) {
			return '<a aria-label="' . esc_attr( $title ) . '" href="' . esc_url( $link ) . '" class="content-image">' . $content_image . '</a>';
		}

		return '<div class="content-image">' . $content_image . '</div>';
	}

	/**
	 * Render content logic.
	 *
	 * @return string
	 */
	public function render_content() {
		$logos      = isset( $this->attributes['logos'] ) ? $this->attributes['logos'] : array();
		$show_nav   = isset( $this->attributes['showNav'] ) ? $this->attributes['showNav'] : false;
		$show_arrow = isset( $this->attributes['showArrow'] ) ? $this->attributes['showArrow'] : false;
		$element_id = $this->get_element_id();

		$slides = '';
		foreach ( $logos as $logo ) {
			$slides .= '<div class="image-list swiper-slide">' . $this->render_content_item( $logo ) . '</div>';
		}

		$navigation = '';
		if ( $show_arrow ) {
			$navigation = '<div class="swiper-button-prev"></div><div class="swiper-button-next"></div>';
		}

		$pagination = '';
		if ( $show_nav ) {
			$pagination = '<div class="swiper-pagination"></div>';
		}

		return '
			<div class="client-list">
				<div id="' . esc_attr( $element_id ) . '" class="swiper-container" ' . $this->render_swiper_data() . '>
					<div class="swiper-wrapper">
						' . $slides . '
					</div>
					' . $pagination . '
					' . $navigation . '
				</div>
			</div>';
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
		$display_classes = $this->set_display_classes();
		$animation_class = $this->set_animation_classes();
		$custom_classes  = $this->get_custom_classes();
		$arrow_position  = isset( $this->attributes['arrowPosition'] ) ? $this->attributes['arrowPosition'] : 'bottom-edge';
		$anchor          = isset( $this->attributes['anchor'] ) ? $this->attributes['anchor'] : '';
		$anchor_attr     = ! empty( $anchor ) ? ' id="' . esc_attr( $anchor ) . '"' : '';

		$class_name = trim( "guten-element guten-client-logo grid-desktop-3 $element_id $animation_class $display_classes $custom_classes arrow-$arrow_position" );

		$content = '<div' . $anchor_attr . ' class="' . esc_attr( $class_name ) . '">' . $this->render_content() . '</div>';
		$content = apply_filters( 'gutenverse_cursor_move_effect_script', $content, $this->attributes, $element_id );

		return $content;
	}
}
