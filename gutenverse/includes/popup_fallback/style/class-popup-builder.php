<?php
/**
 * Gutenverse Popup_Builder
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse
 */

namespace Gutenverse\Popup_Fallback\Style;

use Gutenverse\Framework\Style_Abstract;

/**
 * Class Popup_Builder
 *
 * @package Gutenverse
 */
class Popup_Builder extends Style_Abstract {
	/**
	 * Block Directory
	 *
	 * @var string
	 */
	protected $block_dir = GUTENVERSE_DIR . 'includes/popup_fallback/block/';

	/**
	 * Block Name
	 *
	 * @var array
	 */
	protected $name = 'popup-builder';

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
					'normal' => ".{$this->element_id} .guten-popup-content",
					'hover'  => ".{$this->element_id} .guten-popup-content:hover",
				),
				'mask'        => ".{$this->element_id} .guten-popup-content",
			)
		);
	}

	/**
	 * Generate style base on attribute.
	 */
	public function generate() {
		if ( isset( $this->attrs['width'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-popup .guten-popup-content",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'width' );
					},
					'value'          => $this->attrs['width'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['maxHeight'] ) && isset( $this->attrs['position'] ) && 'center' === $this->attrs['position'] ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-popup-center .guten-popup-content",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'max-height' );
					},
					'value'          => $this->attrs['maxHeight'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['backgroundColor'] ) ) {
			$this->handle_background( ".{$this->element_id} .guten-popup .guten-popup-content", $this->attrs['backgroundColor'] );
		}

		if ( isset( $this->attrs['containerPadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-popup .guten-popup-content",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['containerPadding'],
					'device_control' => true,
				)
			);

			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-popup-left .guten-popup-container, .{$this->element_id} .guten-popup-right .guten-popup-container",
					'property'       => function ( $value ) {
						if ( isset( $value['dimension'] ) && isset( $value['unit'] ) ) {
							$top       = 10;
							$bottom    = 10;
							$unit      = $value['unit'];
							$dimension = $value['dimension'];

							if ( isset( $dimension['top'] ) ) {
								$top = floatval( $dimension['top'] );
							}

							if ( isset( $dimension['bottom'] ) ) {
								$bottom = floatval( $dimension['bottom'] );
							}

							$vertical_padding = $top + $bottom;
							return "min-height: calc(100vh - {$vertical_padding}{$unit})";
						}
					},
					'value'          => $this->attrs['containerPadding'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['containerBorder'] ) ) {
			$this->handle_border( 'containerBorder', ".{$this->element_id} .guten-popup .guten-popup-content" );
		}

		if ( isset( $this->attrs['containerBorderResponsive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-popup .guten-popup-content",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['containerBorderResponsive'],
					'device_control' => true,
					'skip_device'    => array(
						'Desktop',
					),
				)
			);
		}

		if ( isset( $this->attrs['containerBoxShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-popup .guten-popup-content",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['containerBoxShadow'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['overlayColor'] ) ) {
			$this->handle_background( ".{$this->element_id} .guten-popup-overlay", $this->attrs['overlayColor'] );
		}

		if ( isset( $this->attrs['closeButtonColor'] ) && isset( $this->attrs['showCloseButton'] ) && $this->attrs['showCloseButton'] ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-popup .guten-popup-close i",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['closeButtonColor'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['closeButtonColorHover'] ) && isset( $this->attrs['showCloseButton'] ) && $this->attrs['showCloseButton'] ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-popup .guten-popup-close:hover i",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['closeButtonColorHover'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['closeButtonBgColor'] ) && isset( $this->attrs['showCloseButton'] ) && $this->attrs['showCloseButton'] ) {
			$this->handle_background( ".{$this->element_id} .guten-popup-close", $this->attrs['closeButtonBgColor'] );
		}

		if ( isset( $this->attrs['closeButtonBgColorHover'] ) && isset( $this->attrs['showCloseButton'] ) && $this->attrs['showCloseButton'] ) {
			$this->handle_background( ".{$this->element_id} .guten-popup-close:hover", $this->attrs['closeButtonBgColorHover'] );
		}

		if ( isset( $this->attrs['closeButtonSize'] ) && isset( $this->attrs['showCloseButton'] ) && $this->attrs['showCloseButton'] ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-popup-close i",
					'property'       => function ( $value ) {
						return "font-size: {$value}px;";
					},
					'value'          => $this->attrs['closeButtonSize'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['closePositioningLeft'] ) && isset( $this->attrs['showCloseButton'] ) && $this->attrs['showCloseButton'] ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-popup-close",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'left' );
					},
					'value'          => $this->attrs['closePositioningLeft'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['closePositioningRight'] ) && isset( $this->attrs['showCloseButton'] ) && $this->attrs['showCloseButton'] ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-popup-close",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'right' );
					},
					'value'          => $this->attrs['closePositioningRight'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['closePositioningTop'] ) && isset( $this->attrs['showCloseButton'] ) && $this->attrs['showCloseButton'] ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-popup-close",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'top' );
					},
					'value'          => $this->attrs['closePositioningTop'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['closePositioningBottom'] ) && isset( $this->attrs['showCloseButton'] ) && $this->attrs['showCloseButton'] ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-popup-close",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'bottom' );
					},
					'value'          => $this->attrs['closePositioningBottom'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['closePadding'] ) && isset( $this->attrs['showCloseButton'] ) && $this->attrs['showCloseButton'] ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-popup .guten-popup-close",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['closePadding'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['closeBorder'] ) ) {
			$this->handle_border( 'closeBorder', ".{$this->element_id} .guten-popup .guten-popup-close" );
		}

		if ( isset( $this->attrs['closeBorderResponsive'] ) && isset( $this->attrs['showCloseButton'] ) && $this->attrs['showCloseButton'] ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-popup .guten-popup-close",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['closeBorderResponsive'],
					'device_control' => true,
					'skip_device'    => array(
						'Desktop',
					),
				)
			);
		}

		if ( isset( $this->attrs['closeBorderHover'] ) ) {
			$this->handle_border( 'closeBorderHover', ".{$this->element_id} .guten-popup .guten-popup-close:hover" );
		}

		if ( isset( $this->attrs['closeBorderHoverResponsive'] ) && isset( $this->attrs['showCloseButton'] ) && $this->attrs['showCloseButton'] ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-popup .guten-popup-close:hover",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['closeBorderHoverResponsive'],
					'device_control' => true,
					'skip_device'    => array(
						'Desktop',
					),
				)
			);
		}

		if ( isset( $this->attrs['closeBoxShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-popup .guten-popup-close",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['closeBoxShadow'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['closeBoxShadowHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-popup .guten-popup-close:hover",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['closeBoxShadowHover'],
					'device_control' => false,
				)
			);
		}
	}
}
