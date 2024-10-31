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
class Social_Share_Twitter extends Block_Abstract {
	/**
	 * $attributes, $content
	 *
	 * @param string $text .
	 *
	 * @return string
	 */
	public function render_content( $text, $selected ) {
		$share_text = $this->attributes['showText'] ? "<div class='gutenverse-share-text'>{$text}</div>" : '';
		return "<div class='gutenverse-share-icon'>
				<i class='fab fa-{$selected}'></i>
			</div>{$share_text}";
	}

	/**
	 * Render view in editor
	 */
	public function render_gutenberg() {
		$text     = esc_html( $this->attributes['text'] );
		$selected = isset( $this->attributes['selectedIcon'] ) ? esc_html( $this->attributes['selectedIcon'] ) : 'twitter';
		$content  = $this->render_content( $text, $selected );

		return "<div class='gutenverse-share-twitter gutenverse-share-item {$selected}' id='{$this->get_element_id()}'>
			<a href='#' aria-label='{$text}'>
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
		$share_url        = esc_url( 'https://twitter.com/intent/tweet?text=' . $title . '&url=' . $encoded_post_url );
		$text             = esc_html( $this->attributes['text'] );
		$selected         = isset( $this->attributes['selectedIcon'] ) ? esc_html( $this->attributes['selectedIcon'] ) : 'twitter';
		$content          = $this->render_content( $text, $selected );

		return "<div class='gutenverse-share-twitter gutenverse-share-item {$selected}' id='{$this->get_element_id()}'>
			<a target='_blank' href='{$share_url}' aria-label='{$text}'>
				{$content}
			</a>
		</div>";
	}
}
