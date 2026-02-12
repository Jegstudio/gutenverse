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
		$field_key = isset( $this->attributes['fieldKey'] ) ? $this->attributes['fieldKey'] : '';
		$html_tag  = isset( $this->attributes['htmlTag'] ) ? $this->attributes['htmlTag'] : 'p';
		$is_link   = isset( $this->attributes['link'] ) ? $this->attributes['link'] : false;
		$target    = isset( $this->attributes['linkTarget'] ) && $this->attributes['linkTarget'] ? '_blank' : '_self';

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
			// If the value itself looks like a URL, use it. Otherwise, we might need another strategy or just link to the current post?
			// Usually "Link to Field Value" implies the field value IS the link.
			// Or maybe the user wants to link the text to the post permalink?
			// Based on property name 'link', checking if it's a URL is safer, or just using the value as href.
			$href = $value;
			if ( filter_var( $value, FILTER_VALIDATE_URL ) ) {
				$content = $value;
			}
			$content = "<a href='" . esc_url( $href ) . "' target='" . esc_attr( $target ) . "'>{$content}</a>";
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
