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
		$caption_type     = isset( $this->attributes['captionType'] ) ? $this->attributes['captionType'] : 'none';
		$caption_original = isset( $this->attributes['captionOriginal'] ) ? $this->attributes['captionOriginal'] : '';
		$caption_custom   = isset( $this->attributes['captionCustom'] ) ? $this->attributes['captionCustom'] : '';
		$url              = isset( $this->attributes['url'] ) ? $this->attributes['url'] : '';
		$link_target      = isset( $this->attributes['linkTarget'] ) ? $this->attributes['linkTarget'] : '_self';
		$rel              = isset( $this->attributes['rel'] ) ? $this->attributes['rel'] : '';
		$aria_label       = isset( $this->attributes['ariaLabel'] ) ? $this->attributes['ariaLabel'] : '';

		$img_html = self::apply_image_box_figure( $this->attributes );

		// Link wrapper.
		$element_id = $this->get_element_id();
		$href       = apply_filters( 'gutenverse_dynamic_generate_url', $url, $this->attributes['dynamicUrl'], $element_id );

		if ( ! empty( $href ) ) {
			$link_attr     = array(
				'class'      => 'guten-image-wrapper',
				'href'       => $href,
				'target'     => $link_target,
				'rel'        => $rel,
				'aria-label' => $aria_label,
			);
			$link_attr_str = '';
			foreach ( $link_attr as $key => $val ) {
				if ( ! empty( $val ) ) {
					$link_attr_str .= ' ' . esc_attr( $key ) . '="' . esc_attr( $val ) . '"';
				}
			}
			$image_wrapper = '<a' . $link_attr_str . '>' . $img_html . '</a>';
		} else {
			$image_wrapper = '<div class="guten-image-wrapper">' . $img_html . '</div>';
		}

		// Caption.
		$caption_html = '';
		switch ( $caption_type ) {
			case 'original':
				$caption_html = '<span class="guten-caption">' . esc_html( $caption_original ) . '</span>';
				break;
			case 'custom':
				$caption_html = '<span class="guten-caption">' . esc_html( $caption_custom ) . '</span>';
				break;
		}

		return $image_wrapper . $caption_html;
	}

	/**
	 * Apply image box figure
	 *
	 * @param array $attributes The attributes.
	 *
	 * @return string
	 */
	public static function apply_image_box_figure( $attributes ) {
		$img_src             = isset( $attributes['imgSrc'] ) ? $attributes['imgSrc'] : array();
		$alt_type            = isset( $attributes['altType'] ) ? $attributes['altType'] : 'none';
		$alt_original        = isset( $attributes['altOriginal'] ) ? $attributes['altOriginal'] : '';
		$alt_custom          = isset( $attributes['altCustom'] ) ? $attributes['altCustom'] : '';
		$lazy_load           = isset( $attributes['lazyLoad'] ) ? $attributes['lazyLoad'] : false;
		$image_load          = isset( $attributes['imageLoad'] ) ? $attributes['imageLoad'] : '';
		$fetch_priority_high = isset( $attributes['fetchPriorityHigh'] ) ? $attributes['fetchPriorityHigh'] : false;

		$image_alt_text = '';
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
			'alt'   => $image_alt_text,
		);

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
		$post_id         = ! empty( $this->context['postId'] ) ? esc_html( $this->context['postId'] ) : get_the_ID();
		$element_id      = $this->get_element_id();
		$display_classes = $this->set_display_classes();
		$animation_class = $this->set_animation_classes();
		$custom_classes  = $this->get_custom_classes();

		return '<div class="' . $element_id . $display_classes . $animation_class . $custom_classes . ' guten-image guten-element">' . $this->render_content( $post_id ) . '</div>';
	}
}
