<?php
/**
 * Post List Block class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\block
 */

namespace Gutenverse\Block;

use Gutenverse\Framework\Block\Post_Abstract;
use Gutenverse\Framework\Options;

/**
 * Class Post List Block
 *
 * @package gutenverse\block
 */
class Post_List extends Post_Abstract {
	/**
	 * Render content
	 *
	 * @param boolean $remove_link : Flag to remove link.
	 *
	 * @return string
	 */
	public function render_content( $remove_link = false ) {
		$this->filter_post_attributes( $this->attributes );

		$class    = $this->attr_is_true( $this->attributes['backgroundImageEnabled'] ) ? array( 'bg-image' ) : array();
		$class[]  = 'layout-' . esc_attr( $this->attributes['layout'] );
		$class[]  = 'post-element';
		$class[]  = 'guten-pagination-' . esc_attr( $this->attributes['paginationMode'] );
		$content  = $this->render_block_element();
		$settings = $this->render_settings();

		if ( $remove_link ) {
			$content = str_replace( 'href', 'href="javascript:void(0);" data-href', $content );
		}

		$image_load = Options::get_instance()->get_image_load( 'lazy', $this->attributes['lazyLoad'], $this->attributes['imageLoad'] );

		if ( 'lazy' === $image_load ) {
			$content = preg_replace( '/<img(.*?)>/', '<img loading="lazy" $1>', $content );
		} else {
			$content = preg_replace( '/<img(.*?)>/', '<img loading="eager" $1>', $content );
		}

		return $this->render_wrapper(
			'postlist',
			$content,
			$class,
			array(
				'id'       => $this->get_element_id(),
				'settings' => $settings,
			)
		);
	}

	/**
	 * Filter keys to ajax post request
	 *
	 * @return string
	 */
	public function get_ajax_param() {
		return array(
			'inheritQuery',
			'elementId',
			'postType',
			'numberPost',
			'postOffset',
			'uniqueContent',
			'includePost',
			'excludePost',
			'includeCategory',
			'excludeCategory',
			'includeAuthor',
			'includeTag',
			'excludeTag',
			'sortBy',
			'imageEnabled',
			'backgroundImageEnabled',
			'iconEnabled',
			'icon',
			'imageSize',
			'metaEnabled',
			'metaDateEnabled',
			'metaDateType',
			'metaDateFormat',
			'metaDateFormatCustom',
			'metaDateIcon',
			'metaDateIconPosition',
			'metaCategoryEnabled',
			'metaCategoryIcon',
			'metaPosition',
			'paginationMode',
			'paginationLoadmoreText',
			'paginationLoadingText',
			'paginationNumberPost',
			'paginationScrollLimit',
			'paginationIcon',
			'paginationIconPosition',
			'paginationIcon',
			'paginationIconPosition',
			'paginationPrevNextText',
			'paginationPrevText',
			'paginationNextText',
			'paginationPrevIcon',
			'paginationNextIcon',
		);
	}

	/**
	 * Return primary category
	 *
	 * @param int $post_id Post ID.
	 *
	 * @return mixed
	 */
	public function get_primary_category( $post_id ) {
		$category_id = null;

		if ( get_post_type( $post_id ) === 'post' ) {
			$categories = array_slice( get_the_category( $post_id ), 0, 1 );
			if ( empty( $categories ) ) {
				return null;
			}
			$category    = array_shift( $categories );
			$category_id = $category->term_id;
		}

		return apply_filters( 'gutenverse_primary_category', $category_id, $post_id );
	}

