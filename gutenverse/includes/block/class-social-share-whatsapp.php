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
class Social_Share_Whatsapp extends Block_Abstract {
	/**
	 * $attributes, $content
	 *
	 * @return string
	 */
	public function render_content() {
		$share_text = $this->attributes['showText'] ? "<div class='gutenverse-share-text'>{$this->attributes['text']}</div>" : '';

		return "<div class='gutenverse-share-icon'>
				<i class='fab fa-whatsapp'></i>
			</div>{$share_text}";
	}

	/**
	 * Render view in editor
	 */
	public function render_gutenberg() {
		$content = $this->render_content();

		return "<div class='gutenverse-share-whatsapp gutenverse-share-item' id='{$this->attributes['elementId']}'>
			<a href='#' aria-label='{$this->attributes['text']}'>
				{$content}
			</a>
		</div>";
	}

	/**
	 * Render view in frontend
	 */
	public function render_frontend() {
		$post_id          = get_the_ID();
		$encoded_post_url = gutenverse_encode_url( $post_id );
		$title            = get_the_title( $post_id );
		$share_url        = '//api.whatsapp.com/send?text=' . $title . '%0A' . $encoded_post_url;
		$content          = $this->render_content();

		return "<div class='gutenverse-share-whatsapp gutenverse-share-item' id='{$this->attributes['elementId']}'>
			<a target='_blank' href='{$share_url}' aria-label='{$this->attributes['text']}'>
				{$content}
			</a>
		</div>";
	}
}
