<?php
/**
 * Post Template Block class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\block
 */

namespace Gutenverse\Block;

use Gutenverse\Framework\Block\Block_Abstract;

/**
 * Class Post Template Block
 *
 * @package gutenverse\block
 */
class Post_Template extends Block_Abstract {
	/**
	 * Block instance.
	 *
	 * @var \WP_Block
	 */
	protected $block;

	/**
	 * Render
	 *
	 * @param array  $attributes Attributes.
	 * @param string $content    Content.
	 * @param object $fulldata   Full Data (Block Instance).
	 *
	 * @return mixed
	 */
	public function render( $attributes, $content, $fulldata ) {
		$this->block = $fulldata;
		return parent::render( $attributes, $content, $fulldata );
	}

	/**
	 * Render content
	 *
	 * @return string
	 */
	public function render_content() {
		// Get posts from context (passed by Query Loop).
		$posts = $this->context['gutenverse/queryPosts'] ?? array();

		if ( empty( $posts ) ) {
			return '<div class="guten-no-posts-found">' . esc_html__( 'No posts found.', 'gutenverse' ) . '</div>';
		}

		// Build wrapper classes (rendered once, matching editor's .guten-post-template).
		$classes = array(
			'guten-element',
			'guten-post-template',
			'guten-flex-container',
			isset( $this->attributes['containerLayout'] ) ? $this->attributes['containerLayout'] : '',
			isset( $this->attributes['elementId'] ) ? $this->attributes['elementId'] : '',
			isset( $this->attributes['className'] ) ? $this->attributes['className'] : '',
		);

		// Calculate data-id.
		$data_id = '';
		if ( isset( $this->attributes['elementId'] ) ) {
			$element_id_parts = explode( '-', $this->attributes['elementId'] );
			if ( isset( $element_id_parts[1] ) ) {
				$data_id = $element_id_parts[1];
			}
		}

		// Background & Overlay.
		$background_overlay = '';
		if ( isset( $this->attributes['backgroundOverlay'] ) && ! empty( $this->attributes['backgroundOverlay'] ) ) {
			$background_overlay = '<div class="guten-background-overlay"></div>';
		}

		// Background Video/Slide markup.
		$background_markup = '';
		if ( isset( $this->attributes['background'] ) && isset( $this->attributes['background']['backgroundType'] ) ) {
			$bg_type = $this->attributes['background']['backgroundType'];
			if ( 'video' === $bg_type && isset( $this->attributes['background']['videoUrl'] ) ) {
				$classes[]      = 'guten-video-background';
				$video_url      = $this->attributes['background']['videoUrl'];
				$background_markup .= '<div class="guten-video-background">';
				$background_markup .= '<video autoplay muted loop playsinline><source src="' . esc_url( $video_url ) . '" type="video/mp4"></video>';
				$background_markup .= '</div>';
			}
		}

		// Open the single outer wrapper.
		$content  = '<div class="' . \esc_attr( implode( ' ', array_filter( $classes ) ) ) . '" data-id="' . \esc_attr( $data_id ) . '">';
		$content .= $background_markup . $background_overlay;

		// Boxed layout gets an inner container.
		$container_layout = isset( $this->attributes['containerLayout'] ) ? $this->attributes['containerLayout'] : 'full-width';
		$is_boxed         = 'boxed' === $container_layout;

		if ( $is_boxed ) {
			$content .= '<div class="guten-inner-container">';
		}

		// Loop posts inside the wrapper as .guten-post-item children.
		foreach ( $posts as $post ) {
			setup_postdata( $post );
			$content .= $this->render_post_item( $post );
		}

		wp_reset_postdata();

		if ( $is_boxed ) {
			$content .= '</div>'; // Close .guten-inner-container.
		}

		$content .= '</div>'; // Close .guten-post-template wrapper.

		return $content;
	}

	/**
	 * Render a single post item with inner blocks.
	 *
	 * @param \WP_Post $post The post object.
	 *
	 * @return string
	 */
	protected function render_post_item( $post ) {
		// Build context for inner blocks.
		$block_context = array(
			'postId'   => $post->ID,
			'postType' => $post->post_type,
		);

		// Merge with existing context from parent.
		if ( isset( $this->block->context ) ) {
			$block_context = array_merge( $this->block->context, $block_context );
		}

		$inner_content = '';

		// Re-render each inner block with the post context.
		if ( isset( $this->block->inner_blocks ) ) {
			foreach ( $this->block->inner_blocks as $inner_block ) {
				$new_block      = new \WP_Block( $inner_block->parsed_block, $block_context );
				$inner_content .= $new_block->render();
			}
		}

		return '<div class="guten-post-item">' . $inner_content . '</div>';
	}

	/**
	 * Render view in editor.
	 */
	public function render_gutenberg() {
		return $this->render_content();
	}

	/**
	 * Render view in frontend.
	 */
	public function render_frontend() {
		return $this->render_content();
	}
}
