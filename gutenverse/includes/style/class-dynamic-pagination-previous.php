<?php
/**
 * Gutenverse Dynamic Pagination Previous Style
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\style
 */

namespace Gutenverse\Style;

use Gutenverse\Framework\Style_Abstract;

/**
 * Class Dynamic_Pagination_Previous
 *
 * @package gutenverse\style
 */
class Dynamic_Pagination_Previous extends Style_Abstract {
	/**
	 * Block Name
	 *
	 * @var array
	 */
	protected $name = 'dynamic-pagination-previous';

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
		if ( isset( $this->attrs['paginationTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector' => ".{$this->element_id} .btn-pagination",
					'value'    => $this->attrs['paginationTypography'],
				)
			);
		}

		if ( isset( $this->attrs['paginationMargin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .btn-pagination",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['paginationMargin'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['paginationPadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .btn-pagination",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['paginationPadding'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['paginationWidth'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .btn-pagination",
					'property'       => function ( $value ) {
						return "width: {$value}%;";
					},
					'value'          => $this->attrs['paginationWidth'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['paginationIconSpacing'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .btn-pagination.prev i, .{$this->element_id} .btn-pagination.prev svg",
					'property'       => function ( $value ) {
						return "margin-right: {$value}px;";
					},
					'value'          => $this->attrs['paginationIconSpacing'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['paginationIconSize'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .btn-pagination.prev i",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'font-size' );
					},
					'value'          => $this->attrs['paginationIconSize'],
					'device_control' => true,
				)
			);

			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .btn-pagination.prev svg",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'width' );
					},
					'value'          => $this->attrs['paginationIconSize'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['paginationColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .btn-pagination",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['paginationColor'],
					'device_control' => false,
				)
			);

			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .btn-pagination svg",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'fill' );
					},
					'value'          => $this->attrs['paginationColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['paginationDisabledColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .btn-pagination.disabled",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['paginationDisabledColor'],
					'device_control' => false,
				)
			);

			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .btn-pagination.disabled svg",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'fill' );
					},
					'value'          => $this->attrs['paginationDisabledColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['paginationHoverColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .btn-pagination:not(.disabled):hover",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['paginationHoverColor'],
					'device_control' => false,
				)
			);

			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .btn-pagination:not(.disabled):hover svg",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'fill' );
					},
					'value'          => $this->attrs['paginationHoverColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['paginationBackground'] ) ) {
			$this->handle_background( ".{$this->element_id} .btn-pagination", $this->attrs['paginationBackground'] );
		}

		if ( isset( $this->attrs['paginationDisabledBackground'] ) ) {
			$this->handle_background( ".{$this->element_id} .btn-pagination.disabled", $this->attrs['paginationDisabledBackground'] );
		}

		if ( isset( $this->attrs['paginationHoverBackground'] ) ) {
			$this->handle_background( ".{$this->element_id} .btn-pagination:not(.disabled):hover", $this->attrs['paginationHoverBackground'] );
		}

		if ( isset( $this->attrs['paginationBorder'] ) ) {
			$this->handle_border( ".{$this->element_id} .btn-pagination", 'paginationBorder' );
		}

		if ( isset( $this->attrs['paginationBorderResponsive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .btn-pagination",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['paginationBorderResponsive'],
					'device_control' => true,
					'skip_device'    => array(
						'Desktop',
					),
				)
			);
		}

		if ( isset( $this->attrs['paginationHoverBorder'] ) ) {
			$this->handle_border( ".{$this->element_id} .btn-pagination:hover", 'paginationHoverBorder' );
		}

		if ( isset( $this->attrs['paginationHoverBorderResponsive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .btn-pagination:hover",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['paginationHoverBorderResponsive'],
					'device_control' => true,
					'skip_device'    => array(
						'Desktop',
					),
				)
			);
		}

		if ( isset( $this->attrs['paginationShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .btn-pagination",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['paginationShadow'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['paginationHoverShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .btn-pagination:hover",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['paginationHoverShadow'],
					'device_control' => false,
				)
			);
		}
	}
}
