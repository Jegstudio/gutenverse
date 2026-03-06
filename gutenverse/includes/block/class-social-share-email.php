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
class Social_Share_Email extends Block_Abstract {
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
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
						<path d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z"/>
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

		return "<div class='gutenverse-share-email gutenverse-share-item' id='{$this->get_element_id()}'>
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
		$encoded_post_url = gutenverse_encode_url( $post_id );
		$title            = get_the_title( $post_id );
		$share_url        = 'mailto:?subject=' . $title . '&amp;body=' . $encoded_post_url;
		$text             = esc_html( $this->attributes['text'] );
		$content          = $this->render_content( $text );

		return "<div class='gutenverse-share-email gutenverse-share-item' id='{$this->get_element_id()}'>
			<a target='_blank' href='{$share_url}' aria-label='{$text}'>
				{$content}
			</a>
		</div>";
	}
}
