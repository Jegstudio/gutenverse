<?php
/**
 * Countdown Block class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\block
 */

namespace Gutenverse\Block;

use Gutenverse\Framework\Block\Block_Abstract;

/**
 * Class Countdown Block
 *
 * @package gutenverse\block
 */
class Countdown extends Block_Abstract {

	/**
	 * Render content
	 *
	 * @return string
	 */
	public function render_content() {
		$show_days      = isset( $this->attributes['showDays'] ) ? $this->attributes['showDays'] : true;
		$label_days     = isset( $this->attributes['labelDays'] ) ? $this->attributes['labelDays'] : 'days';
		$show_hours     = isset( $this->attributes['showHours'] ) ? $this->attributes['showHours'] : true;
		$label_hours    = isset( $this->attributes['labelHours'] ) ? $this->attributes['labelHours'] : 'hours';
		$show_minutes   = isset( $this->attributes['showMinutes'] ) ? $this->attributes['showMinutes'] : true;
		$label_minutes  = isset( $this->attributes['labelMinutes'] ) ? $this->attributes['labelMinutes'] : 'minutes';
		$show_seconds   = isset( $this->attributes['showSeconds'] ) ? $this->attributes['showSeconds'] : true;
		$label_seconds  = isset( $this->attributes['labelSeconds'] ) ? $this->attributes['labelSeconds'] : 'seconds';
		$show_divider   = isset( $this->attributes['showDivider'] ) ? $this->attributes['showDivider'] : false;
		$divider_type   = isset( $this->attributes['dividerType'] ) ? $this->attributes['dividerType'] : '';
		$label_position = isset( $this->attributes['labelPosition'] ) ? $this->attributes['labelPosition'] : 'bottom';
		$expired_action = isset( $this->attributes['expiredAction'] ) ? $this->attributes['expiredAction'] : 'none';

		$output = '<div class="guten-countdown-wrapper">';

		// Days.
		if ( $show_days ) {
			$output .= '<div class="item-flex">';
			$output .= '<div class="time-container days-wrapper">';
			if ( ! empty( $label_days ) && ( 'left' === $label_position || 'top' === $label_position ) ) {
				$output .= '<div class="countdown-label">' . esc_html( $label_days ) . '</div>';
			}
			$output .= '<div class="countdown-value">0</div>';
			if ( ! empty( $label_days ) && ( 'right' === $label_position || 'bottom' === $label_position ) ) {
				$output .= '<div class="countdown-label">' . esc_html( $label_days ) . '</div>';
			}
			$output .= '</div>';
			$output .= '</div>';
			if ( $show_divider ) {
				$output .= '<div class="countdown-divider">' . esc_html( $divider_type ) . '</div>';
			}
		}

		// Hours.
		if ( $show_hours ) {
			$output .= '<div class="item-flex">';
			$output .= '<div class="time-container hours-wrapper">';
			if ( ! empty( $label_hours ) && ( 'left' === $label_position || 'top' === $label_position ) ) {
				$output .= '<div class="countdown-label">' . esc_html( $label_hours ) . '</div>';
			}
			$output .= '<div class="countdown-value">0</div>';
			if ( ! empty( $label_hours ) && ( 'right' === $label_position || 'bottom' === $label_position ) ) {
				$output .= '<div class="countdown-label">' . esc_html( $label_hours ) . '</div>';
			}
			$output .= '</div>';
			$output .= '</div>';
			if ( $show_divider ) {
				$output .= '<div class="countdown-divider">' . esc_html( $divider_type ) . '</div>';
			}
		}

		// Minutes.
		if ( $show_minutes ) {
			$output .= '<div class="item-flex">';
			$output .= '<div class="time-container minutes-wrapper">';
			if ( ! empty( $label_minutes ) && ( 'left' === $label_position || 'top' === $label_position ) ) {
				$output .= '<div class="countdown-label">' . esc_html( $label_minutes ) . '</div>';
			}
			$output .= '<div class="countdown-value">0</div>';
			if ( ! empty( $label_minutes ) && ( 'right' === $label_position || 'bottom' === $label_position ) ) {
				$output .= '<div class="countdown-label">' . esc_html( $label_minutes ) . '</div>';
			}
			$output .= '</div>';
			$output .= '</div>';
			if ( $show_divider && $show_seconds ) {
				$output .= '<div class="countdown-divider">' . esc_html( $divider_type ) . '</div>';
			}
		}

		// Seconds.
		if ( $show_seconds ) {
			$output .= '<div class="item-flex">';
			$output .= '<div class="time-container seconds-wrapper">';
			if ( ! empty( $label_seconds ) && ( 'left' === $label_position || 'top' === $label_position ) ) {
				$output .= '<div class="countdown-label">' . esc_html( $label_seconds ) . '</div>';
			}
			$output .= '<div class="countdown-value">0</div>';
			if ( ! empty( $label_seconds ) && ( 'right' === $label_position || 'bottom' === $label_position ) ) {
				$output .= '<div class="countdown-label">' . esc_html( $label_seconds ) . '</div>';
			}
			$output .= '</div>';
			$output .= '</div>';
		}

		$output .= '</div>';

		if ( 'section' === $expired_action ) {
			$output .= '<div class="countdown-expired-wrapper">' . $this->get_inner_blocks_content() . '</div>';
		}

		return $output;
	}

	/**
	 * Render view in frontend
	 */
	public function render_frontend() {
		$element_id      = $this->get_element_id();
		$display_classes = $this->set_display_classes();
		$animation_class = $this->set_animation_classes();
		$custom_classes  = $this->get_custom_classes();
		$due_date        = isset( $this->attributes['dueDate'] ) ? $this->attributes['dueDate'] : array();
		$expired_action  = isset( $this->attributes['expiredAction'] ) ? $this->attributes['expiredAction'] : 'none';
		$expired_url     = isset( $this->attributes['expiredUrl'] ) ? $this->attributes['expiredUrl'] : '';
		$anchor          = isset( $this->attributes['anchor'] ) ? $this->attributes['anchor'] : '';

		$data_id = '';
		if ( isset( $this->attributes['advanceAnimation']['type'] ) && ! empty( $this->attributes['advanceAnimation']['type'] ) ) {
			$id_parts = explode( '-', $element_id );
			if ( count( $id_parts ) > 1 ) {
				$data_id = ' data-id="' . esc_attr( $id_parts[1] ) . '"';
			}
		}

		$class_name = 'guten-element guten-countdown ' . $element_id . ' ' . $animation_class . ' ' . $display_classes . $custom_classes;

		$id_attr = ! empty( $anchor ) ? ' id="' . esc_attr( $anchor ) . '"' : '';

		$content = '<div' . $id_attr . ' class="' . esc_attr( trim( $class_name ) ) . '" data-duedate="' . esc_attr( wp_json_encode( $due_date ) ) . '" data-expired="' . esc_attr(
			wp_json_encode(
				array(
					'action' => $expired_action,
					'url'    => $expired_url,
				)
			)
		) . '"' . $data_id . '>' . $this->render_content() . '</div>';
		$content = apply_filters( 'gutenverse_cursor_move_effect_script', $content, $this->attributes, $element_id );
		$content = apply_filters( 'gutenverse_advance_animation_script', $content, $this->attributes, $element_id, 'countdown' );

		return $content;
	}
}
