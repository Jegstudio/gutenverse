<?php
/**
 * Gutenverse Social Icons
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\style
 */

namespace Gutenverse\Style;

use Gutenverse\Framework\Style_Abstract;

/**
 * Class Social Icons
 *
 * @package gutenverse\style
 */
class Social_Icons extends Style_Abstract {
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
	protected $name = 'social-icons';


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
				'positioning' => ".{$this->element_id}.guten-element, .{$this->element_id}.guten-element.horizontal > div",
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
		if ( isset( $this->attrs['alignment'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}",
					'property'       => function ( $value ) {
						return "justify-content: {$value};";
					},
					'value'          => $this->attrs['alignment'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['alignment'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-social-icon",
					'property'       => function ( $value ) {
						return "text-align: {$this->handle_align( $value )};";
					},
					'value'          => $this->attrs['alignment'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['iconSize'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-social-icon i",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'font-size' );
					},
					'value'          => $this->attrs['iconSize'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['typography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".{$this->element_id} .guten-social-icon span",
					'property'       => function ( $value ) {},
					'value'          => $this->attrs['typography'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['iconColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.fill .guten-social-icon a i, .{$this->element_id}.border .guten-social-icon a i, .{$this->element_id}.custom .guten-social-icon a i",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['iconColor'],
					'device_control' => false,
				)
			);

			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.border .guten-social-icon a",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'border-color' );
					},
					'value'          => $this->attrs['iconColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['shape'] ) ) {
			if ( isset( $this->attrs['textColor'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} .guten-social-icon a span",
						'property'       => function ( $value ) {
							return $this->handle_color( $value, 'color' );
						},
						'value'          => $this->attrs['textColor'],
						'device_control' => false,
					)
				);
			}
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

		if ( isset( $this->attrs['itemPadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-social-icon a",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['itemPadding'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['hoverIconColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.fill .guten-social-icon a:hover i, .{$this->element_id}.border .guten-social-icon a:hover i, .{$this->element_id}.custom .guten-social-icon a:hover i",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['hoverIconColor'],
					'device_control' => false,
				)
			);

			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.border .guten-social-icon a:hover",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'border-color' );
					},
					'value'          => $this->attrs['hoverIconColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['bgColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.fill .guten-social-icon a, .{$this->element_id}.border .guten-social-icon a, .{$this->element_id}.custom .guten-social-icon a",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['bgColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['hoverBgColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.fill .guten-social-icon a:hover, .{$this->element_id}.border .guten-social-icon a:hover, .{$this->element_id}.custom .guten-social-icon a:hover",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['hoverBgColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['bgGradient'] ) ) {
			$this->handle_background(
				".{$this->element_id}.fill .guten-social-icon a, .{$this->element_id}.border .guten-social-icon a, .{$this->element_id}.custom .guten-social-icon a",
				$this->attrs['bgGradient']
			);
		}

		if ( isset( $this->attrs['hoverBgGradient'] ) ) {
			$this->handle_background(
				".{$this->element_id}.fill .guten-social-icon a:hover, .{$this->element_id}.border .guten-social-icon a:hover, .{$this->element_id}.custom .guten-social-icon a:hover",
				$this->attrs['hoverBgGradient']
			);
		}

		if ( isset( $this->attrs['hoverTextColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-social-icon a:hover span",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['hoverTextColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['iconBorder'] ) ) {
			$this->handle_border( 'iconBorder', ".{$this->element_id} .guten-social-icon a" );
		}

		if ( isset( $this->attrs['iconBorderResponsive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-social-icon a",
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
					'selector'       => ".{$this->element_id} .guten-social-icon a",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['iconBoxShadow'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['iconBorderHover'] ) ) {
			$this->handle_border( 'iconBorderHover', ".{$this->element_id} .guten-social-icon:hover a" );
		}

		if ( isset( $this->attrs['iconBorderHoverResponsive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-social-icon:hover a",
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

		if ( isset( $this->attrs['iconBoxShadowHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-social-icon:hover a",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['iconBoxShadowHover'],
					'device_control' => false,
				)
			);
		}
	}
}
