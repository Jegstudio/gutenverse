<?php
/**
 * Video Block class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\block
 */

namespace Gutenverse\Block;

use Gutenverse\Framework\Block\Block_Abstract;

/**
 * Class Video Block
 *
 * @package gutenverse\block
 */
class Video extends Block_Abstract {

	/**
	 * Render content
	 *
	 * @return string
	 */
	public function render_content() {
		$video_type     = isset( $this->attributes['videoType'] ) ? $this->attributes['videoType'] : 'upload';
		$video_src      = isset( $this->attributes['videoSrc'] ) ? $this->attributes['videoSrc'] : '';
		$hide_controls  = isset( $this->attributes['hideControls'] ) && $this->attributes['hideControls'];
		$playing        = isset( $this->attributes['playing'] ) && $this->attributes['playing'];
		$muted          = isset( $this->attributes['muted'] ) && $this->attributes['muted'];
		$loop           = isset( $this->attributes['loop'] ) && $this->attributes['loop'];
		$width          = isset( $this->attributes['width'] ) ? $this->attributes['width'] : array();
		$height         = isset( $this->attributes['height'] ) ? $this->attributes['height'] : array();
		$start          = isset( $this->attributes['start'] ) ? $this->attributes['start'] : 0;
		$end            = isset( $this->attributes['end'] ) ? $this->attributes['end'] : 0;
		$caption_type   = isset( $this->attributes['captionType'] ) ? $this->attributes['captionType'] : 'none';
		$caption_orig   = isset( $this->attributes['captionOriginal'] ) ? $this->attributes['captionOriginal'] : '';
		$caption_custom = isset( $this->attributes['captionCustom'] ) ? $this->attributes['captionCustom'] : '';

		if ( empty( $video_src ) ) {
			return '';
		}

		$output = '';

		// Video rendering.
		if ( 'externalLink' === $video_type ) {
			$data_properties = array(
				'url'         => $video_src,
				'class'       => 'guten-video-background',
				'width'       => isset( $width['Desktop'] ) ? $width['Desktop'] . '%' : '100%',
				'height'      => isset( $height['Desktop'] ) ? $height['Desktop'] . 'px' : '500px',
				'playing'     => $playing,
				'muted'       => $muted,
				'loop'        => $loop,
				'controls'    => ! $hide_controls,
				'playsinline' => true,
				'style'       => (object) array(),
				'config'      => array(
					'youtube' => array(
						'playerVars' => array(
							'start' => $start,
							'end'   => $end,
						),
					),
				),
			);
			$output         .= '<div class="guten-video-wrapper" data-property="' . esc_attr( wp_json_encode( $data_properties ) ) . '"></div>';
		} else {
			$attrs   = ' src="' . esc_url( $video_src ) . '"';
			$attrs  .= ! $hide_controls ? ' controls' : '';
			$attrs  .= $playing ? ' autoplay' : '';
			$attrs  .= $muted ? ' muted' : '';
			$attrs  .= $loop ? ' loop' : '';
			$output .= '<video' . $attrs . '></video>';
		}

		// Caption.
		$caption_text = '';
		if ( 'original' === $caption_type ) {
			$caption_text = $caption_orig;
		} elseif ( 'custom' === $caption_type ) {
			$caption_text = $caption_custom;
		}

		if ( ! empty( $caption_text ) ) {
			$output .= '<span class="guten-caption">' . wp_kses_post( $caption_text ) . '</span>';
		}

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
		$element_id      = $this->get_element_id();
		$display_classes = $this->set_display_classes();
		$animation_class = $this->set_animation_classes();
		$custom_classes  = $this->get_custom_classes();

		$class_name = trim( "wp-block-gutenverse-video guten-element guten-video $element_id $display_classes $animation_class $custom_classes" );

		return '<figure class="' . esc_attr( $class_name ) . '">' . $this->render_content() . '</figure>';
	}
}
