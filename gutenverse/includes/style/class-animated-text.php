<?php
/**
 * Gutenverse Animated Text
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\style
 */

namespace Gutenverse\Style;

use Gutenverse\Framework\Style_Abstract;

/**
 * Class Animated Text
 *
 * @package gutenverse\style
 */
class Animated_Text extends Style_Abstract {
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
	protected $name = 'animated-text';

	/**
	 * Constructor
	 *
	 * @param array $attrs Attribute.
	 */
	public function __construct( $attrs ) {
		parent::__construct( $attrs );
		$this->in_block = false;
		$this->set_feature(
			array(
				'background'  => null,
				'border'      => null,
				'positioning' => null,
				'advance'     => null,
				'mask'        => null,
			)
		);
	}

	/**
	 * Create additional attribute for gradient function
	 *
	 * @param array $selector .
	 *
	 * @return void
	 */
	public function additional_attribute_for_font_color( $selector ) {
		$this->inject_style(
			array(
				'selector'       => $selector,
				'property'       => function () {
					return 'background-clip: text; -webkit-text-fill-color: transparent;';
				},
				'value'          => '',
				'device_control' => true,
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
					'selector'       => ".{$this->element_id}",
					'property'       => function ( $value ) {
						return "justify-content: {$value};";
					},
					'value'          => $this->attrs['alignText'],
					'device_control' => true,
				)
			);
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} > *",
					'property'       => function ( $value ) {
						return 'text-align: ' .
						( 'flex-start' === $value ? 'left' :
						( 'flex-end' === $value ? 'right' : 'center' ) ) .
						';';
					},
					'value'          => $this->attrs['alignText'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['height'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'min-height' );
					},
					'value'          => $this->attrs['height'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['verticalAlign'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}",
					'property'       => function ( $value ) {
						return "align-items: {$value};";
					},
					'value'          => $this->attrs['verticalAlign'],
					'device_control' => true,
				)
			);
		}

		// Animated Text.
		if ( 'color' === $this->attrs['animatedColorType'] ) { // color type color.
			if ( isset( $this->attrs['textAnimatedColor'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} .text-content .text-wrapper",
						'property'       => function ( $value ) {
							return $this->handle_color( $value, 'color' );
						},
						'value'          => $this->attrs['textAnimatedColor'],
						'device_control' => false,
					)
				);
			}
			if ( isset( $this->attrs['textAnimatedColorHover'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id}:hover .text-content .text-wrapper",
						'property'       => function ( $value ) {
							return $this->handle_color( $value, 'color' );
						},
						'value'          => $this->attrs['textAnimatedColorHover'],
						'device_control' => false,
					)
				);
			}
		}

		if ( 'gradient' === $this->attrs['animatedColorType'] ) { // color type gradient.
			if ( isset( $this->attrs['textAnimatedGradient'] ) ) {
				$this->handle_gradient_with_angle(
					".{$this->element_id} .text-content .text-wrapper .letter",
					$this->attrs['textAnimatedGradient']
				);
				$this->additional_attribute_for_font_color( ".{$this->element_id} .text-content .text-wrapper .letter" );
			}
			if ( isset( $this->attrs['textAnimatedGradientHover'] ) ) {
				$this->handle_gradient_with_angle(
					".{$this->element_id}:hover .text-content .text-wrapper .letter",
					$this->attrs['textAnimatedGradientHover']
				);
				$this->additional_attribute_for_font_color( ".{$this->element_id}:hover .text-content .text-wrapper .letter" );
			}
		}

		if ( isset( $this->attrs['textAnimatedTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".{$this->element_id} .text-content .text-wrapper",
					'property'       => function ( $value ) {},
					'value'          => $this->attrs['textAnimatedTypography'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['textAnimatedStroke'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .text-content .text-wrapper",
					'property'       => function ( $value ) {
						return $this->handle_text_stroke( $value );
					},
					'value'          => $this->attrs['textAnimatedStroke'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['textAnimatedShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .text-content .text-wrapper",
					'property'       => function ( $value ) {
						return $this->handle_text_shadow( $value );
					},
					'value'          => $this->attrs['textAnimatedShadow'],
					'device_control' => false,
				)
			);
		}

		// Non animated text.
		if ( 'color' === $this->attrs['normalColorType'] ) { // color type color.
			if ( isset( $this->attrs['textNormalColor'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} .non-animated-text",
						'property'       => function ( $value ) {
							return $this->handle_color( $value, 'color' );
						},
						'value'          => $this->attrs['textNormalColor'],
						'device_control' => false,
					)
				);
			}
			if ( isset( $this->attrs['textNormalColorHover'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id}:hover .non-animated-text",
						'property'       => function ( $value ) {
							return $this->handle_color( $value, 'color' );
						},
						'value'          => $this->attrs['textNormalColorHover'],
						'device_control' => false,
					)
				);
			}
		}

		if ( 'gradient' === $this->attrs['normalColorType'] ) { // color type gradient.
			if ( isset( $this->attrs['textNormalGradient'] ) ) {
				$this->handle_gradient_with_angle(
					".{$this->element_id} .non-animated-text",
					$this->attrs['textNormalGradient']
				);
				$this->additional_attribute_for_font_color( ".{$this->element_id} .non-animated-text" );
			}
			if ( isset( $this->attrs['textNormalGradientHover'] ) ) {
				$this->handle_gradient_with_angle(
					".{$this->element_id}:hover .non-animated-text",
					$this->attrs['textNormalGradientHover']
				);
				$this->additional_attribute_for_font_color( ".{$this->element_id}:hover .non-animated-text" );
			}
		}

		if ( isset( $this->attrs['textNormalTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".{$this->element_id} .non-animated-text",
					'property'       => function ( $value ) {},
					'value'          => $this->attrs['textNormalTypography'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['textNormalStroke'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .non-animated-text",
					'property'       => function ( $value ) {
						return $this->handle_text_stroke( $value );
					},
					'value'          => $this->attrs['textNormalStroke'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['textNormalShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .non-animated-text",
					'property'       => function ( $value ) {
						return $this->handle_text_shadow( $value );
					},
					'value'          => $this->attrs['textNormalShadow'],
					'device_control' => false,
				)
			);
		}

		// Highlight style.
		if ( isset( $this->attrs['highlightColor'] ) && 'color' === $this->attrs['highlightColorType'] ) {
			$this->inject_style(
				array(
					'selector'       => ".guten-animated-text.{$this->element_id} .text-content svg path",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'stroke' );
					},
					'value'          => $this->attrs['highlightColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['highlightWidth'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .text-content svg path",
					'property'       => function ( $value ) {
						return "stroke-width: {$value};";
					},
					'value'          => $this->attrs['highlightWidth'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['highlightRoundedEdges'] ) && true === $this->attrs['highlightRoundedEdges'] ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .text-content svg path",
					'property'       => function () {
						return 'stroke-linecap: round; stroke-linejoin: round;';
					},
					'value'          => $this->attrs['highlightRoundedEdges'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['highlightInFront'] ) && true === $this->attrs['highlightInFront'] ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .text-content svg",
					'property'       => function () {
						return 'z-index: 2';
					},
					'value'          => $this->attrs['highlightInFront'],
					'device_control' => false,
				)
			);
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .text-content .text-wrapper",
					'property'       => function () {
						return 'z-index: 1';
					},
					'value'          => $this->attrs['highlightInFront'],
					'device_control' => false,
				)
			);
		}

		// Style fallback before feature rotation text.
		if ( isset( $this->attrs['color'] ) && ! isset( $this->attrs['textAnimatedColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} *",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['color'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['typography'] ) && ! isset( $this->attrs['textAnimatedTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".{$this->element_id} *",
					'property'       => function ( $value ) {},
					'value'          => $this->attrs['typography'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['textStroke'] ) && ! isset( $this->attrs['textAnimatedStroke'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} *",
					'property'       => function ( $value ) {
						return $this->handle_text_stroke( $value );
					},
					'value'          => $this->attrs['textStroke'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['textShadow'] ) && ! isset( $this->attrs['textAnimatedShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} *",
					'property'       => function ( $value ) {
						return $this->handle_text_shadow( $value );
					},
					'value'          => $this->attrs['textShadow'],
					'device_control' => false,
				)
			);
		}
	}
}
