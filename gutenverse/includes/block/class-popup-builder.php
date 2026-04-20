<?php
/**
 * Popup Builder Block class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\block
 */

namespace Gutenverse\Block;

use Gutenverse\Framework\Block\Block_Abstract;

/**
 * Class Popup Builder Block
 *
 * @package gutenverse\block
 */
class Popup_Builder extends Block_Abstract {

	/**
	 * Render the close button.
	 *
	 * @return string
	 */
	private function render_close_button() {
		$close_icon      = isset( $this->attributes['closeIcon'] ) ? $this->attributes['closeIcon'] : 'gtn gtn-x-line';
		$close_icon_type = isset( $this->attributes['closeIconType'] ) ? $this->attributes['closeIconType'] : 'icon';
		$close_icon_svg  = isset( $this->attributes['closeIconSVG'] ) ? $this->attributes['closeIconSVG'] : '';

		return '<div class="guten-popup-close">' . $this->render_icon( $close_icon_type, $close_icon, $close_icon_svg ) . '</div>';
	}

	/**
	 * Render video content for youtube popup type.
	 *
	 * @return string
	 */
	private function render_video_content() {
		$element_id              = $this->get_element_id();
		$popup_video_src         = isset( $this->attributes['popupVideoSrc'] ) ? $this->attributes['popupVideoSrc'] : '';
		$popup_video_start       = isset( $this->attributes['popupVideoStart'] ) ? $this->attributes['popupVideoStart'] : 0;
		$popup_video_end         = isset( $this->attributes['popupVideoEnd'] ) ? $this->attributes['popupVideoEnd'] : 0;
		$popup_video_muted       = isset( $this->attributes['popupVideoMuted'] ) ? $this->attributes['popupVideoMuted'] : false;
		$popup_video_loop        = isset( $this->attributes['popupVideoLoop'] ) ? $this->attributes['popupVideoLoop'] : false;
		$popup_video_hide_ctrl   = isset( $this->attributes['popupVideoHideControls'] ) ? $this->attributes['popupVideoHideControls'] : false;

		$class_name = 'guten-element guten-video ' . $element_id;

		$data_properties = wp_json_encode(
			array(
				'url'        => $popup_video_src,
				'class'      => 'guten-video-background',
				'width'      => '100%',
				'height'     => '100%',
				'playing'    => false,
				'muted'      => $popup_video_muted,
				'loop'       => $popup_video_loop,
				'controls'   => ! $popup_video_hide_ctrl,
				'playsinline' => true,
				'style'      => new \stdClass(),
				'config'     => array(
					'youtube' => array(
						'playerVars' => array(
							'start' => $popup_video_start,
							'end'   => $popup_video_end,
						),
					),
				),
			)
		);

		$video_wrapper = '';
		if ( ! empty( $popup_video_src ) ) {
			$video_wrapper = '<div class="guten-video-wrapper" data-property="' . esc_attr( $data_properties ) . '"></div>';
		}

		return '<div class="guten-popup-video-container"><figure class="' . esc_attr( $class_name ) . '">' . $video_wrapper . '</figure></div>';
	}

	/**
	 * Render the popup inner content.
	 *
	 * @return string
	 */
	private function render_popup_content() {
		$popup_type = isset( $this->attributes['popupType'] ) ? $this->attributes['popupType'] : 'default';

		if ( 'youtube' === $popup_type ) {
			return $this->render_video_content();
		}

		return '<div class="guten-popup-container">' . $this->get_inner_blocks_content() . '</div>';
	}

