<?php
/**
 * Gutenverse Social Icon
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\style
 */

namespace Gutenverse\Style;

use Gutenverse\Framework\Style_Abstract;

/**
 * Class Social Icon
 *
 * @package gutenverse\style
 */
class Social_Icon extends Style_Abstract {
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
	protected $name = 'social-icon';

	/**
	 * Constructor
	 *
	 * @param array $attrs Attribute.
	 */
	public function __construct( $attrs ) {
		parent::__construct( $attrs );

		$this->set_feature(
			array(
				'border'    => array(
					'normal' => "#{$this->element_id}",
					'hover'  => "#{$this->element_id}:hover",
				),
				'animation' => null,
				'mask'      => null,
			)
		);
	}

	/**
	 * Generate style base on attribute.
	 */
	public function generate() {
		if ( isset( $this->attrs['iconSize'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".guten-social-icon #{$this->element_id} i",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'font-size' );
					},
					'value'          => $this->attrs['iconSize'],
					'device_control' => true,
				)
			);

			$this->inject_style(
				array(
					'selector'       => ".guten-social-icon #{$this->element_id} svg",
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
					'selector'       => ".guten-social-icon #{$this->element_id} span",
					'property'       => function ( $value ) {},
					'value'          => $this->attrs['typography'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['iconColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".guten-social-icons.fill .guten-social-icon #{$this->element_id} i, .guten-social-icons.border .guten-social-icon #{$this->element_id} i, .guten-social-icons.custom .guten-social-icon #{$this->element_id} i",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['iconColor'],
					'device_control' => false,
				)
			);

			$this->inject_style(
				array(
					'selector'       => ".guten-social-icons.fill .guten-social-icon #{$this->element_id} svg, .guten-social-icons.border .guten-social-icon #{$this->element_id} svg, .guten-social-icons.custom .guten-social-icon #{$this->element_id} svg",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'fill' );
					},
					'value'          => $this->attrs['iconColor'],
					'device_control' => false,
				)
			);

			$this->inject_style(
				array(
					'selector'       => ".guten-social-icons.border .guten-social-icon #{$this->element_id}",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'border-color' );
					},
					'value'          => $this->attrs['iconColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['textColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".guten-social-icons .guten-social-icon #{$this->element_id} span",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['textColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['hoverIconColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".guten-social-icons.fill .guten-social-icon #{$this->element_id}:hover i, .guten-social-icons.border .guten-social-icon #{$this->element_id}:hover i, .guten-social-icons.custom .guten-social-icon #{$this->element_id}:hover i",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['hoverIconColor'],
					'device_control' => false,
				)
			);

			$this->inject_style(
				array(
					'selector'       => ".guten-social-icons.fill .guten-social-icon #{$this->element_id}:hover svg, .guten-social-icons.border .guten-social-icon #{$this->element_id}:hover svg, .guten-social-icons.custom .guten-social-icon #{$this->element_id}:hover svg",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'fill' );
					},
					'value'          => $this->attrs['hoverIconColor'],
					'device_control' => false,
				)
			);

			$this->inject_style(
				array(
					'selector'       => ".guten-social-icons.border .guten-social-icon #{$this->element_id}:hover",
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
					'selector'       => ".guten-social-icons.fill .guten-social-icon #{$this->element_id}, .guten-social-icons.border .guten-social-icon #{$this->element_id}, .guten-social-icons.custom .guten-social-icon #{$this->element_id}",
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
					'selector'       => ".guten-social-icons.fill .guten-social-icon #{$this->element_id}:hover, .guten-social-icons.border .guten-social-icon #{$this->element_id}:hover, .guten-social-icons.custom .guten-social-icon #{$this->element_id}:hover",
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
				".guten-social-icons.fill .guten-social-icon #{$this->element_id}, .guten-social-icons.border .guten-social-icon #{$this->element_id}, .guten-social-icons.custom .guten-social-icon #{$this->element_id}",
				$this->attrs['bgGradient']
			);
		}

		if ( isset( $this->attrs['hoverBgGradient'] ) ) {
			$this->handle_background(
				".guten-social-icons.fill .guten-social-icon #{$this->element_id}:hover, .guten-social-icons.border .guten-social-icon #{$this->element_id}:hover, .guten-social-icons.custom .guten-social-icon #{$this->element_id}:hover",
				$this->attrs['hoverBgGradient']
			);
		}

		if ( isset( $this->attrs['hoverTextColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".guten-social-icons .guten-social-icon #{$this->element_id}:hover span",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['hoverTextColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['borderRadius'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".guten-social-icons .guten-social-icon #{$this->element_id}",
					'property'       => function ( $value ) {
						return $this->handle_border_radius( $value );
					},
					'value'          => $this->attrs['borderRadius'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['forceHideText'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".guten-social-icon #{$this->element_id} span",
					'property'       => function ( $value ) {
						if ( $value ) {
							return 'display: none;';
						}
					},
					'value'          => $this->attrs['forceHideText'],
					'device_control' => false,
				)
			);
		}
	}
}
