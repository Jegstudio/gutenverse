<?php
/**
 * Gutenverse Social_Share
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\style
 */

namespace Gutenverse\Style;

use Gutenverse\Framework\Style_Abstract;

/**
 * Class Social_Share
 *
 * @package gutenverse\style
 */
class Social_Share extends Style_Abstract {
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
	protected $name = 'social-share';

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
				'positioning' => ".{$this->element_id}.guten-element",
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
		$is_solid_button           = isset( $this->attrs['buttonLayout'] ) && 'solid' === $this->attrs['buttonLayout'];
		$is_horizontal_stretch     = isset( $this->attrs['layoutMode'] ) && 'stretch' === $this->attrs['layoutMode'] && ( ! isset( $this->attrs['orientation'] ) || 'vertical' !== $this->attrs['orientation'] );
		$more_button_selector      = ".{$this->element_id} .gutenverse-share-more-toggle";
		$more_button_icon_selector = "{$more_button_selector} .gutenverse-share-more-icon svg";

		if ( ! empty( $this->attrs['enableMoreButton'] ) ) {
			$visible_button_count = ! empty( $this->attrs['visibleButtonCount'] ) ? absint( $this->attrs['visibleButtonCount'] ) : 2;
			$hidden_start_index   = $visible_button_count + 1;

			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.has-more-toggle:not(.is-expanded) > .gutenverse-share-item:nth-of-type(n+{$hidden_start_index}), .{$this->element_id}.has-more-toggle:not(.is-expanded) > .guten-social-share-item-wrapper:nth-of-type(n+{$hidden_start_index})",
					'property'       => function () {
						return 'display: none;';
					},
					'value'          => $this->attrs['enableMoreButton'],
					'device_control' => false,
				)
			);
		}

		if ( $is_horizontal_stretch ) {
			$primary_button_count = isset( $this->attrs['primaryButtonCount'] ) ? absint( $this->attrs['primaryButtonCount'] ) : 2;
			$primary_button_count = max( $primary_button_count, 2 );

			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-social-share",
					'property'       => function () {
						return 'width: 100%; align-items: stretch;';
					},
					'value'          => $this->attrs['layoutMode'],
					'device_control' => false,
				)
			);

			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.stretch-layout.horizontal > div:nth-of-type(-n+{$primary_button_count})",
					'property'       => function () {
						return 'flex: 1 1 0 !important; min-width: 0; width: auto !important;';
					},
					'value'          => $this->attrs['layoutMode'],
					'device_control' => false,
				)
			);

			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.stretch-layout.horizontal > div:nth-of-type(-n+{$primary_button_count}) .gutenverse-share-item, .{$this->element_id}.stretch-layout.horizontal > div.gutenverse-share-item:nth-of-type(-n+{$primary_button_count}), .{$this->element_id}.stretch-layout.horizontal > div:nth-of-type(-n+{$primary_button_count}) .gutenverse-share-item a, .{$this->element_id}.stretch-layout.horizontal > div.gutenverse-share-item:nth-of-type(-n+{$primary_button_count}) a",
					'property'       => function () {
						return 'width: 100% !important;';
					},
					'value'          => $this->attrs['layoutMode'],
					'device_control' => false,
				)
			);

			if ( ! $is_solid_button ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id}.stretch-layout.horizontal:not(.button-layout-solid) > div:nth-of-type(-n+{$primary_button_count}) .gutenverse-share-text, .{$this->element_id}.stretch-layout.horizontal:not(.button-layout-solid) > div.gutenverse-share-item:nth-of-type(-n+{$primary_button_count}) .gutenverse-share-text",
						'property'       => function () {
							return 'flex: 1 1 auto;';
						},
						'value'          => $this->attrs['layoutMode'],
						'device_control' => false,
					)
				);
			}
		}

		if ( isset( $this->attrs['alignment'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}, .{$this->element_id}.vertical > div",
					'property'       => function ( $value ) {
						return "justify-content: {$value};";
					},
					'value'          => $this->attrs['alignment'],
					'device_control' => true,
				)
			);
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}, .{$this->element_id}.vertical > div",
					'property'       => function ( $value ) {
						return "align-items: {$value};";
					},
					'value'          => $this->attrs['alignment'],
					'device_control' => true,
				)
			);
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.horizontal",
					'property'       => function ( $value ) {
						if ( 'flex-start' === $value ) {
							return 'text-align: left;';
						} elseif ( 'center' === $value ) {
							return 'text-align: center;';
						} elseif ( 'flex-end' === $value ) {
							return 'text-align: right;';
						}
					},
					'value'          => $this->attrs['alignment'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['positioningType'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-element",
					'property'       => function ( $value ) {
						if ( 'inline' === $value ) {
							return 'display: inline-flex !important;';
						}
					},
					'value'          => $this->attrs['positioningType'],
					'device_control' => true,
				)
			);

			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-element.horizontal > div",
					'property'       => function ( $value ) {
						if ( 'custom' === $value ) {
							return 'display: inline-flex !important;';
						}
					},
					'value'          => $this->attrs['positioningType'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['buttonHeight'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gutenverse-share-item a, .{$this->element_id} .gutenverse-share-more-toggle",
					'property'       => function ( $value ) {
						return "height: {$value}px;";
					},
					'value'          => $this->attrs['buttonHeight'],
					'device_control' => true,
				)
			);

			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gutenverse-share-more-toggle",
					'property'       => function ( $value ) {
						return "width: {$value}px;";
					},
					'value'          => $this->attrs['buttonHeight'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['primaryButtonWidth'] ) && ! $is_horizontal_stretch ) {
			$primary_button_count = isset( $this->attrs['primaryButtonCount'] ) ? absint( $this->attrs['primaryButtonCount'] ) : 2;

			if ( $primary_button_count > 0 ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} > div:nth-of-type(-n+{$primary_button_count}) .gutenverse-share-item, .{$this->element_id} > div.gutenverse-share-item:nth-of-type(-n+{$primary_button_count})",
						'property'       => function ( $value ) {
							return $this->handle_unit_point( $value, 'width' );
						},
						'value'          => $this->attrs['primaryButtonWidth'],
						'device_control' => true,
					)
				);

				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} > div:nth-of-type(-n+{$primary_button_count}) .gutenverse-share-item a, .{$this->element_id} > div.gutenverse-share-item:nth-of-type(-n+{$primary_button_count}) a",
						'property'       => function () {
							return 'width: 100%;';
						},
						'value'          => $this->attrs['primaryButtonWidth'],
						'device_control' => true,
					)
				);

				if ( ! $is_solid_button ) {
					$this->inject_style(
						array(
							'selector'       => ".{$this->element_id}:not(.button-layout-solid) > div:nth-of-type(-n+{$primary_button_count}) .gutenverse-share-text, .{$this->element_id}:not(.button-layout-solid) > div.gutenverse-share-item:nth-of-type(-n+{$primary_button_count}) .gutenverse-share-text",
							'property'       => function () {
								return 'flex: 1 1 auto;';
							},
							'value'          => $this->attrs['primaryButtonWidth'],
							'device_control' => true,
						)
					);
				}
			}
		}

		if ( isset( $this->attrs['buttonContentAlign'] ) && $is_solid_button ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gutenverse-share-item a, {$more_button_selector}",
					'property'       => function ( $value ) {
						return "justify-content: {$value};";
					},
					'value'          => $this->attrs['buttonContentAlign'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['buttonIconGap'] ) && $is_solid_button ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gutenverse-share-item.has-text .gutenverse-share-icon",
					'property'       => function ( $value ) {
						return "margin-right: {$value}px;";
					},
					'value'          => $this->attrs['buttonIconGap'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['buttonBackgroundColor'] ) && $is_solid_button ) {
			$solid_button_selector = ".{$this->element_id}.guten-social-share.button-layout-solid .gutenverse-share-item[class*='gutenverse-share-'] a";
			if ( empty( $this->attrs['moreButtonBackgroundColor'] ) ) {
				$solid_button_selector .= ", {$more_button_selector}";
			}

			$this->inject_style(
				array(
					'selector'       => $solid_button_selector,
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['buttonBackgroundColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['buttonBackgroundColorHover'] ) && $is_solid_button ) {
			$solid_button_hover_selector = ".{$this->element_id}.guten-social-share.button-layout-solid .gutenverse-share-item[class*='gutenverse-share-']:hover a";
			if ( empty( $this->attrs['moreButtonBackgroundColorHover'] ) ) {
				$solid_button_hover_selector .= ", {$more_button_selector}:hover";
			}

			$this->inject_style(
				array(
					'selector'       => $solid_button_hover_selector,
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['buttonBackgroundColorHover'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['gap'] ) ) {
			if ( $is_horizontal_stretch ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id}.stretch-layout.horizontal",
						'property'       => function ( $value ) {
							return "gap: {$value}px;";
						},
						'value'          => $this->attrs['gap'],
						'device_control' => true,
					)
				);
			} else {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id}.horizontal > div:not(:first-child), .{$this->element_id}.horizontal > .gutenverse-share-more-toggle",
						'property'       => function ( $value ) {
							return "margin-left: {$value}px;";
						},
						'value'          => $this->attrs['gap'],
						'device_control' => true,
					)
				);

				if ( ! empty( $this->attrs['enableMoreButton'] ) ) {
					$this->inject_style(
						array(
							'selector'       => ".{$this->element_id}.has-more-toggle.horizontal",
							'property'       => function ( $value ) {
								return "row-gap: {$value}px;";
							},
							'value'          => $this->attrs['gap'],
							'device_control' => true,
						)
					);
				}
			}

			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.vertical > div:not(:first-child), .{$this->element_id}.vertical > .gutenverse-share-more-toggle",
					'property'       => function ( $value ) {
						return "margin-top: {$value}px;";
					},
					'value'          => $this->attrs['gap'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['iconColor'] ) ) {
			$icon_color_selector = ".guten-element.guten-social-share.{$this->element_id} .gutenverse-share-item .gutenverse-share-icon svg";
			if ( empty( $this->attrs['moreButtonIconColor'] ) ) {
				$icon_color_selector .= ", .guten-element.guten-social-share.{$this->element_id} .gutenverse-share-more-toggle .gutenverse-share-more-icon svg";
			}

			$this->inject_style(
				array(
					'selector'       => $icon_color_selector,
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['iconColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['iconBackgroundColor'] ) && ! $is_solid_button ) {
			$icon_background_selector = ".guten-element.guten-social-share.{$this->element_id} .gutenverse-share-item .gutenverse-share-icon";
			if ( empty( $this->attrs['moreButtonBackgroundColor'] ) ) {
				$icon_background_selector .= ", {$more_button_selector}";
			}

			$this->inject_style(
				array(
					'selector'       => $icon_background_selector,
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['iconBackgroundColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['backgroundColor'] ) && ! $is_solid_button ) {
			$this->inject_style(
				array(
					'selector'       => ".guten-element.guten-social-share.{$this->element_id} .gutenverse-share-item .gutenverse-share-text",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['backgroundColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['textColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".guten-element.guten-social-share.{$this->element_id} .gutenverse-share-item .gutenverse-share-text",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['textColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['borderType'] ) ) {
			$this->handle_border( 'borderType', ".{$this->element_id} .gutenverse-share-item, .{$this->element_id} .gutenverse-share-more-toggle" );
		}

		if ( isset( $this->attrs['borderTypeResponsive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gutenverse-share-item, .{$this->element_id} .gutenverse-share-more-toggle",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['borderTypeResponsive'],
					'device_control' => true,
					'skip_device'    => array(
						'Desktop',
					),
				)
			);
		}

		if ( isset( $this->attrs['iconColorHover'] ) ) {
			$icon_color_hover_selector = ".guten-element.guten-social-share.{$this->element_id} .gutenverse-share-item:hover .gutenverse-share-icon svg";
			if ( empty( $this->attrs['moreButtonIconColorHover'] ) ) {
				$icon_color_hover_selector .= ", .guten-element.guten-social-share.{$this->element_id} .gutenverse-share-more-toggle:hover .gutenverse-share-more-icon svg";
			}

			$this->inject_style(
				array(
					'selector'       => $icon_color_hover_selector,
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['iconColorHover'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['iconBackgroundColorHover'] ) && ! $is_solid_button ) {
			$icon_background_hover_selector = ".guten-element.guten-social-share.{$this->element_id} .gutenverse-share-item:hover .gutenverse-share-icon";
			if ( empty( $this->attrs['moreButtonBackgroundColorHover'] ) ) {
				$icon_background_hover_selector .= ", {$more_button_selector}:hover";
			}

			$this->inject_style(
				array(
					'selector'       => $icon_background_hover_selector,
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['iconBackgroundColorHover'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['backgroundColorHover'] ) && ! $is_solid_button ) {
			$this->inject_style(
				array(
					'selector'       => ".guten-element.guten-social-share.{$this->element_id} .gutenverse-share-item:hover .gutenverse-share-text",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['backgroundColorHover'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['textColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".guten-element.guten-social-share.{$this->element_id} .gutenverse-share-item:hover .gutenverse-share-text",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['textColorHover'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['borderTypeHover'] ) ) {
			$this->handle_border( 'borderTypeHover', ".{$this->element_id} .gutenverse-share-item:hover, .{$this->element_id} .gutenverse-share-more-toggle:hover" );
		}

		if ( isset( $this->attrs['borderTypeHoverResponsive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gutenverse-share-item:hover, .{$this->element_id} .gutenverse-share-more-toggle:hover",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['borderTypeHoverResponsive'],
					'device_control' => true,
					'skip_device'    => array(
						'Desktop',
					),
				)
			);
		}

		if ( isset( $this->attrs['typography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".{$this->element_id} .gutenverse-share-item .gutenverse-share-text",
					'property'       => function () {},
					'value'          => $this->attrs['typography'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['iconSize'] ) ) {
			$icon_size_selector = ".{$this->element_id} .gutenverse-share-item svg";
			if ( empty( $this->attrs['moreButtonIconSize'] ) ) {
				$icon_size_selector .= ", {$more_button_icon_selector}";
			}

			$this->inject_style(
				array(
					'selector'       => $icon_size_selector,
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'font-size' );
					},
					'value'          => $this->attrs['iconSize'],
					'device_control' => true,
				)
			);

			$this->inject_style(
				array(
					'selector'       => $icon_size_selector,
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'width' ) . $this->handle_unit_point( $value, 'height' );
					},
					'value'          => $this->attrs['iconSize'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['iconPading'] ) ) {
			$icon_padding_selector = ".{$this->element_id} .gutenverse-share-item .gutenverse-share-icon";
			if ( empty( $this->attrs['moreButtonPadding'] ) ) {
				$icon_padding_selector .= ", {$more_button_selector}";
			}

			$this->inject_style(
				array(
					'selector'       => $icon_padding_selector,
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['iconPading'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['textPading'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gutenverse-share-item .gutenverse-share-text",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['textPading'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['moreButtonSize'] ) ) {
			$this->inject_style(
				array(
					'selector'       => $more_button_selector,
					'property'       => function ( $value ) {
						return "width: {$value}px; height: {$value}px; min-width: 0; min-height: 0;";
					},
					'value'          => $this->attrs['moreButtonSize'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['moreButtonIconSize'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "{$more_button_selector} .gutenverse-share-more-icon svg",
					'property'       => function ( $value ) {
						$size = absint( $value );
						return "width: {$size}px; height: {$size}px;";
					},
					'value'          => $this->attrs['moreButtonIconSize'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['moreButtonIconColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => $more_button_icon_selector,
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['moreButtonIconColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['moreButtonIconColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "{$more_button_selector}:hover .gutenverse-share-more-icon svg",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['moreButtonIconColorHover'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['moreButtonBackgroundColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => $more_button_selector,
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['moreButtonBackgroundColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['moreButtonBackgroundColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "{$more_button_selector}:hover",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['moreButtonBackgroundColorHover'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['moreButtonPadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => $more_button_selector,
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['moreButtonPadding'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['moreButtonBorderRadius'] ) ) {
			$this->inject_style(
				array(
					'selector'       => $more_button_selector,
					'property'       => function ( $value ) {
						return "border-radius: {$value}px;";
					},
					'value'          => $this->attrs['moreButtonBorderRadius'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['moreButtonBoxShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => $more_button_selector,
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['moreButtonBoxShadow'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['moreButtonBoxShadowHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "{$more_button_selector}:hover",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['moreButtonBoxShadowHover'],
					'device_control' => false,
				)
			);
		}
	}
}
