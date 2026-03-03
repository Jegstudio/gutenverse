<?php
/**
 * Gutenverse Dynamic Pagination Numbers Style
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\style
 */

namespace Gutenverse\Style;

use Gutenverse\Framework\Style_Abstract;

/**
 * Class Dynamic_Pagination_Numbers
 *
 * @package gutenverse\style
 */
class Dynamic_Pagination_Numbers extends Style_Abstract {
	/**
	 * Block Name
	 *
	 * @var array
	 */
	protected $name = 'dynamic-pagination-numbers';

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
					'selector' => ".{$this->element_id} .btn-pagination, .{$this->element_id} span",
					'value'    => $this->attrs['paginationTypography'],
				)
			);
		}

		if ( isset( $this->attrs['paginationMargin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .btn-pagination, .{$this->element_id} span",
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
					'selector'       => ".{$this->element_id} .btn-pagination, .{$this->element_id} span",
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
					'selector'       => ".{$this->element_id} .btn-pagination, .{$this->element_id} span",
					'property'       => function ( $value ) {
						return "width: {$value}%;";
					},
					'value'          => $this->attrs['paginationWidth'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['paginationColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .btn-pagination, .{$this->element_id} span",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['paginationColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['paginationCurrentColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .btn-pagination.current",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['paginationCurrentColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['paginationHoverColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .btn-pagination:not(.disabled):not(.current):hover, .{$this->element_id} span:hover",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['paginationHoverColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['paginationBackground'] ) ) {
			$this->handle_background( ".{$this->element_id} .btn-pagination, .{$this->element_id} span", $this->attrs['paginationBackground'] );
		}

		if ( isset( $this->attrs['paginationCurrentBackground'] ) ) {
			$this->handle_background( ".{$this->element_id} .btn-pagination.current", $this->attrs['paginationCurrentBackground'] );
		}

		if ( isset( $this->attrs['paginationHoverBackground'] ) ) {
			$this->handle_background( ".{$this->element_id} .btn-pagination:not(.disabled):not(.current):hover, .{$this->element_id} span:hover", $this->attrs['paginationHoverBackground'] );
		}

		if ( isset( $this->attrs['paginationBorder'] ) ) {
			$this->handle_border( ".{$this->element_id} .btn-pagination, .{$this->element_id} span", 'paginationBorder' );
		}

		if ( isset( $this->attrs['paginationBorderResponsive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .btn-pagination, .{$this->element_id} span",
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
			$this->handle_border( ".{$this->element_id} .btn-pagination:not(.disabled):not(.current):hover, .{$this->element_id} span:hover", 'paginationHoverBorder' );
		}

		if ( isset( $this->attrs['paginationHoverBorderResponsive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .btn-pagination:not(.disabled):not(.current):hover, .{$this->element_id} span:hover",
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
					'selector'       => ".{$this->element_id} .btn-pagination, .{$this->element_id} span",
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
					'selector'       => ".{$this->element_id} .btn-pagination:not(.disabled):not(.current):hover, .{$this->element_id} span:hover",
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
