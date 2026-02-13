<?php
/**
 * Frontend Assets class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse
 */

namespace Gutenverse;

/**
 * Class Frontend Assets
 *
 * @package gutenverse
 */
class Frontend_Assets {
	/**
	 * Init constructor.
	 */
	public function __construct() {
		add_filter( 'gutenverse_include_frontend', array( $this, 'load_conditional_scripts' ) );
		add_filter( 'gutenverse_include_frontend', array( $this, 'load_conditional_styles' ) );
		add_filter( 'gutenverse_conditional_script_attributes', array( $this, 'font_icon_conditional_load' ), null, 3 );
	}

	/**
	 * Icon conditional load
	 *
	 * @param mixed $conditions The value from the attributes array.
	 *
	 * @since 3.3.0
	 */
	private function icon_conditional_load( &$conditions ) {
		$conditions[] = array(
			'style' => 'fontawesome-gutenverse',
		);

		$conditions[] = array(
			'style' => 'gutenverse-iconlist',
		);

		return $conditions;
	}

	/**
	 * Icon conditional load by value. This will only work if the icon type is 'icon' and icon default is font icon.
	 *
	 * @param mixed $attrs The value from the attributes array.
	 * @param mixed $name The value from the attributes array.
	 * @param mixed $conditions The value from the attributes array.
	 */
	public function icon_conditional_load_by_value( $attrs, $name, &$conditions ) {
		if ( ! isset( $attrs[ $name . 'Type' ] ) ) {
			if ( isset( $attrs[ $name ] ) ) {
				'' !== $attrs[ $name ] && $this->icon_conditional_load( $conditions );
			} else {
				$this->icon_conditional_load( $conditions );
			}
		}
	}

	/**
	 * Icon conditional load by value. This will only work if the icon type is 'icon' and icon default is font icon.
	 *
	 * @param mixed $attrs The value from the attributes array.
	 * @param mixed $name The value from the attributes array.
	 * @param mixed $conditions The value from the attributes array.
	 */
	public function icon_conditional_load_by_empty_value( $attrs, $name, &$conditions ) {
		if ( ! isset( $attrs[ $name . 'Type' ] ) ) {
			if ( isset( $attrs[ $name ] ) ) {
				'' !== $attrs[ $name ] && $this->icon_conditional_load( $conditions );
			}
		}
	}

