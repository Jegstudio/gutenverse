<?php
/**
 * Archive Title Block class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\block
 */

namespace Gutenverse\Block;

use Gutenverse\Framework\Block\Block_Abstract;

/**
 * Class Archive Title Block
 *
 * @package gutenverse\block
 */
class Archive_Title extends Block_Abstract {

	/**
	 * Render content
	 *
	 * @param string $archive_title .
	 * @param string $category_url .
	 *
	 * @return string
	 */
	public function render_content( $archive_title, $category_url ) {
		$html_tag     = esc_html( $this->check_tag( $this->attributes['htmlTag'], 'h2' ) );
		$archive_link = ! empty( $this->attributes['archiveLink'] ) ? $this->attributes['archiveLink'] : false;
		$link_target  = ! empty( $this->attributes['archiveLinkTarget'] ) ? '_blank' : '_self';
		$link_rel     = ! empty( $this->attributes['archiveLinkRel'] ) ? esc_attr( $this->attributes['archiveLinkRel'] ) : 'noreferrer';

		if ( $archive_link ) {
			$archive_title = "<a href='{$category_url}' target='{$link_target}' rel='{$link_rel}'>{$archive_title}</a>";
		}

		return "<{$html_tag}>{$archive_title}</{$html_tag}>";
	}

	/**
	 * Render view in editor
	 */
	public function render_gutenberg() {
		return null;
	}

	/**
	 * Render view in frontend
	 *
	 * @return string
	 */
	public function render_frontend() {
		$element_id      = $this->get_element_id();
		$display_classes = $this->set_display_classes();
		$animation_class = $this->set_animation_classes();
		$custom_classes  = $this->get_custom_classes();
		$title           = 'Archive Title';
		$category_url    = '#';

		if ( is_category() || is_tag() ) {
			$title            = single_term_title( '', false );
			$current_category = get_queried_object();
			$category_url     = get_term_link( $current_category );
		}

		return '<div class="' . $element_id . $display_classes . $animation_class . $custom_classes . ' guten-archive-title guten-element">' . $this->render_content( $title, $category_url ) . '</div>';
	}
}
