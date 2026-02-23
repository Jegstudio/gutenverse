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
		$data = $this->get_data( $id );
		if ( $this->attributes['hideCurrentTitle'] && ! ( is_404() || is_author() || is_search() ) ) {
			array_pop( $data );
		}
		$component   = '';
		$data_length = count( $data );

		for ( $index = 0; $index < $data_length; $index++ ) {

			$is_not_last = $index < ( $data_length - 1 );

			$item_name = esc_html( $data[ $index ]['name'] );
			$item_url  = esc_url( $data[ $index ]['url'] );
			$position  = $index + 1;

			$link = ( $is_not_last || $this->attributes['hideCurrentTitle'] )
				? "<a itemprop='item' href='{$item_url}'><span itemprop='name' class='breadcrumb-link'>{$item_name}</span></a>"
				: "<span itemprop='name' class='breadcrumb-text'>{$item_name}</span>";

			$component .= "
			<li itemprop='itemListElement' itemscope itemtype='https://schema.org/ListItem'>
				{$link}
				<meta itemprop='position' content='{$position}' />
			</li>";

			if ( $is_not_last ) {
				$separator_icon_type = isset( $this->attributes['separatorIconType'] ) ? $this->attributes['separatorIconType'] : 'icon';
				$the_icon            = isset( $this->attributes['separatorIcon'] ) ? $this->attributes['separatorIcon'] : 'fas fa-chevron-right';
				$separator_icon_svg  = isset( $this->attributes['separatorIconSVG'] ) ? $this->attributes['separatorIconSVG'] : '';

				$separator_icon = $this->render_icon( $separator_icon_type, $the_icon, $separator_icon_svg );
				$component     .= "
				<li class='separator'>
					{$separator_icon}
				</li>";
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
		if ( class_exists( 'WooCommerce' ) && function_exists( 'is_product' ) && is_product() ) { // For woocommerce product.
			return $this->product_data( $initial_data );
		}
		if ( is_page() ) {
			return $this->page_data( $initial_data );
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
		$tag = get_queried_object();

		$initial_data[] = array(
			'name' => esc_html__( 'Tag', 'gutenverse' ),
			'url'  => get_tag_link( $tag ),
		);
		$initial_data[] = array(
			'name' => $tag->name,
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
		if ( is_category() || is_tax() ) {
			$initial_data[] = array(
				'name' => esc_html__( 'Category', 'gutenverse' ),
				'url'  => get_term_link( $term ),
			);
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
		if ( $post_id ) {
			$post = get_post( $post_id );
		} else {
			global $post;
		}

		$primary_category = $this->get_primary_category();

		if ( $primary_category instanceof \WP_Term ) {
			$initial_data = $this->taxonomy_category_data( $initial_data, $primary_category );
		}

		$initial_data[] = array(
			'name' => get_the_title( $post ),
			'url'  => '',
		);

		return $initial_data;
	}

	/**
	 * Get page data for breadcrumb
	 *
	 * @param array $initial_data initial data.
	 *
	 * @return array
	 */
	private function page_data( $initial_data ) {
		global $post;
		$ancestors = get_post_ancestors( $post->ID );
		$ancestors = array_reverse( $ancestors );
		foreach ( $ancestors as $ancestor_id ) {
			$initial_data[] = array(
				'name' => get_the_title( $ancestor_id ),
				'url'  => get_permalink( $ancestor_id ),
			);
		}
		return $initial_data;
	}

	/**
	 * Get primary post category if post has multiple categories.
	 *
	 * @return \WP_Term|array|\WP_Error|null
	 */
	private function get_primary_category() {
		$category = apply_filters( 'gutenverse_primary_category', false );
		$category = get_term( $category );

		if ( $category instanceof \WP_Term ) {
			return $category;
		} else {
			$categories = get_the_category();
			return ! empty( $categories ) ? $categories[0] : null;
		}
	}

	/**
	 * Get product data for breadcrumb. (This is for woocommerce)
	 *
	 * @param array $initial_data initial data.
	 * @return array
	 */
	private function product_data( $initial_data ) {
		global $post;

		$terms = wp_get_post_terms( $post->ID, 'product_cat' );
		if ( ! empty( $terms ) && ! is_wp_error( $terms ) ) {
			$initial_data = $this->taxonomy_category_data( $initial_data, $terms[0] );
		}

		$initial_data[] = array(
			'name' => get_the_title( $post->ID ),
			'url'  => '',
		);
		return $initial_data;
	}
}
