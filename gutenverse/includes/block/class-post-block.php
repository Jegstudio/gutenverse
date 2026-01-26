<?php
/**
 * Post Block class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\block
 */

namespace Gutenverse\Block;

use Gutenverse\Framework\Block\Post_Abstract;
use Gutenverse\Framework\Options;

/**
 * Class Post Block
 *
 * @package gutenverse\block
 */
class Post_Block extends Post_Abstract {
	/**
	 * Render content
	 *
	 * @param boolean $remove_link : Flag to remove link.
	 * @param boolean $exclude_current : Flag to exclude current post.
	 *
	 * @return string
	 */
	public function render_content( $remove_link = false, $exclude_current = false ) {
		$this->filter_post_attributes( $this->attributes );

		$content  = $this->render_block_element( $exclude_current );
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

		$breakpoint     = 'type-1' === $this->attributes['postblockType'] || 'type-4' === $this->attributes['postblockType'] ? 'break-point-' . esc_attr( $this->attributes['breakpoint'] ) : '';
		$postblock_type = 'postblock-' . esc_attr( $this->attributes['postblockType'] );
		$pagination     = 'guten-pagination-' . esc_attr( $this->attributes['paginationMode'] );

		return $this->render_wrapper(
			'postblock',
			$content,
			array( $postblock_type, $pagination, $breakpoint, 'post-element' ),
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
			'postItemMargin',
			'postItemPadding',
			'postItemBorder',
			'postType',
			'thumbnailRadius',
			'paginationMargin',
			'paginationPadding',
			'paginationBorder',
			'hideDesktop',
			'hideTablet',
			'hideMobile',
			'column',
			'breakpoint',
			'noContentText',
			'background',
			'backgroundHover',
			'animation',
			'numberPost',
			'postOffset',
			'uniqueContent',
			'includePost',
			'excludePost',
			'excludeCurrentPost',
			'includeCategory',
			'excludeCategory',
			'includeAuthor',
			'includeTag',
			'excludeTag',
			'sortBy',
			'postblockType',
			'imageSize',
			'htmlTag',
			'categoryEnabled',
			'excerptEnabled',
			'excerptLength',
			'excerptMore',
			'readmoreEnabled',
			'readmoreIcon',
			'readmoreIconPosition',
			'readmoreText',
			'commentHeading',
			'commentEnabled',
			'commentIcon',
			'commentIconPosition',
			'metaEnabled',
			'metaAuthorEnabled',
			'metaAuthorByText',
			'metaAuthorIcon',
			'metaAuthorIconPosition',
			'metaDateEnabled',
			'metaDateType',
			'metaDateFormat',
			'metaDateFormatCustom',
			'metaDateIcon',
			'metaDateIconPosition',
			'categoryPosition',
			'paginationMode',
			'paginationLoadmoreText',
			'paginationLoadingText',
			'paginationNumberPost',
			'paginationScrollLimit',
			'paginationIcon',
			'paginationIconType',
			'paginationIconSVG',
			'paginationIconPosition',
			'paginationPrevNextText',
			'paginationPrevText',
			'paginationNextText',
			'paginationPrevIcon',
			'paginationPrevIconType',
			'paginationPrevIconSVG',
			'paginationNextIcon',
			'paginationNextIconType',
			'paginationNextIconSVG',
			'contentOrder',
			'paginationLoadmoreAnimation',
			'paginationLoadmoreAnimationSequence',
		);
	}

