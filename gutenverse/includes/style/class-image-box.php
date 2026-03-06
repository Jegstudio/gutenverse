<?php
/**
 * Gutenverse Image Box
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\style
 */

namespace Gutenverse\Style;

use Gutenverse\Framework\Style_Abstract;

/**
 * Class Image Box
 *
 * @package gutenverse\style
 */
class Image_Box extends Style_Abstract {
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
	protected $name = 'image-box';

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
		if ( isset( $this->attrs['imagePosition'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .inner-container",
					'property'       => function ( $value ) {
						return "flex-direction: {$value};";
					},
					'value'          => $this->attrs['imagePosition'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['bodyAlignment'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .inner-container .image-box-body .body-inner",
					'property'       => function ( $value ) {
						return "text-align: {$value};";
					},
					'value'          => $this->attrs['bodyAlignment'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['hoverBottomColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .inner-container .border-bottom .animated",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['hoverBottomColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['imageMargin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .inner-container .image-box-header",
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
					'selector'       => ".{$this->element_id} .inner-container .image-box-header img",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['imagePadding'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['imageBoxShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .inner-container .image-box-header",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['imageBoxShadow'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['imageBorderRadius'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .inner-container .image-box-header",
					'property'       => function ( $value ) {
						return $this->handle_border_radius( $value );
					},
					'value'          => $this->attrs['imageBorderRadius'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['imageHeight'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .inner-container .image-box-header img",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'height' );
					},
					'value'          => $this->attrs['imageHeight'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['imageFit'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .inner-container .image-box-header img",
					'property'       => function ( $value ) {
						return "object-fit: {$value};";
					},
					'value'          => $this->attrs['imageFit'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['imageOpacity'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .inner-container .image-box-header img",
					'property'       => function ( $value ) {
						if (  1 < $value && 100 >= $value ) {
							$value = $value / 100;
						}
						return "opacity: {$value};";
					},
					'value'          => $this->attrs['imageOpacity'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['imageHoverOpacity'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}:hover .inner-container .image-box-header img",
					'property'       => function ( $value ) {
						if ( 1 < $value && 100 >= $value ) {
							$value = $value / 100;
						}
						return "opacity: {$value};";
					},
					'value'          => $this->attrs['imageHoverOpacity'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['imageHoverScale'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}:hover .inner-container .image-box-header img",
					'property'       => function ( $value ) {
						return "-webkit-transform: scale({$value}); 
						-o-transform: scale({$value}); 
						-moz-transform: scale({$value}); 
						-ms-transform: scale({$value}); 
						transform: scale({$value});";
					},
					'value'          => $this->attrs['imageHoverScale'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['imageFilter'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .inner-container .image-box-header img",
					'property'       => function ( $value ) {
						$brightness = ! gutenverse_truly_empty( $value['brightness'] ) ? $value['brightness'] . '%' : '100%';
						$contrast = ! gutenverse_truly_empty( $value['contrast'] ) ? $value['contrast'] . '%' : '100%';
						$saturation = ! gutenverse_truly_empty( $value['saturation'] ) ? $value['saturation'] . '%' : '100%';
						$blur = ! gutenverse_truly_empty( $value['blur'] ) ? $value['blur'] . 'px' : '0px';
						$hue = ! gutenverse_truly_empty( $value['hue'] ) ? $value['hue'] . 'deg' : '0deg';

						return "filter: brightness({$brightness}) contrast({$contrast}) saturate({$saturation}) blur({$blur})hue-rotate({$hue});";
					},
					'value'          => $this->attrs['imageFilter'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['imageFilterHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}:hover .inner-container .image-box-header img",
					'property'       => function ( $value ) {
						$brightness = ! gutenverse_truly_empty( $value['brightness'] ) ? $value['brightness'] . '%' : '100%';
						$contrast = ! gutenverse_truly_empty( $value['contrast'] ) ? $value['contrast'] . '%' : '100%';
						$saturation = ! gutenverse_truly_empty( $value['saturation'] ) ? $value['saturation'] . '%' : '100%';
						$blur = ! gutenverse_truly_empty( $value['blur'] ) ? $value['blur'] . 'px' : '0px';
						$hue = ! gutenverse_truly_empty( $value['hue'] ) ? $value['hue'] . 'deg' : '0deg';

						return "filter: brightness({$brightness}) contrast({$contrast}) saturate({$saturation}) blur({$blur})hue-rotate({$hue});";
					},
					'value'          => $this->attrs['imageFilterHover'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['bodyBackground'] ) ) {
			$this->handle_background( ".{$this->element_id} .inner-container .image-box-body .body-inner", $this->attrs['bodyBackground'] );
		}

		if ( isset( $this->attrs['containerBorder'] ) ) {
			$this->handle_border( 'containerBorder', ".{$this->element_id} .image-box-body .body-inner" );
		}

		if ( isset( $this->attrs['containerBorderResponsive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .inner-container .image-box-body .body-inner",
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
					'selector'       => ".{$this->element_id} .inner-container .image-box-body .body-inner",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['containerBoxShadow'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['containerPadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .inner-container .image-box-body .body-inner",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['containerPadding'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['containerMargin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .inner-container .image-box-body .body-inner",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['containerMargin'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['titleMargin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .inner-container .image-box-body .body-title",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['titleMargin'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['titleTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".{$this->element_id} .inner-container .image-box-body .body-title",
					'property'       => function ( $value ) {},
					'value'          => $this->attrs['titleTypography'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['titleIconSize'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .inner-container .image-box-body .body-title i",
					'property'       => function ( $value ) {
						return "font-size: {$value}px;";
					},
					'value'          => $this->attrs['titleIconSize'],
					'device_control' => true,
				)
			);

			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .inner-container .image-box-body .body-title svg",
					'property'       => function ( $value ) {
						return "font-size: {$value}px;";
					},
					'value'          => $this->attrs['titleIconSize'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['titleIconSpacing'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .inner-container .image-box-body .body-title.icon-position-before i, .{$this->element_id} .inner-container .image-box-body .body-title.icon-position-before .gutenverse-icon-svg",
					'property'       => function ( $value ) {
						return "margin-right: {$value}px;";
					},
					'value'          => $this->attrs['titleIconSpacing'],
					'device_control' => true,
				)
			);

			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .inner-container .image-box-body .body-title.icon-position-after i, .{$this->element_id} .inner-container .image-box-body .body-title.icon-position-after .gutenverse-icon-svg",
					'property'       => function ( $value ) {
						return "margin-left: {$value}px;";
					},
					'value'          => $this->attrs['titleIconSpacing'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['titleNormalColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .inner-container .image-box-body .body-title, .{$this->element_id} .image-box-body .body-title a",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['titleNormalColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['titleNormalIconColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .inner-container .image-box-body .body-title i",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['titleNormalIconColor'],
					'device_control' => false,
				)
			);

			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .inner-container .image-box-body .body-title svg",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'fill' );
					},
					'value'          => $this->attrs['titleNormalIconColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['titleHoverColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}:hover .inner-container .image-box-body .body-title, .{$this->element_id}:hover .image-box-body .body-title a",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['titleHoverColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['titleHoverIconColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}:hover .inner-container .image-box-body .body-title i",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['titleHoverIconColor'],
					'device_control' => false,
				)
			);

			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}:hover .inner-container .image-box-body .body-title svg",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'fill' );
					},
					'value'          => $this->attrs['titleHoverIconColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['descriptionMargin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .inner-container .image-box-body .body-inner .body-description",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['descriptionMargin'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['descriptionTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".{$this->element_id} .inner-container .image-box-body .body-inner .body-description",
					'property'       => function ( $value ) {},
					'value'          => $this->attrs['descriptionTypography'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['descriptionNormalColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .inner-container .image-box-body .body-inner .body-description",
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
					'selector'       => ".{$this->element_id}:hover .inner-container .image-box-body .body-inner .body-description",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['descriptionHoverColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['floatMarginTop'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.style-floating .inner-container .image-box-body .body-inner",
					'property'       => function ( $value ) {
						return "margin-top: {$value}px;";
					},
					'value'          => $this->attrs['floatMarginTop'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['floatWidth'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.style-floating .inner-container .image-box-body",
					'property'       => function ( $value ) {
						return "width: {$value}%;";
					},
					'value'          => $this->attrs['floatWidth'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['floatHeight'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.style-floating .inner-container .image-box-body .body-inner",
					'property'       => function ( $value ) {
						return "height: {$value}px;";
					},
					'value'          => $this->attrs['floatHeight'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['floatHeightHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.style-floating:hover .inner-container .image-box-body .body-inner",
					'property'       => function ( $value ) {
						return "height: {$value}px;";
					},
					'value'          => $this->attrs['floatHeightHover'],
					'device_control' => true,
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
	}
}
