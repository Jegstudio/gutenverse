<?php
/**
 * Social Icon Block class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\block
 */

namespace Gutenverse\Block;

use Gutenverse\Framework\Block\Block_Abstract;

/**
 * Class Social Icon Block
 *
 * @package gutenverse\block
 */
class Social_Icon extends Block_Abstract {

	/**
	 * Get social type based on icon class
	 *
	 * @param string $icon .
	 *
	 * @return string
	 */
	private function get_social_type( $icon = '' ) {
		if ( ! is_string( $icon ) ) {
			return 'default';
		}
		$socials = array(
			'facebook'    => 'facebook',
			'twitter'     => 'twitter',
			'google-plus' => 'google-plus',
			'linkedin'    => 'linkedin',
			'pinterest'   => 'pinterest',
			'youtube'     => 'youtube',
			'instagram'   => 'instagram',
			'vimeo'       => 'vimeo',
			'dribbble'    => 'dribbble',
			'behance'     => 'behance',
			'flickr'      => 'flickr',
			'git'         => 'git',
			'tumblr'      => 'tumblr',
			'skype'       => 'skype',
			'foursquare'  => 'foursquare',
			'whatsapp'    => 'whatsapp',
			'telegram'    => 'telegram',
			'envelope'    => 'envelope',
			'rss'         => 'rss',
			'slack'       => 'slack',
			'wordpress'   => 'wordpress',
		);

		foreach ( $socials as $key => $value ) {
			if ( strpos( $icon, $key ) !== false ) {
				return $value;
			}
		}

		return 'default';
	}

	/**
	 * Render content
	 *
	 * @return string
	 */
	public function render_content() {
		$element_id  = $this->get_element_id();
		$icon        = ! empty( $this->attributes['icon'] ) ? $this->attributes['icon'] : 'fab fa-wordpress';
		$icon_type   = ! empty( $this->attributes['iconType'] ) ? $this->attributes['iconType'] : 'icon';
		$icon_svg    = ! empty( $this->attributes['iconSVG'] ) ? $this->attributes['iconSVG'] : '';
		$text        = ! empty( $this->attributes['text'] ) ? $this->attributes['text'] : '';
		$url         = ! empty( $this->attributes['url'] ) ? $this->attributes['url'] : '';
		$link_target = ! empty( $this->attributes['linkTarget'] ) ? $this->attributes['linkTarget'] : '';
		$rel         = ! empty( $this->attributes['rel'] ) ? $this->attributes['rel'] : '';
		$aria_label  = ! empty( $this->attributes['ariaLabel'] ) ? $this->attributes['ariaLabel'] : '';

		$dynamic_url = isset( $this->attributes['dynamicUrl'] ) ? $this->attributes['dynamicUrl'] : array();
		$href        = apply_filters(
			'gutenverse_dynamic_generate_url',
			$url,
			$dynamic_url,
			$this->get_element_id()
		);

		$icon_html = $this->render_icon( $icon_type, $icon, $icon_svg );

		$link_attr_str = ' id="' . esc_attr( $element_id ) . '" href="' . esc_url( (string) $href ) . '"';
		if ( ! empty( $link_target ) ) {
			$link_attr_str .= ' target="' . esc_attr( $link_target ) . '"';
		}
		if ( ! empty( $rel ) ) {
			$link_attr_str .= ' rel="' . esc_attr( $rel ) . '"';
		}
		if ( ! empty( $aria_label ) ) {
			$link_attr_str .= ' aria-label="' . esc_attr( $aria_label ) . '"';
		}
		$output  = '<a' . $link_attr_str . '>';
		$output .= $icon_html;

		if ( ! empty( $text ) ) {
			$output .= '<span>' . wp_kses_post( $text ) . '</span>';
		}
		$output .= '</a>';

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
		if ( ! empty( trim( $this->block_data->inner_html ) ) && apply_filters( 'gutenverse_force_dynamic', false ) ) {
			return $this->content;
		}
		$element_id      = $this->get_element_id();
		$display_classes = $this->set_display_classes();
		$animation_class = $this->set_animation_classes();
		$custom_classes  = $this->get_custom_classes();
		$icon            = ! empty( $this->attributes['icon'] ) ? $this->attributes['icon'] : 'fab fa-wordpress';
		$icon_type       = ! empty( $this->attributes['iconType'] ) ? $this->attributes['iconType'] : 'icon';
		$social_type     = $this->get_social_type( $icon );
		$icon_class      = ( 'svg' === $icon_type ) ? 'svg' : '';

		$data_id = '';
		if ( isset( $this->attributes['advanceAnimation']['type'] ) && ! empty( $this->attributes['advanceAnimation']['type'] ) ) {
			$id_parts = explode( '-', $element_id );
			if ( count( $id_parts ) > 1 ) {
				$data_id = ' data-id="' . esc_attr( $id_parts[1] ) . '"';
			}
		}

		$class_name = 'guten-element guten-social-icon ' . $element_id . ' ' . $social_type . ' ' . $icon_class . $display_classes . $animation_class . $custom_classes;

		$content = '<div class="' . esc_attr( trim( $class_name ) ) . '"' . $data_id . '>' . $this->render_content() . '</div>';
		$content = apply_filters( 'gutenverse_advance_animation_script', $content, $this->attributes, $element_id, 'social-icon' );

		return $content;
	}
}