	/**
	 * Get post meta
	 *
	 * @param WP_Post $post Post.
	 *
	 * @return mixed
	 */
	public function post_meta( $post ) {
		$meta          = null;
		$meta_date     = null;
		$meta_category = null;

		if ( $this->attr_is_true( $this->attributes['metaEnabled'] ) ) {
			if ( $this->attr_is_true( $this->attributes['metaDateEnabled'] ) ) {
				$date_icon      = $this->attributes['metaDateIcon'];
				$date_icon_type = isset( $this->attributes['metaDateIconType'] ) ? esc_attr( $this->attributes['metaDateIconType'] ) : 'icon';
				$date_icon_svg  = isset( $this->attributes['metaDateIconSVG'] ) ? $this->attributes['metaDateIconSVG'] : '';

				$date = esc_attr( $this->format_date( $post ) );

				if ( $date_icon || $date ) {
					$meta_date = $date;
					if ( $date_icon ) {
						$icon_html = $this->render_icon( $date_icon_type, $date_icon, $date_icon_svg );
					} else {
						$icon_html = '';
					}
					if ( isset( $this->attributes['metaDateIconPosition'] ) ) {
						$icon_position = esc_attr( $this->attributes['metaDateIconPosition'] );
						if ( 'before' === $icon_position ) {
							$meta_date = '<div class="guten-meta-date icon-position-before">' . $icon_html . ' &nbsp;' . $date . '</div>';
						} else {
							$meta_date = '<div class="guten-meta-date icon-position-after">' . $date . '&nbsp;' . $icon_html . '</div>';
						}
					} else {
						$meta_date = '<div class="guten-meta-date">' . $icon_html . ' &nbsp;' . $date . '</div>';
					}
				}

				$meta_date = '<span class="meta-date">' . $meta_date . '</span>';
			}

			if ( $this->attr_is_true( $this->attributes['metaCategoryEnabled'] ) ) {
				$category_icon      = $this->attributes['metaCategoryIcon'];
				$category_icon_type = isset( $this->attributes['metaCategoryIconType'] ) ? esc_attr( $this->attributes['metaCategoryIconType'] ) : 'icon';
				$category_icon_svg  = isset( $this->attributes['metaCategoryIconSVG'] ) ? $this->attributes['metaCategoryIconSVG'] : '';

				$category      = get_category( $this->get_primary_category( $post->ID ) );
				$meta_category = isset( $category->name ) ? $category->name : '';
				if ( $category_icon ) {
					$icon_html = $this->render_icon( $category_icon_type, $category_icon, $category_icon_svg );
				} else {
					$icon_html = '';
				}
				if ( $icon_html || $meta_category ) {
					$meta_category = '<span class="meta-category">' . $icon_html . ' ' . $meta_category . '</span>';
				}
			}

			$meta = '<div class="meta-lists">' . $meta_date . ' ' . $meta_category . '</div>';
		}

		return apply_filters( 'gutenverse_post_list_meta', $meta, $post, $this );
	}

	/**
	 * Build column type 1 method
	 *
	 * @param array $results Result element.
	 * @return string
	 */
	public function build_column( $results ) {
		$block      = '';
		$image_size = isset( $this->attributes['imageSize'] ) ? esc_attr( $this->attributes['imageSize'] ) : 'post-thumbnail';

		foreach ( $results as $post ) {
			$content   = null;
			$thumbnail = null;
			$bg        = null;

			if ( 'top' === $this->attributes['metaPosition'] ) {
				$content = $this->post_meta( $post ) . '<span class="guten-postlist-title">' . esc_attr( get_the_title( $post ) ) . '</span>';
			} else {
				$content = '<span class="guten-postlist-title">' . esc_attr( get_the_title( $post ) ) . '</span>' . $this->post_meta( $post );
			}

			if ( $this->attr_is_true( $this->attributes['imageEnabled'] ) ) {
				$thumbnail = get_the_post_thumbnail( $post->ID, $image_size );
			} elseif ( $this->attr_is_true( $this->attributes['iconEnabled'] ) ) {
				$icon      = isset( $this->attributes['icon'] ) ? $this->attributes['icon'] : '';
				$icon_type = isset( $this->attributes['iconType'] ) ? $this->attributes['iconType'] : 'icon';
				$icon_svg  = isset( $this->attributes['iconSVG'] ) ? $this->attributes['iconSVG'] : '';

				if ( $icon ) {
					$thumbnail = '<span class="icon-list">' . $this->render_icon( $icon_type, $icon, $icon_svg ) . '</span>';
				}
			}

			if ( $this->attr_is_true( $this->attributes['backgroundImageEnabled'] ) ) {
				$bg = 'style="background-image: url(' . get_the_post_thumbnail_url( $post->ID, $image_size ) . ')"';
			}

			$block .=
			'<article class="guten-post post-list-item">
                <a href="' . esc_url( get_the_permalink( $post ) ) . '" ' . $bg . '>
                    ' . $thumbnail . '
                    <div class="guten-postlist-content">' . $content . '</div>
                </a>
            </article>';
		}

		return $block;
	}

	/**
	 * Render view in editor
	 */
	public function render_gutenberg() {
		return $this->render_content( true );
	}

	/**
	 * Render view in frontend
	 */
	public function render_frontend() {
		$element_id      = $this->get_element_id();
		$layout          = esc_attr( $this->attributes['layout'] );
		$display_classes = $this->set_display_classes();
		$animation_class = $this->set_animation_classes();
		$custom_classes  = $this->get_custom_classes();

		return '<div class="' . $element_id . $display_classes . $animation_class . $custom_classes . ' layout-' . $layout . ' guten-post-list guten-element">' . $this->render_content() . '</div>';
	}
}
