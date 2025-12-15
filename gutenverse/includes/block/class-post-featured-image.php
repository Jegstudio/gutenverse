<?php
/**
 * Post Featured Image Block class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\block
 */

namespace Gutenverse\Block;

use Gutenverse\Framework\Block\Block_Abstract;

/**
 * Class Post Featured Image Block
 *
 * @package gutenverse\block
 */
class Post_Featured_Image extends Block_Abstract {
	/**
	 * Render content
	 *
	 * @param int $post_id .
	 *
	 * @return string
	 */
	public function render_content( $post_id ) {
		$element_id      = esc_html( $this->get_element_id() );
		$post_link       = ! empty( $this->attributes['postLink'] ) ? $this->attributes['postLink'] : false;
		$placeholder_img = ! empty( $this->attributes['placeholderImg'] ) ? $this->attributes['placeholderImg'] : false;
		$display_classes = $this->set_display_classes();
		$animation_class = $this->set_animation_classes();
		$post_url        = get_permalink( $post_id );
		$post_featured   = get_the_post_thumbnail_url( $post_id, 'full' );
		$custom_classes  = $this->get_custom_classes();
		$content         = '';

		if ( ! empty( $post_featured ) ) {
			$content = '<img alt="" src="' . $post_featured . '"/>';
			if ( $this->attributes['imageLazy'] ) {
				$content = '<img alt="" src="' . $post_featured . '" loading="lazy" />';
			}
		} elseif ( ! empty( $placeholder_img ) ) {
			$content = '<img alt="" src="' . esc_url( GUTENVERSE_URL . '/assets/img/img-placeholder.jpg' ) . '"/>';
			if ( $this->attributes['imageLazy'] ) {
				$content = '<img alt="" src="' . esc_url( GUTENVERSE_URL . '/assets/img/img-placeholder.jpg' ) . '" loading="lazy"/>';
			}
		}

		if ( ! empty( $post_link ) && ! empty( $post_url ) ) {
			$content = '<a href="' . $post_url . '" class="' . $element_id . $display_classes . $animation_class . $custom_classes . ' guten-element guten-post-featured-image">' . $content . '</a>';
		} else {
			$content = '<div class="' . $element_id . $display_classes . $animation_class . $custom_classes . ' guten-element guten-post-featured-image">' . $content . '</div>';
		}

		return $content;
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
		$post_id = ! empty( $this->context['postId'] ) ? esc_html( $this->context['postId'] ) : get_the_ID();

		return $this->render_content( $post_id );
	}
}
