<?php
/**
 * Gutenverse Text Editor
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\style
 */

namespace Gutenverse\Style;

use Gutenverse\Framework\Style_Abstract;

/**
 * Class Text Editor
 *
 * @package gutenverse\style
 */
class Text extends Style_Abstract {
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
	protected $name = 'text-paragraph';


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
		if ( isset( $this->attrs['columns'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}",
					'property'       => function ( $value ) {
						return "columns: {$value};";
					},
					'value'          => $this->attrs['columns'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['gap'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'column-gap' );
					},
					'value'          => $this->attrs['gap'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['textIndent'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "p.{$this->element_id}.gutenverse-text",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'text-indent', true );
					},
					'value'          => $this->attrs['textIndent'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['linkColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} a",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['linkColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['linkTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".{$this->element_id} a",
					'property'       => function ( $value ) {},
					'value'          => $this->attrs['linkTypography'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['linkColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} a:hover",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['linkColorHover'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['linkTypographyHover'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".{$this->element_id} a:hover",
					'property'       => function ( $value ) {},
					'value'          => $this->attrs['linkTypographyHover'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['alignment'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}",
					'property'       => function ( $value ) {
						return "text-align: {$value};";
					},
					'value'          => $this->attrs['alignment'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['textColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['textColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['typography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".{$this->element_id}",
					'property'       => function ( $value ) {},
					'value'          => $this->attrs['typography'],
					'device_control' => false,
				)
			);
		}
	}
}
