<?php
/**
 * Gutenverse Button
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\style
 */

namespace Gutenverse\Style;

use Gutenverse\Framework\Style_Abstract;

/**
 * Class Button
 *
 * @package gutenverse\style
 */
class Button extends Style_Abstract {
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
	protected $name = 'button';

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
				'animation'   => ".{$this->element_id}.guten-button-wrapper .guten-button",
				'advance'     => null,
				'transform'   => array(
					'normal' => ".{$this->element_id}.guten-button-wrapper .guten-button",
					'hover'  => ".{$this->element_id}.guten-button-wrapper .guten-button:hover",
				),
				'mask'        => ".{$this->element_id} .guten-button",
			)
		);
	}

	/**
	 * Generate style base on attribute.
	 */
	public function generate() {
		if ( isset( $this->attrs['alignButton'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-button-wrapper",
					'property'       => function ( $value ) {
						return "justify-content: {$value};";
					},
					'value'          => $this->attrs['alignButton'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['buttonWidth'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-button-wrapper .guten-button",
					'property'       => function ( $value ) {
						return "width: {$value}%;";
					},
					'value'          => $this->attrs['buttonWidth'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['buttonHeight'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-button-wrapper .guten-button",
					'property'       => function ( $value ) {
						return "height: {$value}px;";
					},
					'value'          => $this->attrs['buttonHeight'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['iconPosition'] ) && isset( $this->attrs['iconSpacing'] ) ) {
			if ( 'before' === $this->attrs['iconPosition'] ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id}.guten-button-wrapper .guten-button i, .{$this->element_id}.guten-button-wrapper .guten-button svg",
						'property'       => function ( $value ) {
							return "margin-right: {$value}px;";
						},
						'value'          => $this->attrs['iconSpacing'],
						'device_control' => true,
					)
				);
			}

			if ( 'after' === $this->attrs['iconPosition'] ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id}.guten-button-wrapper .guten-button i, .{$this->element_id}.guten-button-wrapper .guten-button svg",
						'property'       => function ( $value ) {
							return "margin-left: {$value}px;";
						},
						'value'          => $this->attrs['iconSpacing'],
						'device_control' => true,
					)
				);
			}
		}

		if ( isset( $this->attrs['iconSize'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-button-wrapper .guten-button i",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'font-size' );
					},
					'value'          => $this->attrs['iconSize'],
					'device_control' => true,
				)
			);
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-button-wrapper .guten-button svg",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'font-size' );
					},
					'value'          => $this->attrs['iconSize'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['paddingButton'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-button-wrapper .guten-button",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['paddingButton'],
					'device_control' => true,
				)
			);
		}

		if ( gutenverse_truly_empty( $this->attrs['content'] ) && ! isset( $this->attrs['typography'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-button-wrapper .guten-button span",
					'property'       => function () {
						return 'height: 15px;';
					},
					'value'          => '',
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['color'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-button-wrapper .guten-button span",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['color'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['iconColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-button-wrapper .guten-button i",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['iconColor'],
					'device_control' => false,
				)
			);
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-button-wrapper .guten-button svg",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'fill' );
					},
					'value'          => $this->attrs['iconColor'],
					'device_control' => false,
				)
			);
		}

		if ( $this->attrs['hoverWithParent'] && isset( $this->attrs['parentSelector'] ) ) {
			if ( isset( $this->attrs['hoverTextColor'] ) ) {
				$this->inject_style(
					array(
						'selector'       => $this->attrs['parentSelector'] . " .{$this->element_id}.guten-button-wrapper .guten-button span",
						'property'       => function ( $value ) {
							return $this->handle_color( $value, 'color' );
						},
						'value'          => $this->attrs['hoverTextColor'],
						'device_control' => false,
					)
				);
			}

			if ( isset( $this->attrs['hoverIconColor'] ) ) {
				$this->inject_style(
					array(
						'selector'       => $this->attrs['parentSelector'] . " .{$this->element_id}.guten-button-wrapper .guten-button i",
						'property'       => function ( $value ) {
							return $this->handle_color( $value, 'color' );
						},
						'value'          => $this->attrs['hoverIconColor'],
						'device_control' => false,
					)
				);
				$this->inject_style(
					array(
						'selector'       => $this->attrs['parentSelector'] . " .{$this->element_id}.guten-button-wrapper .guten-button svg",
						'property'       => function ( $value ) {
							return $this->handle_color( $value, 'fill' );
						},
						'value'          => $this->attrs['hoverIconColor'],
						'device_control' => false,
					)
				);
			}
			if ( isset( $this->attrs['buttonBackgroundHover'] ) ) {
				$this->handle_background( $this->attrs['parentSelector'] . " .{$this->element_id}.guten-button-wrapper .guten-button", $this->attrs['buttonBackgroundHover'] );
			}
			if ( isset( $this->attrs['buttonBorderHover'] ) ) {
				$this->attrs['newButtonBorderHover'] = $this->attrs['buttonBorderHover'];
				if ( isset( $this->attrs['buttonBorder']['all'] ) ) {
					$border_hover = $this->attrs['buttonBorderHover']['all'];
					$border       = $this->attrs['buttonBorder']['all'];

					$this->attrs['newButtonBorderHover']['all'] = array(
						'type'  => isset( $border_hover['type'] ) ? $border_hover['type'] : $border['type'],
						'width' => isset( $border_hover['width'] ) ? $border_hover['width'] : $border['width'],
						'color' => isset( $border_hover['color'] ) ? $border_hover['color'] : $border['color'],
					);
				}
				$this->handle_border( 'newButtonBorderHover', $this->attrs['parentSelector'] . " .{$this->element_id}.guten-button-wrapper .guten-button" );
			}

			if ( isset( $this->attrs['buttonBorderHoverResponsive'] ) ) {

				$this->attrs['newbuttonBorderHoverResponsive'] = $this->attrs['buttonBorderHoverResponsive'];
				if ( isset( $this->attrs['buttonBorderResponsive']['all'] ) ) {
					$border_hover = $this->attrs['buttonBorderHoverResponsive']['all'];
					$border       = $this->attrs['buttonBorderResponsive']['all'];

					$this->attrs['newbuttonBorderHoverResponsive']['all'] = array(
						'type'  => isset( $border_hover['type'] ) ? $border_hover['type'] : $border['type'],
						'width' => isset( $border_hover['width'] ) ? $border_hover['width'] : $border['width'],
						'color' => isset( $border_hover['color'] ) ? $border_hover['color'] : $border['color'],
					);
				}

				$this->inject_style(
					array(
						'selector'       => $this->attrs['parentSelector'] . " .{$this->element_id}.guten-button-wrapper .guten-button",
						'property'       => function ( $value ) {
							return $this->handle_border_responsive( $value );
						},
						'value'          => $this->attrs['newbuttonBorderHoverResponsive'],
						'device_control' => true,
						'skip_device'    => array(
							'Desktop',
						),
					)
				);
			}

			if ( isset( $this->attrs['buttonBoxShadowHover'] ) ) {
				$this->inject_style(
					array(
						'selector'       => $this->attrs['parentSelector'] . " .{$this->element_id}.guten-button-wrapper .guten-button",
						'property'       => function ( $value ) {
							return $this->handle_box_shadow( $value );
						},
						'value'          => $this->attrs['buttonBoxShadowHover'],
						'device_control' => false,
					)
				);
			}
		} else {
			if ( isset( $this->attrs['hoverTextColor'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id}.guten-button-wrapper .guten-button:hover span",
						'property'       => function ( $value ) {
							return $this->handle_color( $value, 'color' );
						},
						'value'          => $this->attrs['hoverTextColor'],
						'device_control' => false,
					)
				);
			}

			if ( isset( $this->attrs['hoverIconColor'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id}.guten-button-wrapper .guten-button:hover i",
						'property'       => function ( $value ) {
							return $this->handle_color( $value, 'color' );
						},
						'value'          => $this->attrs['hoverIconColor'],
						'device_control' => false,
					)
				);
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id}.guten-button-wrapper .guten-button:hover svg",
						'property'       => function ( $value ) {
							return $this->handle_color( $value, 'fill' );
						},
						'value'          => $this->attrs['hoverIconColor'],
						'device_control' => false,
					)
				);
			}
			if ( isset( $this->attrs['buttonBackgroundHover'] ) ) {
				$this->handle_background( ".{$this->element_id}.guten-button-wrapper .guten-button:hover", $this->attrs['buttonBackgroundHover'] );
			}
			if ( isset( $this->attrs['buttonBorderHover'] ) ) {

				$this->attrs['newButtonBorderHover'] = $this->attrs['buttonBorderHover'];
				if ( isset( $this->attrs['buttonBorder']['all'] ) ) {

					$border_hover = isset( $this->attrs['buttonBorderHover']['all'] ) ? $this->attrs['buttonBorderHover']['all'] : null;
					$border       = $this->attrs['buttonBorder']['all'];

					$this->attrs['newButtonBorderHover']['all'] = array(
						'type'  => isset( $border_hover['type'] ) ? $border_hover['type'] : ( isset( $border['type'] ) ? $border['type'] : '' ),
						'width' => isset( $border_hover['width'] ) ? $border_hover['width'] : ( isset( $border['width'] ) ? $border['width'] : '' ),
						'color' => isset( $border_hover['color'] ) ? $border_hover['color'] : ( isset( $border['color'] ) ? $border['color'] : '' ),
					);
				}

				$this->handle_border( 'newButtonBorderHover', ".{$this->element_id}.guten-button-wrapper .guten-button:hover" );
			}

			if ( isset( $this->attrs['buttonBorderHoverResponsive'] ) ) {

				$this->attrs['newbuttonBorderHoverResponsive'] = $this->attrs['buttonBorderHoverResponsive'];
				if ( isset( $this->attrs['buttonBorderResponsive']['all'] ) ) {
					$border_hover = $this->attrs['buttonBorderHoverResponsive']['all'];
					$border       = $this->attrs['buttonBorderResponsive']['all'];

					$this->attrs['newbuttonBorderHoverResponsive']['all'] = array(
						'type'  => isset( $border_hover['type'] ) ? $border_hover['type'] : $border['type'],
						'width' => isset( $border_hover['width'] ) ? $border_hover['width'] : $border['width'],
						'color' => isset( $border_hover['color'] ) ? $border_hover['color'] : $border['color'],
					);
				}

				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id}.guten-button-wrapper .guten-button:hover",
						'property'       => function ( $value ) {
							return $this->handle_border_responsive( $value );
						},
						'value'          => $this->attrs['newbuttonBorderHoverResponsive'],
						'device_control' => true,
						'skip_device'    => array(
							'Desktop',
						),
					)
				);
			}

			if ( isset( $this->attrs['buttonBoxShadowHover'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id}.guten-button-wrapper .guten-button:hover",
						'property'       => function ( $value ) {
							return $this->handle_box_shadow( $value );
						},
						'value'          => $this->attrs['buttonBoxShadowHover'],
						'device_control' => false,
					)
				);
			}
		}

		if ( isset( $this->attrs['typography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".{$this->element_id}.guten-button-wrapper .guten-button span",
					'property'       => function ( $value ) {},
					'value'          => $this->attrs['typography'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['buttonBackground'] ) ) {
			$this->handle_background( ".{$this->element_id}.guten-button-wrapper .guten-button", $this->attrs['buttonBackground'] );
		}

		if ( isset( $this->attrs['buttonBorder'] ) ) {
			$this->handle_border( 'buttonBorder', ".{$this->element_id}.guten-button-wrapper .guten-button" );
		}

		if ( isset( $this->attrs['buttonBorderResponsive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-button-wrapper .guten-button",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['buttonBorderResponsive'],
					'device_control' => true,
					'skip_device'    => array(
						'Desktop',
					),
				)
			);
		}

		if ( isset( $this->attrs['buttonBoxShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-button-wrapper .guten-button",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['buttonBoxShadow'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['iconLineHeight'] ) ) {
			if ( $this->attrs['iconLineHeight'] ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id}.guten-button-wrapper .guten-button i",
						'property'       => function ( $value ) {
							return 'line-height: normal';
						},
						'value'          => $this->attrs['iconLineHeight'],
						'device_control' => false,
					)
				);
			}
		}
	}
}
