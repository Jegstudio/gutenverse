<?php
/**
 * Gutenverse Testimonials
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\style
 */

namespace Gutenverse\Style;

use Gutenverse\Framework\Style_Abstract;

/**
 * Class Testimonials
 *
 * @package gutenverse\style
 */
class Testimonials extends Style_Abstract {
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
	protected $name = 'testimonials';


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
		if ( isset( $this->attrs['arrowFontSize'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} div[class*='swiper-button-']",
					'property'       => function ( $value ) {
						return "font-size: {$value}px;";
					},
					'value'          => $this->attrs['arrowFontSize'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['arrowColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} div[class*='swiper-button-']",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['arrowColor'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['arrowBgColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} div[class*='swiper-button-']",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['arrowBgColor'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['arrowPadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} div[class*='swiper-button-']",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['arrowPadding'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['arrowMargin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} div[class*='swiper-button-']",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['arrowMargin'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['arrowOpacity'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} div[class*='swiper-button-']",
					'property'       => function ( $value ) {
						$calc = $value / 100;
						return "opacity: {$calc};";
					},
					'value'          => $this->attrs['arrowOpacity'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['arrowBorder'] ) ) {
			$this->handle_border( 'arrowBorder', ".{$this->element_id} div[class*='swiper-button-']" );
		}

		if ( isset( $this->attrs['arrowBorderResponsive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} div[class*='swiper-button-']",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['arrowBorderResponsive'],
					'device_control' => true,
					'skip_device'    => array(
						'Desktop',
					),
				)
			);
		}

		if ( isset( $this->attrs['arrowBoxShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} div[class*='swiper-button-']",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['arrowBoxShadow'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['arrowHoverColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} div[class*='swiper-button-']:not(.swiper-button-disabled):hover",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['arrowHoverColor'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['arrowHoverBgColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} div[class*='swiper-button-']:not(.swiper-button-disabled):hover",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['arrowHoverBgColor'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['arrowHoverPadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} div[class*='swiper-button-']:not(.swiper-button-disabled):hover",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['arrowHoverPadding'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['arrowHoverMargin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} div[class*='swiper-button-']:not(.swiper-button-disabled):hover",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['arrowHoverMargin'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['arrowHoverOpacity'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} div[class*='swiper-button-']:not(.swiper-button-disabled):hover ",
					'property'       => function ( $value ) {
						$calc = $value / 100;
						return "opacity: {$calc};";
					},
					'value'          => $this->attrs['arrowHoverOpacity'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['arrowBorderHover'] ) ) {
			$this->handle_border( 'arrowBorderHover', ".{$this->element_id} div[class*='swiper-button-']:not(.swiper-button-disabled):hover" );
		}

		if ( isset( $this->attrs['arrowBorderHoverResponsive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} div[class*='swiper-button-']:not(.swiper-button-disabled):hover",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['arrowBorderHoverResponsive'],
					'device_control' => true,
					'skip_device'    => array(
						'Desktop',
					),
				)
			);
		}

		if ( isset( $this->attrs['arrowBoxShadowHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}:hover div[class*='swiper-button-']:not(.swiper-button-disabled)",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['arrowBoxShadowHover'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['arrowDisabledColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .swiper-button-disabled",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['arrowDisabledColor'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['arrowDisabledBgColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .swiper-button-disabled",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['arrowDisabledBgColor'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['arrowDisabledPadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .swiper-button-disabled",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['arrowDisabledPadding'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['arrowDisabledMargin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .swiper-button-disabled",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['arrowDisabledMargin'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['arrowDisabledOpacity'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .swiper-button-disabled",
					'property'       => function ( $value ) {
						$calc = $value / 100;
						return "opacity: {$calc} !important;";
					},
					'value'          => $this->attrs['arrowDisabledOpacity'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['arrowBorderDisabled'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .swiper-button-disabled",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['arrowBorderDisabled'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['arrowBoxShadowDisabled'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .swiper-button-disabled",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['arrowBoxShadowDisabled'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['dotsSpacingHorizontal'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .swiper-pagination-bullets .swiper-pagination-bullet",
					'property'       => function ( $value ) {
						return "margin: 0 calc({$value}px / 2);";
					},
					'value'          => $this->attrs['dotsSpacingHorizontal'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['dotsSpacingVertical'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .swiper-pagination-bullets",
					'property'       => function ( $value ) {
						return "margin-top: {$value}px;";
					},
					'value'          => $this->attrs['dotsSpacingVertical'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['dotsWidth'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .swiper-pagination-bullet",
					'property'       => function ( $value ) {
						return "width: {$value}px;";
					},
					'value'          => $this->attrs['dotsWidth'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['dotsHeight'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .swiper-pagination-bullet",
					'property'       => function ( $value ) {
						return "height: {$value}px;";
					},
					'value'          => $this->attrs['dotsHeight'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['dotsRadius'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .swiper-pagination-bullet",
					'property'       => function ( $value ) {
						return $this->handle_border_radius( $value );
					},
					'value'          => $this->attrs['dotsRadius'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['dotsColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .swiper-pagination-bullet",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['dotsColor'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['dotsActiveWidth'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .swiper-pagination-bullet.swiper-pagination-bullet-active",
					'property'       => function ( $value ) {
						return "width: {$value}px;";
					},
					'value'          => $this->attrs['dotsActiveWidth'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['dotsActiveHeight'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .swiper-pagination-bullet.swiper-pagination-bullet-active",
					'property'       => function ( $value ) {
						return "height: {$value}px;";
					},
					'value'          => $this->attrs['dotsActiveHeight'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['dotsActiveRadius'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .swiper-pagination-bullet.swiper-pagination-bullet-active",
					'property'       => function ( $value ) {
						return $this->handle_border_radius( $value );
					},
					'value'          => $this->attrs['dotsActiveRadius'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['dotsActiveColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .swiper-pagination-bullet.swiper-pagination-bullet-active",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['dotsActiveColor'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['alignText'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .testimonial-box",
					'property'       => function ( $value ) {
						return "text-align: {$value};";
					},
					'value'          => $this->attrs['alignText'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['containerMargin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-testimonial-item .testimonial-box",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['containerMargin'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['containerPadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-testimonial-item .testimonial-box",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['containerPadding'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['containerBackground'] ) ) {
			$this->handle_background( ".{$this->element_id} .guten-testimonial-item .testimonial-box", $this->attrs['containerBackground'] );
		}

		if ( isset( $this->attrs['containerBackgroundHover'] ) ) {
			$this->handle_background( ".{$this->element_id} .guten-testimonial-item .testimonial-box:hover", $this->attrs['containerBackgroundHover'] );
		}

		if ( isset( $this->attrs['containerBorder'] ) ) {
			$this->handle_border( 'containerBorder', ".guten-testimonials.{$this->element_id} .swiper-container .guten-testimonial-item .testimonial-box" );
		}

		if ( isset( $this->attrs['containerBorderResponsive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".guten-testimonials.{$this->element_id} .swiper-container .guten-testimonial-item .testimonial-box",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['containerBorderResponsive'],
					'device_control' => true,
					'skip_device'    => array(
						'Desktop',
					),
				)
			);
		}

		if ( isset( $this->attrs['containerBoxShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".guten-testimonials.{$this->element_id} .swiper-container .guten-testimonial-item .testimonial-box",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['containerBoxShadow'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['containerBorderHover'] ) ) {
			$this->handle_border( 'containerBorderHover', ".guten-testimonials.{$this->element_id} .swiper-container .guten-testimonial-item .testimonial-box:hover" );
		}

		if ( isset( $this->attrs['containerBorderHoverResponsive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".guten-testimonials.{$this->element_id} .swiper-container .guten-testimonial-item .testimonial-box:hover",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['containerBorderHoverResponsive'],
					'device_control' => true,
					'skip_device'    => array(
						'Desktop',
					),
				)
			);
		}

		if ( isset( $this->attrs['containerBoxShadowHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-testimonial-item .testimonial-box:hover",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['containerBoxShadowHover'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['nameTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".{$this->element_id} .guten-testimonial-item .testimonial-box .profile-name",
					'property'       => function ( $value ) {},
					'value'          => $this->attrs['nameTypography'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['designationTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".{$this->element_id} .guten-testimonial-item .testimonial-box .profile-des",
					'property'       => function ( $value ) {},
					'value'          => $this->attrs['designationTypography'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['designationSpacing'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-testimonial-item .testimonial-box .profile-des",
					'property'       => function ( $value ) {
						return "margin-top: {$value}px;";
					},
					'value'          => $this->attrs['designationSpacing'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['descriptionTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".{$this->element_id}.guten-testimonials .swiper-container .guten-testimonial-item .testimonial-box .comment-content p",
					'property'       => function ( $value ) {},
					'value'          => $this->attrs['descriptionTypography'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['descriptionMargin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-testimonials .swiper-container .guten-testimonial-item .testimonial-box .comment-content p",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['descriptionMargin'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['quoteSize'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-testimonial-item .testimonial-box .icon-content i",
					'property'       => function ( $value ) {
						return "font-size: {$value}px;";
					},
					'value'          => $this->attrs['quoteSize'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['quoteSize'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-testimonial-item .testimonial-box .icon-content svg",
					'property'       => function ( $value ) {
						return "font-size: {$value}px;";
					},
					'value'          => $this->attrs['quoteSize'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['quotePositionTop'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-testimonials .swiper-container .guten-testimonial-item .testimonial-box .icon-content.quote-override",
					'property'       => function ( $value ) {
						return "top: {$value}px;";
					},
					'value'          => $this->attrs['quotePositionTop'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['quotePositionLeft'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-testimonials .swiper-container .guten-testimonial-item .testimonial-box .icon-content.quote-override",
					'property'       => function ( $value ) {
						return "left: {$value}px;";
					},
					'value'          => $this->attrs['quotePositionLeft'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['nameNormalColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-testimonials .swiper-container .guten-testimonial-item .testimonial-box .profile-info .profile-name",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['nameNormalColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['nameHoverColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-testimonials .swiper-container .guten-testimonial-item:hover .testimonial-box .profile-info .profile-name",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['nameHoverColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['designationNormalColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-testimonials .swiper-container .guten-testimonial-item .testimonial-box .profile-info .profile-des",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['designationNormalColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['designationHoverColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-testimonials .swiper-container .guten-testimonial-item:hover .testimonial-box .profile-info .profile-des",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['designationHoverColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['descriptionNormalColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-testimonials .swiper-container .guten-testimonial-item .testimonial-box .comment-content p",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['descriptionNormalColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['descriptionHoverColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-testimonials .swiper-container .guten-testimonial-item:hover .testimonial-box .comment-content p",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['descriptionHoverColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['quoteNormalColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-testimonial-item .testimonial-box .icon-content i",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['quoteNormalColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['quoteNormalColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-testimonial-item .testimonial-box .icon-content svg",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'fill' );
					},
					'value'          => $this->attrs['quoteNormalColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['quoteHoverColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-testimonial-item:hover .testimonial-box .icon-content i",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['quoteHoverColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['quoteHoverColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-testimonial-item:hover .testimonial-box .icon-content svg",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'fill' );
					},
					'value'          => $this->attrs['quoteHoverColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['imageBackground'] ) ) {
			$this->handle_background( ".{$this->element_id} .guten-testimonial-item .profile-image", $this->attrs['imageBackground'] );
		}

		if ( isset( $this->attrs['imageBorder'] ) ) {
			$this->handle_border( 'imageBorder', ".{$this->element_id}.guten-testimonials .swiper-container .guten-testimonial-item .testimonial-box .profile-image" );
		}

		if ( isset( $this->attrs['imageBorderResponsive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-testimonials .swiper-container .guten-testimonial-item .testimonial-box .profile-image",
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

		if ( isset( $this->attrs['imageRadius'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-testimonial-item .profile-image img",
					'property'       => function ( $value ) {
						return $this->handle_border_radius( $value );
					},
					'value'          => $this->attrs['imageRadius'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['imageMargin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-testimonial-item .profile-image",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['imageMargin'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['imagePadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-testimonial-item .profile-image",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['imagePadding'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['bottomSpace'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-testimonials.style-1 .swiper-container .guten-testimonial-item .testimonial-box .comment-bio",
					'property'       => function ( $value ) {
						return "bottom: {$value}px;";
					},
					'value'          => $this->attrs['bottomSpace'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['imageWidth'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-testimonials .swiper-container .guten-testimonial-item .testimonial-box .profile-image img",
					'property'       => function ( $value ) {
						return "width: {$value}px;";
					},
					'value'          => $this->attrs['imageWidth'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['imageHeight'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-testimonials .swiper-container .guten-testimonial-item .testimonial-box .profile-image img",
					'property'       => function ( $value ) {
						return "height: {$value}px;";
					},
					'value'          => $this->attrs['imageHeight'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['ratingAlignment'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.style-1 ul.rating-stars, .{$this->element_id}.style-2 ul.rating-stars, .{$this->element_id}.style-3 ul.rating-stars, .{$this->element_id}.style-4 ul.rating-stars",
					'property'       => function ( $value ) {
						return "justify-content: {$value};";
					},
					'value'          => $this->attrs['ratingAlignment'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['ratingColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.style-1 .guten-testimonial-item ul.rating-stars li, .{$this->element_id}.style-2 .guten-testimonial-item ul.rating-stars li, .{$this->element_id}.style-3 .guten-testimonial-item ul.rating-stars li, .{$this->element_id}.style-4 .guten-testimonial-item ul.rating-stars li",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['ratingColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['ratingColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.style-1 .guten-testimonial-item ul.rating-stars li svg, .{$this->element_id}.style-2 .guten-testimonial-item ul.rating-stars li svg, .{$this->element_id}.style-3 .guten-testimonial-item ul.rating-stars li svg, .{$this->element_id}.style-4 .guten-testimonial-item ul.rating-stars li svg",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'fill' );
					},
					'value'          => $this->attrs['ratingColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['ratingColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.style-1 .guten-testimonial-item:hover ul.rating-stars li, .{$this->element_id}.style-2 .guten-testimonial-item:hover ul.rating-stars li, .{$this->element_id}.style-3 .guten-testimonial-item:hover ul.rating-stars li, .{$this->element_id}.style-4 .guten-testimonial-item:hover ul.rating-stars li",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['ratingColorHover'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['ratingColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.style-1 .guten-testimonial-item:hover ul.rating-stars li svg, .{$this->element_id}.style-2 .guten-testimonial-item:hover ul.rating-stars li svg, .{$this->element_id}.style-3 .guten-testimonial-item:hover ul.rating-stars li svg, .{$this->element_id}.style-4 .guten-testimonial-item:hover ul.rating-stars li svg",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'fill' );
					},
					'value'          => $this->attrs['ratingColorHover'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['ratingIconSize'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-testimonial-item ul.rating-stars li i",
					'property'       => function ( $value ) {
						return "font-size: {$value}px;";
					},
					'value'          => $this->attrs['ratingIconSize'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['ratingIconSize'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-testimonial-item ul.rating-stars li .gutenverse-icon-svg svg",
					'property'       => function ( $value ) {
						return "font-size: {$value}px;";
					},
					'value'          => $this->attrs['ratingIconSize'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['ratingIconGap'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.style-1 ul.rating-stars, .{$this->element_id}.style-2 ul.rating-stars, .{$this->element_id}.style-3 ul.rating-stars, .{$this->element_id}.style-4 ul.rating-stars",
					'property'       => function ( $value ) {
						return "gap: {$value}px;";
					},
					'value'          => $this->attrs['ratingIconGap'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['ratingMargin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.style-1 ul.rating-stars, .{$this->element_id}.style-2 ul.rating-stars, .{$this->element_id}.style-3 ul.rating-stars, .{$this->element_id}.style-4 ul.rating-stars,
						.{$this->element_id}.style-1 .comment-header ul.rating-stars, .{$this->element_id}.style-2 .comment-header ul.rating-stars, .{$this->element_id}.style-3 .comment-header ul.rating-stars, .{$this->element_id}.style-4 .comment-header ul.rating-stars",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['ratingMargin'],
					'device_control' => true,
				)
			);
		}
	}
}
