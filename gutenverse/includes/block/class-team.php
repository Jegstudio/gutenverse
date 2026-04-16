<?php
/**
 * Team Block class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\block
 */

namespace Gutenverse\Block;

use Gutenverse\Framework\Block\Block_Abstract;

/**
 * Class Team Block
 *
 * @package gutenverse\block
 */
class Team extends Block_Abstract {
	/**
	 * Render the image tag for the team member photo.
	 *
	 * @return string
	 */
	private function render_image() {
		$src      = isset( $this->attributes['src'] ) ? $this->attributes['src'] : array();
		$alt_type = isset( $this->attributes['altType'] ) ? $this->attributes['altType'] : 'none';
		$lazy     = isset( $this->attributes['lazy'] ) ? $this->attributes['lazy'] : 'normal';
		$name     = isset( $this->attributes['name'] ) ? $this->attributes['name'] : '';

		$image_url = isset( $src['image'] ) ? $src['image'] : ( isset( $src['url'] ) ? $src['url'] : '' );
		$height    = isset( $src['height'] ) ? (int) $src['height'] : 0;
		$width     = isset( $src['width'] ) ? (int) $src['width'] : 0;

		switch ( $alt_type ) {
			case 'original':
				$alt = isset( $src['altOriginal'] ) ? $src['altOriginal'] : $name;
				break;
			case 'custom':
				$alt = isset( $this->attributes['imageAlt'] ) ? $this->attributes['imageAlt'] : $name;
				break;
			default:
				$alt = $name;
		}

		$loading = 'lazy' === $lazy ? ' loading="lazy"' : '';
		$size    = '';
		if ( $height ) {
			$size .= ' height="' . esc_attr( $height ) . '"';
		}
		if ( $width ) {
			$size .= ' width="' . esc_attr( $width ) . '"';
		}

		return '<img src="' . esc_url( $image_url ) . '" alt="' . esc_attr( $alt ) . '"' . $loading . $size . ' />';
	}

	/**
	 * Render a rich-text field conditionally.
	 *
	 * @param string $class_name   CSS classes for the element.
	 * @param string $tag          HTML tag name.
	 * @param string $identifier   Attribute key (name/job/description).
	 * @param bool   $show_desc    Whether showDesc is enabled.
	 * @param string $aria_label   Optional aria-label attribute value.
	 *
	 * @return string
	 */
	private function render_text_field( $class_name, $tag, $identifier, $show_desc, $aria_label = '' ) {
		$value = isset( $this->attributes[ $identifier ] ) ? $this->attributes[ $identifier ] : '';

		if ( 'description' === $identifier && ! $show_desc ) {
			return '';
		}

		$tag = $this->check_tag( $tag, 'p' );

		$aria_attr = '';
		if ( ! empty( $aria_label ) ) {
			$aria_attr = ' aria-label="' . esc_attr( $aria_label ) . '"';
		}

		$value = apply_filters(
			'gutenverse_dynamic_generate_dynamic_parse_list_php',
			$value,
			$this->attributes[$identifier . 'DynamicList'] ?? array()
		);

		return '<' . $tag . ' class="' . esc_attr( $class_name ) . '"' . $aria_attr . '>' . wp_kses_post( $value ) . '</' . $tag . '>';
	}

	/**
	 * Render social icons inner-block content.
	 *
	 * @return string
	 */
	private function render_socials() {
		$show_social = isset( $this->attributes['showSocial'] ) && $this->attributes['showSocial'];

		if ( ! $show_social ) {
			return '';
		}

		return '<div class="socials-wrapper">' . $this->get_inner_blocks_content() . '</div>';
	}

	/**
	 * Render the hover-bottom bar element.
	 *
	 * @return string
	 */
	private function render_hover_bottom() {
		$hover_bottom    = isset( $this->attributes['hoverBottom'] ) && $this->attributes['hoverBottom'];
		$hover_direction = isset( $this->attributes['hoverBottomDirection'] ) ? $this->attributes['hoverBottomDirection'] : 'left';

		if ( ! $hover_bottom ) {
			return '';
		}

		return '<div class="border-bottom"><div class="animated ' . esc_attr( $hover_direction ) . '"></div></div>';
	}

