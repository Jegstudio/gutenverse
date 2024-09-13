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
	 *
	 * @return string
	 */
	public function render_content( $remove_link = false ) {
		$this->filter_post_attributes( $this->attributes );

		$content  = $this->render_block_element();
		$settings = $this->render_settings();

		if ( $remove_link ) {
			$content = str_replace( 'href', 'href="javascript:void(0);" data-href', $content );
		}

		if ( $this->attributes['lazyLoad'] ) {
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
			'paginationIconPosition',
			'paginationPrevNextText',
			'paginationPrevText',
			'paginationNextText',
			'paginationPrevIcon',
			'paginationNextIcon',
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
				$icon_position = esc_attr( $this->attributes['metaAuthorIconPosition'] );

				if ( 'before' === $icon_position ) {
					$author_output = '<div class="guten-meta-author icon-position-' . $icon_position . '"><i aria-hidden="true" class="' . $icon . '"></i><span class="by">' . $author_by . '</span> <a href="' . $author_url . '">' . $author_name . '</a></div>';
				} else {
					$author_output = '<div class="guten-meta-author icon-position-' . $icon_position . '"><span class="by">' . $author_by . '</span><a href="' . $author_url . '">' . $author_name . '</a><i aria-hidden="true" class="' . $icon . '"></i></div>';
				}
			}

			if ( $this->attr_is_true( $this->attributes['metaDateEnabled'] ) ) {
				$icon          = esc_attr( $this->attributes['metaDateIcon'] );
				$icon_position = esc_attr( $this->attributes['metaDateIconPosition'] );

				if ( 'before' === $icon_position ) {
					$date_output = '<div class="guten-meta-date icon-position-' . $icon_position . '"><i aria-hidden="true" class="' . $icon . '"></i>' . $this->format_date( $post ) . '</div>';
				} else {
					$date_output = '<div class="guten-meta-date icon-position-' . $icon_position . '">' . $this->format_date( $post ) . '<i aria-hidden="true" class="' . $icon . '"></i></div>';
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
	 * @return mixed
	 */
	protected function get_readmore( $post ) {
		$readmore = null;

		if ( $this->attr_is_true( $this->attributes['readmoreEnabled'] ) ) {
			$icon          = esc_attr( $this->attributes['readmoreIcon'] );
			$icon_position = esc_attr( $this->attributes['readmoreIconPosition'] );
			$text          = esc_attr( $this->attributes['readmoreText'] );

			if ( 'before' === $icon_position ) {
				$readmore = '<i aria-hidden="true" class="' . $icon . '"></i>' . $text;
			} else {
				$readmore = $text . '<i aria-hidden="true" class="' . $icon . '"></i>';
			}

			$readmore =
			'<div class="guten-meta-readmore icon-position-' . $icon_position . '">
                <a href="' . esc_url( get_the_permalink( $post ) ) . '" class="guten-readmore">' . $readmore . '</a>
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
			$icon_position = esc_attr( $this->attributes['commentIconPosition'] );

			if ( 'before' === $icon_position ) {
				$comment = '<i aria-hidden="true" class="' . $icon . '"></i><span>' . $number . '</span>';
			} else {
				$comment = '<span>' . $number . '</span><i aria-hidden="true" class="' . $icon . '"></i>';
			}

			$comment =
			'<div class="guten-meta-comment icon-position-' . $icon_position . '">
                <a href="' . $this->guten_get_respond_link( $post->ID ) . '" >
                    ' . $comment . '
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
				<i class="fas fa-pencil-alt"></i>
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
		$block    = '';
		$html_tag = esc_html( $this->check_tag( $this->attributes['htmlTag'], 'h3' ) );
		$type     = esc_attr( $this->attributes['postblockType'] );

		foreach ( $results as $post ) {
			$thumbnail        = $this->get_thumbnail( $post->ID, 'post-thumbnail' );
			$primary_category = $this->get_primary_category( $post->ID );
			$post_url         = esc_url( get_the_permalink( $post ) );
			$post_title       = esc_attr( get_the_title( $post ) );

			$content =
			'<' . $html_tag . ' class="guten-post-title"><a href="' . $post_url . '">' . $post_title . '</a></' . $html_tag . '>
                ' . $this->post_meta( $post ) . $this->get_excerpt( $post ) . '
            <div class="guten-post-meta-bottom">
                ' . $this->get_readmore( $post ) . $this->get_comment_bubble( $post ) . '
            </div>';

			$thumb = $this->guten_edit_post( $post->ID ) . '<a href="' . $post_url . '">' . $thumbnail . '</a>';

			if ( 'type-3' === $type ) {
				$block = $block .
				'<article ' . gutenverse_post_class( 'guten-post', $post->ID ) . '>
                    <div class="guten-thumb">' . $thumb . $primary_category . '</div>
                    <div class="guten-postblock-content">' . $content . '</div>
                </article>';
			} else {
				$block = $block .
				'<article ' . gutenverse_post_class( 'guten-post', $post->ID ) . '>
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
	 */
	public function render_frontend() {
		$element_id      = $this->get_element_id();
		$display_classes = $this->set_display_classes();
		$animation_class = $this->set_animation_classes();
		$custom_classes  = $this->get_custom_classes();

		return '<div class="' . $element_id . $display_classes . $animation_class . $custom_classes . ' guten-post-block guten-element">' . $this->render_content() . '</div>';
	}
}
