<?php
/**
 * Gutenverse Feature List
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\style
 */

namespace Gutenverse\Style;

use Gutenverse\Framework\Style_Abstract;

/**
 * Class Feature List
 *
 * @package gutenverse\style
 */
class Feature_List extends Style_Abstract {
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
	protected $name = 'feature-list';

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
		$this->setting_style();
		$this->connector_style();
		$this->content_style();
		$this->icon_style();
	}

	/**
	 * Generate style in settings panel
	 */
	public function setting_style() {
		if ( isset( $this->attrs['iconWrapperShape'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-feature-list .feature-list-wrapper .icon-wrapper .icon",
					'property'       => function ( $value ) {
						switch ( $value ) {
							case 'rhombus':
								return 'transform: rotate(45deg);';
							case 'square':
							default:
								return 'transform: rotate(0deg);';
						}
					},
					'value'          => $this->attrs['iconWrapperShape'],
					'device_control' => false,
				)
			);
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-feature-list .feature-list-wrapper .icon-wrapper .icon > *",
					'property'       => function ( $value ) {
						switch ( $value ) {
							case 'rhombus':
								return 'transform: rotate(-45deg);';
							case 'square':
							default:
								return 'transform: rotate(0deg);';
						}
					},
					'value'          => $this->attrs['iconWrapperShape'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['listSpace'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-feature-list .feature-list-wrapper",
					'property'       => function ( $value ) {
						return "gap: {$value}px;";
					},
					'value'          => $this->attrs['listSpace'],
					'device_control' => true,
				)
			);
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-feature-list",
					'property'       => function ( $value ) {
						return "--space-between: {$value}px;";
					},
					'value'          => $this->attrs['listSpace'],
					'device_control' => true,
				)
			);
		}
	}

	/**
	 * Generate style in connector panel
	 *
	 * Fix Title Bottom Space not render on frontend.
	 *
	 * @since 3.0.3
	 */
	public function connector_style() {
		if ( isset( $this->attrs['connectorStyle'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-feature-list .feature-list-wrapper .feature-list-item .connector",
					'property'       => function ( $value ) {
						return "border-style: {$value};";
					},
					'value'          => $this->attrs['connectorStyle'],
					'device_control' => false,
				)
			);
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-feature-list .feature-list-wrapper .feature-list-item .connector-top, .{$this->element_id}.guten-feature-list .feature-list-wrapper .feature-list-item .connector-bottom",
					'property'       => function ( $value ) {
						return "border-style: {$value};";
					},
					'value'          => $this->attrs['connectorStyle'],
					'device_control' => false,
				)
			);
			if ( 'solid' !== $this->attrs['connectorStyle'] && 'double' !== $this->attrs['connectorStyle'] && isset( $this->attrs['contentPosition'] ) && 'center' === $this->attrs['contentPosition'] ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id}.guten-feature-list .feature-list-wrapper .feature-list-item .connector-top",
						'property'       => function () {
							return 'top: var(--connector-width);';
						},
						'value'          => $this->attrs['connectorStyle'],
						'device_control' => false,
					)
				);
			}
		}
		if ( isset( $this->attrs['connectorColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-feature-list .feature-list-wrapper .feature-list-item .connector",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'border-color' );
					},
					'value'          => $this->attrs['connectorColor'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['connectorColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-feature-list .feature-list-wrapper .feature-list-item .connector-top, .{$this->element_id}.guten-feature-list .feature-list-wrapper .feature-list-item .connector-bottom",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'border-color' );
					},
					'value'          => $this->attrs['connectorColor'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['connectorWidth'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-feature-list .feature-list-wrapper .feature-list-item .connector",
					'property'       => function ( $value ) {
						return "border-width: {$value}px;";
					},
					'value'          => $this->attrs['connectorWidth'],
					'device_control' => true,
				)
			);
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-feature-list .feature-list-wrapper .feature-list-item .connector-top, .{$this->element_id}.guten-feature-list .feature-list-wrapper .feature-list-item .connector-bottom",
					'property'       => function ( $value ) {
						return "border-width: {$value}px;";
					},
					'value'          => $this->attrs['connectorWidth'],
					'device_control' => true,
				)
			);
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-feature-list",
					'property'       => function ( $value ) {
						return "--connector-width : {$value}px;";
					},
					'value'          => $this->attrs['connectorWidth'],
					'device_control' => true,
				)
			);
		}
	}

	/**
	 * Generate style in content panel
	 */
	public function content_style() {
		if ( isset( $this->attrs['contentPosition'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-feature-list .feature-list-wrapper .feature-list-item",
					'property'       => function ( $value ) {
						return "align-items : {$value};";
					},
					'value'          => $this->attrs['contentPosition'],
					'device_control' => false,
				)
			);
			if ( 'start' === $this->attrs['contentPosition'] ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id}.guten-feature-list .feature-list-wrapper .feature-list-item .connector-top",
						'property'       => function () {
							return 'display : none !important;';
						},
						'value'          => $this->attrs['contentPosition'],
						'device_control' => false,
					)
				);
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id}.guten-feature-list .feature-list-wrapper .feature-list-item .connector-bottom",
						'property'       => function () {
							return 'top : calc(var(--icon-size)) !important;';
						},
						'value'          => $this->attrs['contentPosition'],
						'device_control' => false,
					)
				);
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id}.guten-feature-list .feature-list-wrapper .feature-list-item .connector-bottom",
						'property'       => function () {
							return 'height : calc(100% + var(--space-between) - var(--icon-size) ) !important;';
						},
						'value'          => $this->attrs['contentPosition'],
						'device_control' => false,
					)
				);
			}

			if ( 'end' === $this->attrs['contentPosition'] ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id}.guten-feature-list .feature-list-wrapper .feature-list-item .connector-bottom",
						'property'       => function () {
							return 'display : none !important;';
						},
						'value'          => $this->attrs['contentPosition'],
						'device_control' => false,
					)
				);
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id}.guten-feature-list .feature-list-wrapper .feature-list-item .connector-top",
						'property'       => function () {
							return 'top : calc(var(--space-between) * -1) !important;';
						},
						'value'          => $this->attrs['contentPosition'],
						'device_control' => false,
					)
				);
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id}.guten-feature-list .feature-list-wrapper .feature-list-item .connector-top",
						'property'       => function () {
							return 'height : calc(100% + var(--space-between) - var(--icon-size)) !important;';
						},
						'value'          => $this->attrs['contentPosition'],
						'device_control' => false,
					)
				);
			}
		}

		if ( isset( $this->attrs['contentSpace'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-feature-list .feature-list-wrapper .feature-list-item .feature-list-content .feature-list-title",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'margin-bottom' );
					},
					'value'          => $this->attrs['contentSpace'],
					'device_control' => true,
				)
			);
		}
		if ( isset( $this->attrs['titleTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector' => ".{$this->element_id}.guten-feature-list .feature-list-wrapper .feature-list-item .feature-list-content .feature-list-title",
					'value'    => $this->attrs['titleTypography'],
				)
			);
		}
		if ( isset( $this->attrs['descTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector' => ".{$this->element_id}.guten-feature-list .feature-list-wrapper .feature-list-item .feature-list-content .feature-list-desc",
					'value'    => $this->attrs['descTypography'],
				)
			);
		}
		if ( isset( $this->attrs['titleColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-feature-list .feature-list-wrapper .feature-list-item .feature-list-content .feature-list-title",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['titleColor'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['descColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-feature-list .feature-list-wrapper .feature-list-item .feature-list-content .feature-list-desc",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['descColor'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['titleColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-feature-list .feature-list-wrapper .feature-list-item:hover .feature-list-content .feature-list-title",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['titleColorHover'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['descColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-feature-list .feature-list-wrapper .feature-list-item:hover .feature-list-content .feature-list-desc",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['descColorHover'],
					'device_control' => false,
				)
			);
		}
	}

	/**
	 * Generate style in icon/image panel
	 */
	public function icon_style() {
		if ( isset( $this->attrs['iconWrapperHorizontalAlignment'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-feature-list .feature-list-wrapper .feature-list-item .icon-wrapper .icon",
					'property'       => function ( $value ) {
						return "justify-content : {$value};";
					},
					'value'          => $this->attrs['iconWrapperHorizontalAlignment'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['iconWrapperVerticalAlignment'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-feature-list .feature-list-wrapper .feature-list-item .icon-wrapper .icon",
					'property'       => function ( $value ) {
						return "align-items : {$value};";
					},
					'value'          => $this->attrs['iconWrapperVerticalAlignment'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['iconWrapperSize'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-feature-list .feature-list-wrapper .feature-list-item .icon-wrapper .icon",
					'property'       => function ( $value ) {
						return "width: {$value}px; height: {$value}px;";
					},
					'value'          => $this->attrs['iconWrapperSize'],
					'device_control' => true,
				)
			);
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-feature-list",
					'property'       => function ( $value ) {
						return "--icon-size : {$value}px;";
					},
					'value'          => $this->attrs['iconWrapperSize'],
					'device_control' => true,
				)
			);
		}
		if ( isset( $this->attrs['iconContentSpacing'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-feature-list .feature-list-wrapper .feature-list-item",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'gap' );
					},
					'value'          => $this->attrs['iconContentSpacing'],
					'device_control' => true,
				)
			);
		}
		if ( isset( $this->attrs['iconSize'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-feature-list .feature-list-wrapper .feature-list-item .icon i",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'font-size' );
					},
					'value'          => $this->attrs['iconSize'],
					'device_control' => true,
				)
			);
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-feature-list .feature-list-wrapper .feature-list-item .icon img",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'width' );
					},
					'value'          => $this->attrs['iconSize'],
					'device_control' => true,
				)
			);
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-feature-list .feature-list-wrapper .feature-list-item .icon svg",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'font-size' );
					},
					'value'          => $this->attrs['iconSize'],
					'device_control' => true,
				)
			);
		}
		if ( isset( $this->attrs['iconColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-feature-list .feature-list-wrapper .feature-list-item .icon i",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['iconColor'],
					'device_control' => false,
				)
			);

			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-feature-list .feature-list-wrapper .feature-list-item .icon svg",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'fill' );
					},
					'value'          => $this->attrs['iconColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['iconBackground'] ) ) {
			$this->handle_background( ".{$this->element_id}.guten-feature-list .feature-list-wrapper .feature-list-item .icon", $this->attrs['iconBackground'] );
		}

		if ( isset( $this->attrs['iconBorder'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-feature-list .feature-list-wrapper .feature-list-item .icon",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['iconBorder'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['iconColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-feature-list .feature-list-wrapper .feature-list-item:hover .icon i",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['iconColorHover'],
					'device_control' => false,
				)
			);

			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-feature-list .feature-list-wrapper .feature-list-item:hover .icon svg",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'fill' );
					},
					'value'          => $this->attrs['iconColorHover'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['iconBackgroundHover'] ) ) {
			$this->handle_background( ".{$this->element_id}.guten-feature-list .feature-list-wrapper .feature-list-item:hover .icon", $this->attrs['iconBackgroundHover'] );
		}

		if ( isset( $this->attrs['iconBorderHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-feature-list .feature-list-wrapper .feature-list-item:hover .icon",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['iconBorderHover'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['numberColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-feature-list .feature-list-wrapper .feature-list-item .icon .icon-number",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['numberColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['numberColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-feature-list .feature-list-wrapper .feature-list-item:hover .icon .icon-number",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['numberColorHover'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['numberTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector' => ".{$this->element_id}.guten-feature-list .feature-list-wrapper .feature-list-item .icon .icon-number",
					'value'    => $this->attrs['numberTypography'],
				)
			);
		}

		if ( isset( $this->attrs['featureList'] ) ) {
			$lists = $this->attrs['featureList'];

			foreach ( $lists as $key => $list ) {
				$index = $key + 1;
				if ( isset( $list['iconSize'] ) ) {
					$this->inject_style(
						array(
							'selector'       => ".{$this->element_id}.guten-feature-list .feature-list-wrapper .feature-list-item:nth-child({$index}) .icon i",
							'property'       => function ( $value ) {
								return $this->handle_unit_point( $value, 'font-size' );
							},
							'value'          => $list['iconSize'],
							'device_control' => true,
						)
					);
					$this->inject_style(
						array(
							'selector'       => ".{$this->element_id}.guten-feature-list .feature-list-wrapper .feature-list-item:nth-child({$index}) .icon img",
							'property'       => function ( $value ) {
								return $this->handle_unit_point( $value, 'width' );
							},
							'value'          => $list['iconSize'],
							'device_control' => true,
						)
					);
					$this->inject_style(
						array(
							'selector'       => ".{$this->element_id}.guten-feature-list .feature-list-wrapper .feature-list-item:nth-child({$index}) .icon svg",
							'property'       => function ( $value ) {
								return $this->handle_unit_point( $value, 'font-size' );
							},
							'value'          => $list['iconSize'],
							'device_control' => true,
						)
					);
				}
				if ( isset( $list['iconColor'] ) ) {
					$this->inject_style(
						array(
							'selector'       => ".{$this->element_id}.guten-feature-list .feature-list-wrapper .feature-list-item:nth-child({$index}) .icon i",
							'property'       => function ( $value ) {
								return $this->handle_color( $value, 'color' );
							},
							'value'          => $list['iconColor'],
							'device_control' => false,
						)
					);
					$this->inject_style(
						array(
							'selector'       => ".{$this->element_id}.guten-feature-list .feature-list-wrapper .feature-list-item:nth-child({$index}) .icon svg",
							'property'       => function ( $value ) {
								return $this->handle_color( $value, 'fill' );
							},
							'value'          => $list['iconColor'],
							'device_control' => false,
						)
					);
				}

				if ( isset( $list['iconBackground'] ) ) {
					$this->handle_background( ".{$this->element_id}.guten-feature-list .feature-list-wrapper .feature-list-item:nth-child({$index}) .icon", $list['iconBackground'] );
				}

				if ( isset( $list['iconBorder'] ) ) {
					$this->inject_style(
						array(
							'selector'       => ".{$this->element_id}.guten-feature-list .feature-list-wrapper .feature-list-item:nth-child({$index}) .icon",
							'property'       => function ( $value ) {
								return $this->handle_border_responsive( $value );
							},
							'value'          => $list['iconBorder'],
							'device_control' => true,
						)
					);
				}

				if ( isset( $list['iconColorHover'] ) ) {
					$this->inject_style(
						array(
							'selector'       => ".{$this->element_id}.guten-feature-list .feature-list-wrapper .feature-list-item:nth-child({$index}):hover .icon i",
							'property'       => function ( $value ) {
								return $this->handle_color( $value, 'color' );
							},
							'value'          => $list['iconColorHover'],
							'device_control' => false,
						)
					);
					$this->inject_style(
						array(
							'selector'       => ".{$this->element_id}.guten-feature-list .feature-list-wrapper .feature-list-item:nth-child({$index}):hover .icon svg",
							'property'       => function ( $value ) {
								return $this->handle_color( $value, 'fill' );
							},
							'value'          => $list['iconColorHover'],
							'device_control' => false,
						)
					);
				}

				if ( isset( $list['iconBackgroundHover'] ) ) {
					$this->handle_background( ".{$this->element_id}.guten-feature-list .feature-list-wrapper .feature-list-item:nth-child({$index}):hover .icon", $list['iconBackgroundHover'] );
				}

				if ( isset( $list['iconBorderHover'] ) ) {
					$this->inject_style(
						array(
							'selector'       => ".{$this->element_id}.guten-feature-list .feature-list-wrapper .feature-list-item:nth-child({$index}):hover .icon",
							'property'       => function ( $value ) {
								return $this->handle_border_responsive( $value );
							},
							'value'          => $list['iconBorderHover'],
							'device_control' => true,
						)
					);
				}

				if ( isset( $list['numberColor'] ) ) {
					$this->inject_style(
						array(
							'selector'       => ".{$this->element_id}.guten-feature-list .feature-list-wrapper .feature-list-item:nth-child({$index}) .icon .icon-number",
							'property'       => function ( $value ) {
								return $this->handle_color( $value, 'color' );
							},
							'value'          => $list['numberColor'],
							'device_control' => false,
						)
					);
				}

				if ( isset( $list['numberColorHover'] ) ) {
					$this->inject_style(
						array(
							'selector'       => ".{$this->element_id}.guten-feature-list .feature-list-wrapper .feature-list-item:nth-child({$index}):hover .icon .icon-number",
							'property'       => function ( $value ) {
								return $this->handle_color( $value, 'color' );
							},
							'value'          => $list['numberColorHover'],
							'device_control' => false,
						)
					);
				}

				if ( isset( $list['numberTypography'] ) ) {
					$this->inject_typography(
						array(
							'selector' => ".{$this->element_id}.guten-feature-list .feature-list-wrapper .feature-list-item:nth-child({$index}) .icon .icon-number",
							'value'    => $list['numberTypography'],
						)
					);
				}
			}
		}
	}
}
