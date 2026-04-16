<?php
/**
 * Portfolio Gallery Block class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\block
 */

namespace Gutenverse\Block;

use Gutenverse\Framework\Block\Block_Abstract;

/**
 * Class Portfolio Gallery Block
 *
 * @package gutenverse\block
 */
class Portfolio_Gallery extends Block_Abstract {

	/**
	 * Render content
	 *
	 * @return string
	 */
	public function render_content() {
		$behavior       = isset( $this->attributes['behavior'] ) ? $this->attributes['behavior'] : 'onhover';
		$images         = isset( $this->attributes['images'] ) ? $this->attributes['images'] : array();
		$show_link      = isset( $this->attributes['showLink'] ) ? $this->attributes['showLink'] : true;
		$link_text      = isset( $this->attributes['linkText'] ) ? $this->attributes['linkText'] : 'View More';
		$link_icon      = isset( $this->attributes['linkIcon'] ) ? $this->attributes['linkIcon'] : '';
		$link_icon_type = isset( $this->attributes['linkIconType'] ) ? $this->attributes['linkIconType'] : 'icon';
		$link_icon_svg  = isset( $this->attributes['linkIconSVG'] ) ? $this->attributes['linkIconSVG'] : '';

		$content_items = '';
		$image_items   = '';

		foreach ( $images as $index => $image ) {
			$title    = isset( $image['title'] ) ? $image['title'] : '';
			$subtitle = isset( $image['subtitle'] ) ? $image['subtitle'] : '';
			$current  = isset( $image['current'] ) ? $image['current'] : false;
			$link     = isset( $image['link'] ) ? $image['link'] : '';
			$src      = isset( $image['src'] ) ? $image['src'] : array();

			$current_class = $current ? 'current-item' : '';

			// Content items.
			$row_item  = '<div class="row-item ' . esc_attr( $current_class ) . '" data-tab="portfolio-gallery-tab-' . esc_attr( $index ) . '">';
			$row_item .= '<div class="row-item-info">';
			if ( ! empty( $subtitle ) ) {
				$row_item .= '<p class="info-subtitle">' . wp_kses_post( $subtitle ) . '</p>';
			}
			if ( ! empty( $title ) ) {
				$row_item .= '<h2 class="info-title">' . wp_kses_post( $title ) . '</h2>';
			}
			$row_item .= '</div>';

			if ( $show_link && ! empty( $link ) ) {
				$icon_html = $this->render_icon( $link_icon_type, $link_icon, $link_icon_svg );
				$row_item .= '<div class="row-link-wrapper">';
				$row_item .= '<a href="' . esc_url( $link ) . '" aria-label="' . esc_attr( $title ) . '" target="_blank" rel="noreferrer">';
				$row_item .= esc_html( $link_text );
				$row_item .= $icon_html;
				$row_item .= '</a>';
				$row_item .= '</div>';
			}
			$row_item .= '</div>';
			$content_items .= $row_item;

			// Image items.
			$image_url    = ( isset( $src['image'] ) ) ? $src['image'] : GUTENVERSE_URL . 'assets/img/placeholder.png';
			$image_items .= '<div id="portfolio-gallery-tab-' . esc_attr( $index ) . '" class="image-item ' . esc_attr( $current_class ) . '" style="background-image:url(' . esc_url( $image_url ) . ')"></div>';
		}

		$output  = '<div class="portfolio-gallery-container ' . esc_attr( $behavior ) . '">';
		$output .= '<div class="content-items">' . $content_items . '</div>';
		$output .= '<div class="image-items">' . $image_items . '</div>';
		$output .= '</div>';

		return $output;
	}

	/**
	 * Render view in frontend
	 */
	public function render_frontend() {
		if ( ! empty( trim( $this->block_data->inner_html ) ) && apply_filters( 'gutenverse_force_dynamic', false ) ) {
			return $this->content;
		}
		$element_id      = $this->get_element_id();
		$anchor          = isset( $this->attributes['anchor'] ) ? $this->attributes['anchor'] : '';
		$behavior        = isset( $this->attributes['behavior'] ) ? $this->attributes['behavior'] : 'onhover';
		$display_classes = $this->set_display_classes();
		$animation_class = $this->set_animation_classes();
		$custom_classes  = $this->get_custom_classes();

		$id_attr = ! empty( $anchor ) ? ' id="' . esc_attr( $anchor ) . '"' : '';

		$data_id = '';
		if ( isset( $this->attributes['advanceAnimation']['type'] ) && ! empty( $this->attributes['advanceAnimation']['type'] ) ) {
			$id_parts = explode( '-', $element_id );
			if ( count( $id_parts ) > 1 ) {
				$data_id = ' data-id="' . esc_attr( $id_parts[1] ) . '"';
			}
		}

		$class_name = 'guten-element guten-portfolio-gallery ' . $element_id . ' ' . $animation_class . ' ' . $display_classes . $custom_classes;

		$content = '<div' . $id_attr . ' class="' . esc_attr( trim( $class_name ) ) . '" data-behavior="' . esc_attr( $behavior ) . '"' . $data_id . '>' . $this->render_content() . '</div>';
		$content = apply_filters( 'gutenverse_cursor_move_effect_script', $content, $this->attributes, $element_id );
		$content = apply_filters( 'gutenverse_advance_animation_script', $content, $this->attributes, $element_id, 'portfolio-gallery' );

		return $content;
	}
}