	/**
	 * Build primary category element
	 *
	 * @param  int $post_id Post ID.
	 * @return array|null|object|string|\WP_Error
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

		$cat_id   = apply_filters( 'gutenverse_primary_category', $category_id, $post_id );
		$category = '';

		if ( $this->attr_is_true( $this->attributes['categoryEnabled'] ) && $cat_id ) {
			$category = get_category( $cat_id );
			$position = 'type-3' === $this->attributes['postblockType'] ? 'position-' . esc_attr( $this->attributes['categoryPosition'] ) : '';
			$class    = 'class="category-' . esc_attr( $category->slug ) . '"';
			$category = '<div class="guten-post-category ' . $position . '"><span><a href="' . esc_url( get_category_link( $cat_id ) ) . '" ' . $class . '>' . esc_attr( $category->name ) . '</a></span></div>';
			if ( 'type-5' === $this->attributes['postblockType'] ) {
				$category = '<div class="post-category-container">' . $category . '</div>';
			}
		}

		return $category;
	}

	/**
	 * Build post meta 1
	 *
	 * @param  int|\WP_Post $post Post object.
	 * @return mixed
	 */
	public function post_meta( $post ) {
		$meta = null;

		if ( $this->attr_is_true( $this->attributes['metaEnabled'] ) ) {
			$author_output = null;
			$date_output   = null;

			if ( $this->attr_is_true( $this->attributes['metaAuthorEnabled'] ) ) {
				$author      = $post->post_author;
				$author_url  = esc_url( get_author_posts_url( $author ) );
				$author_name = esc_attr( get_the_author_meta( 'display_name', $author ) );
				$author_by   = esc_attr( $this->attributes['metaAuthorByText'] );

				$icon          = esc_attr( $this->attributes['metaAuthorIcon'] );
				$icon_type     = isset( $this->attributes['metaAuthorIconType'] ) ? esc_attr( $this->attributes['metaAuthorIconType'] ) : 'icon';
				$icon_svg      = isset( $this->attributes['metaAuthorIconSVG'] ) ? $this->attributes['metaAuthorIconSVG'] : '';
				$icon_position = esc_attr( $this->attributes['metaAuthorIconPosition'] );

				$icon_html = $this->render_icon( $icon_type, $icon, $icon_svg );

				if ( 'before' === $icon_position ) {
					$author_output = '<div class="guten-meta-author icon-position-' . $icon_position . '">' . $icon_html . '<span class="by">' . $author_by . '</span> <a href="' . $author_url . '">' . $author_name . '</a></div>';
				} else {
					$author_output = '<div class="guten-meta-author icon-position-' . $icon_position . '"><span class="by">' . $author_by . '</span><a href="' . $author_url . '">' . $author_name . '</a>' . $icon_html . '</div>';
				}
			}

			if ( $this->attr_is_true( $this->attributes['metaDateEnabled'] ) ) {
				$icon          = esc_attr( $this->attributes['metaDateIcon'] );
				$icon_type     = isset( $this->attributes['metaDateIconType'] ) ? esc_attr( $this->attributes['metaDateIconType'] ) : 'icon';
				$icon_svg      = isset( $this->attributes['metaDateIconSVG'] ) ? $this->attributes['metaDateIconSVG'] : '';
				$icon_position = esc_attr( $this->attributes['metaDateIconPosition'] );

				$icon_html = $this->render_icon( $icon_type, $icon, $icon_svg );

				if ( 'before' === $icon_position ) {
					$date_output = '<div class="guten-meta-date icon-position-' . $icon_position . '">' . $icon_html . $this->format_date( $post ) . '</div>';
				} else {
					$date_output = '<div class="guten-meta-date icon-position-' . $icon_position . '">' . $this->format_date( $post ) . $icon_html . '</div>';
				}
			}

			$meta = '<div class="guten-post-meta">' . $author_output . $date_output . '</div>';
		}

		return apply_filters( 'gutenverse_post_block_meta', $meta, $post, $this );
	}

	/**
	 * Get post excerpt
	 *
	 * @param  int|\WP_Post $post Post object.
	 * @return mixed
	 */
	protected function get_excerpt( $post ) {
		$excerpt = null;

		if ( $this->attr_is_true( $this->attributes['excerptEnabled'] ) ) {
			$excerpt = $post->post_excerpt;

			if ( empty( $excerpt ) ) {
				$excerpt = $post->post_content;
			}

			$excerpt = preg_replace( '/\[[^\]]+\]/', '', $excerpt );
			$excerpt = wp_trim_words( $excerpt, $this->excerpt_length(), $this->excerpt_more() );
			$excerpt = apply_filters( 'gutenverse_module_excerpt', $excerpt, $post->ID, $this->excerpt_length(), $this->excerpt_more() );
			$excerpt = '<div class="guten-post-excerpt"><p>' . $excerpt . '</p></div>';
		}

		return $excerpt;
	}

