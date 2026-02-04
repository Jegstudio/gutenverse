<?php
/**
 * Gutenverse Gallery
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\style
 */

namespace Gutenverse\Style;

use Gutenverse\Framework\Style_Abstract;

/**
 * Class Gallery
 *
 * @package gutenverse\style
 */
class Gallery extends Style_Abstract {
	/**
	 * Block Directory
	 *
	 * @var string
	 */
	protected $block_dir = GUTENVERSE_DIR . '/block/';

	/**
	 * Block Name
	 *
	 * @var array
	 */
	protected $name = 'gallery';

	/**
	 * Constructor
	 *
	 * @param array $attrs Attribute.
	 */
	public function __construct( $attrs ) {
		parent::__construct( $attrs );

		$this->set_feature(
			array(
				'background'  => null,
				'border'      => null,
				'positioning' => null,
				'animation'   => null,
				'advance'     => null,
				'mask'        => null,
			)
		);
	}

	/**
	 * Generate style base on attribute.
	 */
	public function generate() {
		if ( isset( $this->attrs['animationDuration'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gallery-items .gallery-item-wrap .thumbnail-wrap .caption-wrap",
					'property'       => function ( $value ) {
						$value = $value / 1000;
						return "animation-duration: {$value}s!important;";
					},
					'value'          => $this->attrs['animationDuration'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['height'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}:not([data-grid='masonry']) .gallery-items .gallery-item-wrap .thumbnail-wrap",
					'property'       => function ( $value ) {
						return "height: {$value}px;";
					},
					'value'          => $this->attrs['height'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['enableLoadAlign'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .load-more-items",
					'property'       => function ( $value ) {
						return "text-align: {$value};";
					},
					'value'          => $this->attrs['enableLoadAlign'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['filterTabPadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .filter-controls .guten-gallery-control",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['filterTabPadding'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['filterTabMargin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .filter-controls .guten-gallery-control",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['filterTabMargin'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['filterTabTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector' => ".{$this->element_id} .filter-controls .guten-gallery-control",
					'value'    => $this->attrs['filterTabTypography'],
				)
			);
		}

		if ( isset( $this->attrs['filterTabTextColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .filter-controls .guten-gallery-control",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['filterTabTextColor'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['filterTabTextColorActive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .filter-controls .guten-gallery-control.active",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['filterTabTextColorActive'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['filterTabBackground'] ) ) {
			$this->handle_background( ".{$this->element_id} .filter-controls .guten-gallery-control", $this->attrs['filterTabBackground'] );
		}

		if ( isset( $this->attrs['filterTabBackgroundActive'] ) ) {
			$this->handle_background( ".{$this->element_id} .filter-controls .guten-gallery-control.active", $this->attrs['filterTabBackgroundActive'] );
		}

		if ( isset( $this->attrs['filterTabBorder'] ) ) {
			$this->handle_border( 'filterTabBorder', ".{$this->element_id} .filter-controls .guten-gallery-control" );
		}

		if ( isset( $this->attrs['filterTabBorderResponsive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .filter-controls .guten-gallery-control",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['filterTabBorderResponsive'],
					'device_control' => true,
					'skip_device'    => array(
						'Desktop',
					),
				)
			);
		}

		if ( isset( $this->attrs['filterTabBorderActive'] ) ) {
			$this->handle_border( 'filterTabBorderActive', ".{$this->element_id} .filter-controls .guten-gallery-control.active" );
		}

		if ( isset( $this->attrs['filterTabBorderActiveResponsive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .filter-controls .guten-gallery-control.active",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['filterTabBorderActiveResponsive'],
					'device_control' => true,
					'skip_device'    => array(
						'Desktop',
					),
				)
			);
		}

		if ( isset( $this->attrs['filterTabBoxShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .filter-controls .guten-gallery-control",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['filterTabBoxShadow'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['filterTabBoxShadowActive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .filter-controls .guten-gallery-control.active",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['filterTabBoxShadowActive'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['searchControlWidth'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .search-filters-wrap",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'width' );
					},
					'value'          => $this->attrs['searchControlWidth'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['filterSearchTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector' => ".{$this->element_id} .search-filters-wrap .filter-wrap span, .{$this->element_id} .search-filters-wrap .filter-wrap ul.search-filter-controls li, .{$this->element_id} .search-filters-wrap form.guten-gallery-search-box input[type=text]",
					'value'    => $this->attrs['filterSearchTypography'],
				)
			);
		}

		if ( isset( $this->attrs['fitlerSearchIconSpacing'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .search-filter-trigger.icon-position-after i, .{$this->element_id} .search-filter-trigger.icon-position-after .gutenverse-icon-svg",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'margin-left' );
					},
					'value'          => $this->attrs['fitlerSearchIconSpacing'],
					'device_control' => true,
				)
			);

			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .search-filter-trigger.icon-position-before i, .{$this->element_id} .search-filter-trigger.icon-position-before .gutenverse-icon-svg",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'margin-right' );
					},
					'value'          => $this->attrs['fitlerSearchIconSpacing'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['filterSearchIconSize'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .search-filter-trigger i",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'font-size' );
					},
					'value'          => $this->attrs['filterSearchIconSize'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['fitlerSearchControlWidth'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .search-filters-wrap .filter-wrap",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'flex-basis' );
					},
					'value'          => $this->attrs['fitlerSearchControlWidth'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['filterSearchTextBackground'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .search-filters-wrap .filter-wrap button.search-filter-trigger",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['filterSearchTextBackground'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['filterSearchTextColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .search-filters-wrap .filter-wrap button.search-filter-trigger",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['filterSearchTextColor'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['filterSearchBorder'] ) ) {
			$this->handle_border( 'filterSearchBorder', ".{$this->element_id} .search-filters-wrap .filter-wrap button.search-filter-trigger" );
		}

		if ( isset( $this->attrs['filterSearchBorderResponsive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .search-filters-wrap .filter-wrap button.search-filter-trigger",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['filterSearchBorderResponsive'],
					'device_control' => true,
					'skip_device'    => array(
						'Desktop',
					),
				)
			);
		}

		if ( isset( $this->attrs['filterSearchMargin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .search-filters-wrap .filter-wrap",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['filterSearchMargin'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['filterSearchBoxShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .search-filters-wrap .filter-wrap",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['filterSearchBoxShadow'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['filterSearchSeparatorSize'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .search-filters-wrap .filter-wrap button.search-filter-trigger",
					'property'       => function ( $value ) {
						return "border-right-width: {$value}px;";
					},
					'value'          => $this->attrs['filterSearchSeparatorSize'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['filterSearchSeparatorColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .search-filters-wrap .filter-wrap button.search-filter-trigger",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'border-right-color' );
					},
					'value'          => $this->attrs['filterSearchSeparatorColor'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['filterSearchFormBackground'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .search-filters-wrap .guten-gallery-search-box",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['filterSearchFormBackground'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['filterSearchFormTextColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .search-filters-wrap form.guten-gallery-search-box input[type=text], .{$this->element_id} .search-filters-wrap form.guten-gallery-search-box input[type=text]::placeholder",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['filterSearchFormTextColor'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['fitlerSearchFormWidth'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .search-filters-wrap .guten-gallery-search-box",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'flex-basis' );
					},
					'value'          => $this->attrs['fitlerSearchFormWidth'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['filterSearchFormBorder'] ) ) {
			$this->handle_border( 'filterSearchFormBorder', ".{$this->element_id} .search-filters-wrap .guten-gallery-search-box" );
		}

		if ( isset( $this->attrs['filterSearchFormBorderResponsive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .search-filters-wrap .guten-gallery-search-box",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['filterSearchFormBorderResponsive'],
					'device_control' => true,
					'skip_device'    => array(
						'Desktop',
					),
				)
			);
		}

		if ( isset( $this->attrs['filterSearchFormBoxShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .search-filters-wrap .guten-gallery-search-box",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['filterSearchFormBoxShadow'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['filterSearchDropdownTextColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .search-filters-wrap .filter-wrap ul.search-filter-controls li",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['filterSearchDropdownTextColor'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['filterSearchDropdownTextColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .search-filters-wrap .filter-wrap ul.search-filter-controls li:hover",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['filterSearchDropdownTextColorHover'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['filterSearchDropdownBackground'] ) ) {
			$this->handle_background( ".{$this->element_id} .search-filters-wrap .filter-wrap ul.search-filter-controls", $this->attrs['filterSearchDropdownBackground'] );
		}

		if ( isset( $this->attrs['filterSearchDropdownBorder'] ) ) {
			$this->handle_border( 'filterSearchDropdownBorder', ".{$this->element_id} .search-filters-wrap .filter-wrap ul.search-filter-controls" );
		}

		if ( isset( $this->attrs['filterSearchDropdownBorderResponsive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .search-filters-wrap .filter-wrap ul.search-filter-controls",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['filterSearchDropdownBorderResponsive'],
					'device_control' => true,
					'skip_device'    => array(
						'Desktop',
					),
				)
			);
		}

		if ( isset( $this->attrs['filterSearchDropdownPadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .search-filters-wrap .filter-wrap ul.search-filter-controls",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['filterSearchDropdownPadding'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['iconWrapperMargin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .item-buttons",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['iconWrapperMargin'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['iconBg'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-button .item-buttons .gallery-link span, .{$this->element_id}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap .item-caption-over .item-buttons .gallery-link span",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background' );
					},
					'value'          => $this->attrs['iconBg'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['iconColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-button .item-buttons .gallery-link span, .{$this->element_id}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap .item-caption-over .item-buttons .gallery-link span",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['iconColor'],
					'device_control' => false,
				)
			);
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-button .item-buttons .gallery-link span svg, .{$this->element_id}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap .item-caption-over .item-buttons .gallery-link span svg",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'fill' );
					},
					'value'          => $this->attrs['iconColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['iconSize'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-button .item-buttons .gallery-link span, .{$this->element_id}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap .item-caption-over .item-buttons .gallery-link span",
					'property'       => function ( $value ) {
						return "font-size: {$value}px;";
					},
					'value'          => $this->attrs['iconSize'],
					'device_control' => true,
				)
			);
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-button .item-buttons .gallery-link span svg, .{$this->element_id}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap .item-caption-over .item-buttons .gallery-link span svg",
					'property'       => function ( $value ) {
						return "font-size: {$value}px;";
					},
					'value'          => $this->attrs['iconSize'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['selectionIconPadding'] ) ) {
			if ( 'all' === $this->attrs['selectionIconPadding'] ) {

				if ( isset( $this->attrs['iconPadding'] ) ) {
					$this->inject_style(
						array(
							'selector'       => ".{$this->element_id}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-button .item-buttons .gallery-link span, .{$this->element_id}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap .item-caption-over .item-buttons .gallery-link span",
							'property'       => function ( $value ) {
								return $this->handle_dimension( $value, 'padding' );
							},
							'value'          => $this->attrs['iconPadding'],
							'device_control' => true,
						)
					);
				}
			} elseif ( 'custom' === $this->attrs['selectionIconPadding'] ) {
				if ( isset( $this->attrs['zoomIconPadding'] ) ) {
					$this->inject_style(
						array(
							'selector'       => ".{$this->element_id}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-button .item-buttons .gallery-link.zoom span, .{$this->element_id}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap .item-caption-over .item-buttons .gallery-link.zoom span",
							'property'       => function ( $value ) {
								return $this->handle_dimension( $value, 'padding' );
							},
							'value'          => $this->attrs['zoomIconPadding'],
							'device_control' => true,
						)
					);
				}
				if ( isset( $this->attrs['linkIconPadding'] ) ) {
					$this->inject_style(
						array(
							'selector'       => ".{$this->element_id}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-button .item-buttons .gallery-link.link span, .{$this->element_id}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap .item-caption-over .item-buttons .gallery-link.link span",
							'property'       => function ( $value ) {
								return $this->handle_dimension( $value, 'padding' );
							},
							'value'          => $this->attrs['linkIconPadding'],
							'device_control' => true,
						)
					);
				}
			}
		}

		if ( isset( $this->attrs['iconBorder'] ) ) {
			$this->handle_border( 'iconBorder', ".{$this->element_id}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-button .item-buttons .gallery-link span, .{$this->element_id}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap .item-caption-over .item-buttons .gallery-link span" );
		}

		if ( isset( $this->attrs['iconBorderResponsive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-button .item-buttons .gallery-link span, .{$this->element_id}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap .item-caption-over .item-buttons .gallery-link span",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['iconBorderResponsive'],
					'device_control' => true,
					'skip_device'    => array(
						'Desktop',
					),
				)
			);
		}

		if ( isset( $this->attrs['itemPadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gallery-items .gallery-item-wrap .grid-item",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['itemPadding'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['itemMargin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gallery-items .gallery-item-wrap .grid-item",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['itemMargin'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['itemBorder'] ) ) {
			$this->handle_border( 'itemBorder', ".{$this->element_id} .gallery-items .gallery-item-wrap .grid-item" );
		}

		if ( isset( $this->attrs['itemBorderResponsive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gallery-items .gallery-item-wrap .grid-item",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['itemBorderResponsive'],
					'device_control' => true,
					'skip_device'    => array(
						'Desktop',
					),
				)
			);
		}

		if ( isset( $this->attrs['itemBoxShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gallery-items .gallery-item-wrap .grid-item",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['itemBoxShadow'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['itemBackground'] ) ) {
			$this->handle_background( ".{$this->element_id} .gallery-items .gallery-item-wrap .grid-item", $this->attrs['itemBackground'] );
		}

		if ( isset( $this->attrs['itemHoverBackground'] ) ) {
			$this->handle_background( ".{$this->element_id} .gallery-items .gallery-item-wrap .grid-item .thumbnail-wrap .caption-wrap .item-hover-bg", $this->attrs['itemHoverBackground'] );
		}

		if ( isset( $this->attrs['itemHoverOpacity'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gallery-items .gallery-item-wrap .grid-item .thumbnail-wrap .caption-wrap .item-hover-bg",
					'property'       => function ( $value ) {
						return "opacity: {$value};";
					},
					'value'          => $this->attrs['itemHoverOpacity'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['itemHoverPadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gallery-items .gallery-item-wrap .grid-item .thumbnail-wrap .caption-wrap",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['itemHoverPadding'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['itemHoverBorder'] ) ) {
			$this->handle_border( 'itemHoverBorder', ".{$this->element_id} .gallery-items .gallery-item-wrap .thumbnail-wrap .caption-wrap .item-hover-bg" );
		}

		if ( isset( $this->attrs['itemHoverBorderResponsive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gallery-items .gallery-item-wrap .thumbnail-wrap .caption-wrap .item-hover-bg",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['itemHoverBorderResponsive'],
					'device_control' => true,
					'skip_device'    => array(
						'Desktop',
					),
				)
			);
		}

		if ( isset( $this->attrs['itemHoverAlign'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gallery-items .gallery-item-wrap .thumbnail-wrap .caption-wrap",
					'property'       => function ( $value ) {
						return "text-align: {$value};";
					},
					'value'          => $this->attrs['itemHoverAlign'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['itemHoverTitleColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gallery-items .gallery-item-wrap .thumbnail-wrap .caption-wrap.style-overlay .item-caption-over .item-title",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['itemHoverTitleColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['itemHoverTitleColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gallery-items .gallery-item-wrap .thumbnail-wrap .caption-wrap.style-overlay .item-caption-over .item-title",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['itemHoverTitleColorHover'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['itemHoverTitleTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector' => ".{$this->element_id} .gallery-items .gallery-item-wrap .thumbnail-wrap .caption-wrap.style-overlay .item-caption-over .item-title",
					'value'    => $this->attrs['itemHoverTitleTypography'],
				)
			);
		}

		if ( isset( $this->attrs['itemHoverTitlePadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gallery-items .gallery-item-wrap .thumbnail-wrap .caption-wrap.style-overlay .item-caption-over .item-title",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['itemHoverTitlePadding'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['itemHoverTitleMargin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gallery-items .gallery-item-wrap .thumbnail-wrap .caption-wrap.style-overlay .item-caption-over .item-title",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['itemHoverTitleMargin'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['itemHoverContentColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gallery-items .gallery-item-wrap .thumbnail-wrap .caption-wrap.style-overlay .item-caption-over .item-content",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['itemHoverContentColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['itemHoverContentColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gallery-items .gallery-item-wrap .thumbnail-wrap .caption-wrap.style-overlay .item-caption-over .item-content",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['itemHoverContentColorHover'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['itemHoverContentTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector' => ".{$this->element_id} .gallery-items .gallery-item-wrap .thumbnail-wrap .caption-wrap.style-overlay .item-caption-over .item-content",
					'value'    => $this->attrs['itemHoverContentTypography'],
				)
			);
		}

		if ( isset( $this->attrs['itemHoverContentPadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gallery-items .gallery-item-wrap .thumbnail-wrap .caption-wrap.style-overlay .item-caption-over .item-content",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['itemHoverContentPadding'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['itemHoverContentMargin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gallery-items .gallery-item-wrap .thumbnail-wrap .caption-wrap.style-overlay .item-caption-over .item-content",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['itemHoverContentMargin'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['itemCardBackground'] ) ) {
			$this->handle_background( ".{$this->element_id} .gallery-items .gallery-item-wrap .grid-item .caption-wrap.style-card", $this->attrs['itemCardBackground'] );
		}

		if ( isset( $this->attrs['itemCardPadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gallery-items .gallery-item-wrap .grid-item .caption-wrap.style-card",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['itemCardPadding'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['itemCardBorder'] ) ) {
			$this->handle_border( 'itemCardBorder', ".{$this->element_id} .gallery-items .gallery-item-wrap .grid-item .caption-wrap.style-card" );
		}

		if ( isset( $this->attrs['itemCardBorderResponsive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gallery-items .gallery-item-wrap .grid-item .caption-wrap.style-card",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['itemCardBorderResponsive'],
					'device_control' => true,
					'skip_device'    => array(
						'Desktop',
					),
				)
			);
		}

		if ( isset( $this->attrs['itemCardAlign'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gallery-items .gallery-item-wrap .grid-item .caption-wrap.style-card",
					'property'       => function ( $value ) {
						return "text-align: {$value};";
					},
					'value'          => $this->attrs['itemCardAlign'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['itemCardTitleColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gallery-items .gallery-item-wrap .grid-item .caption-wrap.style-card .item-caption-over .item-title",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['itemCardTitleColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['itemCardTitleColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gallery-items .gallery-item-wrap .grid-item .caption-wrap.style-card:hover .item-caption-over .item-title",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['itemCardTitleColorHover'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['itemCardTitleTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector' => ".{$this->element_id} .gallery-items .gallery-item-wrap .grid-item .caption-wrap.style-card .item-caption-over .item-title",
					'value'    => $this->attrs['itemCardTitleTypography'],
				)
			);
		}

		if ( isset( $this->attrs['itemCardTitlePadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gallery-items .gallery-item-wrap .grid-item .caption-wrap.style-card .item-caption-over .item-title",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['itemCardTitlePadding'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['itemCardTitleMargin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gallery-items .gallery-item-wrap .grid-item .caption-wrap.style-card .item-caption-over .item-title",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['itemCardTitleMargin'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['itemCardContentColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gallery-items .gallery-item-wrap .grid-item .caption-wrap.style-card .item-caption-over .item-content",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['itemCardContentColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['itemCardContentColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gallery-items .gallery-item-wrap .grid-item .caption-wrap.style-card:hover .item-caption-over .item-content",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['itemCardContentColorHover'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['itemCardContentTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector' => ".{$this->element_id} .gallery-items .gallery-item-wrap .grid-item .caption-wrap.style-card .item-caption-over .item-content",
					'value'    => $this->attrs['itemCardContentTypography'],
				)
			);
		}

		if ( isset( $this->attrs['itemCardContentPadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gallery-items .gallery-item-wrap .grid-item .caption-wrap.style-card .item-caption-over .item-content",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['itemCardContentPadding'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['itemCardContentMargin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gallery-items .gallery-item-wrap .grid-item .caption-wrap.style-card .item-caption-over .item-content",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['itemCardContentMargin'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['loadMoreMarginTop'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .load-more-items",
					'property'       => function ( $value ) {
						return "margin-top: {$value}px;";
					},
					'value'          => $this->attrs['loadMoreMarginTop'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['loadMoreIconSize'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .load-more-items .load-more-icon",
					'property'       => function ( $value ) {
						return "font-size: {$value}px;";
					},
					'value'          => $this->attrs['loadMoreIconSize'],
					'device_control' => true,
				)
			);
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .load-more-items .load-more-icon svg",
					'property'       => function ( $value ) {
						return "font-size: {$value}px;";
					},
					'value'          => $this->attrs['loadMoreIconSize'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['loadMoreIconSpacing'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .load-more-items .load-more-icon.icon-position-before",
					'property'       => function ( $value ) {
						return "margin-right: {$value}px;";
					},
					'value'          => $this->attrs['loadMoreIconSpacing'],
					'device_control' => true,
				)
			);

			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .load-more-items .load-more-icon.icon-position-after",
					'property'       => function ( $value ) {
						return "margin-left: {$value}px;";
					},
					'value'          => $this->attrs['loadMoreIconSpacing'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['loadMoreTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector' => ".{$this->element_id} .load-more-items .guten-gallery-load-more",
					'value'    => $this->attrs['loadMoreTypography'],
				)
			);
		}

		if ( isset( $this->attrs['loadMorePadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .load-more-items .guten-gallery-load-more",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['loadMorePadding'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['loadMoreBoxShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .load-more-items .guten-gallery-load-more",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['loadMoreBoxShadow'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['loadMoreTextColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .load-more-items .guten-gallery-load-more",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['loadMoreTextColor'],
					'device_control' => true,
				)
			);

			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .load-more-items .guten-gallery-load-more svg",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'fill' );
					},
					'value'          => $this->attrs['loadMoreTextColor'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['loadMoreTextColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .load-more-items .guten-gallery-load-more:hover",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['loadMoreTextColorHover'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['loadMoreBackground'] ) ) {
			$this->handle_background( ".{$this->element_id} .load-more-items .guten-gallery-load-more", $this->attrs['loadMoreBackground'] );
		}

		if ( isset( $this->attrs['loadMoreBackgroundHover'] ) ) {
			$this->handle_background( ".{$this->element_id} .load-more-items .guten-gallery-load-more:hover", $this->attrs['loadMoreBackgroundHover'] );
		}

		if ( isset( $this->attrs['loadMoreBorder'] ) ) {
			$this->handle_border( 'loadMoreBorder', ".{$this->element_id} .load-more-items .guten-gallery-load-more" );
		}

		if ( isset( $this->attrs['loadMoreBorderResponsive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .load-more-items .guten-gallery-load-more",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['loadMoreBorderResponsive'],
					'device_control' => true,
					'skip_device'    => array(
						'Desktop',
					),
				)
			);
		}

		if ( isset( $this->attrs['loadMoreBorderHover'] ) ) {
			$this->handle_border( 'loadMoreBorderHover', ".{$this->element_id} .load-more-items .guten-gallery-load-more:hover" );
		}

		if ( isset( $this->attrs['loadMoreBorderHoverResponsive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .load-more-items .guten-gallery-load-more:hover",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['loadMoreBorderHoverResponsive'],
					'device_control' => true,
					'skip_device'    => array(
						'Desktop',
					),
				)
			);
		}

		if ( isset( $this->attrs['thumbnailBorder'] ) ) {
			$this->handle_border( 'thumbnailBorder', ".{$this->element_id} .gallery-items .gallery-item-wrap .thumbnail-wrap" );
		}

		if ( isset( $this->attrs['thumbnailBorderResponsive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gallery-items .gallery-item-wrap .thumbnail-wrap",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['thumbnailBorderResponsive'],
					'device_control' => true,
					'skip_device'    => array(
						'Desktop',
					),
				)
			);
		}

		if ( isset( $this->attrs['priceColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gallery-items .gallery-item-wrap .grid-item .caption-wrap .caption-head .item-price",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['priceColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['priceTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector' => ".{$this->element_id} .gallery-items .gallery-item-wrap .grid-item .caption-wrap .caption-head .item-price",
					'value'    => $this->attrs['priceTypography'],
				)
			);
		}

		if ( isset( $this->attrs['ratingColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gallery-items .gallery-item-wrap .grid-item .caption-wrap .caption-head .item-rating",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['ratingColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['ratingStarColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gallery-items .gallery-item-wrap .grid-item .caption-wrap .caption-head .item-rating li",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['ratingStarColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['ratingTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector' => ".{$this->element_id} .gallery-items .gallery-item-wrap .grid-item .caption-wrap .caption-head .item-rating",
					'value'    => $this->attrs['ratingTypography'],
				)
			);
		}

		if ( isset( $this->attrs['categoryColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gallery-items .gallery-item-wrap .grid-item .caption-wrap .caption-category span",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['categoryColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['categoryTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector' => ".{$this->element_id} .gallery-items .gallery-item-wrap .grid-item .caption-wrap .caption-category span",
					'value'    => $this->attrs['categoryTypography'],
				)
			);
		}

		if ( isset( $this->attrs['categoryBackground'] ) ) {
			$this->handle_background( ".{$this->element_id} .gallery-items .gallery-item-wrap .grid-item .caption-wrap .caption-category span", $this->attrs['categoryBackground'] );
		}

		if ( isset( $this->attrs['categoryPadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gallery-items .gallery-item-wrap .grid-item .caption-wrap .caption-category span",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['categoryPadding'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['categoryMargin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gallery-items .gallery-item-wrap .grid-item .caption-wrap .caption-category span",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['categoryMargin'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['categoryBorderRadius'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gallery-items .gallery-item-wrap .grid-item .caption-wrap .caption-category span",
					'property'       => function ( $value ) {
						return $this->handle_border_radius( $value );
					},
					'value'          => $this->attrs['categoryBorderRadius'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['selectionPriceRatingPadding'] ) ) {
			if ( 'all' === $this->attrs['selectionPriceRatingPadding'] ) {
				if ( isset( $this->attrs['priceRatingPadding'] ) ) {
					$this->inject_style(
						array(
							'selector'       => ".{$this->element_id} .gallery-items .gallery-item-wrap .grid-item .caption-wrap .caption-head .item-rating, .{$this->element_id} .gallery-items .gallery-item-wrap .grid-item .caption-wrap .caption-head .item-price",
							'property'       => function ( $value ) {
								return $this->handle_dimension( $value, 'padding' );
							},
							'value'          => $this->attrs['priceRatingPadding'],
							'device_control' => true,
						)
					);
				}
			} elseif ( 'custom' === $this->attrs['selectionPriceRatingPadding'] ) {
				if ( isset( $this->attrs['pricePadding'] ) ) {
					$this->inject_style(
						array(
							'selector'       => ".{$this->element_id} .gallery-items .gallery-item-wrap .grid-item .caption-wrap .caption-head .item-price",
							'property'       => function ( $value ) {
								return $this->handle_dimension( $value, 'padding' );
							},
							'value'          => $this->attrs['pricePadding'],
							'device_control' => true,
						)
					);
				}
				if ( isset( $this->attrs['ratingPadding'] ) ) {
					$this->inject_style(
						array(
							'selector'       => ".{$this->element_id} .gallery-items .gallery-item-wrap .grid-item .caption-wrap .caption-head .item-rating",
							'property'       => function ( $value ) {
								return $this->handle_dimension( $value, 'padding' );
							},
							'value'          => $this->attrs['ratingPadding'],
							'device_control' => true,
						)
					);
				}
			}
			if ( isset( $this->attrs['priceMargin'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} .gallery-items .gallery-item-wrap .grid-item .caption-wrap .caption-head .item-price",
						'property'       => function ( $value ) {
							return $this->handle_dimension( $value, 'margin' );
						},
						'value'          => $this->attrs['priceMargin'],
						'device_control' => true,
					)
				);
			}
			if ( isset( $this->attrs['ratingMargin'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} .gallery-items .gallery-item-wrap .grid-item .caption-wrap .caption-head .item-rating",
						'property'       => function ( $value ) {
							return $this->handle_dimension( $value, 'margin' );
						},
						'value'          => $this->attrs['ratingMargin'],
						'device_control' => true,
					)
				);
			}
			if ( isset( $this->attrs['pricePositioningLeft'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} .gallery-items .gallery-item-wrap .grid-item .caption-wrap .caption-head .item-price",
						'property'       => function ( $value ) {
							return $this->handle_unit_point( $value, 'left' );
						},
						'value'          => $this->attrs['pricePositioningLeft'],
						'device_control' => true,
					)
				);
			}
			if ( isset( $this->attrs['pricePositioningRight'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} .gallery-items .gallery-item-wrap .grid-item .caption-wrap .caption-head .item-price",
						'property'       => function ( $value ) {
							return $this->handle_unit_point( $value, 'right' );
						},
						'value'          => $this->attrs['pricePositioningRight'],
						'device_control' => true,
					)
				);
			}
			if ( isset( $this->attrs['pricePositioningTop'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} .gallery-items .gallery-item-wrap .grid-item .caption-wrap .caption-head .item-price",
						'property'       => function ( $value ) {
							return $this->handle_unit_point( $value, 'top' );
						},
						'value'          => $this->attrs['pricePositioningTop'],
						'device_control' => true,
					)
				);
			}
			if ( isset( $this->attrs['pricePositioningBottom'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} .gallery-items .gallery-item-wrap .grid-item .caption-wrap .caption-head .item-price",
						'property'       => function ( $value ) {
							return $this->handle_unit_point( $value, 'bottom' );
						},
						'value'          => $this->attrs['pricePositioningBottom'],
						'device_control' => true,
					)
				);
			}
			if ( isset( $this->attrs['ratingPositioningLeft'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} .gallery-items .gallery-item-wrap .grid-item .caption-wrap .caption-head .item-rating",
						'property'       => function ( $value ) {
							return $this->handle_unit_point( $value, 'left' );
						},
						'value'          => $this->attrs['ratingPositioningLeft'],
						'device_control' => true,
					)
				);
			}
			if ( isset( $this->attrs['ratingPositioningRight'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} .gallery-items .gallery-item-wrap .grid-item .caption-wrap .caption-head .item-rating",
						'property'       => function ( $value ) {
							return $this->handle_unit_point( $value, 'right' );
						},
						'value'          => $this->attrs['ratingPositioningRight'],
						'device_control' => true,
					)
				);
			}
			if ( isset( $this->attrs['ratingPositioningTop'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} .gallery-items .gallery-item-wrap .grid-item .caption-wrap .caption-head .item-rating",
						'property'       => function ( $value ) {
							return $this->handle_unit_point( $value, 'top' );
						},
						'value'          => $this->attrs['ratingPositioningTop'],
						'device_control' => true,
					)
				);
			}
			if ( isset( $this->attrs['ratingPositioningBottom'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} .gallery-items .gallery-item-wrap .grid-item .caption-wrap .caption-head .item-rating",
						'property'       => function ( $value ) {
							return $this->handle_unit_point( $value, 'bottom' );
						},
						'value'          => $this->attrs['ratingPositioningBottom'],
						'device_control' => true,
					)
				);
			}
		}

		if ( isset( $this->attrs['textZoomTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector' => ".{$this->element_id}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .gallery-link.with-text.zoom .item-icon-text",
					'value'    => $this->attrs['textZoomTypography'],
				)
			);
		}

		if ( isset( $this->attrs['textZoomColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .gallery-link.with-text.zoom .item-icon-text",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['textZoomColor'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['textZoomBackground'] ) ) {
			$this->handle_background( ".{$this->element_id}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .gallery-link.with-text.zoom .item-icon-text", $this->attrs['textZoomBackground'] );
		}

		if ( isset( $this->attrs['textZoomBorder'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .gallery-link.with-text.zoom .item-icon-text",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['textZoomBorder'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['textZoomMargin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .gallery-link.with-text.zoom .item-icon-text",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['textZoomMargin'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['textZoomPadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .gallery-link.with-text.zoom .item-icon-text",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['textZoomPadding'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['textLinkTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector' => ".{$this->element_id}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .gallery-link.with-text.link .item-icon-text",
					'value'    => $this->attrs['textLinkTypography'],
				)
			);
		}

		if ( isset( $this->attrs['textLinkColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .gallery-link.with-text.link .item-icon-text",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['textLinkColor'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['textLinkBackground'] ) ) {
			$this->handle_background( ".{$this->element_id}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .gallery-link.with-text.link .item-icon-text", $this->attrs['textLinkBackground'] );
		}

		if ( isset( $this->attrs['textLinkBorder'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .gallery-link.with-text.link .item-icon-text",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['textLinkBorder'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['textLinkMargin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .gallery-link.with-text.link .item-icon-text",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['textLinkMargin'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['textLinkPadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .gallery-link.with-text.link .item-icon-text",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['textLinkPadding'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['iconTextGap'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .gallery-link.with-text",
					'property'       => function ( $value ) {
						return "gap: {$value}px;";
					},
					'value'          => $this->attrs['iconTextGap'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['iconTextPosition'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .gallery-link.with-text",
					'property'       => function ( $value ) {
						return "flex-direction: {$value};";
					},
					'value'          => $this->attrs['iconTextPosition'],
					'device_control' => true,
				)
			);
		}
		if ( isset( $this->attrs['itemLightboxTextMargin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gutenverse-popup-gallery .images .image-list .content-image .content-description-wrapper",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['itemLightboxTextMargin'],
					'device_control' => true,
				)
			);
		}
		if ( isset( $this->attrs['itemLightboxTextPadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gutenverse-popup-gallery .images .image-list .content-image .content-description-wrapper",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['itemLightboxTextPadding'],
					'device_control' => true,
				)
			);
		}
		if ( isset( $this->attrs['itemLightboxTitleColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gutenverse-popup-gallery .images .image-list .content-image .content-description-wrapper .content-title",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['itemLightboxTitleColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['itemLightboxTitleTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector' => ".{$this->element_id} .gutenverse-popup-gallery .images .image-list .content-image .content-description-wrapper .content-title",
					'value'    => $this->attrs['itemLightboxTitleTypography'],
				)
			);
		}

		if ( isset( $this->attrs['itemLightboxDescriptionColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gutenverse-popup-gallery .images .image-list .content-image .content-description-wrapper .content-description",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['itemLightboxDescriptionColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['itemLightboxDescriptionTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector' => ".{$this->element_id} .gutenverse-popup-gallery .images .image-list .content-image .content-description-wrapper .content-description",
					'value'    => $this->attrs['itemLightboxDescriptionTypography'],
				)
			);
		}

		if ( isset( $this->attrs['images'] ) ) {
			$lists = $this->attrs['images'];

			foreach ( $lists as $index => $list ) {
				if ( isset( $list['itemLightboxTextMargin'] ) ) {
					$this->inject_style(
						array(
							'selector'       => ".{$this->element_id} .gutenverse-popup-gallery .images .image-list.image-list-{$index} .content-image .content-description-wrapper",
							'property'       => function ( $value ) {
								return $this->handle_dimension( $value, 'margin' );
							},
							'value'          => $list['itemLightboxTextMargin'],
							'device_control' => true,
						)
					);
				}
				if ( isset( $list['itemLightboxTextPadding'] ) ) {
					$this->inject_style(
						array(
							'selector'       => ".{$this->element_id} .gutenverse-popup-gallery .images .image-list.image-list-{$index} .content-image .content-description-wrapper",
							'property'       => function ( $value ) {
								return $this->handle_dimension( $value, 'padding' );
							},
							'value'          => $list['itemLightboxTextPadding'],
							'device_control' => true,
						)
					);
				}
				if ( isset( $list['itemLightboxTitleColor'] ) ) {
					$this->inject_style(
						array(
							'selector'       => ".{$this->element_id} .gutenverse-popup-gallery .images .image-list.image-list-{$index} .content-image .content-description-wrapper .content-title",
							'property'       => function ( $value ) {
								return $this->handle_color( $value, 'color' );
							},
							'value'          => $list['itemLightboxTitleColor'],
							'device_control' => false,
						)
					);
				}

				if ( isset( $list['itemLightboxTitleTypography'] ) ) {
					$this->inject_typography(
						array(
							'selector' => ".{$this->element_id} .gutenverse-popup-gallery .images .image-list.image-list-{$index} .content-image .content-description-wrapper .content-title",
							'value'    => $list['itemLightboxTitleTypography'],
						)
					);
				}

				if ( isset( $list['itemLightboxDescriptionColor'] ) ) {
					$this->inject_style(
						array(
							'selector'       => ".{$this->element_id} .gutenverse-popup-gallery .images .image-list.image-list-{$index} .content-image .content-description-wrapper .content-description",
							'property'       => function ( $value ) {
								return $this->handle_color( $value, 'color' );
							},
							'value'          => $list['itemLightboxDescriptionColor'],
							'device_control' => false,
						)
					);
				}

				if ( isset( $list['itemLightboxDescriptionTypography'] ) ) {
					$this->inject_typography(
						array(
							'selector' => ".{$this->element_id} .gutenverse-popup-gallery .images .image-list.image-list-{$index} .content-image .content-description-wrapper .content-description",
							'value'    => $list['itemLightboxDescriptionTypography'],
						)
					);
				}
			}
		}
	}
}
