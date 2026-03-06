<?php
/**
 * Gutenverse Accordions
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\style
 */

namespace Gutenverse\Style;

use Gutenverse\Framework\Style_Abstract;

/**
 * Class Accordions
 *
 * @package gutenverse\style
 */
class Accordions extends Style_Abstract {
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
	protected $name = 'accordions';

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
				'advance'     => ".{$this->element_id}",
				'mask'        => null,
			)
		);
	}

	/**
	 * Generate style base on attribute.
	 */
	public function generate() {
		if ( isset( $this->attrs['accordionBorder'] ) ) {
			$this->handle_border( 'accordionBorder', ".{$this->element_id} .accordion-item" );
		}

		if ( isset( $this->attrs['accordionBorderResponsive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .accordion-item",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['accordionBorderResponsive'],
					'device_control' => true,
					'skip_device'    => array(
						'Desktop',
					),
				)
			);
		}

		if ( isset( $this->attrs['accordionBorderActive'] ) ) {
			$this->handle_border( 'accordionBorderActive', ".{$this->element_id} .accordion-item.active" );
		}

		if ( isset( $this->attrs['accordionBorderActiveResponsive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .accordion-item.active",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['accordionBorderActiveResponsive'],
					'device_control' => true,
					'skip_device'    => array(
						'Desktop',
					),
				)
			);
		}

		if ( isset( $this->attrs['accordionBoxShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .accordion-item",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['accordionBoxShadow'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['accordionBoxShadowActive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .accordion-item.active",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['accordionBoxShadowActive'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['accordionMargin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .accordion-item",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['accordionMargin'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['iconColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .accordion-item .accordion-icon i",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['iconColor'],
					'device_control' => false,
				)
			);

			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .accordion-item .accordion-icon svg",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'fill' );
					},
					'value'          => $this->attrs['iconColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['iconActiveColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .accordion-item.active .accordion-icon i",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['iconActiveColor'],
					'device_control' => false,
				)
			);

			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .accordion-item.active .accordion-icon svg",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'fill' );
					},
					'value'          => $this->attrs['iconActiveColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['iconPosition'] ) && isset( $this->attrs['iconSpacing'] ) ) {
			if ( 'left' === $this->attrs['iconPosition'] ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} .accordion-item .accordion-icon",
						'property'       => function ( $value ) {
							return "margin-right: {$value}px;";
						},
						'value'          => $this->attrs['iconSpacing'],
						'device_control' => true,
					)
				);
			}

			if ( 'right' === $this->attrs['iconPosition'] ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} .accordion-item .accordion-icon",
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
					'selector'       => ".{$this->element_id} .accordion-item .accordion-icon",
					'property'       => function ( $value ) {
						return "font-size: {$value}px;";
					},
					'value'          => $this->attrs['iconSize'],
					'device_control' => true,
				)
			);

			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .accordion-item .accordion-icon svg",
					'property'       => function ( $value ) {
						return "font-size: {$value}px;";
					},
					'value'          => $this->attrs['iconSize'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['titleBackgroundColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .accordion-item .accordion-heading",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['titleBackgroundColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['titleBackground'] ) ) {
			$this->handle_background( ".{$this->element_id} .accordion-item .accordion-heading", $this->attrs['titleBackground'] );
		}

		if ( isset( $this->attrs['titleTextColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .accordion-item .accordion-text",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['titleTextColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['titleBackgroundActiveColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .accordion-item.active .accordion-heading",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['titleBackgroundActiveColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['titleActiveBackground'] ) ) {
			$this->handle_background( ".{$this->element_id} .accordion-item.active .accordion-heading", $this->attrs['titleActiveBackground'] );
		}

		if ( isset( $this->attrs['titleActiveColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .accordion-item.active .accordion-text",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['titleActiveColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['titleTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".{$this->element_id} .accordion-item .accordion-text",
					'property'       => function ( $value ) {},
					'value'          => $this->attrs['titleTypography'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['titlePadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .accordion-item .accordion-heading",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['titlePadding'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['titleBorder'] ) ) {
			$this->handle_border( 'titleBorder', ".{$this->element_id} .accordion-item .accordion-heading" );
		}

		if ( isset( $this->attrs['titleBorderResponsive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .accordion-item .accordion-heading",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['titleBorderResponsive'],
					'device_control' => true,
					'skip_device'    => array(
						'Desktop',
					),
				)
			);
		}

		if ( isset( $this->attrs['titleBorderActive'] ) ) {
			$this->handle_border( 'titleBorderActive', ".{$this->element_id} .accordion-item.active .accordion-heading" );
		}

		if ( isset( $this->attrs['titleBorderActiveResponsive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .accordion-item.active .accordion-heading",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['titleBorderActiveResponsive'],
					'device_control' => true,
					'skip_device'    => array(
						'Desktop',
					),
				)
			);
		}

		if ( isset( $this->attrs['contentBackgroundColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .accordion-item .accordion-content",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['contentBackgroundColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['contentBackgroundColorClosed'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .accordion-item .accordion-body.closed .accordion-content",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['contentBackgroundColorClosed'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['contentBackgroundColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .accordion-item .accordion-body .accordion-content:hover",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['contentBackgroundColorHover'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['contentBackgroundGradient'] ) ) {
			$this->handle_background( ".{$this->element_id}.guten-accordions .accordion-item .accordion-content", $this->attrs['contentBackgroundGradient'] );
		}

		if ( isset( $this->attrs['contentBackgroundGradientClosed'] ) ) {
			$this->handle_background( ".{$this->element_id}.guten-accordions .accordion-item .accordion-body.closed .accordion-content", $this->attrs['contentBackgroundGradientClosed'] );
		}

		if ( isset( $this->attrs['contentBackgroundGradientHover'] ) ) {
			$this->handle_background( ".{$this->element_id}.guten-accordions .accordion-item .accordion-body .accordion-content:hover", $this->attrs['contentBackgroundGradientHover'] );
		}

		if ( isset( $this->attrs['contentTextColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .accordion-item .accordion-content",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['contentTextColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['contentTextColorClosed'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .accordion-item .accordion-body.closed .accordion-content",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['contentTextColorClosed'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['contentTextColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .accordion-item .accordion-body .accordion-content:hover",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['contentTextColorHover'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['contentTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".{$this->element_id} .accordion-item .accordion-content",
					'property'       => function ( $value ) {},
					'value'          => $this->attrs['contentTypography'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['contentPadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .accordion-item .accordion-content",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['contentPadding'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['contentBorder'] ) ) {
			$this->handle_border( 'contentBorder', ".{$this->element_id} .accordion-item .accordion-content" );
		}

		if ( isset( $this->attrs['contentBorderResponsive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .accordion-item .accordion-content",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['contentBorderResponsive'],
					'device_control' => true,
					'skip_device'    => array(
						'Desktop',
					),
				)
			);
		}

		if ( isset( $this->attrs['iconMargin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .accordion-item .accordion-icon",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['iconMargin'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['iconPadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .accordion-item .accordion-icon",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['iconPadding'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['iconActiveSize'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .accordion-item.active .accordion-icon",
					'property'       => function ( $value ) {
						return "font-size: {$value}px;";
					},
					'value'          => $this->attrs['iconActiveSize'],
					'device_control' => true,
				)
			);

			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .accordion-item.active .accordion-icon svg",
					'property'       => function ( $value ) {
						return "font-size: {$value}px;";
					},
					'value'          => $this->attrs['iconActiveSize'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['iconBackground'] ) ) {
			$this->handle_background( ".{$this->element_id} .accordion-item .accordion-icon", $this->attrs['iconBackground'] );
		}

		if ( isset( $this->attrs['iconBorder'] ) ) {
			$this->handle_border( 'iconBorder', ".{$this->element_id} .accordion-item .accordion-icon" );
		}

		if ( isset( $this->attrs['iconBorderResponsive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .accordion-item .accordion-icon",
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

		if ( isset( $this->attrs['iconBoxShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .accordion-item .accordion-icon",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['iconBoxShadow'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['iconActiveBackground'] ) ) {
			$this->handle_background( ".{$this->element_id} .accordion-item.active .accordion-icon", $this->attrs['iconActiveBackground'] );
		}

		if ( isset( $this->attrs['iconActiveBackground'] ) ) {
			$this->handle_border( 'iconActiveBackground', ".{$this->element_id} .accordion-item.active .accordion-icon" );
		}

		if ( isset( $this->attrs['iconActiveBackgroundResponsive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .accordion-item.active .accordion-icon",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['iconActiveBackgroundResponsive'],
					'device_control' => true,
					'skip_device'    => array(
						'Desktop',
					),
				)
			);
		}

		if ( isset( $this->attrs['iconActiveBorder'] ) ) {
			$this->handle_border( 'iconActiveBorder', ".{$this->element_id} .accordion-item.active .accordion-icon" );
		}

		if ( isset( $this->attrs['iconActiveBorderResponsive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .accordion-item.active .accordion-icon",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['iconActiveBorderResponsive'],
					'device_control' => true,
					'skip_device'    => array(
						'Desktop',
					),
				)
			);
		}

		if ( isset( $this->attrs['iconActiveBoxShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .accordion-item.active .accordion-icon",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['iconActiveBoxShadow'],
					'device_control' => false,
				)
			);
		}
	}
}
