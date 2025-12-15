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
				'transform'   => array(
					'normal' => ".{$this->element_id} .gutenverse-search-form",
					'hover'  => ".{$this->element_id}:hover .gutenverse-search-form",
				),
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
					'selector'       => ".{$this->element_id} .search-input-container-outer .search-input-container .gutenverse-search.gutenverse-search-input, .{$this->element_id}:not(:has(.search-input-container-outer)) .search-input-container .gutenverse-search.gutenverse-search-input",
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
					'selector'       => ".{$this->element_id} .search-input-container-outer, .{$this->element_id}:not(:has(.search-input-container-outer)) .search-input-container",
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
					'selector'       => ".{$this->element_id} .gutenverse-search.gutenverse-search-input, .{$this->element_id} .search-input-container-outer .search-input-container .gutenverse-search.gutenverse-search-input",
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
					'selector'       => ".{$this->element_id} .gutenverse-search.gutenverse-search-input, .{$this->element_id} .search-input-container-outer .search-input-container .gutenverse-search.gutenverse-search-input",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['inputBgColorNormal'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['inputBorderNormal'] ) ) {
			$this->handle_border( 'inputBorderNormal', ".{$this->element_id} .gutenverse-search.gutenverse-search-input, .{$this->element_id} .search-input-container-outer .search-input-container .gutenverse-search.gutenverse-search-input" );
		}

		if ( isset( $this->attrs['inputBorderNormalResponsive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gutenverse-search.gutenverse-search-input, .{$this->element_id} .search-input-container-outer .search-input-container .gutenverse-search.gutenverse-search-input",
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
					'selector'       => ".{$this->element_id} .gutenverse-search.gutenverse-search-input:hover, .{$this->element_id} .search-input-container-outer .search-input-container .gutenverse-search.gutenverse-search-input:hover",
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
					'selector'       => ".{$this->element_id} .gutenverse-search.gutenverse-search-input:hover, .{$this->element_id} .search-input-container-outer .search-input-container .gutenverse-search.gutenverse-search-input:hover",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['inputBgColorHover'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['inputBorderHover'] ) ) {
			$this->handle_border( 'inputBorderHover', ".{$this->element_id} .gutenverse-search.gutenverse-search-input:hover, .{$this->element_id} .search-input-container-outer .search-input-container .gutenverse-search.gutenverse-search-input:hover" );
		}

		if ( isset( $this->attrs['inputBorderHoverResponsive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gutenverse-search.gutenverse-search-input:hover, .{$this->element_id} .search-input-container-outer .search-input-container .gutenverse-search.gutenverse-search-input:hover",
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
					'selector'       => ".{$this->element_id} .gutenverse-search.gutenverse-search-input:focus, .{$this->element_id} .search-input-container-outer .search-input-container .gutenverse-search.gutenverse-search-input:focus",
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
					'selector'       => ".{$this->element_id} .gutenverse-search.gutenverse-search-input:focus, .{$this->element_id} .search-input-container-outer .search-input-container .gutenverse-search.gutenverse-search-input:focus",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['inputBgColorFocus'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['inputBorderFocus'] ) ) {
			$this->handle_border( 'inputBorderFocus', ".{$this->element_id} .gutenverse-search.gutenverse-search-input:focus, .{$this->element_id} .search-input-container-outer .search-input-container .gutenverse-search.gutenverse-search-input:focus" );

			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gutenverse-search.gutenverse-search-input:focus, .{$this->element_id} .search-input-container-outer .search-input-container .gutenverse-search.gutenverse-search-input:focus",
					'property'       => function () {
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
					'selector'       => ".{$this->element_id} .gutenverse-search.gutenverse-search-input:focus, .{$this->element_id} .search-input-container-outer .search-input-container .gutenverse-search.gutenverse-search-input:focus",
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
					'selector'       => ".{$this->element_id} .gutenverse-search.gutenverse-search-input:focus, .{$this->element_id} .search-input-container-outer .search-input-container .gutenverse-search.gutenverse-search-input:focus",
					'property'       => function () {
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
					'selector'       => ".{$this->element_id} .search-input-container",
					'property'       => function ( $value ) {
						if ( '100%' === $value ) {
							return "max-width: none !important; width: {$value} !important;";
						}
					},
					'value'          => $this->attrs['formStyle'],
					'device_control' => true,
				)
			);
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gutenverse-search-form .guten-search-button-wrapper",
					'property'       => function ( $value ) {
						if ( '100%' === $value ) {
							return "width: {$value} !important;";
						}
					},
					'value'          => $this->attrs['formStyle'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['inputWidth'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}:not(:has(.search-input-container-outer)) .gutenverse-search.gutenverse-search-input,
			.{$this->element_id}:not(:has(.search-input-container-outer)) .gutenverse-search-form .gutenverse-search-input,
			.{$this->element_id}:not(:has(.search-input-container-outer)) .search-input-container .gutenverse-search.gutenverse-search-input",
					'property'       => function ( $value ) {
						if ( is_array( $value ) && isset( $value['unit'] ) && '%' === $value['unit'] ) {
							return 'width: 100%;';
						}
						return $this->handle_unit_point( $value, 'width' );
					},
					'value'          => $this->attrs['inputWidth'],
					'device_control' => true,
				)
			);

			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .search-input-container-outer, .{$this->element_id}:not(:has(.search-input-container-outer)) .search-input-container ",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'width' );
					},
					'value'          => $this->attrs['inputWidth'],
					'device_control' => true,
				)
			);

		}

		if ( isset( $this->attrs['buttonWidth'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .search-input-container-outer, .{$this->element_id}:not(:has(.search-input-container-outer)) .search-input-container ",
					'property'       => function ( $value, $device ) {
						if ( 'Mobile' === $device ) {
							return 'max-width: 100% !important;';
						}
						$point = isset( $value['point'] ) ? (int) $value['point'] : 0;
						$unit = $value['unit'];
						$diff = 'px' === $unit ? 2 : ( '%' === $unit ? 0.2 : 0.12 );
						return 'max-width: calc(100% - ' . ( $point + $diff ) . $unit . ');';
					},
					'value'          => $this->attrs['buttonWidth'],
					'device_control' => true,
				)
			);

			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-search-button-wrapper ",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'width' );
					},
					'value'          => $this->attrs['buttonWidth'],
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
					'selector'       => ".{$this->element_id} .gutenverse-search-form, .{$this->element_id} .search-input-container",
					'property'       => function ( $value ) {
						return "justify-content: {$value};";
					},
					'value'          => $this->attrs['alignContent'],
					'device_control' => true,
				)
			);
		}

		/** Close Icon Style */
		if ( isset( $this->attrs['closeIconSize'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gutenverse-search-form .search-input-container .close-icon",
					'property'       => function ( $value ) {
						return "font-size: {$value}px;";
					},
					'value'          => $this->attrs['closeIconSize'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['closeIconRotate'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gutenverse-search-form .search-input-container .close-icon",
					'property'       => function ( $value ) {
						return "transform: rotate({$value}deg);";
					},
					'value'          => $this->attrs['closeIconRotate'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['closeIconMargin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gutenverse-search-form .search-input-container .close-icon",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['closeIconMargin'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['closeIconPadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gutenverse-search-form .search-input-container .close-icon",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['closeIconPadding'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['closeIconColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gutenverse-search-form .search-input-container .close-icon",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['closeIconColor'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['closeIconColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gutenverse-search-form .search-input-container:hover .close-icon",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['closeIconColorHover'],
					'device_control' => true,
				)
			);
		}
	}
}
