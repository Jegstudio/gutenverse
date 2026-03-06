<?php
/**
 * Gutenverse Team
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\style
 */

namespace Gutenverse\Style;

use Gutenverse\Framework\Style_Abstract;

/**
 * Class Team
 *
 * @package gutenverse\style
 */
class Team extends Style_Abstract {
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
	protected $name = 'team';


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
		if ( isset( $this->attrs['hoverBottomColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .border-bottom .animated",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['hoverBottomColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['hoverBottomHeight'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .border-bottom, .{$this->element_id} .border-bottom .animated",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'height' );
					},
					'value'          => $this->attrs['hoverBottomHeight'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['alignment'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .profile-box .profile-card",
					'property'       => function ( $value ) {
						return "text-align: {$value};";
					},
					'value'          => $this->attrs['alignment'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['profilePadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .profile-box .profile-card.card-default,
						.{$this->element_id} .profile-box .profile-card.card-overlay,
						.{$this->element_id} .profile-box .profile-card.card-hover",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['profilePadding'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['detailsPadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .profile-box .profile-card.card-default .profile-body,
						.{$this->element_id} .profile-box .profile-card.card-overlay .profile-body,
						.{$this->element_id} .profile-box .profile-card.card-hover .profile-body",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['detailsPadding'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['profileBorderRadius'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .profile-box .profile-card.card-default,
						.{$this->element_id} .profile-box .profile-card.card-overlay,
						.{$this->element_id} .profile-box .profile-card.card-overlay.scale:hover:before,
						.{$this->element_id} .profile-box .profile-card.card-hover",
					'property'       => function ( $value ) {
						return $this->handle_border_radius( $value );
					},
					'value'          => $this->attrs['profileBorderRadius'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['imgWidth'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .profile-box .profile-card.card-default img,
						.{$this->element_id} .profile-box .profile-card.card-overlay img,
						.{$this->element_id} .profile-box .profile-card.card-title-social-horizontal img,
						.{$this->element_id} .profile-box .profile-card.card-hover img,
						.{$this->element_id} .profile-box .profile-card.card-default .profile-header img,
						.{$this->element_id} .profile-box .profile-card.card-overlay .profile-header img,
						.{$this->element_id} .profile-box .profile-card.card-hover .profile-header img,
						.{$this->element_id} .profile-box .profile-card.card-title-social-horizontal,
						.{$this->element_id} .profile-box .profile-card.card-overlay",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'width' );
					},
					'value'          => $this->attrs['imgWidth'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['imgHeight'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .profile-box .profile-card.card-default img,
						.{$this->element_id} .profile-box .profile-card.card-overlay img,
						.{$this->element_id} .profile-box .profile-card.card-hover img,
						.{$this->element_id} .profile-box .profile-card.card-title-social-horizontal img,
						.{$this->element_id} .profile-box .profile-card.card-default .profile-header img,
						.{$this->element_id} .profile-box .profile-card.card-overlay .profile-header img,
						.{$this->element_id} .profile-box .profile-card.card-hover .profile-header img",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'height' );
					},
					'value'          => $this->attrs['imgHeight'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['imgRotate'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .profile-box .profile-card.card-default img,
						.{$this->element_id} .profile-box .profile-card.card-overlay img,
						.{$this->element_id} .profile-box .profile-card.card-title-social-horizontal img,
						.{$this->element_id} .profile-box .profile-card.card-hover img,
						.{$this->element_id} .profile-box .profile-card.card-default .profile-header img,
						.{$this->element_id} .profile-box .profile-card.card-overlay .profile-header img,
						.{$this->element_id} .profile-box .profile-card.card-hover .profile-header img",
					'property'       => function ( $value ) {
						return "transform: rotate({$value}deg);";
					},
					'value'          => $this->attrs['imgRotate'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['imgSpacing'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .profile-box .profile-card.card-default .profile-header,
						.{$this->element_id} .profile-box .profile-card.card-hover .profile-header",
					'property'       => function ( $value ) {
						return "margin-bottom: {$value}px;";
					},
					'value'          => $this->attrs['imgSpacing'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['nameColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .profile-title, #{$this->element_id} .profile-title, .{$this->element_id} .profile-box .profile-card.card-overlay .profile-body .profile-title, .{$this->element_id} .profile-box .profile-card.card-title-social-horizontal .profile-body .profile-title,
						.{$this->element_id} .profile-title> a, #{$this->element_id} .profile-title> a, .{$this->element_id} .profile-box .profile-card.card-overlay .profile-body .profile-title> a, .{$this->element_id} .profile-box .profile-card.card-title-social-horizontal .profile-body .profile-title> a",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['nameColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['nameColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}:hover .profile-title, #{$this->element_id}:hover .profile-title, .{$this->element_id}:hover .profile-box .profile-card.card-overlay .profile-body .profile-title, .{$this->element_id}:hover .profile-box .profile-card.card-title-social-horizontal .profile-body .profile-title,
						.{$this->element_id}:hover .profile-title> a, #{$this->element_id}:hover .profile-title> a, .{$this->element_id}:hover .profile-box .profile-card.card-overlay .profile-body .profile-title> a, .{$this->element_id}:hover .profile-box .profile-card.card-title-social-horizontal .profile-body .profile-title> a",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['nameColorHover'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['nameTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".{$this->element_id} .profile-title, #{$this->element_id} .profile-title, .{$this->element_id} .profile-box .profile-card.card-overlay .profile-body .profile-title",
					'property'       => function ( $value ) {},
					'value'          => $this->attrs['nameTypography'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['nameTextShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .profile-title, #{$this->element_id} .profile-title, .{$this->element_id} .profile-box .profile-card.card-overlay .profile-body .profile-title",
					'property'       => function ( $value ) {
						return $this->handle_text_shadow( $value );
					},
					'value'          => $this->attrs['nameTextShadow'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['jobColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .profile-sub, #{$this->element_id} .profile-sub, .{$this->element_id} .profile-box .profile-card.card-overlay .profile-body .profile-sub, .{$this->element_id} .profile-box .profile-card.card-title-social-horizontal .profile-body .profile-sub,
						.{$this->element_id} .profile-sub> a, #{$this->element_id} .profile-sub> a, .{$this->element_id} .profile-box .profile-card.card-overlay .profile-body .profile-sub> a, .{$this->element_id} .profile-box .profile-card.card-title-social-horizontal .profile-body .profile-sub> a",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['jobColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['jobColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "
					.{$this->element_id}:hover .profile-sub, 
					#{$this->element_id}:hover .profile-sub, 
					.{$this->element_id}:hover .profile-box .profile-card.card-overlay .profile-body .profile-sub,
					.{$this->element_id}:hover .profile-box .profile-card.card-title-social-horizontal .profile-body .profile-sub,
					.{$this->element_id}:hover .profile-sub> a, 
					#{$this->element_id}:hover .profile-sub> a, 
					.{$this->element_id}:hover .profile-box .profile-card.card-overlay .profile-body .profile-sub> a,
					.{$this->element_id}:hover .profile-box .profile-card.card-title-social-horizontal .profile-body .profile-sub> a",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['jobColorHover'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['jobTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".{$this->element_id} .profile-sub, #{$this->element_id} .profile-sub, .{$this->element_id} .profile-box .profile-card.card-overlay .profile-body .profile-sub,
						.{$this->element_id} .profile-sub> a, #{$this->element_id} .profile-sub> a, .{$this->element_id} .profile-box .profile-card.card-overlay .profile-body .profile-sub> a",
					'property'       => function ( $value ) {},
					'value'          => $this->attrs['jobTypography'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['jobTextShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .profile-sub, #{$this->element_id} .profile-sub, .{$this->element_id} .profile-box .profile-card.card-overlay .profile-body .profile-sub",
					'property'       => function ( $value ) {
						return $this->handle_text_shadow( $value );
					},
					'value'          => $this->attrs['jobTextShadow'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['descColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .profile-desc, #{$this->element_id} .profile-desc, #{$this->element_id} .profile-phone, #{$this->element_id} .profile-email, .{$this->element_id} .profile-box .profile-card.card-overlay .profile-body .profile-desc, .{$this->element_id} .profile-box .profile-card.card-title-social-horizontal .profile-body .profile-desc,
									    .{$this->element_id} .profile-desc> a, #{$this->element_id} .profile-desc> a, #{$this->element_id} .profile-phone> a, #{$this->element_id} .profile-email> a, .{$this->element_id} .profile-box .profile-card.card-overlay .profile-body .profile-desc> a, .{$this->element_id} .profile-box .profile-card.card-title-social-horizontal .profile-body .profile-desc> a",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['descColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['descColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}:hover .profile-desc, #{$this->element_id}:hover .profile-desc, #{$this->element_id}:hover .profile-phone, #{$this->element_id}:hover .profile-email, .{$this->element_id}:hover .profile-box .profile-card.card-overlay .profile-body .profile-desc,
					                    .{$this->element_id}:hover .profile-desc> a, #{$this->element_id}:hover .profile-desc> a, #{$this->element_id}:hover .profile-phone> a, #{$this->element_id}:hover .profile-email> a, .{$this->element_id}:hover .profile-box .profile-card.card-overlay .profile-body .profile-desc> a",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['descColorHover'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['descTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".{$this->element_id} .profile-desc, #{$this->element_id} .profile-desc, #{$this->element_id} .profile-phone, #{$this->element_id} .profile-email, .{$this->element_id} .profile-box .profile-card.card-overlay .profile-body .profile-desc,
					                    .{$this->element_id} .profile-desc> a, #{$this->element_id} .profile-desc> a, #{$this->element_id} .profile-phone> a, #{$this->element_id} .profile-email> a, .{$this->element_id} .profile-box .profile-card.card-overlay .profile-body .profile-desc> a",
					'property'       => function ( $value ) {},
					'value'          => $this->attrs['descTypography'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['descTextShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .profile-desc, #{$this->element_id} .profile-desc, #{$this->element_id} .profile-phone, #{$this->element_id} .profile-email, .{$this->element_id} .profile-box .profile-card.card-overlay .profile-body .profile-desc,
									    .{$this->element_id} .profile-desc> a, #{$this->element_id} .profile-desc> a, #{$this->element_id} .profile-phone> a, #{$this->element_id} .profile-email> a, .{$this->element_id} .profile-box .profile-card.card-overlay .profile-body .profile-desc> a",
					'property'       => function ( $value ) {
						return $this->handle_text_shadow( $value );
					},
					'value'          => $this->attrs['descTextShadow'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['profileBackground'] ) ) {
			$this->handle_background( ".{$this->element_id} .profile-box .profile-card", $this->attrs['profileBackground'] );
		}

		if ( isset( $this->attrs['profileBackgroundHover'] ) ) {
			$this->handle_background( ".{$this->element_id} .profile-box .profile-card:hover", $this->attrs['profileBackgroundHover'] );
		}

		if ( isset( $this->attrs['profileBorder'] ) ) {
			$this->handle_border( 'profileBorder', ".{$this->element_id} .profile-box .profile-card" );
		}

		if ( isset( $this->attrs['profileBorderResponsive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .profile-box .profile-card",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['profileBorderResponsive'],
					'device_control' => true,
					'skip_device'    => array(
						'Desktop',
					),
				)
			);
		}

		if ( isset( $this->attrs['profileBoxShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .profile-box .profile-card",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['profileBoxShadow'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['profileBorderHover'] ) ) {
			$this->handle_border( 'profileBorderHover', ".{$this->element_id} .profile-box .profile-card:hover" );
		}

		if ( isset( $this->attrs['profileBorderHoverResponsive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .profile-box .profile-card:hover",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['profileBorderHoverResponsive'],
					'device_control' => true,
					'skip_device'    => array(
						'Desktop',
					),
				)
			);
		}

		if ( isset( $this->attrs['profileBoxShadowHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .profile-box .profile-card:hover",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['profileBoxShadowHover'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['imageBorder'] ) ) {
			$this->handle_border( 'imageBorder', ".{$this->element_id} .profile-box .profile-card img" );
		}

		if ( isset( $this->attrs['imageBorderResponsive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .profile-box .profile-card img",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['imageBorderResponsive'],
					'device_control' => true,
					'skip_device'    => array(
						'Desktop',
					),
				)
			);
		}

		if ( isset( $this->attrs['imageBoxShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .profile-box .profile-card img",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['imageBoxShadow'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['imageBorderHover'] ) ) {
			$this->handle_border( 'imageBorderHover', ".{$this->element_id} .profile-box .profile-card img:hover" );
		}

		if ( isset( $this->attrs['imageBorderHoverResponsive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .profile-box .profile-card img:hover",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['imageBorderHoverResponsive'],
					'device_control' => true,
					'skip_device'    => array(
						'Desktop',
					),
				)
			);
		}

		if ( isset( $this->attrs['imageBoxShadowHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .profile-box .profile-card img:hover",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['imageBoxShadowHover'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['imageBackground'] ) ) {
			$this->handle_background( ".{$this->element_id} .profile-box .profile-card img", $this->attrs['imageBackground'] );
		}

		if ( isset( $this->attrs['imageBackgroundHover'] ) ) {
			$this->handle_background( ".{$this->element_id} .profile-box .profile-card img:hover", $this->attrs['imageBackgroundHover'] );
		}

		if ( isset( $this->attrs['hoverBgColor'] ) ) {
			$this->handle_background( ".{$this->element_id}.guten-team .profile-box .profile-card.card-overlay:before, .{$this->element_id}.guten-team .profile-box .profile-card.card-title-social-horizontal:before", $this->attrs['hoverBgColor'] );
		}

		if ( isset( $this->attrs['hoverPadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-team .profile-box .profile-card.card-hover:hover .profile-body",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['hoverPadding'],
					'device_control' => true,
				)
			);
		}
		if ( isset( $this->attrs['hoverMargin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-team .profile-box .profile-card.card-hover:hover .profile-body",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['hoverMargin'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['nameSpace'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .profile-title, #{$this->element_id} .profile-title, .{$this->element_id} .profile-box .profile-card.card-overlay .profile-body .profile-title",
					'property'       => function ( $value ) {
						return "margin-bottom: {$value}px;";
					},
					'value'          => $this->attrs['nameSpace'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['jobSpace'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .profile-sub, #{$this->element_id} .profile-sub, .{$this->element_id} .profile-box .profile-card.card-overlay .profile-body .profile-sub",
					'property'       => function ( $value ) {
						return "margin-bottom: {$value}px;";
					},
					'value'          => $this->attrs['jobSpace'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['descSpace'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .profile-desc, #{$this->element_id} .profile-desc, #{$this->element_id} .profile-phone, #{$this->element_id} .profile-email, .{$this->element_id} .profile-box .profile-card.card-overlay .profile-body .profile-desc",
					'property'       => function ( $value ) {
						return "margin-bottom: {$value}px;";
					},
					'value'          => $this->attrs['descSpace'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['hoverContentBgColor'] ) ) {
			$this->handle_background( ".{$this->element_id}.guten-team .profile-box .profile-card.card-hover .profile-body:before", $this->attrs['hoverContentBgColor'] );
		}

		if ( isset( $this->attrs['hoverContentBorder'] ) ) {
			$this->handle_border( 'hoverContentBorder', ".{$this->element_id}.guten-team .profile-box .profile-card.card-hover .profile-body:before" );
		}

		if ( isset( $this->attrs['hoverContentBorderResponsive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-team .profile-box .profile-card.card-hover .profile-body:before",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['hoverContentBorderResponsive'],
					'device_control' => true,
					'skip_device'    => array(
						'Desktop',
					),
				)
			);
		}

		if ( isset( $this->attrs['hoverContentShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-team .profile-box .profile-card.card-hover .profile-body:before",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['hoverContentShadow'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['overlayProfilePosition'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-team .profile-box .profile-card.card-overlay:hover .profile-body",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'margin-bottom' );
					},
					'value'          => $this->attrs['overlayProfilePosition'],
					'device_control' => true,
				)
			);
		}
		if ( isset( $this->attrs['titleHorizontal'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-team .profile-box .profile-card.card-title-social-horizontal .profile-title",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'left' );
					},
					'value'          => $this->attrs['titleHorizontal'],
					'device_control' => true,
				)
			);
		}
		if ( isset( $this->attrs['titleVertical'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-team .profile-box .profile-card.card-title-social-horizontal .profile-title",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'bottom' );
					},
					'value'          => $this->attrs['titleVertical'],
					'device_control' => true,
				)
			);
		}
		if ( isset( $this->attrs['titleOpacity'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-team .profile-box .profile-card.card-title-social-horizontal .profile-title",
					'property'       => function ( $value ) {
						return "opacity: {$value};";
					},
					'value'          => $this->attrs['titleOpacity'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['titleHorizontalHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-team .profile-box .profile-card.card-title-social-horizontal:hover .profile-title",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'left' );
					},
					'value'          => $this->attrs['titleHorizontalHover'],
					'device_control' => true,
				)
			);
		}
		if ( isset( $this->attrs['titleVerticalHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-team .profile-box .profile-card.card-title-social-horizontal:hover .profile-title",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'bottom' );
					},
					'value'          => $this->attrs['titleVerticalHover'],
					'device_control' => true,
				)
			);
		}
		if ( isset( $this->attrs['titleOpacityHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-team .profile-box .profile-card.card-title-social-horizontal:hover .profile-title",
					'property'       => function ( $value ) {
						return "opacity: {$value};";
					},
					'value'          => $this->attrs['titleOpacityHover'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['jobHorizontal'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-team .profile-box .profile-card.card-title-social-horizontal .profile-sub",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'right' );
					},
					'value'          => $this->attrs['jobHorizontal'],
					'device_control' => true,
				)
			);
		}
		if ( isset( $this->attrs['jobVertical'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-team .profile-box .profile-card.card-title-social-horizontal .profile-sub",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'top' );
					},
					'value'          => $this->attrs['jobVertical'],
					'device_control' => true,
				)
			);
		}
		if ( isset( $this->attrs['jobOpacity'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-team .profile-box .profile-card.card-title-social-horizontal .profile-sub",
					'property'       => function ( $value ) {
						return "opacity: {$value};";
					},
					'value'          => $this->attrs['jobOpacity'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['jobHorizontalHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-team .profile-box .profile-card.card-title-social-horizontal:hover .profile-sub",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'right' );
					},
					'value'          => $this->attrs['jobHorizontalHover'],
					'device_control' => true,
				)
			);
		}
		if ( isset( $this->attrs['jobVerticalHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-team .profile-box .profile-card.card-title-social-horizontal:hover .profile-sub",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'top' );
					},
					'value'          => $this->attrs['jobVerticalHover'],
					'device_control' => true,
				)
			);
		}
		if ( isset( $this->attrs['jobOpacityHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-team .profile-box .profile-card.card-title-social-horizontal:hover .profile-sub",
					'property'       => function ( $value ) {
						return "opacity: {$value};";
					},
					'value'          => $this->attrs['jobOpacityHover'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['descHorizontal'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-team .profile-box .profile-card.card-title-social-horizontal .profile-desc",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'left' );
					},
					'value'          => $this->attrs['descHorizontal'],
					'device_control' => true,
				)
			);
		}
		if ( isset( $this->attrs['descVertical'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-team .profile-box .profile-card.card-title-social-horizontal .profile-desc",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'top' );
					},
					'value'          => $this->attrs['descVertical'],
					'device_control' => true,
				)
			);
		}
		if ( isset( $this->attrs['descOpacity'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-team .profile-box .profile-card.card-title-social-horizontal .profile-desc",
					'property'       => function ( $value ) {
						return "opacity: {$value};";
					},
					'value'          => $this->attrs['descOpacity'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['descHorizontalHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-team .profile-box .profile-card.card-title-social-horizontal:hover .profile-desc",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'left' );
					},
					'value'          => $this->attrs['descHorizontalHover'],
					'device_control' => true,
				)
			);
		}
		if ( isset( $this->attrs['descVerticalHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-team .profile-box .profile-card.card-title-social-horizontal:hover .profile-desc",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'top' );
					},
					'value'          => $this->attrs['descVerticalHover'],
					'device_control' => true,
				)
			);
		}
		if ( isset( $this->attrs['descOpacityHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-team .profile-box .profile-card.card-title-social-horizontal:hover .profile-desc",
					'property'       => function ( $value ) {
						return "opacity: {$value};";
					},
					'value'          => $this->attrs['descOpacityHover'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['socialHorizontal'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-team .profile-box .profile-card.card-title-social-horizontal .socials-wrapper",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'right' );
					},
					'value'          => $this->attrs['socialHorizontal'],
					'device_control' => true,
				)
			);
		}
		if ( isset( $this->attrs['socialVertical'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-team .profile-box .profile-card.card-title-social-horizontal .socials-wrapper",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'bottom' );
					},
					'value'          => $this->attrs['socialVertical'],
					'device_control' => true,
				)
			);
		}
		if ( isset( $this->attrs['socialOpacity'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-team .profile-box .profile-card.card-title-social-horizontal .socials-wrapper",
					'property'       => function ( $value ) {
						return "opacity: {$value};";
					},
					'value'          => $this->attrs['socialOpacity'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['socialHorizontalHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-team .profile-box .profile-card.card-title-social-horizontal:hover .socials-wrapper",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'right' );
					},
					'value'          => $this->attrs['socialHorizontalHover'],
					'device_control' => true,
				)
			);
		}
		if ( isset( $this->attrs['socialVerticalHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-team .profile-box .profile-card.card-title-social-horizontal:hover .socials-wrapper",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'bottom' );
					},
					'value'          => $this->attrs['socialVerticalHover'],
					'device_control' => true,
				)
			);
		}
		if ( isset( $this->attrs['socialOpacityHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-team .profile-box .profile-card.card-title-social-horizontal:hover .socials-wrapper",
					'property'       => function ( $value ) {
						return "opacity: {$value};";
					},
					'value'          => $this->attrs['socialOpacityHover'],
					'device_control' => false,
				)
			);
		}
	}
}