	/**
	 * Load the font icon
	 *
	 * @param mixed  $conditions The value from the attributes array.
	 * @param string $attrs The comparison operator (e.g., '===', '!==').
	 * @param mixed  $block_name The value to compare against.
	 *
	 * @since 3.3.0
	 */
	public function font_icon_conditional_load( $conditions, $attrs, $block_name ) {
		switch ( $block_name ) {
			case 'gutenverse/nav-menu':
				$this->icon_conditional_load_by_value( $attrs, 'mobileIcon', $conditions );
				$this->icon_conditional_load_by_value( $attrs, 'mobileCloseIcon', $conditions );
				$this->icon_conditional_load_by_value( $attrs, 'submenuItemIndicator', $conditions );
				break;
			case 'gutenverse/divider':
				if ( isset( $attrs['content'] ) && 'icon' === $attrs['content'] ) {
					$this->icon_conditional_load_by_value( $attrs, 'icon', $conditions );
				}
				break;
			case 'gutenverse/accordions':
				$this->icon_conditional_load_by_value( $attrs, 'iconOpen', $conditions );
				$this->icon_conditional_load_by_value( $attrs, 'iconClosed', $conditions );
				break;
			case 'gutenverse/button':
				if ( isset( $attrs['showIcon'] ) && $attrs['showIcon'] ) {
					$this->icon_conditional_load_by_value( $attrs, 'icon', $conditions );
				}
				break;
			case 'gutenverse/breadcrumb':
				$this->icon_conditional_load_by_value( $attrs, 'separatorIcon', $conditions );
				break;
			case 'gutenverse/fun-fact':
				$this->icon_conditional_load_by_value( $attrs, 'icon', $conditions );
				break;
			case 'gutenverse/icon':
				$this->icon_conditional_load_by_value( $attrs, 'icon', $conditions );
				break;
			case 'gutenverse/icon-box':
				if ( isset( $attrs['watermarkShow'] ) && $attrs['watermarkShow'] ) {
					$this->icon_conditional_load_by_value( $attrs, 'watermarkIcon', $conditions );
				}
				$this->icon_conditional_load_by_value( $attrs, 'icon', $conditions );
				break;
			case 'gutenverse/icon-list-item':
				if ( isset( $attrs['hideIcon'] ) ) {
					! $attrs['hideIcon'] && $this->icon_conditional_load_by_empty_value( $attrs, 'icon', $conditions );
				} else {
					$this->icon_conditional_load_by_empty_value( $attrs, 'icon', $conditions );
				}
				break;
			case 'gutenverse/gallery':
				$this->icon_conditional_load_by_value( $attrs, 'zoomIcon', $conditions );
				$this->icon_conditional_load_by_value( $attrs, 'linkIcon', $conditions );
				if ( isset( $attrs['enableLoadMore'] ) && $attrs['enableLoadMore'] ) {
					$this->icon_conditional_load_by_empty_value( $attrs, 'enableLoadIcon', $conditions );
				}
				break;
			case 'gutenverse/image-box':
				$this->icon_conditional_load_by_empty_value( $attrs, 'titleIcon', $conditions );
				break;
			case 'gutenverse/popup-builder':
				$this->icon_conditional_load_by_value( $attrs, 'closeIcon', $conditions );
				break;
			case 'gutenverse/portfolio-gallery':
				if ( ! isset( $attrs['showLink'] ) ) {
					$this->icon_conditional_load_by_value( $attrs, 'linkIcon', $conditions );
				}
				break;
			case 'gutenverse/post-block':
				// Check readmore icon.
				if ( ! isset( $attrs['readmoreEnabled'] ) || $attrs['readmoreEnabled'] ) {
					$this->icon_conditional_load_by_value( $attrs, 'readmoreIcon', $conditions );
				}

				// Check comment icon.
				if ( isset( $attrs['commentEnabled'] ) && $attrs['commentEnabled'] ) {
					$this->icon_conditional_load_by_value( $attrs, 'commentIcon', $conditions );
				}

				// Check meta author icon.
				if ( ( ! isset( $attrs['metaEnabled'] ) || $attrs['metaEnabled'] ) && ( ! isset( $attrs['metaAuthorEnabled'] ) || $attrs['metaAuthorEnabled'] ) ) {
					$this->icon_conditional_load_by_value( $attrs, 'metaAuthorIcon', $conditions );
				}

				// Check meta date icon.
				if ( ( ! isset( $attrs['metaEnabled'] ) || $attrs['metaEnabled'] ) && ( ! isset( $attrs['metaDateEnabled'] ) || $attrs['metaDateEnabled'] ) ) {
					$this->icon_conditional_load_by_value( $attrs, 'metaDateIcon', $conditions );
				}

				// Check pagination icons.
				if ( isset( $attrs['paginationMode'] ) ) {
					if ( in_array( $attrs['paginationMode'], array( 'loadmore', 'scrollload' ), true ) ) {
						$this->icon_conditional_load_by_empty_value( $attrs, 'paginationIcon', $conditions );
					}

					if ( in_array( $attrs['paginationMode'], array( 'prevnext', 'number', 'normal-prevnext', 'normal-number' ), true ) ) {
						$this->icon_conditional_load_by_value( $attrs, 'paginationPrevIcon', $conditions );
						$this->icon_conditional_load_by_value( $attrs, 'paginationNextIcon', $conditions );
					}
				}
				break;
			case 'gutenverse/search':
				$this->icon_conditional_load_by_value( $attrs, 'closeIcon', $conditions );
				break;
			case 'gutenverse/social-icon':
				$this->icon_conditional_load_by_value( $attrs, 'icon', $conditions );
				break;
			case 'gutenverse/taxonomy-list':
				if ( isset( $attrs['showIcon'] ) && $attrs['showIcon'] ) {
					$this->icon_conditional_load_by_value( $attrs, 'icon', $conditions );
				}
				break;
			case 'gutenverse/testimonials':
				if ( isset( $attrs['showQuote'] ) && $attrs['showQuote'] ) {
					$this->icon_conditional_load_by_value( $attrs, 'iconQuote', $conditions );
				}

				if ( isset( $attrs['showRating'] ) && $attrs['showRating'] ) {
					$this->icon_conditional_load_by_value( $attrs, 'iconRatingFull', $conditions );
					$this->icon_conditional_load_by_value( $attrs, 'iconRatingHalf', $conditions );
				}
				break;
			case 'gutenverse/chart':
				if ( isset( $attrs['chartContent'] ) && 'icon' === $attrs['chartContent'] ) {
					$this->icon_conditional_load_by_value( $attrs, 'icon', $conditions );
				}
				break;
			case 'gutenverse/post-list':
				if ( isset( $attrs['iconEnabled'] ) && $attrs['iconEnabled'] ) {
					$this->icon_conditional_load_by_value( $attrs, 'icon', $conditions );
				}

				if ( isset( $attrs['metaEnabled'] ) && $attrs['metaEnabled'] ) {
					if ( isset( $attrs['metaDateEnabled'] ) && $attrs['metaDateEnabled'] ) {
						$this->icon_conditional_load_by_value( $attrs, 'metaDateIcon', $conditions );
					}
					if ( isset( $attrs['metaCategoryEnabled'] ) && $attrs['metaCategoryEnabled'] ) {
						$this->icon_conditional_load_by_value( $attrs, 'metaCategoryIcon', $conditions );
					}
				}

				// Check pagination icons.
				if ( isset( $attrs['paginationMode'] ) ) {
					if ( in_array( $attrs['paginationMode'], array( 'loadmore', 'scrollload' ), true ) ) {
						$this->icon_conditional_load_by_empty_value( $attrs, 'paginationIcon', $conditions );
					}

					if ( in_array( $attrs['paginationMode'], array( 'prevnext', 'number', 'normal-prevnext', 'normal-number' ), true ) ) {
						$this->icon_conditional_load_by_value( $attrs, 'paginationPrevIcon', $conditions );
						$this->icon_conditional_load_by_value( $attrs, 'paginationNextIcon', $conditions );
					}
				}
				break;
			case 'gutenverse/feature-list':
				if ( isset( $attrs['featureList'] ) && $attrs['featureList'] ) {
					$feature_list = $attrs['featureList'];
					if ( is_string( $feature_list ) ) {
						$feature_list = json_decode( $feature_list, true );
					}

					if ( is_array( $feature_list ) || is_object( $feature_list ) ) {
						foreach ( $feature_list as $feature ) {
							if ( 'icon' === $feature['type'] && '' !== $feature['icon'] ) {
								$this->icon_conditional_load( $conditions );
							}
						}
					}
				}
				break;
		}

		return $conditions;
	}

