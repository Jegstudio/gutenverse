<?php
/**
 * Search Result Title Block class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\block
 */

namespace Gutenverse\Block;

use Gutenverse\Framework\Block\Block_Abstract;

/**
 * Class Search Result Title Block
 *
 * @package gutenverse\block
 */
class Search_Result_Title extends Block_Abstract {

	/**
	 * Render content
	 *
	 * @return string
	 */
	public function render_content() {
		$html_tag     = esc_html( $this->check_tag( $this->attributes['htmlTag'], 'h2' ) );
		$search_input = esc_html( get_query_var( 's' ) );
		$static_text  = esc_html( $this->attributes['staticText'] ? $this->attributes['staticText'] : 'Search Result For:' );
		return "<{$html_tag}>{$static_text} <span class='search-input-text'>{$search_input}</span></{$html_tag}>";
	}

	/**
	 * Render view in editor
	 */
	public function render_gutenberg() {
		return null;
	}

	/**
	 * Render view in frontend
	 *
	 * @return string
	 */
	public function render_frontend() {
		$element_id      = $this->get_element_id();
		$display_classes = $this->set_display_classes();
		$animation_class = $this->set_animation_classes();
		$custom_classes  = $this->get_custom_classes();

		return '<div class="' . $element_id . $display_classes . $animation_class . $custom_classes . ' guten-search-result-title guten-element">' . $this->render_content() . '</div>';
	}
}