	/**
	 * Get post read more button
	 *
	 * @param  int|\WP_Post $post Post object.
	 * @param  string       $post_title Post Title.
	 * @return mixed
	 */
	protected function get_readmore( $post, $post_title ) {
		$readmore = null;

		if ( $this->attr_is_true( $this->attributes['readmoreEnabled'] ) ) {
			$icon          = esc_attr( $this->attributes['readmoreIcon'] );
			$icon_type     = isset( $this->attributes['readmoreIconType'] ) ? esc_attr( $this->attributes['readmoreIconType'] ) : 'icon';
			$icon_svg      = isset( $this->attributes['readmoreIconSVG'] ) ? $this->attributes['readmoreIconSVG'] : '';
			$icon_position = esc_attr( $this->attributes['readmoreIconPosition'] );
			$text          = esc_attr( $this->attributes['readmoreText'] );

			$icon_html = $this->render_icon( $icon_type, $icon, $icon_svg );

			if ( 'before' === $icon_position ) {
				$readmore = $icon_html . $text;
			} else {
				$readmore = $text . $icon_html;
			}

			$readmore =
			'<div class="guten-meta-readmore icon-position-' . $icon_position . '">
				<a href="' . esc_url( get_the_permalink( $post ) ) . '" class="guten-readmore">' . $readmore . '<span class="screen-reader-text">' . esc_html__( ' about ', 'gutenverse' ) . $post_title . '</span></a>
			</div>';
		}

		return $readmore;
	}

	/**
	 * Get comment number
	 *
	 * @param  int $post_id Post ID.
	 * @return mixed
	 */
	public function guten_get_comments_number( $post_id = 0 ) {
		$comments_number = get_comments_number( $post_id );

		return apply_filters( 'gutenverse_get_comments_number', $comments_number, $post_id );
	}

	/**
	 * Get respond link
	 *
	 * @param  null $post_id Post ID.
	 * @return string
	 */
	public function guten_get_respond_link( $post_id = null ) {
		return esc_url( get_the_permalink( $post_id ) ) . '#respond';
	}

	/**
	 * Get comment bubble icon
	 *
	 * @param  int|\WP_Post $post Post object.
	 * @return mixed
	 */
	protected function get_comment_bubble( $post ) {
		$comment = null;

		if ( $this->attr_is_true( $this->attributes['commentEnabled'] ) ) {
			$number        = $this->guten_get_comments_number( $post->ID );
			$icon          = esc_attr( $this->attributes['commentIcon'] );
			$icon_type     = isset( $this->attributes['commentIconType'] ) ? esc_attr( $this->attributes['commentIconType'] ) : 'icon';
			$icon_svg      = isset( $this->attributes['commentIconSVG'] ) ? $this->attributes['commentIconSVG'] : '';
			$icon_position = esc_attr( $this->attributes['commentIconPosition'] );

			$icon_html = $this->render_icon( $icon_type, $icon, $icon_svg );

			$inner_comment_content = '';
			if ( 'before' === $icon_position ) {
				$inner_comment_content = $icon_html . '<span>' . $number . '</span>';
			} else {
				$inner_comment_content = '<span>' . $number . '</span>' . $icon_html;
			}

			$comment =
			'<div class="guten-meta-comment icon-position-' . $icon_position . '">
                <a href="' . $this->guten_get_respond_link( $post->ID ) . '" >
                    ' . $inner_comment_content . '
                </a>
            </div>';
		}

		return $comment;
	}

	/**
	 * Get excerpt length
	 *
	 * @return int
	 */
	public function excerpt_length() {
		if ( isset( $this->attributes['excerptLength'] ) ) {
			if ( isset( $this->attributes['excerptLength']['size'] ) ) {
				return intval( $this->attributes['excerptLength']['size'] );
			}

			return intval( $this->attributes['excerptLength'] );
		} else {
			return 20;
		}
	}

	/**
	 * Get excerpt more
	 *
	 * @return string
	 */
	public function excerpt_more() {
		return isset( $this->attributes['excerptMore'] ) ? esc_attr( $this->attributes['excerptMore'] ) : ' ...';
	}

	/**
	 * Get post edit link
	 *
	 * @param  int    $post_id  Post ID.
	 * @param  string $position Link position.
	 * @return bool|string
	 */
	public function guten_edit_post( $post_id, $position = 'left' ) {
		if ( current_user_can( 'edit_posts' ) ) {
			$url = get_edit_post_link( $post_id );

			return '<a class="guten-edit-post ' . $position . '" href="' . $url . '" target="_blank">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
					<!--! Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2023 Fonticons, Inc. -->
					<path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"/>
				</svg>
				<span>' . esc_html__( 'edit post', 'gutenverse' ) . '</span>
			</a>';
		}

		return false;
	}

