<?php
/**
 * Accordion Block class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\block
 */

namespace Gutenverse\Block;

use Gutenverse\Framework\Block\Block_Abstract;

/**
 * Class Accordion Block
 *
 * @package gutenverse\block
 */
class Accordion extends Block_Abstract {

	/**
	 * Render content
	 *
	 * @return string
	 */
	public function render_content() {
		$title            = isset( $this->attributes['title'] ) ? $this->attributes['title'] : '';
		$title_tag        = isset( $this->attributes['titleTag'] ) ? $this->attributes['titleTag'] : 'span';
		$icon_position    = isset( $this->attributes['iconPosition'] ) ? $this->attributes['iconPosition'] : 'left';
		$icon_open        = isset( $this->attributes['iconOpen'] ) ? $this->attributes['iconOpen'] : 'fas fa-minus';
		$icon_open_type   = isset( $this->attributes['iconOpenType'] ) ? $this->attributes['iconOpenType'] : 'icon';
		$icon_open_svg    = isset( $this->attributes['iconOpenSVG'] ) ? $this->attributes['iconOpenSVG'] : '';
		$icon_closed      = isset( $this->attributes['iconClosed'] ) ? $this->attributes['iconClosed'] : 'fas fa-plus';
		$icon_closed_type = isset( $this->attributes['iconClosedType'] ) ? $this->attributes['iconClosedType'] : 'icon';
		$icon_closed_svg  = isset( $this->attributes['iconClosedSVG'] ) ? $this->attributes['iconClosedSVG'] : '';

		$icon_open_html   = $this->render_icon( $icon_open_type, $icon_open, $icon_open_svg );
		$icon_closed_html = $this->render_icon( $icon_closed_type, $icon_closed, $icon_closed_svg );

		$icon_html = '<div class="accordion-icon">';
		$icon_html .= '<span class="accordion-icon-open">' . $icon_open_html . '</span>';
		$icon_html .= '<span class="accordion-icon-closed">' . $icon_closed_html . '</span>';
		$icon_html .= '</div>';

		$output = '<div class="accordion-heading">';
		if ( 'left' === $icon_position ) {
			$output .= $icon_html;
		}

		$output .= '<' . esc_attr( $title_tag ) . ' class="accordion-text">';
		$output .= wp_kses_post( $title );
		$output .= '</' . esc_attr( $title_tag ) . '>';

		if ( 'right' === $icon_position ) {
			$output .= $icon_html;
		}
		$output .= '</div>';

		$output .= '<div class="accordion-body">';
		$output .= '<div class="accordion-content">';
		$output .= $this->content;
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
		if ( ! empty( $this->content ) && apply_filters( 'gutenverse_static_to_dinamic_toggle', false ) ) {
			return $this->content;
		}
		$element_id      = $this->get_element_id();
		$display_classes = $this->set_display_classes();
		$animation_class = $this->set_animation_classes();
		$custom_classes  = $this->get_custom_classes();
		$first           = isset( $this->attributes['first'] ) ? $this->attributes['first'] : false;

		$class_name = 'accordion-item ' . $element_id;
		if ( $first ) {
			$class_name .= ' active';
		}
		$class_name .= $display_classes . $animation_class . $custom_classes;

		return '<div class="' . esc_attr( trim( $class_name ) ) . '">' . $this->render_content() . '</div>';
	}
}
