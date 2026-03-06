<?php
/**
 * Gutenverse Accordion
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\style
 */

namespace Gutenverse\Style;

use Gutenverse\Framework\Style_Abstract;

/**
 * Class Accordion
 *
 * @package gutenverse\style
 */
class Accordion extends Style_Abstract {
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
	protected $name = 'accordion';

	/**
	 * Constructor
	 *
	 * @param array $attrs Attribute.
	 */
	public function __construct( $attrs ) {
		parent::__construct( $attrs );
	}
	/**
	 * Generate style base on attribute.
	 */
	public function generate() {
		if ( isset( $this->attrs['contentBackgroundColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".guten-accordions .{$this->element_id}.accordion-item .accordion-content:first-child",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background' );
					},
					'value'          => $this->attrs['contentBackgroundColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['contentBackgroundColorClosed'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".guten-accordions .{$this->element_id}.accordion-item .accordion-body.closed .accordion-content:first-child",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background' );
					},
					'value'          => $this->attrs['contentBackgroundColorClosed'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['contentBackgroundColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".guten-accordions .{$this->element_id}.accordion-item .accordion-body .accordion-content:first-child:hover",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background' );
					},
					'value'          => $this->attrs['contentBackgroundColorHover'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['contentTextColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.accordion-item .accordion-content:first-child",
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
					'selector'       => ".{$this->element_id}.accordion-item .accordion-body.closed .accordion-content:first-child",
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
					'selector'       => ".{$this->element_id}.accordion-item .accordion-body .accordion-content:first-child:hover",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['contentTextColorHover'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['contentBackgroundGradient'] ) ) {
			$this->handle_background( ".guten-accordions .{$this->element_id}.accordion-item .accordion-content:first-child", $this->attrs['contentBackgroundGradient'] );
		}

		if ( isset( $this->attrs['contentBackgroundGradientClosed'] ) ) {
			$this->handle_background( ".guten-accordions .{$this->element_id}.accordion-item .accordion-body.closed .accordion-content:first-child", $this->attrs['contentBackgroundGradientClosed'] );
		}

		if ( isset( $this->attrs['contentBackgroundGradientHover'] ) ) {
			$this->handle_background( ".guten-accordions .{$this->element_id}.accordion-item .accordion-body .accordion-content:first-child:hover", $this->attrs['contentBackgroundGradientHover'] );
		}
	}
}
