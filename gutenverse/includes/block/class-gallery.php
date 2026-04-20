<?php
/**
 * Gallery Block class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\block
 */

namespace Gutenverse\Block;

use Gutenverse\Framework\Block\Block_Abstract;

/**
 * Class Gallery Block
 *
 * @package gutenverse\block
 */
class Gallery extends Block_Abstract {

	/**
	 * Get Image Condition
	 *
	 * @param array $image Image data.
	 * @param bool  $include_main_class Whether to include main-image class.
	 * @return string
	 */
	private function image_condition( $image, $include_main_class = true ) {
		$image_load       = isset( $image['imageLoad'] ) ? $image['imageLoad'] : '';
		$image_alt_type   = isset( $image['imageAlt'] ) ? $image['imageAlt'] : '';
		$image_custom_alt = isset( $image['imageCustomAlt'] ) ? $image['imageCustomAlt'] : '';
		$rendered_alt     = isset( $image['title'] ) ? $image['title'] : '';

		if ( 'original' === $image_alt_type ) {
			$rendered_alt = isset( $image['src']['altOriginal'] ) ? $image['src']['altOriginal'] : '';
		} elseif ( 'custom' === $image_alt_type ) {
			$rendered_alt = $image_custom_alt;
		} elseif ( 'none' === $image_alt_type ) {
			$rendered_alt = false;
		}

		$src            = ( isset( $image['src'] ) && isset( $image['src']['image'] ) ) ? $image['src']['image'] : GUTENVERSE_URL . 'assets/img/placeholder.png';
		$height         = isset( $image['src']['height'] ) ? $image['src']['height'] : '';
		$width          = isset( $image['src']['width'] ) ? $image['src']['width'] : '';
		$alt_attr       = ( false !== $rendered_alt ) ? ' alt="' . esc_attr( $rendered_alt ) . '"' : '';
		$loading_attr   = ( 'lazy' === $image_load ) ? ' loading="lazy"' : '';
		$dimension_attr = '';

		if ( $height ) {
			$dimension_attr .= ' height="' . esc_attr( $height ) . '"';
		}
		if ( $width ) {
			$dimension_attr .= ' width="' . esc_attr( $width ) . '"';
		}

		$class_attr = $include_main_class ? ' class="main-image"' : '';

		return '<img' . $class_attr . ' src="' . esc_url( $src ) . '"' . $alt_attr . $loading_attr . $dimension_attr . ' />';
	}

	/**
	 * Render Rating Items
	 *
	 * @param float $rating Rating value.
	 * @return string
	 */
	private function rating_items( $rating ) {
		$output = '';
		$j      = 0;
		$arr    = array();
		for ( $i = 0; $i < $rating * 2; ++$i ) {
			if ( 0 === $i % 2 ) {
				$arr[] = 1;
				++$j;
			} else {
				++$arr[ $j - 1 ];
			}
		}

		foreach ( $arr as $item ) {
			if ( 2 === $item ) {
				$output .= '<li><i class="fas fa-star"></i></li>';
			} else {
				$output .= '<li><i class="fas fa-star-half"></i></li>';
			}
		}
		return $output;
	}

