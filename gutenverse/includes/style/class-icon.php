<?php
/**
 * Gutenverse Icon
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\style
 */

namespace Gutenverse\Style;

use Gutenverse\Framework\Style_Abstract;

/**
 * Class Icon
 *
 * @package gutenverse\style
 */
class Icon extends Style_Abstract {
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
	protected $name = 'icon';

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
					'normal' => ".{$this->element_id} .guten-icon-wrapper",
					'hover'  => ".{$this->element_id} .guten-icon-wrapper:hover",
				),
				'mask'        => null,
				'tooltip'     => null,
			)
		);
	}

	/**
	 * Generate style base on attribute.
	 */
	public function generate() {
		if ( isset( $this->attrs['iconAlign'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}",
					'property'       => function ( $value ) {
						return "text-align: {$value};";
					},
					'value'          => $this->attrs['iconAlign'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['iconSize'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-icon-wrapper i",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'font-size' );
					},
					'value'          => $this->attrs['iconSize'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['iconPadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-icon-wrapper",
					'property'       => function ( $value ) {
						return "padding: {$value}px;";
					},
					'value'          => $this->attrs['iconPadding'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['iconRotate'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-icon-wrapper i",
					'property'       => function ( $value ) {
						return "transform: rotate({$value}deg);";
					},
					'value'          => $this->attrs['iconRotate'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['iconShape'] ) && 'custom' === $this->attrs['iconShape'] ) {
			if ( isset( $this->attrs['iconView'] ) && 'framed' === $this->attrs['iconView'] ) {
				if ( isset( $this->attrs['iconBorderWidth'] ) ) {
					$this->inject_style(
						array(
							'selector'       => ".{$this->element_id} .guten-icon-wrapper",
							'property'       => function ( $value ) {
								return $this->handle_dimension( $value, 'border-width', false );
							},
							'value'          => $this->attrs['iconBorderWidth'],
							'device_control' => false,
						)
					);
				}
			}

			if ( isset( $this->attrs['iconBorderRadius'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} .guten-icon-wrapper",
						'property'       => function ( $value ) {
							return $this->handle_border_radius( $value );
						},
						'value'          => $this->attrs['iconBorderRadius'],
						'device_control' => false,
					)
				);
			}
		}

		if ( isset( $this->attrs['iconColorOne'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-icon-wrapper.framed i",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['iconColorOne'],
					'device_control' => false,
				)
			);

			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-icon-wrapper.framed",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'border-color' );
					},
					'value'          => $this->attrs['iconColorOne'],
					'device_control' => false,
				)
			);

			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-icon-wrapper.stacked",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['iconColorOne'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['iconColorTwo'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-icon-wrapper.stacked i",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['iconColorTwo'],
					'device_control' => false,
				)
			);

			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-icon-wrapper.framed",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['iconColorTwo'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['iconColorHoverOne'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-icon-wrapper.framed:hover i",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['iconColorHoverOne'],
					'device_control' => false,
				)
			);

			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-icon-wrapper.framed:hover",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'border-color' );
					},
					'value'          => $this->attrs['iconColorHoverOne'],
					'device_control' => false,
				)
			);

			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-icon-wrapper.stacked:hover",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['iconColorHoverOne'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['iconColorHoverTwo'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-icon-wrapper.stacked:hover i",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['iconColorHoverTwo'],
					'device_control' => false,
				)
			);

			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-icon-wrapper.framed:hover",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['iconColorHoverTwo'],
					'device_control' => false,
				)
			);
		}
	}
}