	/**
	 * Build column type 1 method
	 *
	 * @param array $results Result element.
	 * @return string
	 */
	public function build_column( $results ) {
		$block          = '';
		$html_tag       = esc_html( $this->check_tag( $this->attributes['htmlTag'], 'h3' ) );
		$type           = esc_attr( $this->attributes['postblockType'] );
		$orders         = $this->attributes['contentOrder'];
		$add_class      = '';
		$pagination     = $this->attributes['paginationMode'] ?? '';
		$load_anim      = $this->attributes['paginationLoadmoreAnimation'] ?? '';
		$anim_mode      = $this->attributes['paginationLoadmoreAnimationSequence'] ?? '';
		$from_pag       = $this->attributes['fromPagination'] ?? false;
		$last_idx       = $this->attributes['alreadyFetch'] ?? 0;
		$thumbnail_size = $this->attributes['thumbnailSize'];

		if ( ( 'loadmore' === $pagination || 'scrollload' === $pagination ) && ( $load_anim && 'none' !== $load_anim ) && $from_pag ) {
			$add_class = " animated {$load_anim} initial-hide loadmore-animation";
		}

		$loadmore_delay_last_idx = 1;

		foreach ( $results as $idx => $post ) {
			$thumbnail        = $this->get_thumbnail( $post->ID, $thumbnail_size['value'] );
			$primary_category = $this->get_primary_category( $post->ID );
			$post_url         = esc_url( get_the_permalink( $post ) );
			$post_title       = esc_attr( get_the_title( $post ) );
			$content          = '';

			$added_class = $idx > $last_idx - 1 && $from_pag ? $add_class : '';
			$added_style = '';

			if ( 'sequential' === $anim_mode && $from_pag && $idx > $last_idx ) {
				$added_class .= ' has-delay';
				$added_style  = ' style="--guten-post-block-loadmore-anim-delay-idx: ' . "{$loadmore_delay_last_idx}" . '"';
				++$loadmore_delay_last_idx;
			}

			foreach ( $orders as $order ) {
				if ( 'title' === $order['value'] ) {
					$content .=
						'<' . $html_tag . ' class="guten-post-title">
							<a aria-label="' . $post_title . '" href="' . $post_url . '">' . $post_title . '</a>
						</' . $html_tag . '>';
				}

				if ( 'meta' === $order['value'] ) {
					$content .= $this->post_meta( $post );
				}

				if ( 'excerpt' === $order['value'] ) {
					$content .= $this->get_excerpt( $post );
				}

				if ( 'read' === $order['value'] ) {
					$content .=
						'<div class="guten-post-meta-bottom">
							' . $this->get_readmore( $post, $post_title ) . $this->get_comment_bubble( $post ) . '
						</div>';
				}
			}

			$thumb = $this->guten_edit_post( $post->ID ) . '<a aria-label="' . $post_title . '" href="' . $post_url . '">' . $thumbnail . '</a>';

			if ( 'type-3' === $type ) {
				$block = $block .
				'<article ' . gutenverse_post_class( "guten-post{$added_class}", $post->ID ) . $added_style . '>
                    <div class="guten-thumb">' . $thumb . $primary_category . '</div>
                    <div class="guten-postblock-content">' . $content . '</div>
                </article>';
			} else {
				$block = $block .
				'<article ' . gutenverse_post_class( "guten-post{$added_class}", $post->ID ) . $added_style . '>
                    <div class="guten-thumb">' . $thumb . '</div>
                    <div class="guten-postblock-content">' . $primary_category . $content . '</div>
                </article>';
			}
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
	 *
	 * @param bool $include_animation_classes Using animation class.
	 */
	public function render_frontend( $include_animation_classes = true ) {
		$element_id      = $this->get_element_id();
		$display_classes = $this->set_display_classes();
		$animation_class = $include_animation_classes ? $this->set_animation_classes() : '';
		$custom_classes  = $this->get_custom_classes();

		return '<div class="' . $element_id . $display_classes . $animation_class . $custom_classes . ' guten-post-block guten-element">' . $this->render_content( false, $this->attributes['excludeCurrentPost'] ) . '</div>';
	}
}
