<?php
/**
 * Gutenverse Search
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse-element\style
 */

namespace Gutenverse\Style;

use Gutenverse\Framework\Style_Abstract;

/**
 * Class Search
 *
 * @package gutenverse-form\style
 */
class Search extends Style_Abstract {
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
	protected $name = 'search';

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

		if ( isset( $this->attrs['inputPadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gutenverse-search.gutenverse-search-input",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['inputPadding'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['inputMargin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gutenverse-search.gutenverse-search-input",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['inputMargin'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['inputTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".{$this->element_id} .gutenverse-search.gutenverse-search-input",
					'property'       => function ( $value ) {},
					'value'          => $this->attrs['inputTypography'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['placeholderColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gutenverse-search.gutenverse-search-input::placeholder",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['placeholderColor'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['inputColorNormal'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gutenverse-search.gutenverse-search-input",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['inputColorNormal'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['inputBgColorNormal'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gutenverse-search.gutenverse-search-input",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['inputBgColorNormal'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['inputBorderNormal'] ) ) {
			$this->handle_border( 'inputBorderNormal', ".{$this->element_id} .gutenverse-search.gutenverse-search-input" );
		}

		if ( isset( $this->attrs['inputBorderNormalResponsive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gutenverse-search.gutenverse-search-input",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['inputBorderNormalResponsive'],
					'device_control' => true,
					'skip_device'    => array(
						'Desktop',
					),
				)
			);
		}

		if ( isset( $this->attrs['inputColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gutenverse-search.gutenverse-search-input:hover",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['inputColorHover'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['inputBgColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gutenverse-search.gutenverse-search-input:hover",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['inputBgColorHover'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['inputBorderHover'] ) ) {
			$this->handle_border( 'inputBorderHover', ".{$this->element_id} .gutenverse-search.gutenverse-search-input:hover" );
		}

		if ( isset( $this->attrs['inputBorderHoverResponsive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gutenverse-search.gutenverse-search-input:hover",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['inputBorderHoverResponsive'],
					'device_control' => true,
					'skip_device'    => array(
						'Desktop',
					),
				)
			);
		}

		if ( isset( $this->attrs['inputColorFocus'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gutenverse-search.gutenverse-search-input:focus",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['inputColorFocus'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['inputBgColorFocus'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gutenverse-search.gutenverse-search-input:focus",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['inputBgColorFocus'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['inputBorderFocus'] ) ) {
			$this->handle_border( 'inputBorderFocus', ".{$this->element_id} .gutenverse-search.gutenverse-search-input:focus" );

			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gutenverse-search.gutenverse-search-input:focus",
					'property'       => function() {
						return 'outline: none !important;';
					},
					'value'          => '',
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['inputBorderFocusResponsive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gutenverse-search.gutenverse-search-input:focus",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['inputBorderFocusResponsive'],
					'device_control' => true,
					'skip_device'    => array(
						'Desktop',
					),
				)
			);

			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gutenverse-search.gutenverse-search-input:focus",
					'property'       => function() {
						return 'outline: none !important;';
					},
					'value'          => '',
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['formStyle'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gutenverse-search-form .guten-button-wrapper ",
					'property'       => function ( $value ) {
						return "width: {$value};";
					},
					'value'          => $this->attrs['formStyle'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['inputWidth'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-button-wrapper",
					'property'       => function ( $value ) {
						return 'width:auto;';
					},
					'value'          => $this->attrs['inputWidth'],
					'device_control' => true,
				)
			);
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gutenverse-search.gutenverse-search-input",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'width' );
					},
					'value'          => $this->attrs['inputWidth'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['inputHeight'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gutenverse-search.gutenverse-search-input, .{$this->element_id} .guten-button-wrapper .guten-button ",
					'property'       => function ( $value ) {
						return "height: {$value}px;";
					},
					'value'          => $this->attrs['inputHeight'],
					'device_control' => true,
				)
			);
		}
		if ( isset( $this->attrs['inputAreaBoxShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gutenverse-search.gutenverse-search-input, .{$this->element_id} .guten-button-wrapper .guten-button",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['inputAreaBoxShadow'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['inputAreaBoxShadowHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gutenverse-search.gutenverse-search-input:hover, .{$this->element_id} .guten-button-wrapper .guten-button:hover",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['inputAreaBoxShadowHover'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['inputAreaBoxShadowFocus'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gutenverse-search.gutenverse-search-input:focus, .{$this->element_id} .guten-button-wrapper .guten-button:focus",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['inputAreaBoxShadowFocus'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['alignContent'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gutenverse-search-form",
					'property'       => function ( $value ) {
						return "justify-content: {$value};";
					},
					'value'          => $this->attrs['alignContent'],
					'device_control' => true,
				)
			);
		}
	}
}
