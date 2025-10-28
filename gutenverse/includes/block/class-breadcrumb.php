<?php
/**
 * Archive Title Block class
 *
 * @author Jegstudio
 * @since 3.3.0
 * @package gutenverse\block
 */

namespace Gutenverse\Block;

use Gutenverse\Framework\Block\Block_Abstract;

/**
 * Class Breadcrumb Block
 *
 * @package gutenverse\block
 */
class Breadcrumb extends Block_Abstract {
	/**
	 * Render content
	 *
	 * @param int $post_id .
	 *
	 * @return string
	 */
	public function render_content( $post_id ) {
		return '<nav class="breadcrumb-nav" aria-label="Breadcrumb" itemscope itemtype="https://schema.org/BreadcrumbList">
					<ol>'
						. $this->render_breadcrumbs( $post_id ) .
					'</ol>
				</nav>';
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
		if ( is_home() ) {
			return '';
		}
		$post_id         = ! empty( $this->context['postId'] ) ? esc_html( $this->context['postId'] ) : get_the_ID();
		$element_id      = $this->get_element_id();
		$display_classes = $this->set_display_classes();
		$animation_class = $this->set_animation_classes();
		$custom_classes  = $this->get_custom_classes();

		return '<div class="'
							. $element_id
							. $display_classes
							. $animation_class
							. $custom_classes
							. ' guten-breadcrumb guten-element">'
							. $this->render_content( $post_id ) .
				'</div>';
	}

	// === PRIVATE ===

	/**
	 * Undocumented function
	 *
	 * @param string $id id.
	 *
	 * @return string
	 */
	private function render_breadcrumbs( $id ) {
		$data        = $this->get_data( $id );
		$component   = '';
		$data_length = count( $data );

		for ( $index = 0; $index < $data_length; $index++ ) {

			$is_not_last = $index < ( $data_length - 1 );

			if ( $is_not_last ) {
				$component .= '
				<li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
					<a itemprop="item" href="' . $data[ $index ]['url'] . '">
						<span itemprop="name" class="breadcrumb-link">' . $data[ $index ]['name'] . '</span>
					</a>
					<meta itemprop="position" content="' . $index + 1 . '" />
				</li>
				<li class="separator">
                    <i class="' . $this->attributes['separatorIcon'] . '"></i>
                </li>';
			} else {
				$component .= '
				<li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
                    <span itemprop="name" class="breadcrumb-text">' . $data[ $index ]['name'] . '</span>
					<meta itemprop="position" content="' . $index + 1 . '" />
                </li>';
			}
		}
		return $component;
	}

	/**
	 * Undocumented function
	 *
	 * @param string $id id.
	 *
	 * @return array
	 */
	private function get_data( $id ) {
		$initial_data = array(
			array(
				'name' => esc_html__( 'Home', 'gutenverse' ),
				'url'  => gutenverse_home_url_multilang(),
			),
		);
		if ( is_404() ) {
			return $this->default_data( $initial_data, esc_html__( 'Page Not Found', 'gutenverse' ) );
		}
		if ( is_search() ) {
			return $this->default_data( $initial_data, esc_html__( 'Search', 'gutenverse' ) );
		}
		if ( is_category() || is_tax() ) {
			return $this->taxonomy_category_data( $initial_data );
		}
		if ( is_tag() ) {
			return $this->tag_data( $initial_data );
		}
		if ( is_single() ) {
			return $this->post_data( $initial_data, $id );
		}
		if ( is_attachment() ) {
			return $this->attachment_data( $initial_data );
		}
		if ( is_author() ) {
			return $this->default_data( $initial_data, esc_html__( 'Author', 'gutenverse' ) );
		}
		return array();
	}

	/**
	 * Get Tag data for breadcrumb.
	 *
	 * @param array $initial_data initial data.
	 * @return array
	 */
	private function tag_data( $initial_data ) {
		$initial_data[] = array(
			'name' => single_tag_title( '', false ),
			'url'  => '',
		);
		return $initial_data;
	}

	/**
	 * Get author data
	 *
	 * @param array  $initial_data initial data.
	 * @param string $name name.
	 *
	 * @return array
	 */
	private function default_data( $initial_data, $name = '' ) {
		$initial_data[] = array(
			'name' => $name,
			'url'  => '',
		);
		return $initial_data;
	}

	/**
	 * Undocumented function
	 *
	 * @param array         $initial_data initial data.
	 * @param \WP_Term|null $term term.
	 *
	 * @return array
	 */
	private function taxonomy_category_data( $initial_data, $term = null ) {
		if ( is_null( $term ) ) {
			$term = get_queried_object();
		}
		$ancestors   = get_ancestors( $term->term_id, $term->taxonomy );
		$hierarchy   = array_reverse( $ancestors );
		$hierarchy[] = $term->term_id;

		foreach ( $hierarchy as $id ) {
			$term_parent    = get_term( $id, $term->taxonomy );
			$initial_data[] = array(
				'name' => $term_parent->name,
				'url'  => get_term_link( $term_parent ),
			);
		}
		return $initial_data;
	}

	/**
	 * Get breadcrumb data from attachment
	 *
	 * @param array $initial_data initial data.
	 * @return array
	 */
	private function attachment_data( $initial_data ) {
		global $post;
		$parent_id = $post->post_parent;
		if ( $parent_id ) {
			$initial_data = $this->post_data( $initial_data, $parent_id );
		}

		$initial_data[] = array(
			'name' => $post->post_title,
			'url'  => '',
		);
		return $initial_data;
	}

	/**
	 * Get Post breadcrmb data.
	 *
	 * @param array       $initial_data initial data.
	 * @param string|bool $post_id post id.
	 *
	 * @return array
	 */
	private function post_data( $initial_data, $post_id = false ) {
		if ( ! $post_id ) {
			$post = get_post( $post_id );
		} else {
			global $post;
		}

		$primary_category = $this->get_primary_category();

		if ( $primary_category instanceof \WP_Term ) {
			$result = $this->taxonomy_category_data( $initial_data, $primary_category );
		}

		$result[] = array(
			'name' => get_the_title( $post ),
			'url'  => get_permalink( $post ),
		);

		return $result;
	}

	/**
	 * Get primary post category if post has multiple categories.
	 *
	 * @return \WP_Term|array|\WP_Error|null
	 */
	private function get_primary_category() {
		$category = apply_filters( 'gutenverse_primary_category', false );

		if ( $category instanceof \WP_Term ) {
			return $category;
		} elseif ( class_exists( 'WPSEO_Primary_Term' ) ) {
			$wpseo_primary_term = new \WPSEO_Primary_Term( 'category', get_the_ID() );
			$primary_term_id    = $wpseo_primary_term->get_primary_term();
			return get_term( $primary_term_id );
		} else {
			$categories = get_the_category();
			return ! empty( $categories ) ? $categories[0] : null;
		}
	}
}
