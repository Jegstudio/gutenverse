<?php
/**
 * Post Terms Block class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\block
 */

namespace Gutenverse\Block;

use Gutenverse\Framework\Block\Block_Abstract;

/**
 * Class Post Terms Block
 *
 * @package gutenverse\block
 */
class Post_Terms extends Block_Abstract {
	/**
	 * Render content
	 *
	 * @param int $post_id .
	 *
	 * @return string
	 */
	public function render_content( $post_id ) {
		$element_id     = esc_html( $this->get_element_id() );
		$html_tag       = esc_html( $this->check_tag( $this->attributes['htmlTag'], 'p' ) );
		$taxonomy       = esc_html( $this->attributes['taxonomy'] );
		$separator      = esc_html( $this->attributes['separator'] );
		$link_to        = $this->attributes['linkTo'];
		$content_type   = esc_attr( $this->attributes['contentType'] );
		$inline_display = isset( $this->attributes['inlineDisplay'] ) ? esc_attr( $this->attributes['inlineDisplay'] ) : false;
		if ( ! empty( $post_id ) ) {
			$term_list = get_the_terms( $post_id, $taxonomy );
			$content   = '';

			if ( 'block' === $content_type ) {
				if ( ! empty( $term_list ) ) {
					$content = "<div class='post-term-block'>";
					if ( $inline_display ) {
						$content = "<div class='post-term-block inline-display'>";
					}
					foreach ( $term_list as $key => $term ) {
						$term_name = $term->name;
						if ( 'term' === $link_to ) {
							$link     = get_term_link( $term );
							$content .= "<a href='{$link}' class='term-item'><{$html_tag}>$term_name</{$html_tag}></a>";
						} else {
							$content .= "<{$html_tag} class='term-item' >$term_name</{$html_tag}>";
						}
					}
					$content .= '</div>';
					return $content;
				}
				return "<div class='post-term-block'><{$html_tag} class='term-item'>No Terms Found</{$html_tag}></div>";
			} else {
				if ( ! empty( $term_list ) ) {
					$count = count( $term_list );

					$term = $term_list[0]->name;

					if ( 'term' === $link_to ) {
						$term = sprintf( '<a href="%1$s">%2$s</a>', esc_url( get_term_link( $term_list[0] ) ), $term );
					}

					$content .= sprintf( '<%1$s class="term-list">%2$s</%1$s>', $html_tag, $term );

					for ( $i = 1; $i < $count; $i++ ) {
						$term = $term_list[ $i ]->name;

						if ( 'term' === $link_to ) {
							$term = sprintf( '<a href="%1$s">%2$s</a>', esc_url( get_term_link( $term_list[ $i ] ) ), $term );
						}

						$content .= sprintf( '%1$s  <%2$s class="term-list">%3$s</%2$s>', $separator, $html_tag, $term );
					}

					$content = sprintf( '<span>%1$s</span>', $content, $element_id );

					return $content;
				}
				return "<span class='guten-post-terms'><span class=\"term-item\">example</span>, <span class=\"term-item\">category</span>, <span class=\"term-item\">and</span>, <span class=\"term-item\">terms</span></span>";

			}
		}

		return $this->empty_content();
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
		$post_id         = ! empty( $this->context['postId'] ) ? esc_html( $this->context['postId'] ) : get_the_ID();
		$element_id      = $this->get_element_id();
		$display_classes = $this->set_display_classes();
		$animation_class = $this->set_animation_classes();
		$custom_classes  = $this->get_custom_classes();

		return '<div class="' . $element_id . $display_classes . $animation_class . $custom_classes . ' guten-post-terms guten-element">' . $this->render_content( $post_id ) . '</div>';
	}
}
