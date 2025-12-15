<?php
/**
 * Gutenverse Advanced Heading
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\style
 */

namespace Gutenverse\Style;

use Gutenverse\Framework\Style_Abstract;

/**
 * Class Advanced Heading
 *
 * @package gutenverse\style
 */
class Advanced_Heading extends Style_Abstract {
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
	protected $name = 'advanced-heading';

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
				'transform'   => array(
					'normal' => ".{$this->element_id} > *",
					'hover'  => ".{$this->element_id}:hover > *",
				),
			)
		);
	}

	/**
	 * Generate style base on attribute.
	 */
	public function generate() {
		if ( isset( $this->attrs['alignText'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}, .{$this->element_id} .heading-section",
					'property'       => function ( $value ) {
						return "justify-content: {$value}; text-align: {$this->handle_align($value)};";
					},
					'value'          => $this->attrs['alignText'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['lineWidth'] ) && isset( $this->attrs['showLine'] ) && 'none' !== $this->attrs['showLine'] ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-advanced-heading .heading-line",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'width' );
					},
					'value'          => $this->attrs['lineWidth'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['lineHeight'] ) && isset( $this->attrs['showLine'] ) && 'none' !== $this->attrs['showLine'] ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-advanced-heading .heading-line",
					'property'       => function ( $value ) {
						return "border-top-width: {$value}px;";
					},
					'value'          => $this->attrs['lineHeight'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['lineStyle'] ) && isset( $this->attrs['showLine'] ) && 'none' !== $this->attrs['showLine'] ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-advanced-heading .heading-line",
					'property'       => function ( $value ) {
						return "border-top-style: {$value};";
					},
					'value'          => $this->attrs['lineStyle'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['lineColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-advanced-heading .heading-line",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'border-color' );
					},
					'value'          => $this->attrs['lineColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['lineMargin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-advanced-heading .heading-line",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['lineMargin'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['mainColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .heading-title",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['mainColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['mainTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".{$this->element_id} .heading-title",
					'property'       => function ( $value ) {},
					'value'          => $this->attrs['mainTypography'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['mainTextStroke'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .heading-title",
					'property'       => function ( $value ) {
						return $this->handle_text_stroke( $value );
					},
					'value'          => $this->attrs['mainTextStroke'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['mainBackground'] ) ) {
			$this->handle_background( ".{$this->element_id} .heading-title", $this->attrs['mainBackground'] );
		}

		if ( isset( $this->attrs['mainMargin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .heading-title",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['mainMargin'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['mainPadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .heading-title",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['mainPadding'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['focusColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .heading-focus",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' ) . $this->handle_color( $value, '-webkit-text-fill-color' );
					},
					'value'          => $this->attrs['focusColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['focusTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".{$this->element_id} .heading-focus",
					'property'       => function ( $value ) {},
					'value'          => $this->attrs['focusTypography'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['focusTextStroke'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .heading-focus",
					'property'       => function ( $value ) {
						return $this->handle_text_stroke( $value );
					},
					'value'          => $this->attrs['focusTextStroke'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['focusBackground'] ) ) {
			$this->handle_background( ".{$this->element_id} .heading-focus", $this->attrs['focusBackground'] );
		}

		if ( isset( $this->attrs['focusMargin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .heading-focus",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['focusMargin'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['focusPadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .heading-focus",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['focusPadding'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['subColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .heading-subtitle",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['subColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['subTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".{$this->element_id} .heading-subtitle",
					'property'       => function ( $value ) {},
					'value'          => $this->attrs['subTypography'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['subBackground'] ) ) {
			$this->handle_background( ".{$this->element_id} .heading-subtitle", $this->attrs['subBackground'] );
		}

		if ( isset( $this->attrs['subMargin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .heading-subtitle",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['subMargin'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['subPadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .heading-subtitle",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['subPadding'],
					'device_control' => true,
				)
			);
		}
	}
}
