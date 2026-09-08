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
		$is_solid_button = isset( $this->attrs['buttonLayout'] ) && 'solid' === $this->attrs['buttonLayout'];

		if ( isset( $this->attrs['layoutMode'] ) && 'stretch' === $this->attrs['layoutMode'] ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-social-share",
					'property'       => function ( $value ) {
						return 'width: 100%; align-items: stretch;';
					},
					'value'          => $this->attrs['layoutMode'],
					'device_control' => false,
				)
			);
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
					'selector'       => ".{$this->element_id} .gutenverse-share-item a",
					'property'       => function ( $value ) {
						return "height: {$value}px;";
					},
					'value'          => $this->attrs['buttonHeight'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['primaryButtonWidth'] ) && ! empty( $this->attrs['primaryButtonCount'] ) ) {
			$primary_button_count = absint( $this->attrs['primaryButtonCount'] );

			if ( $primary_button_count > 0 ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} > div:nth-child(-n+{$primary_button_count}) .gutenverse-share-item, .{$this->element_id} > div.gutenverse-share-item:nth-child(-n+{$primary_button_count})",
						'property'       => function ( $value ) {
							return $this->handle_unit_point( $value, 'width' );
						},
						'value'          => $this->attrs['primaryButtonWidth'],
						'device_control' => true,
					)
				);

				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} > div:nth-child(-n+{$primary_button_count}) .gutenverse-share-item a, .{$this->element_id} > div.gutenverse-share-item:nth-child(-n+{$primary_button_count}) a",
						'property'       => function ( $value ) {
							return 'width: 100%;';
						},
						'value'          => $this->attrs['primaryButtonWidth'],
						'device_control' => true,
					)
				);

				if ( ! $is_solid_button ) {
					$this->inject_style(
						array(
							'selector'       => ".{$this->element_id}:not(.button-layout-solid) > div:nth-child(-n+{$primary_button_count}) .gutenverse-share-text, .{$this->element_id}:not(.button-layout-solid) > div.gutenverse-share-item:nth-child(-n+{$primary_button_count}) .gutenverse-share-text",
							'property'       => function ( $value ) {
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
					'selector'       => ".{$this->element_id} .gutenverse-share-item a",
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
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gutenverse-share-item a",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['buttonBackgroundColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['buttonBackgroundColorHover'] ) && $is_solid_button ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gutenverse-share-item:hover a",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['buttonBackgroundColorHover'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['gap'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.horizontal > div:not(:first-child)",
					'property'       => function ( $value ) {
						return "margin-left: {$value}px;";
					},
					'value'          => $this->attrs['gap'],
					'device_control' => true,
				)
			);

			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.vertical > div:not(:first-child)",
					'property'       => function ( $value ) {
						return "margin-top: {$value}px;";
					},
					'value'          => $this->attrs['gap'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['iconColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".guten-element.guten-social-share.{$this->element_id} .gutenverse-share-item .gutenverse-share-icon svg",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['iconColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['iconBackgroundColor'] ) && ! $is_solid_button ) {
			$this->inject_style(
				array(
					'selector'       => ".guten-element.guten-social-share.{$this->element_id} .gutenverse-share-item .gutenverse-share-icon",
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
			$this->handle_border( 'borderType', ".{$this->element_id} .gutenverse-share-item" );
		}

		if ( isset( $this->attrs['borderTypeResponsive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gutenverse-share-item",
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
			$this->inject_style(
				array(
					'selector'       => ".guten-element.guten-social-share.{$this->element_id} .gutenverse-share-item:hover .gutenverse-share-icon svg",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['iconColorHover'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['iconBackgroundColorHover'] ) && ! $is_solid_button ) {
			$this->inject_style(
				array(
					'selector'       => ".guten-element.guten-social-share.{$this->element_id} .gutenverse-share-item:hover .gutenverse-share-icon",
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
			$this->handle_border( 'borderTypeHover', ".{$this->element_id} .gutenverse-share-item:hover" );
		}

		if ( isset( $this->attrs['borderTypeHoverResponsive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gutenverse-share-item:hover",
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
					'property'       => function ( $value ) {},
					'value'          => $this->attrs['typography'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['iconSize'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gutenverse-share-item svg",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'font-size' );
					},
					'value'          => $this->attrs['iconSize'],
					'device_control' => true,
				)
			);

			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gutenverse-share-item svg",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'width' );
					},
					'value'          => $this->attrs['iconSize'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['iconPading'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gutenverse-share-item .gutenverse-share-icon",
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
	}
}
