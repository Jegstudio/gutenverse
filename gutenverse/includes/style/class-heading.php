<?php
/**
 * Gutenverse Heading
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\style
 */

namespace Gutenverse\Style;

use Gutenverse\Framework\Style_Abstract;

/**
 * Class Heading
 *
 * @package gutenverse\style
 */
class Heading extends Style_Abstract {
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
	protected $name = 'heading';

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
		if ( isset( $this->attrs['textAlign'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}",
					'property'       => function ( $value ) {
						return "text-align: {$value};";
					},
					'value'          => $this->attrs['textAlign'],
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

		if ( isset( $this->attrs['color'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "h1.guten-element.{$this->element_id}, h2.guten-element.{$this->element_id}, h3.guten-element.{$this->element_id}, h4.guten-element.{$this->element_id}, h5.guten-element.{$this->element_id}, h6.guten-element.{$this->element_id}",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['color'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['typography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => "h1.guten-element.{$this->element_id}, h2.guten-element.{$this->element_id}, h3.guten-element.{$this->element_id}, h4.guten-element.{$this->element_id}, h5.guten-element.{$this->element_id}, h6.guten-element.{$this->element_id}",
					'property'       => function ( $value ) {},
					'value'          => $this->attrs['typography'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['textShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "h1.guten-element.{$this->element_id}, h2.guten-element.{$this->element_id}, h3.guten-element.{$this->element_id}, h4.guten-element.{$this->element_id}, h5.guten-element.{$this->element_id}, h6.guten-element.{$this->element_id}",
					'property'       => function ( $value ) {
						return $this->handle_text_shadow( $value );
					},
					'value'          => $this->attrs['textShadow'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['textStroke'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "h1.guten-element.{$this->element_id}, h2.guten-element.{$this->element_id}, h3.guten-element.{$this->element_id}, h4.guten-element.{$this->element_id}, h5.guten-element.{$this->element_id}, h6.guten-element.{$this->element_id}",
					'property'       => function ( $value ) {
						return $this->handle_text_stroke( $value );
					},
					'value'          => $this->attrs['textStroke'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['overflowWrap'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "h1.guten-element.{$this->element_id}, h2.guten-element.{$this->element_id}, h3.guten-element.{$this->element_id}, h4.guten-element.{$this->element_id}, h5.guten-element.{$this->element_id}, h6.guten-element.{$this->element_id}",
					'property'       => function ( $value ) {
						return "overflow-wrap: {$value}; word-break: {$value};";
					},
					'value'          => $this->attrs['overflowWrap'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['textWritingMode'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-element",
					'property'       => function ( $value ) {
						return "writing-mode: {$value};";
					},
					'value'          => $this->attrs['textWritingMode'],
					'device_control' => true,
				)
			);
		}
	}
}
