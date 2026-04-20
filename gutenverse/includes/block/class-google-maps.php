<?php
/**
 * Google Maps Block class
 *
 * @author Jegstudio
 * @since 3.3.0
 * @package gutenverse\block
 */

namespace Gutenverse\Block;

use Gutenverse\Framework\Block\Block_Abstract;

/**
 * Class Google Maps Block
 *
 * @package gutenverse\block
 */
class Google_Maps extends Block_Abstract {
	/**
	 * Render content
	 *
	 * @param int $post_id .
	 *
	 * @return string
	 */
	public function render_content( $post_id ) {
		$location = isset( $this->attributes['location'] ) ? $this->attributes['location'] : 'New York';
		$zoom     = isset( $this->attributes['zoom'] ) ? $this->attributes['zoom'] : '13';

		$parameter = array(
			'q'      => $location,
			'z'      => $zoom,
			't'      => 'm',
			'output' => 'embed',
			'iwloc'  => 'near',
		);

		return '<iframe frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0" src="" title="' . esc_attr( $location ) . '"></iframe>';
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
		$element_id      = $this->get_element_id();
		$anchor          = isset( $this->attributes['anchor'] ) ? $this->attributes['anchor'] : '';
		$display_classes = $this->set_display_classes();
		$animation_class = $this->set_animation_classes();
		$custom_classes  = $this->get_custom_classes();
		$location        = isset( $this->attributes['location'] ) ? $this->attributes['location'] : 'New York';
		$zoom            = isset( $this->attributes['zoom'] ) ? $this->attributes['zoom'] : '13';

		$parameter = array(
			'q'      => $location,
			'z'      => $zoom,
			't'      => 'm',
			'output' => 'embed',
			'iwloc'  => 'near',
		);

		$url = 'https://maps.google.com/maps?' . http_build_query( $parameter );

		$data_id = '';
		if ( isset( $this->attributes['advanceAnimation']['type'] ) && ! empty( $this->attributes['advanceAnimation']['type'] ) ) {
			$id_parts = explode( '-', $element_id );
			if ( count( $id_parts ) > 1 ) {
				$data_id = ' data-id="' . esc_attr( $id_parts[1] ) . '"';
			}
		}

		$id_attr = ! empty( $anchor ) ? ' id="' . esc_attr( $anchor ) . '"' : '';
		$content = '<div' . $id_attr . ' class="' . esc_attr( trim( 'guten-element gutenverse-maps guten-maps ' . $element_id . ' ' . $animation_class . ' ' . $display_classes . $custom_classes ) ) . '" data-src="' . esc_url( $url ) . '"' . $data_id . '>
					' . $this->render_content( 0 ) . '
				</div>';
		$content = apply_filters( 'gutenverse_cursor_move_effect_script', $content, $this->attributes, $element_id );
		$content = apply_filters( 'gutenverse_advance_animation_script', $content, $this->attributes, $element_id, 'google-maps' );

		return $content;
	}
}
