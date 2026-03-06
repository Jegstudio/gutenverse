<?php
/**
 * Gutenverse Divider
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\style
 */

namespace Gutenverse\Style;

use Gutenverse\Framework\Style_Abstract;

/**
 * Class Divider
 *
 * @package gutenverse\style
 */
class Divider extends Style_Abstract {
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
	protected $name = 'divider';

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
				'animation'   => null,
				'positioning' => null,
				'advance'     => null,
				'mask'        => null,
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
						'selector'       => ".{$this->element_id} .guten-divider-wrapper",
						'property'       => function ( $value ) {
							return "width: {$value}%;";
						},
						'value'          => $this->attrs['width'],
						'device_control' => true,
					)
				);
		}

		if ( isset( $this->attrs['size'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-divider-style",
					'property'       => function ( $value ) {
						return "--divider-pattern-height: {$value}px;";
					},
					'value'          => $this->attrs['size'],
					'device_control' => true,
				)
			);

			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-divider-line",
					'property'       => function ( $value ) {
						return "border-width: {$value}px;";
					},
					'value'          => $this->attrs['size'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['gap'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-divider-wrapper",
					'property'       => function ( $value ) {
						return "padding: {$value}px 0;";
					},
					'value'          => $this->attrs['gap'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['dividerColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-divider-line",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'border-color' );
					},
					'value'          => $this->attrs['dividerColor'],
					'device_control' => false,
				)
			);

			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-divider-style",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['dividerColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['content'] ) && ( 'text' === $this->attrs['content'] || 'icon' === $this->attrs['content'] ) ) {
			if ( isset( $this->attrs['contentColor'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} .guten-divider-content span, .{$this->element_id} .guten-divider-content i",
						'property'       => function ( $value ) {
							return $this->handle_color( $value, 'color' );
						},
						'value'          => $this->attrs['contentColor'],
						'device_control' => false,
					)
				);

				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} .guten-divider-content svg",
						'property'       => function ( $value ) {
							return $this->handle_color( $value, 'fill' );
						},
						'value'          => $this->attrs['contentColor'],
						'device_control' => false,
					)
				);
			}

			if ( isset( $this->attrs['contentSpacing'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} .guten-divider-content span, .{$this->element_id} .guten-divider-content i, .{$this->element_id} .guten-divider-content svg",
						'property'       => function ( $value ) {
							return "margin: 0 {$value}px;";
						},
						'value'          => $this->attrs['contentSpacing'],
						'device_control' => true,
					)
				);
			}

			if ( isset( $this->attrs['typography'] ) && 'text' === $this->attrs['content'] ) {
				$this->inject_typography(
					array(
						'selector'       => ".{$this->element_id} .guten-divider-content span",
						'property'       => function ( $value ) {},
						'value'          => $this->attrs['typography'],
						'device_control' => false,
					)
				);
			}

			if ( isset( $this->attrs['iconSize'] ) && 'icon' === $this->attrs['content'] ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} .guten-divider-content i",
						'property'       => function ( $value ) {
							return $this->handle_unit_point( $value, 'font-size' );
						},
						'value'          => $this->attrs['iconSize'],
						'device_control' => true,
					)
				);

				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} .guten-divider-content svg",
						'property'       => function ( $value ) {
							return $this->handle_unit_point( $value, 'font-size' );
						},
						'value'          => $this->attrs['iconSize'],
						'device_control' => true,
					)
				);
			}
		}

		if ( isset( $this->attrs['dividerAlign'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}",
					'property'       => function ( $value ) {
						return "justify-content: {$value};";
					},
					'value'          => $this->attrs['dividerAlign'],
					'device_control' => true,
				)
			);
		}
	}
}
