<?php
/**
 * Feature List Block class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\block
 */

namespace Gutenverse\Block;

use Gutenverse\Framework\Block\Block_Abstract;

/**
 * Class Feature List Block
 *
 * @package gutenverse\block
 */
class Feature_List extends Block_Abstract {

	/**
	 * Render content logic.
	 *
	 * @return string
	 */
	public function render_content() {
		$icon_position  = isset( $this->attributes['iconPosition'] ) ? $this->attributes['iconPosition'] : 'left';
		$feature_list   = isset( $this->attributes['featureList'] ) ? $this->attributes['featureList'] : array();
		$show_connector = isset( $this->attributes['showConnector'] ) ? $this->attributes['showConnector'] : false;

		$output = '<div class="feature-list-wrapper">';

		foreach ( $feature_list as $index => $item ) {
			$item_type    = isset( $item['type'] ) ? $item['type'] : 'icon';
			$icon_content = '';

			switch ( $item_type ) {
				case 'icon':
					$icon         = isset( $item['icon'] ) ? $item['icon'] : '';
					$icon_content = '<div class="icon-wrapper"><div class="icon"><i class="' . esc_attr( $icon ) . '"></i></div></div>';
					break;
				case 'image':
					$image        = isset( $item['image'] ) ? $item['image'] : array();
					$image_url    = isset( $image['url'] ) ? $image['url'] : '';
					$image_alt    = isset( $item['title'] ) ? $item['title'] : '';
					$width        = isset( $image['width'] ) ? $image['width'] : '';
					$height       = isset( $image['height'] ) ? $image['height'] : '';
					$image_load   = isset( $item['imageLoad'] ) ? $item['imageLoad'] : '';
					$lazy_load    = isset( $item['lazyLoad'] ) ? $item['lazyLoad'] : false;
					$loading_attr = '';

					if ( 'lazy' === $image_load || $lazy_load ) {
						$loading_attr = ' loading="lazy"';
					}

					if ( ! empty( $image_url ) ) {
						$icon_content = '<div class="icon-wrapper"><div class="icon"><img src="' . esc_url( $image_url ) . '" alt="' . esc_attr( $image_alt ) . '" width="' . esc_attr( $width ) . '" height="' . esc_attr( $height ) . '"' . $loading_attr . ' /></div></div>';
					}
					break;
				case 'number':
					$number       = ( isset( $item['number'] ) && is_numeric( $item['number'] ) ) ? $item['number'] : $index + 1;
					$icon_content = '<div class="icon-wrapper"><div class="icon"><span class="icon-number">' . esc_html( $number ) . '</span></div></div>';
					break;
				case 'svg':
					// phpcs:ignore WordPress.PHP.DiscouragedPHPFunctions.obfuscation_base64_decode
					$svg_data = isset( $item['svg'] ) ? base64_decode( $item['svg'] ) : '';
					if ( ! empty( $svg_data ) && gutenverse_is_svg_safe( $svg_data ) ) {
						$icon_content = '<div class="icon-wrapper"><div class="icon"><div class="gutenverse-icon-svg">' . $svg_data . '</div></div></div>';
					}
					break;
			}

			$connector_top    = ( $show_connector && 0 !== $index ) ? '<span class="connector-top icon-position-' . esc_attr( $icon_position ) . '"></span>' : '';
			$connector_bottom = ( $show_connector && ( count( $feature_list ) - 1 ) !== $index ) ? '<span class="connector-bottom icon-position-' . esc_attr( $icon_position ) . '"></span>' : '';

			$title_html = isset( $item['title'] ) ? $item['title'] : '';
			if ( isset( $item['link'] ) && ! empty( $item['link'] ) ) {
				$title_html = '<a href="' . esc_url( $item['link'] ) . '" target="_blank" rel="noreferrer" aria-label="' . esc_attr( $item['title'] ) . '"><h2 class="feature-list-title">' . wp_kses_post( $item['title'] ) . '</h2></a>';
			} else {
				$title_html = '<h2 class="feature-list-title">' . wp_kses_post( $title_html ) . '</h2>';
			}

			$content_html = isset( $item['content'] ) ? '<p class="feature-list-desc">' . wp_kses_post( $item['content'] ) . '</p>' : '';

			$output .= '<div class="icon-position-' . esc_attr( $icon_position ) . ' feature-list-item">' .
						$connector_top . $connector_bottom . $icon_content .
						'<div class="feature-list-content">' . $title_html . $content_html . '</div></div>';
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
		$element_id      = $this->get_element_id();
		$display_classes = $this->set_display_classes();
		$animation_class = $this->set_animation_classes();
		$custom_classes  = $this->get_custom_classes();
		$icon_pos        = isset( $this->attributes['iconPosition'] ) ? $this->attributes['iconPosition'] : '';

		$class_name = trim( "guten-element $element_id $animation_class $display_classes guten-feature-list icon-position-$icon_pos $custom_classes" );

		$content = '<div class="' . esc_attr( $class_name ) . '">' . $this->render_content() . '</div>';
		$content = apply_filters( 'gutenverse_cursor_move_effect_script', $content, $this->attributes, $element_id );
		$content = apply_filters( 'gutenverse_advance_animation_script', $content, $this->attributes, $element_id, 'feature-list' );

		return $content;
	}
}