	/**
	 * Render Gallery Item
	 *
	 * @param array $item Item data.
	 * @return string
	 */
	private function render_gallery_item( $item ) {
		$layout         = isset( $this->attributes['layout'] ) ? $this->attributes['layout'] : 'overlay';
		$hover          = isset( $this->attributes['hover'] ) ? $this->attributes['hover'] : 'fade-in';
		$zoom_icon      = isset( $this->attributes['zoomIcon'] ) ? $this->attributes['zoomIcon'] : 'fas fa-search-plus';
		$zoom_icon_type = isset( $this->attributes['zoomIconType'] ) ? $this->attributes['zoomIconType'] : 'icon';
		$zoom_icon_svg  = isset( $this->attributes['zoomIconSVG'] ) ? $this->attributes['zoomIconSVG'] : '';
		$link_icon      = isset( $this->attributes['linkIcon'] ) ? $this->attributes['linkIcon'] : 'fas fa-link';
		$link_icon_type = isset( $this->attributes['linkIconType'] ) ? $this->attributes['linkIconType'] : 'icon';
		$link_icon_svg  = isset( $this->attributes['linkIconSVG'] ) ? $this->attributes['linkIconSVG'] : '';
		$zoom_text      = isset( $this->attributes['zoomText'] ) ? $this->attributes['zoomText'] : '';
		$zoom_text_set  = isset( $this->attributes['zoomText'] );
		$link_text      = isset( $this->attributes['linkText'] ) ? $this->attributes['linkText'] : '';
		$link_text_set  = isset( $this->attributes['linkText'] );
		$zoom_options   = isset( $this->attributes['zoomOptions'] ) ? $this->attributes['zoomOptions'] : 'item';
		$title_tag      = isset( $this->attributes['titleHeadingType'] ) ? $this->attributes['titleHeadingType'] : 'h5';
		$title_tag      = $this->check_tag( $title_tag, 'h5' );

		$hover_class = '';
		if ( in_array( $hover, array( 'slide-up', 'fade-in', 'zoom-in' ), true ) ) {
			$hover_class = "animated $hover";
		}

		$image_html = $this->image_condition( $item );

		$output  = '<div class="grid-item">';
		$output .= '<div class="thumbnail-wrap">';
		$output .= $image_html;

		$caption_class = ( 'overlay' === $layout ) ? 'caption-wrap style-overlay overlay-overlay ' . $hover_class : 'caption-wrap search-hover-bg style-overlay ' . $hover_class;
		$output       .= '<div class="' . esc_attr( $caption_class ) . '">';

		if ( empty( $item['disableLightbox'] ) ) {
			$output .= '<div class="item-hover-bg"></div>';

			if ( 'overlay' === $layout ) {
				$output .= '<div class="item-caption-over">';
				$output .= '<' . $title_tag . ' class="item-title">' . wp_kses_post( isset( $item['title'] ) ? $item['title'] : '' ) . '</' . $title_tag . '>';
				$output .= '<div class="item-content">' . wp_kses_post( isset( $item['content'] ) ? $item['content'] : '' ) . '</div>';

				$output .= '<div class="item-buttons">';
				if ( 'disable' !== $zoom_options && ( $zoom_icon || $zoom_text_set ) ) {
					$zoom_text_class = ( 'none' !== $zoom_text ) ? 'with-text' : '';
					$output         .= '<div class="gallery-link zoom ' . esc_attr( $zoom_text_class ) . '">';
					if ( $zoom_text_set ) {
						$output .= '<p class="item-icon-text zoom-text">' . esc_html( $zoom_text ) . '</p>';
					}
					if ( $zoom_icon ) {
						$output .= '<span class="item-icon-inner">';
						if ( 'svg' === $zoom_icon_type && $zoom_icon_svg ) {
							// phpcs:ignore WordPress.PHP.DiscouragedPHPFunctions.obfuscation_base64_decode
							$svg_data = base64_decode( $zoom_icon_svg );
							if ( gutenverse_is_svg_safe( $svg_data ) ) {
								$output .= '<div class="gutenverse-icon-svg">' . $svg_data . '</div>';
							}
						} else {
							$output .= '<i class="' . esc_attr( $zoom_icon ) . '" aria-hidden="true"></i>';
						}
						$output .= '</span>';
					}
					$output .= '</div>';
				}

				if ( empty( $item['disableLink'] ) && ( $link_icon || $link_text_set ) ) {
					$link_url        = isset( $item['link'] ) ? $item['link'] : '';
					$zoom_text_class = ( 'none' !== $zoom_text ) ? 'with-text' : '';
					/* translators: %s: Item title */
					$output .= '<a aria-label="' . esc_attr( sprintf( __( 'Link to %s', 'gutenverse' ), $item['title'] ) ) . '" href="' . esc_url( $link_url ) . '" class="gallery-link link ' . esc_attr( $zoom_text_class ) . '">';
					if ( $link_text_set ) {
						$output .= '<p class="item-icon-text link-text">' . esc_html( $link_text ) . '</p>';
					}
					if ( $link_icon ) {
						$output .= '<span class="item-icon-inner">';
						if ( 'svg' === $link_icon_type && $link_icon_svg ) {
							// phpcs:ignore WordPress.PHP.DiscouragedPHPFunctions.obfuscation_base64_decode
							$svg_data = base64_decode( $link_icon_svg );
							if ( gutenverse_is_svg_safe( $svg_data ) ) {
								$output .= '<div class="gutenverse-icon-svg">' . $svg_data . '</div>';
							}
						} else {
							$output .= '<i class="' . esc_attr( $link_icon ) . '" aria-hidden="true"></i>';
						}
						$output .= '</span>';
					}
					$output .= '</a>';
				}
				$output .= '</div>'; // item-buttons.
				$output .= '</div>'; // item-caption-over.

				$output .= '<div class="caption-head">';
				if ( ! empty( $item['showPrice'] ) ) {
					$output .= '<div class="item-price">' . esc_html( $item['price'] ) . '</div>';
				}
				if ( ! empty( $item['showRating'] ) ) {
					$output .= '<div class="item-rating">';
					$output .= $this->rating_items( $item['ratingNumber'] );
					$output .= '<span>' . esc_html( $item['ratingNumber'] ) . '</span>';
					$output .= '</div>';
				}
				$output .= '</div>';

				if ( ! empty( $item['showCategory'] ) && ! empty( $item['printLabelCategory'] ) ) {
					$output .= '<div class="caption-category"><span>' . esc_html( $item['category'] ) . '</span></div>';
				}
			} else {
				// Card layout (not overlay).
				$output .= '<div class="caption-head">';
				if ( ! empty( $item['showPrice'] ) ) {
					$output .= '<div class="item-price">' . esc_html( $item['price'] ) . '</div>';
				}
				if ( ! empty( $item['showRating'] ) ) {
					$output .= '<div class="item-rating">';
					$output .= $this->rating_items( $item['ratingNumber'] );
					$output .= '<span>' . esc_html( $item['ratingNumber'] ) . '</span>';
					$output .= '</div>';
				}
				$output .= '</div>';

				$output .= '<div class="caption-button">';
				$output .= '<div class="item-buttons">';
				if ( 'disable' !== $zoom_options && $zoom_icon ) {
					$zoom_text_class = ( 'none' !== $zoom_text ) ? 'with-text' : '';
					$output         .= '<div class="gallery-link zoom ' . esc_attr( $zoom_text_class ) . '">';
					if ( $zoom_text_set ) {
						$output .= '<p class="item-icon-text zoom-text">' . esc_html( $zoom_text ) . '</p>';
					}
					$output .= '<span class="item-icon-inner">';
					if ( 'svg' === $zoom_icon_type && $zoom_icon_svg ) {
						// phpcs:ignore WordPress.PHP.DiscouragedPHPFunctions.obfuscation_base64_decode
						$svg_data = base64_decode( $zoom_icon_svg );
						if ( gutenverse_is_svg_safe( $svg_data ) ) {
							$output .= '<div class="gutenverse-icon-svg">' . $svg_data . '</div>';
						}
					} else {
						$output .= '<i class="' . esc_attr( $zoom_icon ) . '" aria-hidden="true"></i>';
					}
					$output .= '</span>';
					$output .= '</div>';
				}

				if ( empty( $item['disableLink'] ) && $link_icon ) {
					$link_url        = isset( $item['link'] ) ? $item['link'] : '';
					$zoom_text_class = ( 'none' !== $zoom_text ) ? 'with-text' : '';
					/* translators: %s: Item title */
					$output .= '<a aria-label="' . esc_attr( sprintf( __( 'Link to %s', 'gutenverse' ), $item['title'] ) ) . '" href="' . esc_url( $link_url ) . '" class="gallery-link link ' . esc_attr( $zoom_text_class ) . '">';
					if ( $link_text_set ) {
						$output .= '<p class="item-icon-text link-text">' . esc_html( $link_text ) . '</p>';
					}
					$output .= '<span class="item-icon-inner">';
					if ( 'svg' === $link_icon_type && $link_icon_svg ) {
						// phpcs:ignore WordPress.PHP.DiscouragedPHPFunctions.obfuscation_base64_decode
						$svg_data = base64_decode( $link_icon_svg );
						if ( gutenverse_is_svg_safe( $svg_data ) ) {
							$output .= '<div class="gutenverse-icon-svg">' . $svg_data . '</div>';
						}
					} else {
						$output .= '<i class="' . esc_attr( $link_icon ) . '" aria-hidden="true"></i>';
					}
					$output .= '</span>';
					$output .= '</a>';
				}
				$output .= '</div>'; // item-buttons.
				$output .= '</div>'; // caption-button.

				if ( ! empty( $item['showCategory'] ) ) {
					$output .= '<div class="caption-category"><span>' . esc_html( $item['category'] ) . '</span></div>';
				}
			}
		}

		$output .= '</div>'; // caption-wrap.
		$output .= '</div>'; // thumbnail-wrap.

		if ( 'card' === $layout ) {
			$output .= '<div class="caption-wrap style-card">';
			$output .= '<div class="item-caption-over">';
			$output .= '<' . $title_tag . ' class="item-title">' . wp_kses_post( isset( $item['title'] ) ? $item['title'] : '' ) . '</' . $title_tag . '>';
			$output .= '<div class="item-content"><p>' . wp_kses_post( isset( $item['content'] ) ? $item['content'] : '' ) . '</p></div>';
			$output .= '</div>';
			$output .= '</div>';
		}

		$output .= '</div>'; // grid-item.
		return $output;
	}

