<?php
/**
 * Social Share Block class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\block
 */

namespace Gutenverse\Block;

use Gutenverse\Framework\Block\Block_Abstract;

/**
 * Class Social Share Block
 *
 * @package gutenverse\block
 */
class Social_Share_Pinterest extends Block_Abstract {
	/**
	 * $attributes, $content
	 *
	 * @param string $text .
	 *
	 * @return string
	 */
	public function render_content( $text ) {
		$share_text = $this->attributes['showText'] ? "<div class='gutenverse-share-text'>{$text}</div>" : '';

		return '<div class="gutenverse-share-icon">
			<div class="gutenverse-icon-svg">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
					<path d="M496 256c0 137-111 248-248 248-25.6 0-50.2-3.9-73.4-11.1 10.1-16.5 25.2-43.5 30.8-65 3-11.6 15.4-59 15.4-59 8.1 15.4 31.7 28.5 56.8 28.5 74.8 0 128.7-68.8 128.7-154.3 0-81.9-66.9-143.2-152.9-143.2-107 0-163.9 71.8-163.9 150.1 0 36.4 19.4 81.7 50.3 96.1 4.7 2.2 7.2 1.2 8.3-3.3.8-3.4 5-20.3 6.9-28.1.6-2.5.3-4.7-1.7-7.1-10.1-12.5-18.3-35.3-18.3-56.6 0-54.7 41.4-107.6 112-107.6 60.9 0 103.6 41.5 103.6 100.9 0 67.1-33.9 113.6-78 113.6-24.3 0-42.6-20.1-36.7-44.8 7-29.5 20.5-61.3 20.5-82.6 0-19-10.2-34.9-31.4-34.9-24.9 0-44.9 25.7-44.9 60.2 0 22 7.4 36.8 7.4 36.8s-24.5 103.8-29 123.2c-5 21.4-3 51.6-.9 71.2C65.4 450.9 0 361.1 0 256 0 119 111 8 248 8s248 111 248 248z"/>
				</svg>
			</div>
		</div>' . $share_text;
	}

	/**
	 * Render view in editor
	 */
	public function render_gutenberg() {
		$text    = esc_html( $this->attributes['text'] );
		$content = $this->render_content( $text );

		return "<div class='gutenverse-share-pinterest gutenverse-share-item' id='{$this->get_element_id()}'>
			<a aria-label='{$text}'>
				{$content}
			</a>
		</div>";
	}

	/**
	 * Render view in frontend
	 */
	public function render_frontend() {
		$post_id          = get_the_ID();
		$title            = get_the_title( $post_id );
		$encoded_post_url = gutenverse_encode_url( $post_id );
		$image            = wp_get_attachment_image_src( get_post_thumbnail_id( $post_id ), 'full' );
		$image_url        = $image ? $image[0] : '';
		$share_url        = esc_url( 'https://www.pinterest.com/pin/create/bookmarklet/?pinFave=1&url=' . $encoded_post_url . '&media=' . $image_url . '&description=' . $title );
		$text             = esc_html( $this->attributes['text'] );
		$content          = $this->render_content( $text );

		return "<div class='gutenverse-share-pinterest gutenverse-share-item' id='{$this->get_element_id()}'>
			<a target='_blank' href='{$share_url}' aria-label='{$text}'>
				{$content}
			</a>
		</div>";
	}
}
