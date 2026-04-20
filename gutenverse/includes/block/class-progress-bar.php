<?php
/**
 * Progress Bar Block class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\block
 */

namespace Gutenverse\Block;

use Gutenverse\Framework\Block\Block_Abstract;

/**
 * Class Progress Bar Block
 *
 * @package gutenverse\block
 */
class Progress_Bar extends Block_Abstract {

	/**
	 * Render content logic.
	 *
	 * @return string
	 */
	public function render_content() {
		$title           = isset( $this->attributes['title'] ) ? $this->attributes['title'] : 'Progress Bar';
		$style           = isset( $this->attributes['style'] ) ? $this->attributes['style'] : 'default';
		$arrow_icon      = isset( $this->attributes['arrowIcon'] ) ? $this->attributes['arrowIcon'] : 'fas fa-arrow-right';
		$arrow_icon_type = isset( $this->attributes['arrowIconType'] ) ? $this->attributes['arrowIconType'] : 'icon';
		$arrow_icon_svg  = isset( $this->attributes['arrowIconSVG'] ) ? $this->attributes['arrowIconSVG'] : '';
		$percentage      = isset( $this->attributes['percentage'] ) ? (int) $this->attributes['percentage'] : 75;
		$duration        = isset( $this->attributes['duration'] ) ? (int) $this->attributes['duration'] : 3500;

		$inner_content = '';
		if ( 'switch' === $style ) {
			$inner_content = '
				<div class="content-group">
					<div class="skill-bar-content">
						<span class="skill-title">' . wp_kses_post( $title ) . '</span>
					</div>
					<div class="skill-bar">
						<div class="skill-track" data-width="' . esc_attr( $percentage ) . '" data-duration="' . esc_attr( $duration ) . '">
						</div>
					</div>
				</div>
				<div class="number-percentage-wrapper">
					<span class="number-percentage loaded"></span>
				</div>';
		} else {
			$track_icon = '';
			if ( 'inner-content' === $style ) {
				$track_icon = '<span class="skill-track-icon">' . $this->render_icon( $arrow_icon_type, $arrow_icon, $arrow_icon_svg ) . '</span>';
			}

			$inner_content = '
				<div class="skill-bar-content">
					<span class="skill-title">' . wp_kses_post( $title ) . '</span>
				</div>
				<div class="skill-bar">
					<div class="skill-track" data-width="' . esc_attr( $percentage ) . '" data-duration="' . esc_attr( $duration ) . '">
						' . $track_icon . '
						<div class="number-percentage-wrapper">
							<span class="number-percentage loaded"></span>
						</div>
					</div>
				</div>';
		}

		$wrapper_class = 'progress-group' . ( ( $style && 'default' !== $style ) ? ' ' . $style : '' );

		return '<div class="' . esc_attr( $wrapper_class ) . '">
					<div class="progress-skill-bar">
						' . $inner_content . '
					</div>
				</div>';
	}

	/**
	 * Render view in editor.
	 */
	public function render_gutenberg() {
		return $this->render_content();
	}

	/**
	 * Render view in frontend.
	 */
	public function render_frontend() {
		if ( ! empty( trim( $this->block_data->inner_html ) ) && apply_filters( 'gutenverse_force_dynamic', false ) ) {
			return $this->content;
		}
		$element_id      = $this->get_element_id();
		$display_classes = $this->set_display_classes();
		$animation_class = $this->set_animation_classes();
		$custom_classes  = $this->get_custom_classes();
		$anchor          = isset( $this->attributes['anchor'] ) ? $this->attributes['anchor'] : '';
		$anchor_attr     = ! empty( $anchor ) ? ' id="' . esc_attr( $anchor ) . '"' : '';

		$data_id = '';
		if ( isset( $this->attributes['advanceAnimation']['type'] ) && ! empty( $this->attributes['advanceAnimation']['type'] ) ) {
			$id_parts = explode( '-', $element_id );
			if ( count( $id_parts ) > 1 ) {
				$data_id = ' data-id="' . esc_attr( $id_parts[1] ) . '"';
			}
		}

		$class_name      = trim( "guten-element guten-progress-bar no-margin $element_id $animation_class $display_classes $custom_classes" );

		$content = '<div' . $anchor_attr . ' class="' . esc_attr( $class_name ) . '"' . $data_id . '>' . $this->render_content() . '</div>';
		$content = apply_filters( 'gutenverse_cursor_move_effect_script', $content, $this->attributes, $element_id );
		$content = apply_filters( 'gutenverse_advance_animation_script', $content, $this->attributes, $element_id, 'progress-bar' );

		return $content;
	}
}
