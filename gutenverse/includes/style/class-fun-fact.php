<?php
/**
 * Gutenverse Fun_Fact
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\style
 */

namespace Gutenverse\Style;

use Gutenverse\Framework\Style_Abstract;

/**
 * Class Fun_Fact
 *
 * @package gutenverse\style
 */
class Fun_Fact extends Style_Abstract {
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
	protected $name = 'fun-fact';

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
				'transform'   => array(
					'normal' => ".{$this->element_id} .fun-fact-inner",
					'hover'  => ".{$this->element_id}:hover .fun-fact-inner",
				),
				'mask'        => null,
			)
		);
	}


	/**
	 * Generate style base on attribute.
	 */
	public function generate() {
		if ( isset( $this->attrs['alignButtons'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}",
					'property'       => function ( $value ) {
						return "text-align: {$value};";
					},
					'value'          => $this->attrs['alignButtons'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['hoverBottom'] ) && $this->attrs['hoverBottom'] ) {
			if ( isset( $this->attrs['hoverBottomColor'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} .border-bottom .animated",
						'property'       => function ( $value ) {
							return $this->handle_color( $value, 'background-color' );
						},
						'value'          => $this->attrs['hoverBottomColor'],
						'device_control' => false,
					)
				);
			}
		}

		if ( isset( $this->attrs['iconType'] ) && 'image' === $this->attrs['iconType'] ) {
			if ( isset( $this->attrs['imageSize'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} .fun-fact-inner .icon img",
						'property'       => function ( $value ) {
							return "width: {$value}px; height: {$value}px; object-fit: cover;";
						},
						'value'          => $this->attrs['imageSize'],
						'device_control' => false,
					)
				);
			}
			if ( isset( $this->attrs['imageSizeResponsive'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} .fun-fact-inner .icon img",
						'property'       => function ( $value ) {
							return "width: {$value}px; height: {$value}px; object-fit: cover;";
						},
						'value'          => $this->attrs['imageSizeResponsive'],
						'device_control' => true,
						'skip_device'    => array(
							'Desktop',
						),
					)
				);
			}
		}

		if ( isset( $this->attrs['iconColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-fun-fact .fun-fact-inner .icon",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['iconColor'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['iconBgColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-fun-fact .fun-fact-inner .icon",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['iconBgColor'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['iconBorder'] ) ) {
			$this->handle_border( 'iconBorder', ".{$this->element_id} .fun-fact-inner .icon" );
		}

		if ( isset( $this->attrs['iconBorderResponsive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .fun-fact-inner .icon",
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

		if ( isset( $this->attrs['iconColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .fun-fact-inner:hover .icon",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['iconColorHover'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['iconBgColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .fun-fact-inner:hover .icon",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['iconBgColorHover'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['iconBorderHover'] ) ) {
			$this->handle_border( 'iconBorderHover', ".{$this->element_id} .fun-fact-inner:hover .icon" );
		}

		if ( isset( $this->attrs['iconBorderHoverResponsive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .fun-fact-inner:hover .icon",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['iconBorderHoverResponsive'],
					'device_control' => true,
					'skip_device'    => array(
						'Desktop',
					),
				)
			);
		}

		if ( isset( $this->attrs['iconSize'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .fun-fact-inner .icon",
					'property'       => function ( $value ) {
						return "font-size: {$value}px !important;";
					},
					'value'          => $this->attrs['iconSize'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['iconRotate'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .fun-fact-inner .icon",
					'property'       => function ( $value ) {
						return "transform: rotate({$value}deg);";
					},
					'value'          => $this->attrs['iconRotate'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['iconPadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .fun-fact-inner .icon",
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
					'selector'       => ".{$this->element_id}.guten-fun-fact .fun-fact-inner .icon",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['iconMargin'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['numberColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .fun-fact-inner .content .number-wrapper",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['numberColor'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['titleColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .fun-fact-inner .content .title",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['titleColor'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['numberTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".{$this->element_id} .fun-fact-inner .content .number-wrapper",
					'property'       => function ( $value ) {},
					'value'          => $this->attrs['numberTypography'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['titleTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".{$this->element_id} .fun-fact-inner .content .title",
					'property'       => function ( $value ) {},
					'value'          => $this->attrs['titleTypography'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['numberBottomSpace'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .fun-fact-inner .content .number-wrapper ",
					'property'       => function ( $value ) {
						return "margin-bottom: {$value}px;";
					},
					'value'          => $this->attrs['numberBottomSpace'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['titleBottomSpace'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .fun-fact-inner .content .title ",
					'property'       => function ( $value ) {
						return "margin-bottom: {$value}px;";
					},
					'value'          => $this->attrs['titleBottomSpace'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['numberRightSpace'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .fun-fact-inner .content .number-wrapper .number.loaded",
					'property'       => function ( $value ) {
						return "margin-right: {$value}px;";
					},
					'value'          => $this->attrs['numberRightSpace'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['contentPadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .fun-fact-inner .content",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['contentPadding'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['superColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .fun-fact-inner .content .number-wrapper .super",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['superColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['superTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".{$this->element_id} .fun-fact-inner .content .number-wrapper .super",
					'property'       => function ( $value ) {},
					'value'          => $this->attrs['superTypography'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['superTop'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .fun-fact-inner .content .number-wrapper .super",
					'property'       => function ( $value ) {
						return "top: {$value}px;";
					},
					'value'          => $this->attrs['superTop'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['superSpace'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .fun-fact-inner .content .number-wrapper .super",
					'property'       => function ( $value ) {
						return "left: {$value}px;";
					},
					'value'          => $this->attrs['superSpace'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['superAlign'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .fun-fact-inner .content .number-wrapper .super",
					'property'       => function ( $value ) {
						return "vertical-align: {$value};";
					},
					'value'          => $this->attrs['superAlign'],
					'device_control' => true,
				)
			);
		}
	}
}
