<?php
/**
 * Post Excerpt Block class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\block
 */

namespace Gutenverse\Block;

/**
 * Class Post Excerpt Block
 *
 * @package gutenverse\block
 */
class Post_Excerpt extends Block_Abstract {
	/**
	 * Render content
	 *
	 * @param int $post_id .
	 *
	 * @return string
	 */
	public function render_content( $post_id ) {
		$html_tag = esc_html( $this->attributes['htmlTag'] );
		$post_id  = $post_id ? $post_id : get_the_ID();

		if ( ! empty( $post_id ) ) {
			$post_excerpt = get_the_excerpt( $post_id );

			if ( ! empty( $post_excerpt ) ) {

				if ( isset( $this->attributes['showReadmore'] ) ) {
					$post_url      = get_post_permalink( $post_id );
					$readmore_text = $this->attributes['readmoreText'];
					$post_excerpt  = $post_excerpt . "<a href='{$post_url}'>{$readmore_text}</a>";
				}

				return "<{$html_tag}>{$post_excerpt}</{$html_tag}>";
			}
		}

		$no_excerpt = $this->attributes['noContentText'];

		return "<{$html_tag}>{$no_excerpt}</{$html_tag}>";
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
		$element_id      = $this->attributes['elementId'];
		$post_id         = esc_html( $this->context['postId'] );
		$display_classes = $this->set_display_classes();
		$animation_class = $this->set_animation_classes();

		return '<div class="' . $element_id . $display_classes . $animation_class . ' guten-post-excerpt guten-element">' . $this->render_content( $post_id ) . '</div>';
	}
}
