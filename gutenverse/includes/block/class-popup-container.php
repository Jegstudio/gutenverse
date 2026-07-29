<?php
/**
 * Popup Container Block class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\block
 */

namespace Gutenverse\Block;

use Gutenverse\Framework\Block\Block_Abstract;

/**
 * Class Popup Container Block
 *
 * @package gutenverse\block
 */
class Popup_Container extends Block_Abstract {

	/**
	 * Render content
	 *
	 * @return string
	 */
	public function render_content() {
		return '<div class="guten-popup-content-wrapper">' . $this->get_inner_blocks_content() . '</div>';
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

		$position = isset( $this->attributes['position'] ) ? $this->attributes['position'] : '';

		$class_name = trim( 'guten-element guten-popup-content-inner ' . $position );

		return '<div class="' . esc_attr( $class_name ) . '">' . $this->render_content() . '</div>';
	}
}
