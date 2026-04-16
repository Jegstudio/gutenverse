<?php
/**
 * Icon List Item Block class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\block
 */

namespace Gutenverse\Block;

use Gutenverse\Framework\Block\Block_Abstract;

/**
 * Class Icon List Item Block
 *
 * @package gutenverse\block
 */
class Icon_List_Item extends Block_Abstract {

	/**
	 * Render content
	 *
	 * @return string
	 */
	public function render_content() {
		$element_id  = $this->get_element_id();
		$url         = isset( $this->attributes['url'] ) ? $this->attributes['url'] : '';
		$link_target = isset( $this->attributes['linkTarget'] ) ? $this->attributes['linkTarget'] : '';
		$rel         = isset( $this->attributes['rel'] ) ? $this->attributes['rel'] : '';
		$aria_label  = isset( $this->attributes['ariaLabel'] ) ? $this->attributes['ariaLabel'] : '';
		$icon        = isset( $this->attributes['icon'] ) ? $this->attributes['icon'] : '';
		$icon_type   = isset( $this->attributes['iconType'] ) ? $this->attributes['iconType'] : 'icon';
		$icon_svg    = isset( $this->attributes['iconSVG'] ) ? $this->attributes['iconSVG'] : '';
		$hide_icon   = isset( $this->attributes['hideIcon'] ) ? $this->attributes['hideIcon'] : false;
		$text        = isset( $this->attributes['text'] ) ? $this->attributes['text'] : '';

		$text = apply_filters(
			'gutenverse_dynamic_generate_dynamic_parse_list_php',
			$text,
			$this->attributes['dynamicDataList'] ?? array()
		);

		$dynamic_url = isset( $this->attributes['dynamicUrl'] ) ? $this->attributes['dynamicUrl'] : array();
		$href        = apply_filters(
			'gutenverse_dynamic_generate_url',
			$url,
			$dynamic_url,
			$this->get_element_id()
		);

		$icon_html = '';
		if ( ! $hide_icon ) {
			if ( 'svg' === $icon_type && $icon_svg ) {
				// phpcs:ignore WordPress.PHP.DiscouragedPHPFunctions.obfuscation_base64_decode
				$svg_data = base64_decode( $icon_svg );
				if ( gutenverse_is_svg_safe( $svg_data ) ) {
					$icon_html = '<div class="gutenverse-icon-svg">' . $svg_data . '</div>';
				}
			} elseif ( $icon ) {
				$icon_html = '<i class="' . esc_attr( $icon ) . '"></i>';
			}
		}

		$text_class = 'list-text' . ( $hide_icon ? ' no-icon' : '' );

		$target_attr     = ! empty( $link_target ) ? ' target="' . esc_attr( $link_target ) . '"' : '';
		$rel_attr        = ! empty( $rel ) ? ' rel="' . esc_attr( $rel ) . '"' : '';
		$aria_label_attr = ! empty( $aria_label ) ? ' aria-label="' . esc_attr( $aria_label ) . '"' : '';

		$content  = '<div class="list-divider"></div>';
		$content .= '<a id="' . esc_attr( $element_id ) . '" href="' . esc_url( $href ) . '"' . $target_attr . $rel_attr . $aria_label_attr . '>';
		$content .= $icon_html; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		$content .= '<span class="' . esc_attr( $text_class ) . '">' . $text . '</span>';
		$content .= '</a>';

		return $content;
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
		$anchor          = isset( $this->attributes['anchor'] ) ? $this->attributes['anchor'] : '';
		$display_classes = $this->set_display_classes();
		$animation_class = $this->set_animation_classes();
		$custom_classes  = $this->get_custom_classes();

		$id_attr    = ! empty( $anchor ) ? ' id="' . esc_attr( $anchor ) . '"' : '';
		$class_name = trim( 'guten-element guten-icon-list-item ' . $element_id . ' ' . $animation_class . ' ' . $display_classes . ' ' . $custom_classes );

		return '<div' . $id_attr . ' class="' . esc_attr( $class_name ) . '">' . $this->render_content() . '</div>';
	}
}