	/**
	 * Render content
	 *
	 * @return string
	 */
	public function render_content() {
		$position         = isset( $this->attributes['position'] ) ? $this->attributes['position'] : 'center';
		$content_position = isset( $this->attributes['contentPosition'] ) ? $this->attributes['contentPosition'] : 'center';
		$side_mode        = isset( $this->attributes['sideMode'] ) ? $this->attributes['sideMode'] : 'space';
		$show_close       = isset( $this->attributes['showCloseButton'] ) ? $this->attributes['showCloseButton'] : true;
		$close_position   = isset( $this->attributes['closePosition'] ) ? $this->attributes['closePosition'] : 'container';
		$animation_class  = $this->set_animation_classes();

		$output  = '<div class="guten-popup guten-popup-' . esc_attr( $position ) . ' guten-popup-side-' . esc_attr( $side_mode ) . '">';
		$output .= '<div class="guten-popup-overlay"></div>';

		if ( $show_close && 'overlay' === $close_position ) {
			$output .= $this->render_close_button();
		}

		$output .= '<div class="guten-popup-wrapper guten-popup-wrapper-' . esc_attr( $content_position ) . '">';
		$output .= '<div class="guten-popup-content' . $animation_class . '">';

		if ( $show_close && 'container' === $close_position ) {
			$output .= $this->render_close_button();
		}

		$output .= $this->render_popup_content();
		$output .= '</div>';
		$output .= '</div>';
		$output .= '</div>';

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
		$custom_classes  = $this->get_custom_classes();

		$open_trigger     = isset( $this->attributes['openTrigger'] ) ? $this->attributes['openTrigger'] : 'load';
		$open_wait_time   = isset( $this->attributes['openWaitTime'] ) ? $this->attributes['openWaitTime'] : '';
		$open_scroll_dist = isset( $this->attributes['openScrollDistance'] ) ? $this->attributes['openScrollDistance'] : '';
		$open_anchor      = isset( $this->attributes['openAnchor'] ) ? $this->attributes['openAnchor'] : '';
		$open_max_click   = isset( $this->attributes['openMaxClick'] ) ? $this->attributes['openMaxClick'] : '';
		$open_interval    = isset( $this->attributes['openInterval'] ) ? $this->attributes['openInterval'] : '';
		$hide_after       = isset( $this->attributes['hideAfterClosed'] ) ? $this->attributes['hideAfterClosed'] : false;
		$close_overlay    = isset( $this->attributes['closePopupOverlay'] ) ? $this->attributes['closePopupOverlay'] : true;
		$exit_anim        = isset( $this->attributes['exitAnimation'] ) ? $this->attributes['exitAnimation'] : '';
		$exit_dur         = isset( $this->attributes['exitAnimationDuration'] ) ? $this->attributes['exitAnimationDuration'] : '';
		$exit_delay       = isset( $this->attributes['exitAnimationDelay'] ) ? $this->attributes['exitAnimationDelay'] : '';
		$video_pause      = isset( $this->attributes['popupVideoPauseOnClose'] ) ? $this->attributes['popupVideoPauseOnClose'] : false;
		$video_reset      = isset( $this->attributes['popupVideoResetOnClose'] ) ? $this->attributes['popupVideoResetOnClose'] : false;
		$video_play_on    = isset( $this->attributes['popupVideoPlayOn'] ) ? $this->attributes['popupVideoPlayOn'] : 'click';
		$video_start      = isset( $this->attributes['popupVideoStart'] ) ? $this->attributes['popupVideoStart'] : '';

		$class_name = trim( 'guten-element guten-popup-builder ' . $element_id . $display_classes . $custom_classes );

		$data_attrs = ' data-trigger="' . esc_attr( $open_trigger ) . '"';

		if ( is_numeric( $open_wait_time ) ) {
			$data_attrs .= ' data-wait="' . esc_attr( $open_wait_time ) . '"';
		}
		if ( $hide_after ) {
			$data_attrs .= ' data-hide="hide-' . esc_attr( $element_id ) . '"';
		}
		if ( is_numeric( $open_scroll_dist ) ) {
			$data_attrs .= ' data-scroll="' . esc_attr( $open_scroll_dist ) . '"';
		}
		if ( ! empty( $open_anchor ) ) {
			$data_attrs .= ' data-anchor="' . esc_attr( $open_anchor ) . '"';
		}
		if ( is_numeric( $open_max_click ) ) {
			$data_attrs .= ' data-max-click="' . esc_attr( $open_max_click ) . '"';
		}
		if ( $close_overlay ) {
			$data_attrs .= ' data-close-overlay="' . esc_attr( $close_overlay ) . '"';
		}
		if ( ! empty( $open_interval ) ) {
			$data_attrs .= ' data-inactive-interval="' . esc_attr( wp_json_encode( $open_interval ) ) . '"';
		}
		if ( ! empty( $exit_anim ) ) {
			$data_attrs .= ' data-exit-animation="' . esc_attr( $exit_anim ) . '"';
		}
		if ( ! empty( $exit_dur ) ) {
			$data_attrs .= ' data-exit-duration="' . esc_attr( $exit_dur ) . '"';
		}
		if ( ! empty( $exit_delay ) ) {
			$data_attrs .= ' data-exit-delay="' . esc_attr( $exit_delay ) . '"';
		}
		if ( $video_pause ) {
			$data_attrs .= ' data-video-pause-onclose="' . esc_attr( $video_pause ) . '"';
		}
		if ( $video_reset ) {
			$data_attrs .= ' data-video-reset-onclose="' . esc_attr( $video_reset ) . '"';
		}
		if ( ! empty( $video_play_on ) ) {
			$data_attrs .= ' data-video-play-on="' . esc_attr( $video_play_on ) . '"';
		}
		if ( ! empty( $video_start ) ) {
			$data_attrs .= ' data-video-start="' . esc_attr( $video_start ) . '"';
		}

		$content = '<div class="' . esc_attr( $class_name ) . '"' . $data_attrs . '>' . $this->render_content() . '</div>';
		$content = apply_filters( 'gutenverse_cursor_move_effect_script', $content, $this->attributes, $element_id );

		return $content;
	}
}
