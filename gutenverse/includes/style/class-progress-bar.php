<?php
/**
 * Gutenverse Progress Bar
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\style
 */

namespace Gutenverse\Style;

use Gutenverse\Framework\Style_Abstract;

/**
 * Class Progress Bar
 *
 * @package gutenverse\style
 */
class Progress_Bar extends Style_Abstract {
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
	protected $name = 'progress-bar';


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
	 * Creating custom handle background to handle old values because format is changed
	 *
	 * @param string $selector .
	 * @param object $background .
	 */
	public function custom_handle_gradient( $selector, $background ) {
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
							return "background: radial-gradient(at {$gradient_radial}, {$colors});";
						} else {
							return "background: linear-gradient({$gradient_angle}deg, {$colors});";
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
	 * Generate style base on attribute.
	 */
	public function generate() {
		if ( isset( $this->attrs['barGradient'] ) && isset( $this->attrs['colorMode'] ) && 'gradient' === $this->attrs['colorMode'] ) {
			$this->custom_handle_gradient( ".{$this->element_id} .progress-group .progress-skill-bar .skill-bar", $this->attrs['barGradient'] );
		}

		if ( isset( $this->attrs['trackGradient'] ) && isset( $this->attrs['colorMode'] ) && 'gradient' === $this->attrs['colorMode'] ) {
			$this->custom_handle_gradient( ".{$this->element_id} .progress-group .progress-skill-bar .skill-bar .skill-track", $this->attrs['trackGradient'] );
		}

		if ( isset( $this->attrs['barColor'] ) && ( ( isset( $this->attrs['colorMode'] ) && 'default' === $this->attrs['colorMode'] ) || ! isset( $this->attrs['colorMode'] ) ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .progress-group .progress-skill-bar .skill-bar",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['barColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['trackColor'] ) && ( ( isset( $this->attrs['colorMode'] ) && 'default' === $this->attrs['colorMode'] ) || ! isset( $this->attrs['colorMode'] ) ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .progress-group .progress-skill-bar .skill-bar .skill-track",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['trackColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['trackHeight'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .progress-group .progress-skill-bar .skill-bar",
					'property'       => function ( $value ) {
						return "height: {$value}px;";
					},
					'value'          => $this->attrs['trackHeight'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['barRadius'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .progress-group .progress-skill-bar .skill-bar",
					'property'       => function ( $value ) {
						return $this->handle_border_radius( $value );
					},
					'value'          => $this->attrs['barRadius'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['trackRadius'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .progress-group .progress-skill-bar .skill-bar .skill-track",
					'property'       => function ( $value ) {
						return $this->handle_border_radius( $value );
					},
					'value'          => $this->attrs['trackRadius'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['barPadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .progress-group .progress-skill-bar .skill-bar",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['barPadding'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['barMargin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .progress-group .progress-skill-bar .skill-bar",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['barMargin'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['titleColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .progress-group .progress-skill-bar .skill-bar-content .skill-title",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['titleColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['titleTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".{$this->element_id} .progress-group .progress-skill-bar .skill-bar-content .skill-title",
					'property'       => function ( $value ) {},
					'value'          => $this->attrs['titleTypography'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['titleTextShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .progress-group .progress-skill-bar .skill-bar-content .skill-title",
					'property'       => function ( $value ) {
						return $this->handle_text_shadow( $value );
					},
					'value'          => $this->attrs['titleTextShadow'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['percentBgColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .progress-group[class*='tooltip-'] .progress-skill-bar .skill-bar .skill-track .number-percentage-wrapper,.{$this->element_id} .progress-group.ribbon .progress-skill-bar .skill-bar .skill-track .number-percentage-wrapper,.{$this->element_id} .progress-group[class*='tooltip-']:not(.tooltip-style) .progress-skill-bar .skill-bar .skill-track .number-percentage-wrapper:before,.{$this->element_id} .progress-group.switch .progress-skill-bar .skill-bar .skill-track:before",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['percentBgColor'],
					'device_control' => false,
				)
			);

			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .progress-group.tooltip-style .progress-skill-bar .skill-bar .skill-track .number-percentage-wrapper:before",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['percentBgColor'],
					'device_control' => false,
				)
			);

			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .progress-group.ribbon .progress-skill-bar .skill-bar .skill-track .number-percentage-wrapper:before",
					'property'       => function ( $value ) {
						return "{$this->handle_color( $value, 'border-right-color' )}{$this->handle_color( $value, 'border-bottom-color' )}";
					},
					'value'          => $this->attrs['percentBgColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['barBoxShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .progress-group .progress-skill-bar .skill-bar",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['barBoxShadow'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['percentColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .progress-group .progress-skill-bar .number-percentage, .{$this->element_id} .progress-group .number-percentage",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['percentColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['percentTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".{$this->element_id} .progress-group .progress-skill-bar .number-percentage, .{$this->element_id} .progress-group .number-percentage",
					'property'       => function ( $value ) {},
					'value'          => $this->attrs['percentTypography'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['percentTextShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .progress-group .progress-skill-bar .number-percentage, .{$this->element_id} .progress-group .number-percentage",
					'property'       => function ( $value ) {
						return $this->handle_text_shadow( $value );
					},
					'value'          => $this->attrs['percentTextShadow'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['style'] ) && 'switch' === $this->attrs['style'] ) {
			if ( isset( $this->attrs['percentSwitchBorder'] ) ) {
				$this->handle_border( 'percentSwitchBorder', ".{$this->element_id} .progress-group.switch .progress-skill-bar .skill-bar .skill-track:before" );
			}
			if ( isset( $this->attrs['percentSwitchBoxShadow'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} .progress-group.switch .progress-skill-bar .skill-bar .skill-track:before",
						'property'       => function ( $value ) {
							return $this->handle_box_shadow( $value );
						},
						'value'          => $this->attrs['percentSwitchBoxShadow'],
						'device_control' => false,
					)
				);
			}
			if ( isset( $this->attrs['percentSwitchSize'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} .progress-group.switch .progress-skill-bar .skill-bar .skill-track:before",
						'property'       => function ( $value ) {
							return $this->handle_unit_point( $value, 'width' );
						},
						'value'          => $this->attrs['percentSwitchSize'],
						'device_control' => false,
					)
				);
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} .progress-group.switch .progress-skill-bar .skill-bar .skill-track:before",
						'property'       => function ( $value ) {
							return $this->handle_unit_point( $value, 'height' );
						},
						'value'          => $this->attrs['percentSwitchSize'],
						'device_control' => false,
					)
				);
			}
		}
	}
}
