<?php
/**
 * Testimonials Block class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\block
 */

namespace Gutenverse\Block;

use Gutenverse\Framework\Block\Block_Abstract;

/**
 * Class Testimonials Block
 *
 * @package gutenverse\block
 */
class Testimonials extends Block_Abstract {
	/**
	 * Render content item
	 *
	 * @param array $item Item data.
	 * @param int   $index Item index.
	 * @return string
	 */
	private function render_content_item( $item, $index ) {
		$content_type          = isset( $this->attributes['contentType'] ) ? (int) $this->attributes['contentType'] : 1;
		$show_quote            = $this->attr_is_true( $this->attributes['showQuote'] ?? false );
		$show_client_image     = $this->attr_is_true( $this->attributes['showClientImage'] ?? true );
		$icon_quote            = $this->attributes['iconQuote'] ?? 'fas fa-quote-left';
		$icon_quote_type       = $this->attributes['iconQuoteType'] ?? 'icon';
		$icon_quote_svg        = $this->attributes['iconQuoteSVG'] ?? '';
		$quote_override        = $this->attr_is_true( $this->attributes['quoteOverride'] ?? false );
		$content_position      = $this->attributes['contentPosition'] ?? 'below-image';
		$show_rating           = $this->attr_is_true( $this->attributes['showRating'] ?? false );
		$icon_rating_full      = $this->attributes['iconRatingFull'] ?? 'fas fa-star';
		$icon_rating_full_type = $this->attributes['iconRatingFullType'] ?? 'icon';
		$icon_rating_full_svg  = $this->attributes['iconRatingFullSVG'] ?? '';
		$icon_rating_half      = $this->attributes['iconRatingHalf'] ?? 'fas fa-star-half-alt';
		$icon_rating_half_type = $this->attributes['iconRatingHalfType'] ?? 'icon';
		$icon_rating_half_svg  = $this->attributes['iconRatingHalfSVG'] ?? '';
		$star_position         = $this->attributes['starPosition'] ?? 'above-image';
		$lazy                  = $this->attributes['lazy'] ?? 'lazy';

		$name        = $item['name'] ?? '';
		$description = $item['description'] ?? '';
		$comment     = $item['comment'] ?? '';
		$rating      = isset( $item['rating'] ) ? (float) $item['rating'] : 5.0;
		$img_detail  = $item['src'] ?? array();
		$src         = is_array( $img_detail ) && isset( $img_detail['image'] ) ? $img_detail['image'] : ( is_string( $img_detail ) ? $img_detail : '' );
		$width       = $img_detail['width'] ?? 900;
		$height      = $img_detail['height'] ?? 497;

		$override_quote = $quote_override ? 'quote-override' : '';

		$star_items = '';
		if ( $show_rating ) {
			$floor_rating = min( 100, (int) floor( $rating ) );
			for ( $i = 0; $i < $floor_rating; $i++ ) {
				$star_items .= '<li>' . $this->render_icon( $icon_rating_full_type, $icon_rating_full, $icon_rating_full_svg ) . '</li>';
			}
			if ( $rating !== (float) $floor_rating ) {
				$star_items .= '<li>' . $this->render_icon( $icon_rating_half_type, $icon_rating_half, $icon_rating_half_svg ) . '</li>';
			}
		}
		$star_rating = '<ul class="rating-stars">' . $star_items . '</ul>';

		$profile_info = '<span class="profile-info">';
		$profile_info .= '<strong class="profile-name">' . wp_kses_post( $name ) . '</strong>';
		$profile_info .= '<p class="profile-des">' . wp_kses_post( $description ) . '</p>';
		$profile_info .= '</span>';

		$comment_content = '<div class="comment-content"><p class="profile-comment">' . wp_kses_post( $comment ) . '</p></div>';

		$placeholder   = ! $src ? ' data-image-placeholder="gutenverse-image-placeholder"' : ' data-image-placeholder="false"';
		$loading_attr  = 'lazy' === $lazy ? ' loading="lazy"' : '';
		$img_html      = $show_client_image ? '<img width="' . esc_attr( $width ) . '" height="' . esc_attr( $height ) . '"' . $loading_attr . ' src="' . esc_url( $src ) . '" alt="' . esc_attr( $name ) . '"' . $placeholder . '>' : '';
		$profile_image = '<div class="profile-image">' . $img_html . '</div>';

		$quote_html = '';
		if ( $show_quote ) {
			$quote_html = '<div class="' . esc_attr( $override_quote ) . ' icon-content">' . $this->render_icon( $icon_quote_type, $icon_quote, $icon_quote_svg ) . '</div>';
		}

		$content_html = '';

		switch ( $content_type ) {
			case 1:
				$content_html = '<div class="testimonial-slider hover-from-left testimonial-content">
                    <div class="comment-bio">
                        ' . $profile_image . '
                        ' . $star_rating . '
                        ' . $profile_info . '
                    </div>
                    <div class="comment-content">
                        ' . $quote_html . '
                        <p class="profile-comment">' . wp_kses_post( $comment ) . '</p>
                    </div>
                </div>';
				break;
			case 2:
				$header_star   = ( 'above-image' === $star_position ) ? '<div class="comment-header">' . $star_rating . '</div>' : '';
				$footer_star   = ( 'below-image' === $star_position ) ? '<div class="comment-header">' . $star_rating . '</div>' : '';
				$above_comment = ( 'above-image' === $content_position ) ? $comment_content : '';
				$below_comment = ( 'below-image' === $content_position ) ? $comment_content : '';

				$content_html = '<div class="testimonial-content">
                    ' . $header_star . '
                    ' . $above_comment . '
                    <div class="comment-bio">
                        <div class="bio-details">
                            ' . $profile_image . '
                            ' . $profile_info . '
                        </div>
                        ' . $quote_html . '
                    </div>
                    ' . $below_comment . '
                    ' . $footer_star . '
                </div>';
				break;
			case 3:
				$above_comment = ( 'above-image' === $content_position ) ? $comment_content : '';
				$below_comment = ( 'below-image' === $content_position ) ? $comment_content : '';
				$above_star    = ( 'above-image' === $star_position ) ? $star_rating : '';
				$below_star    = ( 'below-image' === $star_position ) ? $star_rating : '';

				$content_html = '<div class="testimonial-content">
                    ' . $quote_html . '
                    ' . $above_comment . '
                    ' . $above_star . '
                    <div class="comment-bio">
                        <div class="bio-details">
                            ' . $profile_image . '
                        </div>
                    </div>
                    ' . $below_star . '
                    ' . $below_comment . '
                    ' . $profile_info . '
                </div>';
				break;
			case 4:
				$above_comment = ( 'above-image' === $content_position ) ? $comment_content : '';
				$below_comment = ( 'below-image' === $content_position ) ? $comment_content : '';
				$above_star    = ( 'above-image' === $star_position ) ? $star_rating : '';
				$below_star    = ( 'below-image' === $star_position ) ? $star_rating : '';

				$content_html = '<div class="testimonial-content">
                    ' . $quote_html . '
                    ' . $above_comment . '
                    <div class="comment-bio">
                        <div class="bio-details">
                            ' . $above_star . '
                            ' . $profile_image . '
                            ' . $below_star . '
                            ' . $profile_info . '
                        </div>
                    </div>
                    ' . $below_comment . '
                </div>';
				break;
		}

		return '<div class="guten-testimonial-item">
            <div class="testimonial-box hover-from-left">' . $content_html . '</div>
        </div>';
	}