	/**
	 * Render the popup data div if enabled.
	 *
	 * @return string
	 */
	private function render_popup() {
		$add_popup = isset( $this->attributes['addPopup'] ) && $this->attributes['addPopup'];

		if ( ! $add_popup ) {
			return '';
		}

		$src         = isset( $this->attributes['src'] ) ? $this->attributes['src'] : array();
		$img_url     = isset( $src['image'] ) ? $src['image'] : ( isset( $src['url'] ) ? $src['url'] : '' );
		$name        = isset( $this->attributes['name'] ) ? $this->attributes['name'] : '';
		$job         = isset( $this->attributes['job'] ) ? $this->attributes['job'] : '';
		$description = isset( $this->attributes['description'] ) ? $this->attributes['description'] : '';
		$phone       = isset( $this->attributes['phone'] ) ? $this->attributes['phone'] : '';
		$email       = isset( $this->attributes['email'] ) ? $this->attributes['email'] : '';

		$data_attrs = '';
		if ( ! empty( $name ) ) {
			$data_attrs .= ' data-name="' . esc_attr( $name ) . '"';
		}
		if ( ! empty( $job ) ) {
			$data_attrs .= ' data-job="' . esc_attr( $job ) . '"';
		}
		if ( ! empty( $img_url ) ) {
			$data_attrs .= ' data-img="' . esc_url( $img_url ) . '"';
		}
		if ( ! empty( $description ) ) {
			$data_attrs .= ' data-desc="' . esc_attr( $description ) . '"';
		}
		if ( ! empty( $phone ) ) {
			$data_attrs .= ' data-phone="' . esc_attr( $phone ) . '"';
		}
		if ( ! empty( $email ) ) {
			$data_attrs .= ' data-email="' . esc_attr( $email ) . '"';
		}

		return '<div class="profile-popup"' . $data_attrs . '></div>';
	}

	/**
	 * Render the profile card based on profileType.
	 *
	 * @return string
	 */
	private function render_profile_card() {
		$profile_type = isset( $this->attributes['profileType'] ) ? $this->attributes['profileType'] : 'default';
		$overlay_type = isset( $this->attributes['overlayType'] ) ? $this->attributes['overlayType'] : 'default';
		$overlay_pos  = isset( $this->attributes['overlayPosition'] ) ? $this->attributes['overlayPosition'] : 'center';
		$add_popup    = isset( $this->attributes['addPopup'] ) && $this->attributes['addPopup'];
		$show_desc    = isset( $this->attributes['showDesc'] ) && $this->attributes['showDesc'];
		$name_tag     = isset( $this->attributes['nameTag'] ) ? $this->attributes['nameTag'] : 'h3';
		$popup_class  = $add_popup ? ' popup' : '';

		$img          = $this->render_image();
		$socials      = $this->render_socials();
		$hover_bottom = $this->render_hover_bottom();
		$title_class  = 'profile-title ' . ( $add_popup ? 'popup' : '' );
		$title        = $this->render_text_field( $title_class, $name_tag, 'name', $show_desc, 'Profile Name' );
		$sub          = $this->render_text_field( 'profile-sub', 'p', 'job', $show_desc, 'Profile Job' );
		$desc         = $this->render_text_field( 'profile-desc', 'p', 'description', $show_desc, 'Team Description' );

		switch ( $profile_type ) {
			case 'overlay':
				return '<div class="profile-card card-overlay ' . esc_attr( $overlay_type ) . '">'
					. $img
					. '<div class="profile-body ' . esc_attr( $overlay_pos ) . '">'
					. $title . $sub . $desc . $socials
					. '</div>'
					. '</div>';

			case 'hover':
				return '<div class="profile-card card-hover">'
					. '<div class="profile-header' . esc_attr( $popup_class ) . '">' . $img . '</div>'
					. '<div class="profile-body">'
					. $title . $sub . $desc . $socials
					. '</div>'
					. $hover_bottom
					. '</div>';

			case 'titleSocialHorizontal':
				return '<div class="profile-card card-title-social-horizontal">'
					. $img
					. '<div class="profile-body">'
					. $title . $sub . $desc . $socials
					. '</div>'
					. '</div>';

			default:
				return '<div class="profile-card card-default">'
					. '<div class="profile-header' . esc_attr( $popup_class ) . '">' . $img . '</div>'
					. '<div class="profile-body">'
					. $title . $sub . $desc
					. '</div>'
					. ( $this->attributes['showSocial'] ? '<div class="profile-footer">' . $socials . '</div>' : '' )
					. $hover_bottom
					. '</div>';
		}
	}

	/**
	 * Render the inner content (profile box + popup).
	 *
	 * @return string
	 */
	public function render_content() {
		return '<div class="profile-box">'
			. $this->render_profile_card()
			. '</div>'
			. $this->render_popup();
	}

	/**
	 * Render view in editor (REST API).
	 */
	public function render_gutenberg() {
		return $this->render_content();
	}

	/**
	 * Render view in frontend.
	 */
	public function render_frontend() {
		$element_id      = $this->get_element_id();
		$anchor          = isset( $this->attributes['anchor'] ) ? $this->attributes['anchor'] : '';
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

		$class_name = trim( 'wp-block-gutenverse-team guten-element guten-team ' . $element_id . $animation_class . $display_classes . $custom_classes );
		$content    = '<div' . $id_attr . ' class="' . esc_attr( $class_name ) . '"' . $data_id . '>' . $this->render_content() . '</div>';
		$content    = apply_filters( 'gutenverse_cursor_move_effect_script', $content, $this->attributes, $element_id );
		$content    = apply_filters( 'gutenverse_advance_animation_script', $content, $this->attributes, $element_id, 'team' );

		return $content;
	}
}
