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
class Social_Share_Tumblr extends Block_Abstract {
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
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
					<path d="M309.8 480.3c-13.6 14.5-50 31.7-97.4 31.7-120.8 0-147-88.8-147-140.6v-144H17.9c-5.5 0-10-4.5-10-10v-68c0-7.2 4.5-13.6 11.3-16 62-21.8 81.5-76 84.3-117.1.8-11 6.5-16.3 16.1-16.3h70.9c5.5 0 10 4.5 10 10v115.2h83c5.5 0 10 4.4 10 9.9v81.7c0 5.5-4.5 10-10 10h-83.4V360c0 34.2 23.7 53.6 68 35.8 4.8-1.9 9-3.2 12.7-2.2 3.5.9 5.8 3.4 7.4 7.9l22 64.3c1.8 5 3.3 10.6-.4 14.5z"/>
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

		return "<div class='gutenverse-share-tumblr gutenverse-share-item' id='{$this->get_element_id()}'>
			<a  aria-label='{$text}'>
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
		$share_url        = esc_url( 'https://www.tumblr.com/widgets/share/tool?canonicalUrl=' . $encoded_post_url . '&title=' . $title );
		$text             = esc_html( $this->attributes['text'] );
		$content          = $this->render_content( $text );

		return "<div class='gutenverse-share-tumblr gutenverse-share-item' id='{$this->get_element_id()}'>
			<a target='_blank' href='{$share_url}' aria-label='{$text}'>
				{$content}
			</a>
		</div>";
	}
}
