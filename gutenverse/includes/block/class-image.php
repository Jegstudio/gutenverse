<?php
/**
 * Image Block class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\block
 */

namespace Gutenverse\Block;

use Gutenverse\Framework\Block\Block_Abstract;

/**
 * Class Image Block
 *
 * @package gutenverse\block
 */
class Image extends Block_Abstract {
	/**
	 * Render content
	 *
	 * @param int $post_id .
	 *
	 * @return string
	 */
	public function render_content( $post_id ) {
		$caption_type   = isset( $this->attributes['captionType'] ) ? $this->attributes['captionType'] : 'none';
		$caption_custom = isset( $this->attributes['captionCustom'] ) ? $this->attributes['captionCustom'] : '';
		$url            = isset( $this->attributes['url'] ) ? $this->attributes['url'] : '';
		$link_target    = isset( $this->attributes['linkTarget'] ) ? $this->attributes['linkTarget'] : '_self';
		$rel            = isset( $this->attributes['rel'] ) ? $this->attributes['rel'] : '';
		$aria_label     = isset( $this->attributes['ariaLabel'] ) ? $this->attributes['ariaLabel'] : '';

		$caption_original = null;
		$img_html         = self::apply_image_box_figure( $this->attributes, $caption_original );

		// Link wrapper.
		$element_id  = $this->get_element_id();
		$dynamic_url = isset( $this->attributes['dynamicUrl'] ) ? $this->attributes['dynamicUrl'] : array();
		$href        = apply_filters( 'gutenverse_dynamic_generate_url', $url, $dynamic_url, $element_id );

		if ( ! empty( $url ) ) {
			$link_attr_str = ' class="guten-image-wrapper" href="' . esc_url( $href ) . '"';
			if ( ! empty( $link_target ) ) {
				$link_attr_str .= ' target="' . esc_attr( $link_target ) . '"';
			}
			if ( ! empty( $rel ) ) {
				$link_attr_str .= ' rel="' . esc_attr( $rel ) . '"';
			}
			if ( ! empty( $aria_label ) ) {
				$link_attr_str .= ' aria-label="' . esc_attr( $aria_label ) . '"';
			}
			$image_wrapper = '<a' . $link_attr_str . '>' . $img_html . '</a>';
		} else {
			$image_wrapper = '<div class="guten-image-wrapper">' . $img_html . '</div>';
		}

		// Caption.
		$caption_html = '';
		switch ( $caption_type ) {
			case 'original':
				$caption_text = ! empty( $caption_original ) ? esc_html( $caption_original ) : '';
				$caption_html = '<span class="guten-caption">' . $caption_text . '</span>';
				break;
			case 'custom':
				$caption_text = ! empty( $caption_custom ) ? esc_html( $caption_custom ) : '';
				$caption_html = '<span class="guten-caption">' . $caption_text . '</span>';
				break;
		}

		return $image_wrapper . $caption_html;
	}

	/**
	 * Apply image box figure
	 *
	 * @param array  $attributes       The attributes.
	 * @param string $caption_original The original caption.
	 *
	 * @return string
	 */
	public static function apply_image_box_figure( $attributes, &$caption_original = null ) {
		$img_src       = isset( $attributes['imgSrc'] ) ? $attributes['imgSrc'] : array();
		$dynamic_image = isset( $attributes['dynamicImage'] ) ? $attributes['dynamicImage'] : array();
		$img_src       = apply_filters( 'gutenverse_dynamic_generate_image', $img_src, $dynamic_image );

		$alt_type            = isset( $attributes['altType'] ) ? $attributes['altType'] : 'none';
		$alt_custom          = isset( $attributes['altCustom'] ) ? $attributes['altCustom'] : '';
		$lazy_load           = isset( $attributes['lazyLoad'] ) ? $attributes['lazyLoad'] : false;
		$image_load          = isset( $attributes['imageLoad'] ) ? $attributes['imageLoad'] : '';
		$fetch_priority_high = isset( $attributes['fetchPriorityHigh'] ) ? $attributes['fetchPriorityHigh'] : false;

		// Get image attachment ID.
		$image_id = isset( $img_src['media']['imageId'] ) ? $img_src['media']['imageId'] : null;

		// Get alt text and caption from the attachment.
		$alt_original     = $image_id ? get_post_meta( $image_id, '_wp_attachment_image_alt', true ) : '';
		$caption_original = $image_id ? get_post_field( 'post_excerpt', $image_id ) : '';

		$image_alt_text = null;
		switch ( $alt_type ) {
			case 'original':
				$image_alt_text = $alt_original;
				break;
			case 'custom':
				$image_alt_text = $alt_custom;
				break;
		}

		$media = isset( $img_src['media'] ) ? $img_src['media'] : array();
		$size  = isset( $img_src['size'] ) ? $img_src['size'] : 'full';
		$sizes = isset( $media['sizes'] ) ? $media['sizes'] : array();

		$src    = '';
		$width  = '';
		$height = '';

		if ( ! empty( $sizes ) ) {
			$image_src = isset( $sizes[ $size ] ) ? $sizes[ $size ] : ( isset( $sizes['full'] ) ? $sizes['full'] : array() );

			if ( ! empty( $image_src ) ) {
				$src    = isset( $image_src['url'] ) ? $image_src['url'] : '';
				$width  = isset( $image_src['width'] ) ? $image_src['width'] : '';
				$height = isset( $image_src['height'] ) ? $image_src['height'] : '';
			}
		}

		$img_attr = array(
			'class' => 'gutenverse-image-box-filled',
			'src'   => $src,
		);

		if ( null !== $image_alt_text ) {
			$img_attr['alt'] = $image_alt_text;
		}

		if ( ! empty( $width ) ) {
			$img_attr['width'] = $width;
		}
		if ( ! empty( $height ) ) {
			$img_attr['height'] = $height;
		}

		if ( $fetch_priority_high ) {
			$img_attr['fetchpriority'] = 'high';
		}

		if ( 'lazy' === $image_load || ( '' === $image_load && $lazy_load ) ) {
			$img_attr['loading'] = 'lazy';
		}

		if ( empty( $src ) ) {
			$img_attr['src']   = GUTENVERSE_FRAMEWORK_URL_PATH . '/assets/img/img-placeholder.jpg';
			$img_attr['class'] = 'gutenverse-image-box-empty';
		}

		$img_attr_str = '';
		foreach ( $img_attr as $key => $val ) {
			$img_attr_str .= ' ' . esc_attr( $key ) . '="' . esc_attr( $val ) . '"';
		}

		return '<img' . $img_attr_str . ' />';
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
		if ( ! empty( trim( $this->block_data->inner_html ) ) && apply_filters( 'gutenverse_force_dynamic', false ) ) {
			return $this->content;
		}
		$post_id         = ! empty( $this->context['postId'] ) ? esc_html( $this->context['postId'] ) : get_the_ID();
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

		$class_name = trim( 'wp-block-gutenverse-image guten-element guten-image ' . $element_id . $animation_class . $display_classes . $custom_classes );
		$content    = '<div' . $id_attr . ' class="' . esc_attr( $class_name ) . '"' . $data_id . '>' . $this->render_content( $post_id ) . '</div>';
		$content    = apply_filters( 'gutenverse_cursor_move_effect_script', $content, $this->attributes, $element_id );
		$content    = apply_filters( 'gutenverse_advance_animation_script', $content, $this->attributes, $element_id, 'image' );

		return $content;
	}
}