	/**
	 * Load the scripts
	 *
	 * @since 3.3.0
	 */
	public function load_conditional_scripts() {
		$blocks = array(
			'accordion',
			'animated-text',
			'chart',
			'client-logo',
			'countdown',
			'fun-fact',
			'gallery',
			'google-maps',
			'nav-menu',
			'popup-builder',
			'portfolio-gallery',
			'post-comment',
			'postblock',
			'postlist',
			'progress-bar',
			'search',
			'tab',
			'team',
			'testimonials',
			'video',
		);

		foreach ( $blocks as $block ) {
			$include   = ( include GUTENVERSE_DIR . '/lib/dependencies/frontend/' . $block . '.asset.php' )['dependencies'];
			$include[] = 'gutenverse-frontend-event';

			wp_register_script(
				'gutenverse-frontend-' . $block . '-script',
				GUTENVERSE_URL . '/assets/js/frontend/' . $block . '.js',
				$include,
				GUTENVERSE_VERSION,
				true
			);
		}
	}

	/**
	 * Load the styles
	 *
	 * @since 3.3.0
	 */
	public function load_conditional_styles() {
		$blocks = array(
			'accordions',
			'accordion',
			'advanced-heading',
			'animated-text',
			'archive-title',
			'breadcrumb',
			'buttons',
			'button',
			'chart',
			'countdown',
			'demo',
			'divider',
			'feature-list',
			'fun-fact',
			'gallery',
			'google-maps',
			'heading',
			'icon',
			'icon-box',
			'icon-list',
			'icon-list-item',
			'image',
			'image-box',
			'logo-slider',
			'nav-menu',
			'popup-builder',
			'portfolio-gallery',
			'post-author',
			'post-block',
			'post-comment',
			'post-content',
			'post-date',
			'post-excerpt',
			'post-featured-image',
			'post-list',
			'post-terms',
			'post-title',
			'progress-bar',
			'search',
			'search-result-title',
			'social-icons',
			'social-icon',
			'social-share',
			'social-share-item',
			'spacer',
			'star-rating',
			'tabs',
			'taxonomy-list',
			'team',
			'testimonials',
			'text-editor',
			'text-paragraph',
			'video',
			'query-loop',
			'post-template',
		);

		wp_register_style(
			'gutenverse-frontend',
			GUTENVERSE_URL . '/assets/css/frontend.css',
			array(),
			GUTENVERSE_VERSION
		);

		foreach ( $blocks as $block ) {
			wp_register_style(
				'gutenverse-frontend-' . $block . '-style',
				GUTENVERSE_URL . '/assets/css/frontend/' . $block . '.css',
				array( 'gutenverse-frontend' ),
				GUTENVERSE_VERSION
			);
		}
	}
}
