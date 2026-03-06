<?php
/**
 * Post Date Block class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\block
 */

namespace Gutenverse\Block;

use Gutenverse\Framework\Block\Block_Abstract;

/**
 * Class Post Date Block
 *
 * @package gutenverse\block
 */
class Post_Date extends Block_Abstract {
	/**
	 * Render content
	 *
	 * @param int $post_id .
	 *
	 * @return string
	 */
	public function render_content( $post_id ) {
		$type          = esc_html( $this->attributes['dateType'] );
		$format        = esc_html( $this->attributes['dateFormat'] );
		$custom_format = esc_html( $this->attributes['customFormat'] );
		$html_tag      = esc_html( $this->check_tag( $this->attributes['htmlTag'], 'p' ) );
		$link_to       = esc_html( $this->attributes['linkTo'] );

		if ( ! empty( $post_id ) ) {
			if ( 'both' === $type ) {
				$publish_date = gutenverse_get_post_date( $post_id, $format, 'published', $custom_format );
				$modify_date  = gutenverse_get_post_date( $post_id, $format, 'modified', $custom_format );

				$date = $publish_date === $modify_date ? $publish_date : $publish_date . esc_html__( ' - Updated on ', 'gutenverse' ) . $modify_date;
			} else {
				$date = gutenverse_get_post_date( $post_id, $format, $type, $custom_format );
			}

			if ( ! empty( $date ) ) {
				switch ( $link_to ) {
					case 'home':
						$home_url = get_home_url();
						$date     = "<a href='{$home_url}'>{$date}</a>";
						break;
					case 'post':
						$post_url = get_permalink( $post_id );
						$date     = "<a href='{$post_url}'>{$date}</a>";
						break;
					case 'custom':
						$custom_url = ! empty( $this->attributes['customURL'] ) ? esc_url( $this->attributes['customURL'] ) : '';
						$date       = ! empty( $custom_url ) ? "<a href='{$custom_url}'>{$date}</a>" : $date;
						break;
					default:
						break;
				}

				return "<{$html_tag}>{$date}</{$html_tag}>";
			}
		}

		return $this->empty_content();
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

		return '<div class="' . $element_id . $display_classes . $animation_class . $custom_classes . ' guten-post-date guten-element">' . $this->render_content( $post_id ) . '</div>';
	}
}
