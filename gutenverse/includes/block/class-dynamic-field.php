<?php
/**
 * Dynamic Field Block class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\block
 */

namespace Gutenverse\Block;

use Gutenverse\Framework\Block\Block_Abstract;

/**
 * Class Dynamic Field
 *
 * @package gutenverse\block
 */
class Dynamic_Field extends Block_Abstract {
	/**
	 * Render content
	 *
	 * @param int $post_id .
	 *
	 * @return string
	 */
	public function render_content( $post_id ) {
		$field_content = isset( $this->attributes['fieldContent'] ) ? $this->attributes['fieldContent'] : '';
		$html_tag      = isset( $this->attributes['htmlTag'] ) ? $this->attributes['htmlTag'] : 'p';
		$is_link       = isset( $this->attributes['link'] ) ? $this->attributes['link'] : false;
		$target        = isset( $this->attributes['linkTarget'] ) && $this->attributes['linkTarget'] ? '_blank' : '_self';

		$field_key = is_array( $field_content ) && isset( $field_content['value'] ) ? $field_content['value'] : $field_content;

		$field_link       = isset( $this->attributes['fieldLink'] ) ? $this->attributes['fieldLink'] : '';
		$field_link_key   = is_array( $field_link ) && isset( $field_link['value'] ) ? $field_link['value'] : $field_link;

		if ( empty( $field_key ) ) {
			return '';
		}

		if ( ! function_exists( 'get_field' ) ) {
			return '';
		}

		$value = get_field( $field_key, $post_id );

		if ( ! $value && 0 !== $value && '0' !== $value ) {
			return '';
		}

		if ( is_array( $value ) ) {
			$value = implode( ', ', $value );
		}

		$content = wp_kses_post( $value );

		if ( $is_link ) {
			$href = '';

			// 1. Try Field Link first
			if ( ! empty( $field_link_key ) ) {
				$link_val = get_field( $field_link_key, $post_id );
				if ( $link_val ) {
					$href = $link_val;
				}
			}

			// 2. Fallback to using the content value itself
			if ( empty( $href ) ) {
				if ( filter_var( $value, FILTER_VALIDATE_URL ) ) {
					$href = $value;
				} else {
					$href = $value; // Just use the value as href even if not validated URL? Original code did this.
				}
			}

			if ( ! empty( $href ) ) {
				$content = "<a href='" . esc_url( $href ) . "' target='" . esc_attr( $target ) . "'>{$content}</a>";
			}
		}

		return "<{$html_tag} class='guten-dynamic-field-content'>{$content}</{$html_tag}>";
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
		$post_id         = ! empty( $this->context['postId'] ) ? esc_html( $this->context['postId'] ) : get_the_ID();
		$element_id      = $this->get_element_id();
		$display_classes = $this->set_display_classes();
		$animation_class = $this->set_animation_classes();
		$custom_classes  = $this->get_custom_classes();

		return '<div class="' . $element_id . $display_classes . $animation_class . $custom_classes . ' guten-dynamic-field guten-element">' . $this->render_content( $post_id ) . '</div>';
	}
}
