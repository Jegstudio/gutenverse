<?php
/**
 * Tab Block class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\block
 */

namespace Gutenverse\Block;

use Gutenverse\Framework\Block\Block_Abstract;

/**
 * Class Tab Block
 *
 * @package gutenverse\block
 */
class Tab extends Block_Abstract {

	/**
	 * Render content
	 *
	 * @return string
	 */
	public function render_content() {
		return $this->get_inner_blocks_content();
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

		$tab_id = isset( $this->attributes['tabId'] ) ? $this->attributes['tabId'] : '';
		$first  = isset( $this->attributes['first'] ) ? $this->attributes['first'] : false;

		$class_name = $tab_id . ' tab-body-item';
		if ( $first ) {
			$class_name .= ' active';
		}

		return '<div class="' . esc_attr( trim( $class_name ) ) . '" data-id="' . esc_attr( $tab_id ) . '">' . $this->render_content() . '</div>';
	}
}