	/**
	 * Render swiper data attributes
	 *
	 * @return string
	 */
	private function render_swiper_data() {
		$spacing          = $this->attributes['spacing'] ?? array();
		$item_showed      = $this->attributes['itemShowed'] ?? array();
		$loop             = $this->attributes['loop'] ?? false;
		$autoplay         = $this->attributes['autoplay'] ?? false;
		$autoplay_timeout = $this->attributes['autoplayTimeout'] ?? 5000;
		$show_nav         = $this->attributes['showNav'] ?? false;
		$show_arrow       = $this->attributes['showArrow'] ?? false;

		$breakpoints = array(
			0    => array(
				'spaceBetween'  => isset( $spacing['Mobile'] ) ? (int) $spacing['Mobile'] : 10,
				'slidesPerView' => isset( $item_showed['Mobile'] ) ? (int) $item_showed['Mobile'] : 1,
			),
			768  => array(
				'spaceBetween'  => isset( $spacing['Tablet'] ) ? (int) $spacing['Tablet'] : 10,
				'slidesPerView' => isset( $item_showed['Tablet'] ) ? (int) $item_showed['Tablet'] : 2,
			),
			1024 => array(
				'spaceBetween'  => isset( $spacing['Desktop'] ) ? (int) $spacing['Desktop'] : 10,
				'slidesPerView' => isset( $item_showed['Desktop'] ) ? (int) $item_showed['Desktop'] : 3,
			),
		);

		return ' data-loop="' . esc_attr( $loop ? 'true' : 'false' ) . '"' .
			' data-autoplay="' . esc_attr( $autoplay ? 'true' : 'false' ) . '"' .
			' data-timeout="' . esc_attr( $autoplay_timeout ) . '"' .
			' data-nav="' . esc_attr( $show_nav ? 'true' : 'false' ) . '"' .
			' data-arrow="' . esc_attr( $show_arrow ? 'true' : 'false' ) . '"' .
			' data-breakpoints="' . esc_attr( wp_json_encode( $breakpoints ) ) . '"';
	}

