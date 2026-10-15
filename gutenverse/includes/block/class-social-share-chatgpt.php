<?php
/**
 * Social Share ChatGPT Block class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\block
 */

namespace Gutenverse\Block;

use Gutenverse\Framework\Block\Block_Abstract;

/**
 * Class Social Share ChatGPT Block
 *
 * @package gutenverse\block
 */
class Social_Share_Chatgpt extends Block_Abstract {
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
				<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 24 24"><path d="M9.21 8.74V6.46c0-.19.07-.34.24-.43l4.54-2.64c.62-.36 1.36-.53 2.12-.53 2.85 0 4.66 2.23 4.66 4.61 0 .17 0 .36-.02.55l-4.71-2.78a.789.789 0 0 0-.86 0l-5.97 3.5Zm10.61 8.88v-5.45c0-.34-.14-.58-.43-.74l-5.97-3.5 1.95-1.13c.17-.1.31-.1.48 0l4.54 2.64c1.31.77 2.19 2.4 2.19 3.98 0 1.82-1.07 3.5-2.76 4.2ZM7.8 12.82l-1.95-1.15a.456.456 0 0 1-.24-.43V5.95c0-2.57 1.95-4.51 4.59-4.51 1 0 1.93.34 2.71.94L8.22 5.12c-.29.17-.43.41-.43.74v6.96Zm4.2 2.45-2.79-1.58v-3.36L12 8.75l2.79 1.58v3.36L12 15.27Zm1.8 7.3c-1 0-1.93-.34-2.71-.94l4.69-2.74c.29-.17.43-.41.43-.74v-6.96l1.97 1.15c.17.1.24.24.24.43v5.28c0 2.57-1.97 4.51-4.61 4.51Zm-5.64-5.35-4.54-2.64c-1.31-.77-2.19-2.4-2.19-3.98 0-1.85 1.09-3.5 2.78-4.2v5.47c0 .34.14.58.43.74l5.95 3.48-1.95 1.13c-.17.1-.31.1-.48 0Zm-.26 3.94c-2.69 0-4.66-2.04-4.66-4.56 0-.19.02-.38.05-.58l4.69 2.74c.29.17.57.17.86 0l5.97-3.48v2.28c0 .19-.07.34-.24.43l-4.54 2.64c-.62.36-1.36.53-2.12.53Zm5.9 2.86c2.88 0 5.28-2.06 5.83-4.8 2.66-.7 4.38-3.22 4.38-5.78 0-1.68-.71-3.31-2-4.49.12-.5.19-1.01.19-1.51 0-3.43-2.76-6-5.95-6-.64 0-1.26.1-1.88.31A5.926 5.926 0 0 0 10.21.02c-2.88 0-5.28 2.06-5.83 4.8C1.71 5.5 0 8.02 0 10.58c0 1.68.71 3.31 2 4.49-.12.5-.19 1.01-.19 1.51 0 3.43 2.76 6 5.95 6 .64 0 1.26-.1 1.88-.31A5.908 5.908 0 0 0 13.8 24Z"/></svg>
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

		return "<div class='gutenverse-share-chatgpt gutenverse-share-item{$has_text}' id='{$this->get_element_id()}'>
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
		$share_url = esc_url( 'https://chat.openai.com/?q=' . $this->get_prompt_query( $post_url ) );
		$text      = esc_html( $this->attributes['text'] );
		$content   = $this->render_content( $text );
		$has_text  = ! isset( $this->attributes['showText'] ) || $this->attributes['showText'] ? ' has-text' : '';

		return "<div class='gutenverse-share-chatgpt gutenverse-share-item{$has_text}' id='{$this->get_element_id()}'>
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
