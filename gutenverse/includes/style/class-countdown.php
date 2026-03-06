<?php
/**
 * Gutenverse Countdown
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\style
 */

namespace Gutenverse\Style;

use Gutenverse\Framework\Style_Abstract;

/**
 * Class Countdown
 *
 * @package gutenverse\style
 */
class Countdown extends Style_Abstract {
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
	protected $name = 'countdown';

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
				'animation'   => ".{$this->element_id}.guten-countdown",
				'advance'     => null,
				'transform'   => array(
					'normal' => ".{$this->element_id}",
					'hover'  => ".{$this->element_id}:hover",
				),
				'mask'        => ".{$this->element_id}.guten-countdown",
			)
		);
	}

	/**
	 * Generate style base on attribute.
	 */
	public function generate() {
		$one_for_all = false;
		if ( isset( $this->attrs['oneForAll'] ) ) {
			$one_for_all = $this->attrs['oneForAll'];
		}
		$label_position = $this->attrs['labelPosition'];

		if ( isset( $this->attrs['column'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-countdown .guten-countdown-wrapper .item-flex",
					'property'       => function ( $value ) {
						return "flex : 0 0 calc( 100% / {$value} ); max-width: calc( (100% / {$value}) );";
					},
					'value'          => $this->attrs['column'],
					'device_control' => true,
				)
			);
		}
		if ( isset( $this->attrs['rowGap'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-countdown .guten-countdown-wrapper",
					'property'       => function ( $value ) {
						return "row-gap: {$value}px;";
					},
					'value'          => $this->attrs['rowGap'],
					'device_control' => true,
				)
			);
		}
		if ( isset( $this->attrs['labelPosition'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-countdown .time-container",
					'property'       => function ( $value ) {
						if ( 'top' === $value || 'bottom' === $value ) {
							return 'flex-direction: column;';
						} else {
							return 'flex-direction: row;';
						}
					},
					'value'          => $this->attrs['labelPosition'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['labelSpacing'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-countdown .time-container",
					'property'       => function ( $value ) {
						return "gap: {$value}px;";
					},
					'value'          => $this->attrs['labelSpacing'],
					'device_control' => true,
				)
			);
		}
		if ( isset( $this->attrs['dividerColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-countdown .countdown-divider",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['dividerColor'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['dividerSize'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-countdown .countdown-divider",
					'property'       => function ( $value ) {
						return "font-size: {$value}px;";
					},
					'value'          => $this->attrs['dividerSize'],
					'device_control' => true,
				)
			);
		}
		if ( $one_for_all ) {
			if ( isset( $this->attrs['oneForAllDigitColor'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id}.guten-countdown .time-container .countdown-value",
						'property'       => function ( $value ) {
							return $this->handle_color( $value, 'color' );
						},
						'value'          => $this->attrs['oneForAllDigitColor'],
						'device_control' => false,
					)
				);
			}

			if ( isset( $this->attrs['oneForAllDigitTypography'] ) ) {
				$this->inject_typography(
					array(
						'selector'       => ".{$this->element_id}.guten-countdown .time-container .countdown-value",
						'property'       => function ( $value ) {},
						'value'          => $this->attrs['oneForAllDigitTypography'],
						'device_control' => false,
					)
				);
			}

			if ( isset( $this->attrs['oneForAllLabelColor'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id}.guten-countdown .time-container .countdown-label",
						'property'       => function ( $value ) {
							return $this->handle_color( $value, 'color' );
						},
						'value'          => $this->attrs['oneForAllLabelColor'],
						'device_control' => false,
					)
				);
			}

			if ( isset( $this->attrs['oneForAllLabelTypography'] ) ) {
				$this->inject_typography(
					array(
						'selector'       => ".{$this->element_id}.guten-countdown .time-container .countdown-label",
						'property'       => function ( $value ) {},
						'value'          => $this->attrs['oneForAllLabelTypography'],
						'device_control' => false,
					)
				);
			}

			if ( isset( $this->attrs['oneForAllBackground'] ) ) {
				$this->handle_background( ".{$this->element_id}.guten-countdown .time-container", $this->attrs['oneForAllBackground'] );
			}

			if ( isset( $this->attrs['oneForAllBackgroundHover'] ) ) {
				$this->handle_background( ".{$this->element_id}.guten-countdown .time-container:hover", $this->attrs['oneForAllBackgroundHover'] );
			}

			if ( isset( $this->attrs['oneForAllBorder'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id}.guten-countdown .time-container",
						'property'       => function ( $value ) {
							return $this->handle_border_responsive( $value );
						},
						'value'          => $this->attrs['oneForAllBorder'],
						'device_control' => true,
					)
				);
			}

			if ( isset( $this->attrs['oneForAllBorderHover'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id}.guten-countdown .time-container:hover",
						'property'       => function ( $value ) {
							return $this->handle_border_responsive( $value );
						},
						'value'          => $this->attrs['oneForAllBorderHover'],
						'device_control' => true,
					)
				);
			}

			if ( isset( $this->attrs['oneForAllBoxShadow'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id}.guten-countdown .time-container",
						'property'       => function ( $value ) {
							return $this->handle_box_shadow( $value );
						},
						'value'          => $this->attrs['oneForAllBoxShadow'],
						'device_control' => false,
					)
				);
			}

			if ( isset( $this->attrs['oneForAllBoxShadowHover'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id}.guten-countdown .time-container:hover",
						'property'       => function ( $value ) {
							return $this->handle_box_shadow( $value );
						},
						'value'          => $this->attrs['oneForAllBoxShadowHover'],
						'device_control' => false,
					)
				);
			}

			if ( isset( $this->attrs['oneForAllMargin'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id}.guten-countdown .time-container",
						'property'       => function ( $value ) {
							return $this->handle_dimension( $value, 'margin' );
						},
						'value'          => $this->attrs['oneForAllMargin'],
						'device_control' => true,
					)
				);
			}

			if ( isset( $this->attrs['oneForAllPadding'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id}.guten-countdown .time-container",
						'property'       => function ( $value ) {
							return $this->handle_dimension( $value, 'padding' );
						},
						'value'          => $this->attrs['oneForAllPadding'],
						'device_control' => true,
					)
				);
			}

			if ( isset( $this->attrs['oneForAllWidth'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id}.guten-countdown .time-container",
						'property'       => function ( $value ) {
							return $this->handle_unit_point( $value, 'width' );
						},
						'value'          => $this->attrs['oneForAllWidth'],
						'device_control' => true,
					)
				);
			}

			if ( isset( $this->attrs['oneForAllHeight'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id}.guten-countdown .time-container",
						'property'       => function ( $value ) {
							return "height: {$value}px;";
						},
						'value'          => $this->attrs['oneForAllHeight'],
						'device_control' => true,
					)
				);
			}

			if ( isset( $this->attrs['oneForAllVerticalAlign'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id}.guten-countdown .time-container",
						'property'       => function ( $value ) {
							if ( 'top' === $value['position'] || 'bottom' === $value['position'] ) {
								return "justify-content: {$value['value']};";
							} else {
								return "align-items: {$value['value']};";
							}
						},
						'value'          => array(
							'position' => $label_position,
							'value'    => $this->attrs['oneForAllVerticalAlign'],
						),
						'device_control' => false,
					)
				);
			}

			if ( isset( $this->attrs['oneForAllHorizontalAlign'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id}.guten-countdown .time-container",
						'property'       => function ( $value ) {
							if ( 'top' === $value['position'] || 'bottom' === $value['position'] ) {
								return "align-items: {$value['value']};";
							} else {
								return "justify-content: {$value['value']};";
							}
						},
						'value'          => array(
							'position' => $label_position,
							'value'    => $this->attrs['oneForAllHorizontalAlign'],
						),
						'device_control' => false,
					)
				);
			}
		} else {
			if ( isset( $this->attrs['daysDigitColor'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id}.guten-countdown .days-wrapper .countdown-value",
						'property'       => function ( $value ) {
							return $this->handle_color( $value, 'color' );
						},
						'value'          => $this->attrs['daysDigitColor'],
						'device_control' => false,
					)
				);
			}

			if ( isset( $this->attrs['daysDigitTypography'] ) ) {
				$this->inject_typography(
					array(
						'selector'       => ".{$this->element_id}.guten-countdown .days-wrapper .countdown-value",
						'property'       => function ( $value ) {},
						'value'          => $this->attrs['daysDigitTypography'],
						'device_control' => false,
					)
				);
			}

			if ( isset( $this->attrs['daysLabelColor'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id}.guten-countdown .days-wrapper .countdown-label",
						'property'       => function ( $value ) {
							return $this->handle_color( $value, 'color' );
						},
						'value'          => $this->attrs['daysLabelColor'],
						'device_control' => false,
					)
				);
			}

			if ( isset( $this->attrs['daysLabelTypography'] ) ) {
				$this->inject_typography(
					array(
						'selector'       => ".{$this->element_id}.guten-countdown .days-wrapper .countdown-label",
						'property'       => function ( $value ) {},
						'value'          => $this->attrs['daysLabelTypography'],
						'device_control' => false,
					)
				);
			}

			if ( isset( $this->attrs['daysBackground'] ) ) {
				$this->handle_background( ".{$this->element_id}.guten-countdown .days-wrapper", $this->attrs['daysBackground'] );
			}

			if ( isset( $this->attrs['daysBackgroundHover'] ) ) {
				$this->handle_background( ".{$this->element_id}.guten-countdown .days-wrapper:hover", $this->attrs['daysBackgroundHover'] );
			}

			if ( isset( $this->attrs['daysBorder'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id}.guten-countdown .days-wrapper",
						'property'       => function ( $value ) {
							return $this->handle_border_responsive( $value );
						},
						'value'          => $this->attrs['daysBorder'],
						'device_control' => true,
					)
				);
			}

			if ( isset( $this->attrs['daysBorderHover'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id}.guten-countdown .days-wrapper:hover",
						'property'       => function ( $value ) {
							return $this->handle_border_responsive( $value );
						},
						'value'          => $this->attrs['daysBorderHover'],
						'device_control' => true,
					)
				);
			}

			if ( isset( $this->attrs['daysBoxShadow'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id}.guten-countdown .days-wrapper",
						'property'       => function ( $value ) {
							return $this->handle_box_shadow( $value );
						},
						'value'          => $this->attrs['daysBoxShadow'],
						'device_control' => false,
					)
				);
			}

			if ( isset( $this->attrs['daysBoxShadowHover'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id}.guten-countdown .days-wrapper:hover",
						'property'       => function ( $value ) {
							return $this->handle_box_shadow( $value );
						},
						'value'          => $this->attrs['daysBoxShadowHover'],
						'device_control' => false,
					)
				);
			}

			if ( isset( $this->attrs['daysMargin'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id}.guten-countdown .days-wrapper",
						'property'       => function ( $value ) {
							return $this->handle_dimension( $value, 'margin' );
						},
						'value'          => $this->attrs['daysMargin'],
						'device_control' => true,
					)
				);
			}

			if ( isset( $this->attrs['daysPadding'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id}.guten-countdown .days-wrapper",
						'property'       => function ( $value ) {
							return $this->handle_dimension( $value, 'padding' );
						},
						'value'          => $this->attrs['daysPadding'],
						'device_control' => true,
					)
				);
			}

			if ( isset( $this->attrs['daysWidth'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id}.guten-countdown .days-wrapper",
						'property'       => function ( $value ) {
							return $this->handle_unit_point( $value, 'width' );
						},
						'value'          => $this->attrs['daysWidth'],
						'device_control' => true,
					)
				);
			}

			if ( isset( $this->attrs['daysHeight'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id}.guten-countdown .days-wrapper",
						'property'       => function ( $value ) {
							return "height: {$value}px;";
						},
						'value'          => $this->attrs['daysHeight'],
						'device_control' => true,
					)
				);
			}

			if ( isset( $this->attrs['daysVerticalAlign'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id}.guten-countdown .days-wrapper",
						'property'       => function ( $value ) {
							if ( 'top' === $value['position'] || 'bottom' === $value['position'] ) {
								return "justify-content: {$value['value']};";
							} else {
								return "align-items: {$value['value']};";
							}
						},
						'value'          => array(
							'position' => $label_position,
							'value'    => $this->attrs['daysVerticalAlign'],
						),
						'device_control' => false,
					)
				);
			}

			if ( isset( $this->attrs['daysHorizontalAlign'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id}.guten-countdown .days-wrapper",
						'property'       => function ( $value ) {
							if ( 'top' === $value['position'] || 'bottom' === $value['position'] ) {
								return "align-items: {$value['value']};";
							} else {
								return "justify-content: {$value['value']};";
							}
						},
						'value'          => array(
							'position' => $label_position,
							'value'    => $this->attrs['daysHorizontalAlign'],
						),
						'device_control' => false,
					)
				);
			}
			if ( isset( $this->attrs['hoursDigitColor'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id}.guten-countdown .hours-wrapper .countdown-value",
						'property'       => function ( $value ) {
							return $this->handle_color( $value, 'color' );
						},
						'value'          => $this->attrs['hoursDigitColor'],
						'device_control' => false,
					)
				);
			}

			if ( isset( $this->attrs['hoursDigitTypography'] ) ) {
				$this->inject_typography(
					array(
						'selector'       => ".{$this->element_id}.guten-countdown .hours-wrapper .countdown-value",
						'property'       => function ( $value ) {},
						'value'          => $this->attrs['hoursDigitTypography'],
						'device_control' => false,
					)
				);
			}

			if ( isset( $this->attrs['hoursLabelColor'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id}.guten-countdown .hours-wrapper .countdown-label",
						'property'       => function ( $value ) {
							return $this->handle_color( $value, 'color' );
						},
						'value'          => $this->attrs['hoursLabelColor'],
						'device_control' => false,
					)
				);
			}

			if ( isset( $this->attrs['hoursLabelTypography'] ) ) {
				$this->inject_typography(
					array(
						'selector'       => ".{$this->element_id}.guten-countdown .hours-wrapper .countdown-label",
						'property'       => function ( $value ) {},
						'value'          => $this->attrs['hoursLabelTypography'],
						'device_control' => false,
					)
				);
			}

			if ( isset( $this->attrs['hoursBackground'] ) ) {
				$this->handle_background( ".{$this->element_id}.guten-countdown .hours-wrapper", $this->attrs['hoursBackground'] );
			}

			if ( isset( $this->attrs['hoursBackgroundHover'] ) ) {
				$this->handle_background( ".{$this->element_id}.guten-countdown .hours-wrapper:hover", $this->attrs['hoursBackgroundHover'] );
			}

			if ( isset( $this->attrs['hoursBorder'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id}.guten-countdown .hours-wrapper",
						'property'       => function ( $value ) {
							return $this->handle_border_responsive( $value );
						},
						'value'          => $this->attrs['hoursBorder'],
						'device_control' => true,
					)
				);
			}

			if ( isset( $this->attrs['hoursBorderHover'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id}.guten-countdown .hours-wrapper:hover",
						'property'       => function ( $value ) {
							return $this->handle_border_responsive( $value );
						},
						'value'          => $this->attrs['hoursBorderHover'],
						'device_control' => true,
					)
				);
			}

			if ( isset( $this->attrs['hoursBoxShadow'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id}.guten-countdown .hours-wrapper",
						'property'       => function ( $value ) {
							return $this->handle_box_shadow( $value );
						},
						'value'          => $this->attrs['hoursBoxShadow'],
						'device_control' => false,
					)
				);
			}

			if ( isset( $this->attrs['hoursBoxShadowHover'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id}.guten-countdown .hours-wrapper:hover",
						'property'       => function ( $value ) {
							return $this->handle_box_shadow( $value );
						},
						'value'          => $this->attrs['hoursBoxShadowHover'],
						'device_control' => false,
					)
				);
			}

			if ( isset( $this->attrs['hoursMargin'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id}.guten-countdown .hours-wrapper",
						'property'       => function ( $value ) {
							return $this->handle_dimension( $value, 'margin' );
						},
						'value'          => $this->attrs['hoursMargin'],
						'device_control' => true,
					)
				);
			}

			if ( isset( $this->attrs['hoursPadding'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id}.guten-countdown .hours-wrapper",
						'property'       => function ( $value ) {
							return $this->handle_dimension( $value, 'padding' );
						},
						'value'          => $this->attrs['hoursPadding'],
						'device_control' => true,
					)
				);
			}

			if ( isset( $this->attrs['hoursWidth'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id}.guten-countdown .hours-wrapper",
						'property'       => function ( $value ) {
							return $this->handle_unit_point( $value, 'width' );
						},
						'value'          => $this->attrs['hoursWidth'],
						'device_control' => true,
					)
				);
			}

			if ( isset( $this->attrs['hoursHeight'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id}.guten-countdown .hours-wrapper",
						'property'       => function ( $value ) {
							return "height: {$value}px;";
						},
						'value'          => $this->attrs['hoursHeight'],
						'device_control' => true,
					)
				);
			}

			if ( isset( $this->attrs['hoursVerticalAlign'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id}.guten-countdown .hours-wrapper",
						'property'       => function ( $value ) {
							if ( 'top' === $value['position'] || 'bottom' === $value['position'] ) {
								return "justify-content: {$value['value']};";
							} else {
								return "align-items: {$value['value']};";
							}
						},
						'value'          => array(
							'position' => $label_position,
							'value'    => $this->attrs['hoursVerticalAlign'],
						),
						'device_control' => false,
					)
				);
			}

			if ( isset( $this->attrs['hoursHorizontalAlign'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id}.guten-countdown .hours-wrapper",
						'property'       => function ( $value ) {
							if ( 'top' === $value['position'] || 'bottom' === $value['position'] ) {
								return "align-items: {$value['value']};";
							} else {
								return "justify-content: {$value['value']};";
							}
						},
						'value'          => array(
							'position' => $label_position,
							'value'    => $this->attrs['daysHorizontalAlign'],
						),
						'device_control' => false,
					)
				);
			}
			if ( isset( $this->attrs['minutesDigitColor'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id}.guten-countdown .minutes-wrapper .countdown-value",
						'property'       => function ( $value ) {
							return $this->handle_color( $value, 'color' );
						},
						'value'          => $this->attrs['minutesDigitColor'],
						'device_control' => false,
					)
				);
			}

			if ( isset( $this->attrs['minutesDigitTypography'] ) ) {
				$this->inject_typography(
					array(
						'selector'       => ".{$this->element_id}.guten-countdown .minutes-wrapper .countdown-value",
						'property'       => function ( $value ) {},
						'value'          => $this->attrs['minutesDigitTypography'],
						'device_control' => false,
					)
				);
			}

			if ( isset( $this->attrs['minutesLabelColor'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id}.guten-countdown .minutes-wrapper .countdown-label",
						'property'       => function ( $value ) {
							return $this->handle_color( $value, 'color' );
						},
						'value'          => $this->attrs['minutesLabelColor'],
						'device_control' => false,
					)
				);
			}

			if ( isset( $this->attrs['minutesLabelTypography'] ) ) {
				$this->inject_typography(
					array(
						'selector'       => ".{$this->element_id}.guten-countdown .minutes-wrapper .countdown-label",
						'property'       => function ( $value ) {},
						'value'          => $this->attrs['minutesLabelTypography'],
						'device_control' => false,
					)
				);
			}

			if ( isset( $this->attrs['minutesBackground'] ) ) {
				$this->handle_background( ".{$this->element_id}.guten-countdown .minutes-wrapper", $this->attrs['minutesBackground'] );
			}

			if ( isset( $this->attrs['minutesBackgroundHover'] ) ) {
				$this->handle_background( ".{$this->element_id}.guten-countdown .minutes-wrapper:hover", $this->attrs['minutesBackgroundHover'] );
			}

			if ( isset( $this->attrs['minutesBorder'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id}.guten-countdown .minutes-wrapper",
						'property'       => function ( $value ) {
							return $this->handle_border_responsive( $value );
						},
						'value'          => $this->attrs['minutesBorder'],
						'device_control' => true,
					)
				);
			}

			if ( isset( $this->attrs['minutesBorderHover'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id}.guten-countdown .minutes-wrapper:hover",
						'property'       => function ( $value ) {
							return $this->handle_border_responsive( $value );
						},
						'value'          => $this->attrs['minutesBorderHover'],
						'device_control' => true,
					)
				);
			}

			if ( isset( $this->attrs['minutesBoxShadow'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id}.guten-countdown .minutes-wrapper",
						'property'       => function ( $value ) {
							return $this->handle_box_shadow( $value );
						},
						'value'          => $this->attrs['minutesBoxShadow'],
						'device_control' => false,
					)
				);
			}

			if ( isset( $this->attrs['minutesBoxShadowHover'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id}.guten-countdown .minutes-wrapper:hover",
						'property'       => function ( $value ) {
							return $this->handle_box_shadow( $value );
						},
						'value'          => $this->attrs['minutesBoxShadowHover'],
						'device_control' => false,
					)
				);
			}

			if ( isset( $this->attrs['minutesMargin'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id}.guten-countdown .minutes-wrapper",
						'property'       => function ( $value ) {
							return $this->handle_dimension( $value, 'margin' );
						},
						'value'          => $this->attrs['minutesMargin'],
						'device_control' => true,
					)
				);
			}

			if ( isset( $this->attrs['minutesPadding'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id}.guten-countdown .minutes-wrapper",
						'property'       => function ( $value ) {
							return $this->handle_dimension( $value, 'padding' );
						},
						'value'          => $this->attrs['minutesPadding'],
						'device_control' => true,
					)
				);
			}

			if ( isset( $this->attrs['minutesWidth'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id}.guten-countdown .minutes-wrapper",
						'property'       => function ( $value ) {
							return $this->handle_unit_point( $value, 'width' );
						},
						'value'          => $this->attrs['minutesWidth'],
						'device_control' => true,
					)
				);
			}

			if ( isset( $this->attrs['minutesHeight'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id}.guten-countdown .minutes-wrapper",
						'property'       => function ( $value ) {
							return "height: {$value}px;";
						},
						'value'          => $this->attrs['minutesHeight'],
						'device_control' => true,
					)
				);
			}

			if ( isset( $this->attrs['minutesVerticalAlign'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id}.guten-countdown .minutes-wrapper",
						'property'       => function ( $value ) {
							if ( 'top' === $value['position'] || 'bottom' === $value['position'] ) {
								return "justify-content: {$value['value']};";
							} else {
								return "align-items: {$value['value']};";
							}
						},
						'value'          => array(
							'position' => $label_position,
							'value'    => $this->attrs['minutesVerticalAlign'],
						),
						'device_control' => false,
					)
				);
			}

			if ( isset( $this->attrs['minutesHorizontalAlign'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id}.guten-countdown .minutes-wrapper",
						'property'       => function ( $value ) {
							if ( 'top' === $value['position'] || 'bottom' === $value['position'] ) {
								return "align-items: {$value['value']};";
							} else {
								return "justify-content: {$value['value']};";
							}
						},
						'value'          => array(
							'position' => $label_position,
							'value'    => $this->attrs['minutesHorizontalAlign'],
						),
						'device_control' => false,
					)
				);
			}
			if ( isset( $this->attrs['secondsDigitColor'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id}.guten-countdown .seconds-wrapper .countdown-value",
						'property'       => function ( $value ) {
							return $this->handle_color( $value, 'color' );
						},
						'value'          => $this->attrs['secondsDigitColor'],
						'device_control' => false,
					)
				);
			}

			if ( isset( $this->attrs['secondsDigitTypography'] ) ) {
				$this->inject_typography(
					array(
						'selector'       => ".{$this->element_id}.guten-countdown .seconds-wrapper .countdown-value",
						'property'       => function ( $value ) {},
						'value'          => $this->attrs['secondsDigitTypography'],
						'device_control' => false,
					)
				);
			}

			if ( isset( $this->attrs['secondsLabelColor'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id}.guten-countdown .seconds-wrapper .countdown-label",
						'property'       => function ( $value ) {
							return $this->handle_color( $value, 'color' );
						},
						'value'          => $this->attrs['secondsLabelColor'],
						'device_control' => false,
					)
				);
			}

			if ( isset( $this->attrs['secondsLabelTypography'] ) ) {
				$this->inject_typography(
					array(
						'selector'       => ".{$this->element_id}.guten-countdown .seconds-wrapper .countdown-label",
						'property'       => function ( $value ) {},
						'value'          => $this->attrs['secondsLabelTypography'],
						'device_control' => false,
					)
				);
			}

			if ( isset( $this->attrs['secondsBackground'] ) ) {
				$this->handle_background( ".{$this->element_id}.guten-countdown .seconds-wrapper", $this->attrs['secondsBackground'] );
			}

			if ( isset( $this->attrs['secondsBackgroundHover'] ) ) {
				$this->handle_background( ".{$this->element_id}.guten-countdown .seconds-wrapper:hover", $this->attrs['secondsBackgroundHover'] );
			}

			if ( isset( $this->attrs['secondsBorder'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id}.guten-countdown .seconds-wrapper",
						'property'       => function ( $value ) {
							return $this->handle_border_responsive( $value );
						},
						'value'          => $this->attrs['secondsBorder'],
						'device_control' => true,
					)
				);
			}

			if ( isset( $this->attrs['secondsBorderHover'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id}.guten-countdown .seconds-wrapper:hover",
						'property'       => function ( $value ) {
							return $this->handle_border_responsive( $value );
						},
						'value'          => $this->attrs['secondsBorderHover'],
						'device_control' => true,
					)
				);
			}

			if ( isset( $this->attrs['secondsBoxShadow'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id}.guten-countdown .seconds-wrapper",
						'property'       => function ( $value ) {
							return $this->handle_box_shadow( $value );
						},
						'value'          => $this->attrs['secondsBoxShadow'],
						'device_control' => false,
					)
				);
			}

			if ( isset( $this->attrs['secondsBoxShadowHover'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id}.guten-countdown .seconds-wrapper:hover",
						'property'       => function ( $value ) {
							return $this->handle_box_shadow( $value );
						},
						'value'          => $this->attrs['secondsBoxShadowHover'],
						'device_control' => false,
					)
				);
			}

			if ( isset( $this->attrs['secondsMargin'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id}.guten-countdown .seconds-wrapper",
						'property'       => function ( $value ) {
							return $this->handle_dimension( $value, 'margin' );
						},
						'value'          => $this->attrs['secondsMargin'],
						'device_control' => true,
					)
				);
			}

			if ( isset( $this->attrs['secondsPadding'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id}.guten-countdown .seconds-wrapper",
						'property'       => function ( $value ) {
							return $this->handle_dimension( $value, 'padding' );
						},
						'value'          => $this->attrs['secondsPadding'],
						'device_control' => true,
					)
				);
			}

			if ( isset( $this->attrs['secondsWidth'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id}.guten-countdown .seconds-wrapper",
						'property'       => function ( $value ) {
							return $this->handle_unit_point( $value, 'width' );
						},
						'value'          => $this->attrs['secondsWidth'],
						'device_control' => true,
					)
				);
			}

			if ( isset( $this->attrs['secondsHeight'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id}.guten-countdown .seconds-wrapper",
						'property'       => function ( $value ) {
							return "height: {$value}px;";
						},
						'value'          => $this->attrs['secondsHeight'],
						'device_control' => true,
					)
				);
			}

			if ( isset( $this->attrs['secondsVerticalAlign'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id}.guten-countdown .seconds-wrapper",
						'property'       => function ( $value ) {
							if ( 'top' === $value['position'] || 'bottom' === $value['position'] ) {
								return "justify-content: {$value['value']};";
							} else {
								return "align-items: {$value['value']};";
							}
						},
						'value'          => array(
							'position' => $label_position,
							'value'    => $this->attrs['secondsVerticalAlign'],
						),
						'device_control' => false,
					)
				);
			}

			if ( isset( $this->attrs['secondsHorizontalAlign'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id}.guten-countdown .seconds-wrapper",
						'property'       => function ( $value ) {
							if ( 'top' === $value['position'] || 'bottom' === $value['position'] ) {
								return "align-items: {$value['value']};";
							} else {
								return "justify-content: {$value['value']};";
							}
						},
						'value'          => array(
							'position' => $label_position,
							'value'    => $this->attrs['secondsHorizontalAlign'],
						),
						'device_control' => false,
					)
				);
			}
		}
	}
}