	/**
	 * Render content
	 *
	 * @return string
	 */
	public function render_content() {
		$testimonial_data = $this->attributes['testimonialData'] ?? array();
		$show_arrow       = $this->attr_is_true( $this->attributes['showArrow'] ?? false );
		$show_nav         = $this->attr_is_true( $this->attributes['showNav'] ?? false );

		$slides = '';
		foreach ( $testimonial_data as $index => $item ) {
			$slides .= '<div class="swiper-slide">' . $this->render_content_item( $item, $index ) . '</div>';
		}

		$pagination = '';
		if ( $show_nav ) {
			$pagination = '<div class="swiper-pagination"></div>';
		}

		$navigation = '';
		if ( $show_arrow ) {
			$navigation = '<div class="swiper-button-prev"></div><div class="swiper-button-next"></div>';
		}

		$element_id  = $this->get_element_id();
		$swiper_data = $this->render_swiper_data();

		return '<div class="testimonials-list">
            <div id="' . esc_attr( $element_id ) . '" class="swiper-container" ' . $swiper_data . '>
                <div class="swiper-wrapper">
                    ' . $slides . '
                </div>
                ' . $pagination . '
                ' . $navigation . '
            </div>
        </div>';
	}

	/**
	 * Render view in editor
	 *
	 * @return mixed
	 */
	public function render_gutenberg() {
		return $this->render_content();
	}

	/**
	 * Render view in frontend
	 *
	 * @return mixed
	 */
	public function render_frontend() {
		if ( ! empty( trim( $this->block_data->inner_html ) ) && apply_filters( 'gutenverse_force_dynamic', false ) ) {
			return $this->content;
		}
		$element_id      = $this->get_element_id();
		$display_classes = $this->set_display_classes();
		$animation_class = $this->set_animation_classes();
		$custom_classes  = $this->get_custom_classes();
		$content_type    = isset( $this->attributes['contentType'] ) ? (int) $this->attributes['contentType'] : 1;

		$anchor      = isset( $this->attributes['anchor'] ) ? $this->attributes['anchor'] : '';
		$anchor_attr = ! empty( $anchor ) ? ' id="' . esc_attr( $anchor ) . '"' : '';
		$class_name  = trim( 'guten-element guten-testimonials no-margin ' . $element_id . $animation_class . $display_classes . $custom_classes . ' style-' . $content_type . ' quote-override' );
		$content     = '<div' . $anchor_attr . ' class="' . esc_attr( $class_name ) . '">' . $this->render_content() . '</div>';

		return $content;
	}
}
