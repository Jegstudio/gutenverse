<?php
/**
 * Social Share Perflexity Block class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\block
 */

namespace Gutenverse\Block;

use Gutenverse\Framework\Block\Block_Abstract;

/**
 * Class Social Share Perflexity Block
 *
 * @package gutenverse\block
 */
class Social_Share_Perflexity extends Block_Abstract {
	/**
	 * Render button content.
	 *
	 * @param string $text Button text.
	 *
	 * @return string
	 */
	public function render_content( $text ) {
		$share_text = ! isset( $this->attributes['showText'] ) || $this->attributes['showText'] ? "<div class='gutenverse-share-text'>{$text}</div>" : '';

		return '<div class="gutenverse-share-icon">
			<div class="gutenverse-icon-svg">
				<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 21 24"><path d="M17.36 2.72 12.27 6.97h5.09V2.72Zm-6.2 3.55L18.62.05v6.92H21v10.46h-2.86V24l-6.98-6.32v6.12H9.9v-6.12L2.76 23.97v-6.54H0V6.97h2.86V0L9.9 6.2V.13h1.26v6.14ZM9 8.21H1.25v7.98h1.51v-1.98l6.24-6Zm3.06 0 6.07 6.01v1.97h1.6V8.21h-7.68ZM8.89 6.97 4.12 2.77v4.2H8.9Zm1.01 9.05V9.08l-5.88 5.65v6.47l5.88-5.18Zm1.27-6.93v6.92l5.7 5.17v-6.45l-5.7-5.64Z"/></svg>
			</div>
		</div>' . $share_text;
	}

	/**
	 * Render view in editor.
	 */
	public function render_gutenberg() {
		$text     = esc_html( $this->attributes['text'] );
		$content  = $this->render_content( $text );
		$has_text = ! isset( $this->attributes['showText'] ) || $this->attributes['showText'] ? ' has-text' : '';

		return "<div class='gutenverse-share-perflexity gutenverse-share-item{$has_text}' id='{$this->get_element_id()}'>
			<a aria-label='{$text}'>
				{$content}
			</a>
		</div>";
	}

	/**
	 * Render view in frontend.
	 */
	public function render_frontend() {
		$post_id   = get_the_ID();
		$post_url  = get_permalink( $post_id );
		$share_url = esc_url( 'https://www.perplexity.ai/search/new?q=' . $this->get_prompt_query( $post_url ) );
		$text      = esc_html( $this->attributes['text'] );
		$content   = $this->render_content( $text );
		$has_text  = ! isset( $this->attributes['showText'] ) || $this->attributes['showText'] ? ' has-text' : '';

		return "<div class='gutenverse-share-perflexity gutenverse-share-item{$has_text}' id='{$this->get_element_id()}'>
			<a target='_blank' href='{$share_url}' aria-label='{$text}'>
				{$content}
			</a>
		</div>";
	}

	/**
	 * Get encoded AI prompt query.
	 *
	 * @param string $url Post url.
	 *
	 * @return string
	 */
	private function get_prompt_query( $url ) {
		$additional_prompt = isset( $this->attributes['additionalAIPrompt'] ) ? wp_strip_all_tags( $this->attributes['additionalAIPrompt'] ) : '';
		$additional_prompt = ! empty( $additional_prompt ) ? ', and ' . $additional_prompt : '';
		$prompt            = __( 'Visit this URL', 'gutenverse' ) . ' ' . $url . ' ' . __( 'and sumarize this post for me', 'gutenverse' ) . $additional_prompt;

		return urlencode( $prompt );
	}
}