	/**
	 * Render content logic.
	 *
	 * @return string
	 */
	public function render_content() {
		$element_id              = $this->get_element_id();
		$images                  = isset( $this->attributes['images'] ) ? $this->attributes['images'] : array();
		$showed                  = isset( $this->attributes['showed'] ) ? $this->attributes['showed'] : 6;
		$filter                  = isset( $this->attributes['filter'] ) ? $this->attributes['filter'] : false;
		$filter_type             = isset( $this->attributes['filterType'] ) ? $this->attributes['filterType'] : 'search';
		$filter_all              = isset( $this->attributes['filterAll'] ) ? $this->attributes['filterAll'] : 'All';
		$filter_list             = isset( $this->attributes['filterList'] ) ? $this->attributes['filterList'] : array();
		$enable_loadmore         = isset( $this->attributes['enableLoadMore'] ) ? $this->attributes['enableLoadMore'] : false;
		$enable_loadtext         = isset( $this->attributes['enableLoadText'] ) ? $this->attributes['enableLoadText'] : 'Load More';
		$enable_loadicon         = isset( $this->attributes['enableLoadIcon'] ) ? $this->attributes['enableLoadIcon'] : '';
		$enable_loadicon_type    = isset( $this->attributes['enableLoadIconType'] ) ? $this->attributes['enableLoadIconType'] : 'icon';
		$enable_loadicon_svg     = isset( $this->attributes['enableLoadIconSVG'] ) ? $this->attributes['enableLoadIconSVG'] : '';
		$enable_loadicon_pos     = isset( $this->attributes['enableLoadIconPosition'] ) ? $this->attributes['enableLoadIconPosition'] : 'before';
		$filter_search_icon      = isset( $this->attributes['filterSearchIcon'] ) ? $this->attributes['filterSearchIcon'] : 'fas fa-angle-down';
		$filter_search_icon_svg  = isset( $this->attributes['filterSearchIconSVG'] ) ? $this->attributes['filterSearchIconSVG'] : '';
		$filter_search_icon_type = isset( $this->attributes['filterSearchIconType'] ) ? $this->attributes['filterSearchIconType'] : 'icon';
		$filter_search_icon_pos  = isset( $this->attributes['filterSearchIconPosition'] ) ? $this->attributes['filterSearchIconPosition'] : 'after';
		$filter_search_formtext  = isset( $this->attributes['filterSearchFormText'] ) ? $this->attributes['filterSearchFormText'] : 'Search Gallery Item...';
		$items_per_load          = isset( $this->attributes['itemsPerLoad'] ) ? $this->attributes['itemsPerLoad'] : 2;
		$zoom_options            = isset( $this->attributes['zoomOptions'] ) ? $this->attributes['zoomOptions'] : 'item';
		$title_tag               = isset( $this->attributes['titleHeadingType'] ) ? $this->attributes['titleHeadingType'] : 'h5';
		$title_tag               = $this->check_tag( $title_tag, 'h5' );

		ob_start();
		?>
		<div class="gutenverse-popup-gallery hidden popup-<?php echo $element_id ?>">
			<div class="gallery-header">
				<div class="left-header"></div>
				<div class="right-header">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-fullscreen"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path></svg>
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-minimize hidden"><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path></svg>
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-zoom"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-close"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
				</div>
			</div>
			<div class="gallery-body">
				<div class="images">
					<div id="<?php echo esc_attr( $element_id ); ?>" class="swiper-container">
						<div class="swiper-wrapper">
							<?php foreach ( $images as $index => $image ) : ?>
								<div class="swiper-slide image-list image-list-<?php echo esc_attr( $index ); ?>" data-filter="<?php echo esc_attr( isset( $image['id'] ) ? $image['id'] : '' ); ?>" data-title="<?php echo esc_attr( isset( $image['title'] ) ? $image['title'] : '' ); ?>" data-category="<?php echo esc_attr( isset( $image['category'] ) ? $image['category'] : '' ); ?>" data-content="<?php echo esc_attr( isset( $image['content'] ) ? $image['content'] : '' ); ?>" data-index="<?php echo esc_attr( $index ); ?>">
									<div class="content-image swiper-zoom-container">
										<?php echo $this->image_condition( $image ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
										<?php if ( ! empty( $image['lightboxDescription'] ) ) : ?>
											<div class="content-description-wrapper">
												<<?php echo esc_attr( $title_tag ); ?> class="content-title"><?php echo esc_html( $image['title'] ); ?></<?php echo esc_attr( $title_tag ); ?>>
												<div class="content-description">
													<p><?php echo wp_kses_post( isset( $image['content'] ) ? $image['content'] : '' ); ?></p>
												</div>
											</div>
										<?php endif; ?>
									</div>
								</div>
							<?php endforeach; ?>
						</div>
						<div class="swiper-button-prev"></div>
						<div class="swiper-button-next"></div>
					</div>
				</div>
			</div>
		</div>

		<?php if ( $filter ) : ?>
			<?php if ( 'tab' === $filter_type ) : ?>
				<div class="filter-controls">
					<ul>
						<li class="guten-gallery-control active" data-flag-all="true" data-filter="<?php echo esc_attr( $filter_all ); ?>"><?php echo esc_html( $filter_all ); ?></li>
						<?php foreach ( $filter_list as $filter_item ) : ?>
							<?php if ( ! empty( $filter_item['name'] ) ) : ?>
								<li class="guten-gallery-control" data-filter="<?php echo esc_attr( $filter_item['name'] ); ?>"><?php echo esc_html( $filter_item['name'] ); ?></li>
							<?php endif; ?>
						<?php endforeach; ?>
					</ul>
				</div>
			<?php else : ?>
				<div class="search-filters-wrap">
					<div class="filter-wrap">
						<button id="search-filter-trigger" data-flag-all="true" class="search-filter-trigger icon-position-<?php echo esc_attr( $filter_search_icon_pos ); ?>">
							<?php if ( 'before' === $filter_search_icon_pos ) : ?>
								<?php if ( 'svg' === $filter_search_icon_type && $filter_search_icon_svg ) : ?>
									<?php
									// phpcs:ignore WordPress.PHP.DiscouragedPHPFunctions.obfuscation_base64_decode
									$svg_data = base64_decode( $filter_search_icon_svg );
									if ( gutenverse_is_svg_safe( $svg_data ) ) :
									?>
									<div class="gutenverse-icon-svg"><?php echo $svg_data; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- sanitized by gutenverse_is_svg_safe ?></div>
									<?php endif; ?>
								<?php else : ?>
									<i aria-hidden="true" class="<?php echo esc_attr( $filter_search_icon ); ?>"></i>
								<?php endif; ?>
							<?php endif; ?>
							<span><?php echo esc_html( $filter_all ); ?></span>
							<?php if ( 'after' === $filter_search_icon_pos ) : ?>
								<?php if ( 'svg' === $filter_search_icon_type && $filter_search_icon_svg ) : ?>
									<?php
									// phpcs:ignore WordPress.PHP.DiscouragedPHPFunctions.obfuscation_base64_decode
									$svg_data = base64_decode( $filter_search_icon_svg );
									if ( gutenverse_is_svg_safe( $svg_data ) ) :
									?>
									<div class="gutenverse-icon-svg"><?php echo $svg_data; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- sanitized by gutenverse_is_svg_safe ?></div>
									<?php endif; ?>
								<?php else : ?>
									<i aria-hidden="true" class="<?php echo esc_attr( $filter_search_icon ); ?>"></i>
								<?php endif; ?>
							<?php endif; ?>
						</button>
						<ul class="search-filter-controls">
							<li class="guten-gallery-control active" data-flag-all="true" data-filter="<?php echo esc_attr( $filter_all ); ?>"><?php echo esc_html( $filter_all ); ?></li>
							<?php foreach ( $filter_list as $filter_item ) : ?>
								<?php if ( ! empty( $filter_item['name'] ) ) : ?>
									<li class="guten-gallery-control" data-filter="<?php echo esc_attr( $filter_item['name'] ); ?>"><?php echo esc_html( $filter_item['name'] ); ?></li>
								<?php endif; ?>
							<?php endforeach; ?>
						</ul>
					</div>
					<form class="guten-gallery-search-box" id="guten-gallery-search-box" autocomplete="off">
						<input type="text" id="guten-gallery-search-box-input" name="guten-frontend-search" placeholder="<?php echo esc_attr( $filter_search_formtext ); ?>" />
					</form>
				</div>
			<?php endif; ?>
		<?php endif; ?>

		<div class="gallery-items" data-loaded="<?php echo esc_attr( $showed ); ?>" data-more="<?php echo esc_attr( $items_per_load ); ?>" data-max="<?php echo esc_attr( count( $images ) ); ?>" <?php echo ( $zoom_options && 'item' !== $zoom_options ) ? 'data-zoom="' . esc_attr( $zoom_options ) . '"' : ''; ?>>
			<?php foreach ( $images as $index => $item ) : ?>
				<div class="gallery-item-wrap <?php echo esc_attr( $index >= $showed ? 'item-hidden' : '' ); ?>" data-index="<?php echo esc_attr( $index ); ?>" data-control="<?php echo esc_attr( isset( $item['id'] ) ? $item['id'] : '' ); ?>">
					<?php echo $this->render_gallery_item( $item ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
				</div>
			<?php endforeach; ?>
		</div>

		<?php if ( $enable_loadmore && ( $showed < count( $images ) ) ) : ?>
			<div class="load-more-items">
				<div class="guten-gallery-loadmore">
					<a aria-label="Load more" href="#" class="guten-gallery-load-more">
						<?php if ( $enable_loadicon && 'before' === $enable_loadicon_pos ) : ?>
							<span class="load-more-icon icon-position-before" aria-hidden="true">
								<?php if ( 'svg' === $enable_loadicon_type && $enable_loadicon_svg ) : ?>
									<?php
									// phpcs:ignore WordPress.PHP.DiscouragedPHPFunctions.obfuscation_base64_decode
									$svg_data = base64_decode( $enable_loadicon_svg );
									if ( gutenverse_is_svg_safe( $svg_data ) ) :
									?>
									<div class="gutenverse-icon-svg"><?php echo $svg_data; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- sanitized by gutenverse_is_svg_safe ?></div>
									<?php endif; ?>
								<?php else : ?>
									<i class="<?php echo esc_attr( $enable_loadicon ); ?>"></i>
								<?php endif; ?>
							</span>
						<?php endif; ?>
						<span class="load-more-text"><?php echo esc_html( $enable_loadtext ); ?></span>
						<?php if ( $enable_loadicon && 'after' === $enable_loadicon_pos ) : ?>
							<span class="load-more-icon icon-position-after" aria-hidden="true">
								<?php if ( 'svg' === $enable_loadicon_type && $enable_loadicon_svg ) : ?>
									<?php
									// phpcs:ignore WordPress.PHP.DiscouragedPHPFunctions.obfuscation_base64_decode
									$svg_data = base64_decode( $enable_loadicon_svg );
									if ( gutenverse_is_svg_safe( $svg_data ) ) :
									?>
									<div class="gutenverse-icon-svg"><?php echo $svg_data; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- sanitized by gutenverse_is_svg_safe ?></div>
									<?php endif; ?>
								<?php else : ?>
									<i class="<?php echo esc_attr( $enable_loadicon ); ?>"></i>
								<?php endif; ?>
							</span>
						<?php endif; ?>
					</a>
				</div>
			</div>
		<?php endif; ?>
		<?php
		return ob_get_clean();
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
		if ( ! empty( trim( $this->block_data->inner_html ) ) && apply_filters( 'gutenverse_force_dynamic', false ) ) {
			return $this->content;
		}
		$element_id              = $this->get_element_id();
		$grid                    = isset( $this->attributes['grid'] ) ? $this->attributes['grid'] : 'grid';
		$column                  = isset( $this->attributes['column'] ) ? $this->attributes['column'] : array();
		$layout                  = isset( $this->attributes['layout'] ) ? $this->attributes['layout'] : 'overlay';
		$display_classes         = $this->set_display_classes();
		$animation_class         = $this->set_animation_classes();
		$custom_classes          = $this->get_custom_classes();
		$filter_remove_animation = isset( $this->attributes['filterRemoveAnimation'] ) ? $this->attributes['filterRemoveAnimation'] : false;

		$col_desktop = isset( $column['Desktop'] ) ? $column['Desktop'] : 3;
		$col_tablet  = isset( $column['Tablet'] ) ? $column['Tablet'] : 2;
		$col_mobile  = isset( $column['Mobile'] ) ? $column['Mobile'] : 2;

		$anchor     = isset( $this->attributes['anchor'] ) ? $this->attributes['anchor'] : '';
		$class_name = trim( "guten-element guten-gallery $element_id $animation_class $display_classes layout-$layout grid-desktop-$col_desktop grid-tablet-$col_tablet grid-mobile-$col_mobile $custom_classes" );
		$data_id    = '';
		if ( isset( $this->attributes['advanceAnimation']['type'] ) && ! empty( $this->attributes['advanceAnimation']['type'] ) ) {
			$id_parts = explode( '-', $element_id );
			if ( count( $id_parts ) > 1 ) {
				$data_id = ' data-id="' . esc_attr( $id_parts[1] ) . '"';
			}
		}

		$id_attr = ! empty( $anchor ) ? ' id="' . esc_attr( $anchor ) . '"' : '';
		$output  = '<div' . $id_attr . ' class="' . esc_attr( $class_name ) . '" data-grid="' . esc_attr( $grid ) . '"' . ( $filter_remove_animation ? ' data-remove-animation="true"' : '' ) . $data_id . '>';
		$output .= $this->render_content(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		$output .= '</div>';

		$output = apply_filters( 'gutenverse_cursor_move_effect_script', $output, $this->attributes, $element_id );
		$output = apply_filters( 'gutenverse_advance_animation_script', $output, $this->attributes, $element_id, 'gallery' );

		return $output;
	}
}
