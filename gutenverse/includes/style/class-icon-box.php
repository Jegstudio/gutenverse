<?php
/**
 * Gutenverse Icon Box
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\style
 */

namespace Gutenverse\Style;

use Gutenverse\Framework\Style_Abstract;

/**
 * Class Icon Box
 *
 * @package gutenverse\style
 */
class Icon_Box extends Style_Abstract {
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
	protected $name = 'icon-box';

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
		$this->general_style();
		$this->icon_style();
		$this->icon_box_container();
		$this->icon_box_style();
		$this->icon_content_style();
		$this->badge_style();
	}

	/**
	 * Creating custom handle background to handle old values because format is changed
	 *
	 * @param string $selector .
	 * @param object $background .
	 */
	public function custom_handle_background( $selector, $background ) {
		$this->inject_style(
			array(
				'selector'       => $selector,
				'property'       => function ( $value ) {
					$gradient_color        = $value['gradientColor'];
					$gradient_type         = $value['gradientType'];
					$gradient_angle        = $value['gradientAngle'];
					$gradient_radial       = $value['gradientRadial'];

					if ( ! empty( $gradient_color ) ) {
						$colors = array();

						foreach ( $gradient_color as $gradient ) {
							$offset  = $gradient['offset'] * 100;
							$colors[] = "{$gradient['color']} {$offset}%";
						}

						$colors = join( ',', $colors );

						if ( 'radial' === $gradient_type ) {
							return "background-image: radial-gradient(at {$gradient_radial}, {$colors});";
						} else {
							return "background-image: linear-gradient({$gradient_angle}deg, {$colors});";
						}
					}
				},
				'value'          => array(
					'gradientColor'       => isset( $background['gradientColor'] ) ? $background['gradientColor'] : null,
					'gradientPosition'    => isset( $background['gradientPosition'] ) ? $background['gradientPosition'] : 0,
					'gradientEndColor'    => isset( $background['gradientEndColor'] ) ? $background['gradientEndColor'] : null,
					'gradientEndPosition' => isset( $background['gradientEndPosition'] ) ? $background['gradientEndPosition'] : 100,
					'gradientType'        => isset( $background['gradientType'] ) ? $background['gradientType'] : 'linear',
					'gradientAngle'       => isset( $background['gradientAngle'] ) ? $background['gradientAngle'] : 180,
					'gradientRadial'      => isset( $background['gradientRadial'] ) ? $background['gradientRadial'] : 'center center',
				),
				'device_control' => false,
			)
		);
	}

	/**
	 * General Style
	 */
	public function general_style() {
		if ( isset( $this->attrs['align'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-icon-box-wrapper",
					'property'       => function ( $value ) {
						return "text-align: {$this->handle_align($value)};justify-content: {$value};";
					},
					'value'          => $this->attrs['align'],
					'device_control' => true,
				)
			);
		}
		if ( isset( $this->attrs['iconPositionResponsive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-icon-box-wrapper",
					'property'       => function ( $value ) {
						if ( 'left' === $value ) {
							return 'display: flex; align-items: flex-start;';
						} elseif ( 'right' === $value ) {
							return 'display: flex; -webkit-box-orient: horizontal; -webkit-box-direction: reverse; -ms-flex-direction: row-reverse; flex-direction: row-reverse;';
						} elseif ( 'top' === $value ) {
							return 'display: block !important';
						}
					},
					'value'          => $this->attrs['iconPositionResponsive'],
					'device_control' => true,
				)
			);
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-icon-box-wrapper .icon-box.icon-box-header",
					'property'       => function ( $value ) {
						if ( 'left' === $value ) {
							return 'margin-right: 15px;';
						} elseif ( 'right' === $value ) {
							return 'margin-left: 15px;';
						} elseif ( 'top' === $value ) {
							return 'position: relative; z-index: 2; line-height: 0;';
						}
					},
					'value'          => $this->attrs['iconPositionResponsive'],
					'device_control' => true,
				)
			);
		}
	}

	/**
	 * Icon Style
	 */
	public function icon_style() {
		if ( isset( $this->attrs['iconType'] ) && 'icon' === $this->attrs['iconType'] ) {
			if ( isset( $this->attrs['iconSize'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} .guten-icon-box-wrapper .icon-box .icon i",
						'property'       => function ( $value ) {
							return "font-size: {$value}px";
						},
						'value'          => $this->attrs['iconSize'],
						'device_control' => true,
					)
				);
			}
		}

		if ( isset( $this->attrs['iconType'] ) && 'image' === $this->attrs['iconType'] ) {
			if ( isset( $this->attrs['imageWidth'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} .guten-icon-box-wrapper .icon-box .icon",
						'property'       => function ( $value ) {
							return "width: {$value}px;";
						},
						'value'          => $this->attrs['imageWidth'],
						'device_control' => false,
					)
				);
			}

			if ( isset( $this->attrs['imageHeight'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} .guten-icon-box-wrapper .icon-box .icon",
						'property'       => function ( $value ) {
							return "height: {$value}px";
						},
						'value'          => $this->attrs['imageHeight'],
						'device_control' => false,
					)
				);
			}
		}
	}

	/**
	 * Icon Box Container
	 */
	public function icon_box_container() {
		if ( isset( $this->attrs['containerPadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-icon-box-wrapper",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['containerPadding'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['containerPaddingHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}:hover .guten-icon-box-wrapper",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['containerPaddingHover'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['containerBackground'] ) ) {
			$this->handle_background( ".{$this->element_id} .guten-icon-box-wrapper", $this->attrs['containerBackground'] );
		}

		if ( isset( $this->attrs['containerBackgroundHover'] ) ) {
			$this->handle_background( ".{$this->element_id}:hover .guten-icon-box-wrapper", $this->attrs['containerBackgroundHover'] );
		}

		if ( isset( $this->attrs['containerBorder_v2'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-icon-box-wrapper",
					'property'       => function ( $value ) {
						return $this->handle_border_v2( $value );
					},
					'value'          => $this->attrs['containerBorder_v2'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['containerBoxShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-icon-box-wrapper",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['containerBoxShadow'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['containerBorderHover_v2'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}:hover .guten-icon-box-wrapper",
					'property'       => function ( $value ) {
						return $this->handle_border_v2( $value );
					},
					'value'          => $this->attrs['containerBorderHover_v2'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['containerBoxShadowHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}:hover .guten-icon-box-wrapper",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['containerBoxShadowHover'],
					'device_control' => false,
				)
			);
		}
	}

	/**
	 * Icon Box Style
	 */
	public function icon_box_style() {
		if ( isset( $this->attrs['iconColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .icon-box.icon-box-header .icon i",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['iconColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['iconHoverColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}:hover .icon-box.icon-box-header .icon i",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['iconHoverColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['iconBgColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .icon-box.icon-box-header .icon",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['iconBgColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['iconHoverBgColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}:hover .icon-box.icon-box-header .icon",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['iconHoverBgColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['iconBackground'] ) ) {
			$this->custom_handle_background( ".{$this->element_id} .icon-box.icon-box-header .icon.style-gradient", $this->attrs['iconBackground'] );
		}

		if ( isset( $this->attrs['iconBackgroundHover'] ) ) {
			$this->custom_handle_background( ".{$this->element_id}:hover .icon-box.icon-box-header .icon.style-gradient", $this->attrs['iconBackgroundHover'] );
		}

		if ( isset( $this->attrs['iconBorder_v2'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .icon-box.icon-box-header .icon",
					'property'       => function ( $value ) {
						return $this->handle_border_v2( $value );
					},
					'value'          => $this->attrs['iconBorder_v2'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['iconBoxShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .icon-box.icon-box-header .icon",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['iconBoxShadow'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['iconBorderHover_v2'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}:hover .icon-box.icon-box-header .icon",
					'property'       => function ( $value ) {
						return $this->handle_border_v2( $value );
					},
					'value'          => $this->attrs['iconBorderHover_v2'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['iconBoxShadowHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}:hover .icon-box.icon-box-header .icon",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['iconBoxShadowHover'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['iconPadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .icon-box.icon-box-header .icon",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['iconPadding'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['iconMargin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .icon-box.icon-box-header .icon",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['iconMargin'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['iconRotate'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .icon-box.icon-box-header .icon",
					'property'       => function ( $value ) {
						return "transform: rotate({$value}deg);";
					},
					'value'          => $this->attrs['iconRotate'],
					'device_control' => true,
				)
			);
		}
	}

	/**
	 * Icon Content Style
	 */
	public function icon_content_style() {
		if ( isset( $this->attrs['titlePadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .icon-box.icon-box-body .title",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['titlePadding'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['titleMargin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .icon-box.icon-box-body .title",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['titleMargin'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['titleColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .icon-box.icon-box-body .title",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['titleColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['titleHoverColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}:hover .icon-box.icon-box-body .title",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['titleHoverColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['titleTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".{$this->element_id} .icon-box.icon-box-body .title",
					'property'       => function ( $value ) {},
					'value'          => $this->attrs['titleTypography'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['descMargin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .icon-box.icon-box-body .icon-box-description",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['descMargin'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['descColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .icon-box.icon-box-body .icon-box-description",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['descColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['descHoverColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}:hover .icon-box.icon-box-body .icon-box-description",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['descHoverColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['descTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".{$this->element_id} .icon-box.icon-box-body .icon-box-description",
					'property'       => function ( $value ) {},
					'value'          => $this->attrs['descTypography'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['watermarkColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .hover-watermark i",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['watermarkColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['watermarkSize'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .hover-watermark i",
					'property'       => function ( $value ) {
						return "font-size: {$value}px;";
					},
					'value'          => $this->attrs['watermarkSize'],
					'device_control' => true,
				)
			);
		}
	}

	/**
	 * Badge Style
	 */
	public function badge_style() {
		if ( isset( $this->attrs['badgeTextColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .icon-box-badge .badge-text",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['badgeTextColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['badgePadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .icon-box-badge .badge-text",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['badgePadding'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['badgeMargin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .icon-box-badge .badge-text",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['badgeMargin'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['badgeRadius'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .icon-box-badge .badge-text",
					'property'       => function ( $value ) {
						return $this->handle_border_radius( $value );
					},
					'value'          => $this->attrs['badgeRadius'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['badgeBackground'] ) ) {
			$this->handle_background( ".{$this->element_id} .icon-box-badge .badge-text", $this->attrs['badgeBackground'] );
		}

		if ( isset( $this->attrs['badgeTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".{$this->element_id} .icon-box-badge .badge-text",
					'property'       => function ( $value ) {},
					'value'          => $this->attrs['badgeTypography'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['badgeShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .icon-box-badge .badge-text",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['badgeShadow'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['iconBoxOverlay'] ) ) {
			$this->handle_background( ".{$this->element_id} .guten-icon-box-wrapper:before", $this->attrs['iconBoxOverlay'] );
		}

		if ( isset( $this->attrs['iconBoxHoverOverlay'] ) ) {
			$this->handle_background( ".{$this->element_id} .guten-icon-box-wrapper:hover:before", $this->attrs['iconBoxHoverOverlay'] );
		}
	}
}
