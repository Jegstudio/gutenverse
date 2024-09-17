<?php
/**
 * Gutenverse Post_Block
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\style
 */

namespace Gutenverse\Style;

use Gutenverse\Framework\Style_Abstract;

/**
 * Class Post_Block
 *
 * @package gutenverse\style
 */
class Post_Block extends Style_Abstract {
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
	protected $name = 'post-block';

	/**
	 * Constructor
	 *
	 * @param array $attrs Attribute.
	 */
	public function __construct( $attrs ) {
		parent::__construct( $attrs );

		$this->set_feature(
			array(
				'background'  => array(
					'normal' => ".{$this->element_id}.guten-element",
					'hover'  => ".{$this->element_id}.guten-element:hover",
				),
				'border'      => array(
					'normal' => ".{$this->element_id}.guten-element",
					'hover'  => ".{$this->element_id}.guten-element:hover",
				),
				'positioning' => ".{$this->element_id}.guten-element",
				'animation'   => ".{$this->element_id}.guten-element",
				'advance'     => ".{$this->element_id}.guten-element",
				'transform'   => array(
					'normal' => ".{$this->element_id}.guten-element",
					'hover'  => ".{$this->element_id}.guten-element:hover",
				),
				'mask'        => null,
			)
		);
	}

	/**
	 * Generate style base on attribute.
	 */
	public function generate() {
		if ( isset( $this->attrs['column'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-postblock .guten-posts",
					'property'       => function ( $value ) {
						return "grid-template-columns: repeat({$value}, minmax(0, 1fr));";
					},
					'value'          => $this->attrs['column'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['postItemGap'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-postblock .guten-posts",
					'property'       => function ( $value ) {
						return "grid-column-gap:{$value}px;";
					},
					'value'          => $this->attrs['postItemGap'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['postItemBackground'] ) ) {
			$this->handle_background( ".{$this->element_id} .guten-postblock .guten-post", $this->attrs['postItemBackground'] );
		}

		if ( isset( $this->attrs['postItemMargin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-postblock .guten-post",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['postItemMargin'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['postItemPadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-postblock .guten-post",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['postItemPadding'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['postItemBorder'] ) ) {
			$this->handle_border( 'postItemBorder', ".{$this->element_id} .guten-postblock .guten-post" );
		}

		if ( isset( $this->attrs['postItemBorderResponsive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-postblock .guten-post",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['postItemBorderResponsive'],
					'device_control' => true,
					'skip_device'    => array(
						'Desktop',
					),
				)
			);
		}

		if ( isset( $this->attrs['postItemBoxShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-postblock .guten-post",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['postItemBoxShadow'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['thumbnailWidth'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-postblock:not(.postblock-type-5) .guten-thumb, .{$this->element_id} .guten-postblock.postblock-type-5 .guten-post",
					'property'       => function ( $value ) {
						return "width: {$value}%; flex-basis: {$value}%;";
					},
					'value'          => $this->attrs['thumbnailWidth'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['thumbnailBackground'] ) ) {
			$this->handle_background( ".{$this->element_id} .guten-postblock .guten-overlay", $this->attrs['thumbnailBackground'] );
		}

		if ( isset( $this->attrs['thumbnailOverlayOpacity'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-postblock .guten-overlay",
					'property'       => function ( $value ) {
						return "opacity: {$value};";
					},
					'value'          => $this->attrs['thumbnailOverlayOpacity'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['thumbnailMargin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-postblock .guten-thumb",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['thumbnailMargin'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['thumbnailPadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-postblock .guten-thumb",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['thumbnailPadding'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['thumbnailBorder'] ) ) {
			$this->handle_border( 'thumbnailBorder', ".{$this->element_id} .guten-postblock .guten-thumb" );
		}

		if ( isset( $this->attrs['thumbnailBorderResponsive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-postblock .guten-thumb",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['thumbnailBorderResponsive'],
					'device_control' => true,
					'skip_device'    => array(
						'Desktop',
					),
				)
			);
		}

		if ( isset( $this->attrs['thumbnailBoxShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-postblock .guten-thumb",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['thumbnailBoxShadow'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['thumbnailHeight'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-postblock .guten-thumb .thumbnail-container",
					'property'       => function ( $value ) {
						return "height: {$value}px; padding-bottom: 0;";
					},
					'value'          => $this->attrs['thumbnailHeight'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['thumbnailContainerBackground'] ) ) {
			$this->handle_background( ".{$this->element_id} .guten-postblock .guten-thumb .thumbnail-container", $this->attrs['thumbnailContainerBackground'] );
		}

		if ( isset( $this->attrs['thumbnailRadius'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-postblock .guten-thumb .thumbnail-container",
					'property'       => function ( $value ) {
						return $this->handle_border_radius( $value );
					},
					'value'          => $this->attrs['thumbnailRadius'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['thumbnailContainerShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-postblock .guten-thumb .thumbnail-container",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['thumbnailContainerShadow'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['contentAlign'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-postblock .guten-postblock-content",
					'property'       => function ( $value ) {
						return "text-align: {$value};";
					},
					'value'          => $this->attrs['contentAlign'],
					'device_control' => true,
				)
			);

			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-postblock .guten-postblock-content .guten-post-meta-bottom",
					'property'       => function ( $value ) {
						return "justify-content: {$this->handle_align_reverse($value)};";
					},
					'value'          => $this->attrs['contentAlign'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['contentContainerBackground'] ) ) {
			$this->handle_background( ".{$this->element_id} .guten-postblock .guten-postblock-content", $this->attrs['contentContainerBackground'] );
		}

		if ( isset( $this->attrs['contentMargin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-postblock .guten-postblock-content",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['contentMargin'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['contentPadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-postblock .guten-postblock-content",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['contentPadding'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['contentBorder'] ) ) {
			$this->handle_border( 'contentBorder', ".{$this->element_id} .guten-postblock .guten-postblock-content" );
		}

		if ( isset( $this->attrs['contentBorderResponsive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-postblock .guten-postblock-content",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['contentBorderResponsive'],
					'device_control' => true,
					'skip_device'    => array(
						'Desktop',
					),
				)
			);
		}

		if ( isset( $this->attrs['contentContainerShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-postblock .guten-postblock-content",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['contentContainerShadow'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['categoryColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-postblock .guten-post-category a",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['categoryColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['categoryTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector' => ".{$this->element_id} .guten-postblock .guten-post-category a",
					'value'    => $this->attrs['categoryTypography'],
				)
			);
		}

		if ( isset( $this->attrs['categoryBackground'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-postblock .guten-post-category",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background' );
					},
					'value'          => $this->attrs['categoryBackground'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['categoryMargin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-postblock .guten-post-category",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['categoryMargin'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['categoryPadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-postblock .guten-post-category",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['categoryPadding'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['categoryBorder'] ) ) {
			$this->handle_border( 'categoryBorder', ".{$this->element_id} .guten-postblock .guten-post-category" );
		}

		if ( isset( $this->attrs['categoryBorderResponsive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-postblock .guten-post-category",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['categoryBorderResponsive'],
					'device_control' => true,
					'skip_device'    => array(
						'Desktop',
					),
				)
			);
		}

		if ( isset( $this->attrs['categoryShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-postblock .guten-post-category",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['categoryShadow'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['titleMargin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-postblock .guten-post .guten-postblock-content .guten-post-title",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['titleMargin'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['titleColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-postblock .guten-post .guten-postblock-content .guten-post-title a",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['titleColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['titleTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector' => ".{$this->element_id} .guten-postblock .guten-post .guten-postblock-content .guten-post-title a",
					'value'    => $this->attrs['titleTypography'],
				)
			);
		}

		if ( isset( $this->attrs['titleColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-postblock .guten-post:hover .guten-postblock-content .guten-post-title a",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['titleColorHover'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['titleTypographyHover'] ) ) {
			$this->inject_typography(
				array(
					'selector' => ".{$this->element_id} .guten-postblock .guten-post:hover .guten-postblock-content .guten-post-title a",
					'value'    => $this->attrs['titleTypographyHover'],
				)
			);
		}

		if ( isset( $this->attrs['excerptMargin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-postblock .guten-post .guten-postblock-content .guten-post-excerpt",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['excerptMargin'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['excerptColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-postblock .guten-post .guten-postblock-content .guten-post-excerpt p",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['excerptColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['excerptTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector' => ".{$this->element_id} .guten-postblock .guten-post .guten-postblock-content .guten-post-excerpt p",
					'value'    => $this->attrs['excerptTypography'],
				)
			);
		}

		if ( isset( $this->attrs['readmoreTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector' => ".{$this->element_id} .guten-postblock .guten-post .guten-postblock-content .guten-readmore",
					'value'    => $this->attrs['readmoreTypography'],
				)
			);
		}

		if ( isset( $this->attrs['readmoreMargin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-postblock .guten-post .guten-postblock-content .guten-readmore",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['readmoreMargin'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['readmorePadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-postblock .guten-post .guten-postblock-content .guten-readmore",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['readmorePadding'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['readmoreSpacing'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-postblock .guten-post .guten-postblock-content .guten-meta-readmore.icon-position-before .guten-readmore i",
					'property'       => function ( $value ) {
						return "margin-right: {$value}px;";
					},
					'value'          => $this->attrs['readmoreSpacing'],
					'device_control' => true,
				)
			);

			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-postblock .guten-post .guten-postblock-content .guten-meta-readmore.icon-position-after .guten-readmore i",
					'property'       => function ( $value ) {
						return "margin-left: {$value}px;";
					},
					'value'          => $this->attrs['readmoreSpacing'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['readmoreIconSize'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-postblock .guten-post .guten-postblock-content .guten-meta-readmore .guten-readmore i",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'font-size' );
					},
					'value'          => $this->attrs['readmoreIconSize'],
					'device_control' => true,
				)
			);
		}
		if ( isset( $this->attrs['readmoreWidth'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-postblock .guten-post .guten-postblock-content .guten-meta-readmore .guten-readmore",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'width' );
					},
					'value'          => $this->attrs['readmoreWidth'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['readmoreAlign'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-postblock .guten-post .guten-postblock-content .guten-meta-readmore .guten-readmore",
					'property'       => function ( $value ) {
						return "justify-content: $value;";
					},
					'value'          => $this->attrs['readmoreAlign'],
					'device_control' => true,
				)
			);
		}


		if ( isset( $this->attrs['readmoreColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-postblock .guten-post .guten-postblock-content .guten-meta-readmore a",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['readmoreColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['readmoreHoverColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-postblock .guten-post .guten-postblock-content .guten-meta-readmore:hover a",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['readmoreHoverColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['readmoreBackground'] ) ) {
			$this->handle_background( ".{$this->element_id} .guten-postblock .guten-post .guten-postblock-content .guten-meta-readmore a", $this->attrs['readmoreBackground'] );
		}

		if ( isset( $this->attrs['readmoreHoverBackground'] ) ) {
			$this->handle_background( ".{$this->element_id} .guten-postblock .guten-post .guten-postblock-content .guten-meta-readmore:hover a", $this->attrs['readmoreHoverBackground'] );
		}

		if ( isset( $this->attrs['readmoreBorder'] ) ) {
			$this->handle_border( 'readmoreBorder', ".{$this->element_id} .guten-postblock .guten-post .guten-postblock-content .guten-meta-readmore a" );
		}

		if ( isset( $this->attrs['readmoreBorderResponsive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-postblock .guten-post .guten-postblock-content .guten-meta-readmore a",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['readmoreBorderResponsive'],
					'device_control' => true,
					'skip_device'    => array(
						'Desktop',
					),
				)
			);
		}

		if ( isset( $this->attrs['readmoreShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-postblock .guten-post .guten-postblock-content .guten-meta-readmore a",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['readmoreShadow'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['readmoreHoverBorder'] ) ) {
			$this->handle_border( 'readmoreHoverBorder', ".{$this->element_id} .guten-postblock .guten-post .guten-postblock-content .guten-meta-readmore:hover a" );
		}

		if ( isset( $this->attrs['readmoreHoverBorderResponsive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-postblock .guten-post .guten-postblock-content .guten-meta-readmore:hover a",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['readmoreHoverBorderResponsive'],
					'device_control' => true,
					'skip_device'    => array(
						'Desktop',
					),
				)
			);
		}

		if ( isset( $this->attrs['readmoreHoverShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-postblock .guten-post .guten-postblock-content .guten-meta-readmore:hover a",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['readmoreHoverShadow'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['commentColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-postblock .guten-post .guten-postblock-content .guten-meta-comment a",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['commentColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['commentSize'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-postblock .guten-post .guten-postblock-content .guten-meta-comment a",
					'property'       => function ( $value ) {
						return "font-size: {$value}px;";
					},
					'value'          => $this->attrs['commentSize'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['commentSpacing'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-postblock .guten-post .guten-postblock-content .guten-meta-comment.icon-position-before span",
					'property'       => function ( $value ) {
						return "margin-left: {$value}px;";
					},
					'value'          => $this->attrs['commentSpacing'],
					'device_control' => true,
				)
			);

			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-postblock .guten-post .guten-postblock-content .guten-meta-comment.icon-position-after span",
					'property'       => function ( $value ) {
						return "margin-right: {$value}px;";
					},
					'value'          => $this->attrs['commentSpacing'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['commentMargin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-postblock .guten-post .guten-postblock-content .guten-meta-comment",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['commentMargin'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['commentPadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-postblock .guten-post .guten-postblock-content .guten-meta-comment",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['commentPadding'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['metaTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector' => ".{$this->element_id} .guten-postblock .guten-postblock-content .guten-post-meta",
					'value'    => $this->attrs['metaTypography'],
				)
			);
		}

		if ( isset( $this->attrs['metaColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-postblock .guten-postblock-content .guten-post-meta",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['metaColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['metaAuthorTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector' => ".{$this->element_id} .guten-postblock .guten-postblock-content .guten-post-meta .guten-meta-author a",
					'value'    => $this->attrs['metaAuthorTypography'],
				)
			);
		}

		if ( isset( $this->attrs['metaAuthorColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-postblock .guten-postblock-content .guten-post-meta .guten-meta-author a",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['metaAuthorColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['metaMargin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-postblock .guten-postblock-content .guten-post-meta",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['metaMargin'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['metaAuthorIconSpacing'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-postblock .guten-postblock-content .guten-post-meta .guten-meta-author.icon-position-before i",
					'property'       => function ( $value ) {
						return "margin-right: {$value}px;";
					},
					'value'          => $this->attrs['metaAuthorIconSpacing'],
					'device_control' => true,
				)
			);

			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-postblock .guten-postblock-content .guten-post-meta .guten-meta-author.icon-position-after i",
					'property'       => function ( $value ) {
						return "margin-left: {$value}px;";
					},
					'value'          => $this->attrs['metaAuthorIconSpacing'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['metaDateIconSpacing'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-postblock .guten-postblock-content .guten-post-meta .guten-meta-date.icon-position-before i",
					'property'       => function ( $value ) {
						return "margin-right: {$value}px;";
					},
					'value'          => $this->attrs['metaDateIconSpacing'],
					'device_control' => true,
				)
			);

			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-postblock .guten-postblock-content .guten-post-meta .guten-meta-date.icon-position-after i",
					'property'       => function ( $value ) {
						return "margin-left: {$value}px;";
					},
					'value'          => $this->attrs['metaDateIconSpacing'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['paginationTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector' => ".{$this->element_id} .guten-postblock .guten-block-pagination .guten-block-loadmore span, .{$this->element_id} .guten-postblock .guten_block_nav .btn-pagination",
					'value'    => $this->attrs['paginationTypography'],
				)
			);
		}

		if ( isset( $this->attrs['paginationMargin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-postblock .guten-block-pagination .guten-block-loadmore, .{$this->element_id} .guten-postblock .guten_block_nav",
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
					'selector'       => ".{$this->element_id} .guten-postblock .guten-block-pagination .guten-block-loadmore, .{$this->element_id} .guten-postblock .guten_block_nav .btn-pagination",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['paginationPadding'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['numberGap'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-postblock.guten-pagination-number .guten_block_nav",
					'property'       => function ( $value ) {
						return "gap: {$value}px;";
					},
					'value'          => $this->attrs['numberGap'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['paginationWidth'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-postblock .guten-block-pagination .guten-block-loadmore, .{$this->element_id} .guten-postblock .guten_block_nav .btn-pagination:not(.next):not(.prev)",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'width' );
					},
					'value'          => $this->attrs['paginationWidth'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['paginationNavigationWidth'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-postblock.guten-pagination-prevnext .guten_block_nav .btn-pagination.next, .{$this->element_id} .guten-postblock.guten-pagination-prevnext .guten_block_nav .btn-pagination.prev,
                        .{$this->element_id} .guten-postblock.guten-pagination-number .guten_block_nav .btn-pagination.next, .{$this->element_id} .guten-postblock.guten-pagination-number .guten_block_nav .btn-pagination.prev",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'width' );
					},
					'value'          => $this->attrs['paginationNavigationWidth'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['paginationHeight'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-postblock.guten-pagination-number .guten_block_nav .btn-pagination:not(.next):not(.prev), .{$this->element_id} .guten-postblock.guten-pagination-number .guten_block_nav span",
					'property'       => function ( $value ) {
						return "line-height: {$value}px;";
					},
					'value'          => $this->attrs['paginationHeight'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['paginationNavigationHeight'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-postblock.guten-pagination-number .guten_block_nav .btn-pagination.next, .{$this->element_id} .guten-postblock.guten-pagination-number .guten_block_nav .btn-pagination.prev",
					'property'       => function ( $value ) {
						return "line-height: {$value}px;";
					},
					'value'          => $this->attrs['paginationNavigationHeight'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['navigationAlign'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-postblock.guten-pagination-prevnext .guten_block_nav",
					'property'       => function ( $value ) {
						return "justify-content: {$value};";
					},
					'value'          => $this->attrs['navigationAlign'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['paginationIconSpacing'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-postblock .guten-block-pagination .guten-block-loadmore.icon-position-before i, .{$this->element_id} .guten-postblock .guten_block_nav .btn-pagination.prev i",
					'property'       => function ( $value ) {
						return "margin-right: {$value}px;";
					},
					'value'          => $this->attrs['paginationIconSpacing'],
					'device_control' => true,
				)
			);

			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-postblock .guten-block-pagination .guten-block-loadmore.icon-position-after i, .{$this->element_id} .guten-postblock .guten_block_nav .btn-pagination.next i",
					'property'       => function ( $value ) {
						return "margin-left: {$value}px;";
					},
					'value'          => $this->attrs['paginationIconSpacing'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['paginationIconSize'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-postblock .guten-block-pagination .guten-block-loadmore.icon-position-before i, .{$this->element_id} .guten-postblock .guten_block_nav .btn-pagination.prev i",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'font-size' );
					},
					'value'          => $this->attrs['paginationIconSize'],
					'device_control' => true,
				)
			);

			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-postblock .guten-block-pagination .guten-block-loadmore.icon-position-after i, .{$this->element_id} .guten-postblock .guten_block_nav .btn-pagination.next i",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'font-size' );
					},
					'value'          => $this->attrs['paginationIconSize'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['paginationAlign'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-postblock .guten-block-pagination, .{$this->element_id} .guten-postblock .guten_block_nav",
					'property'       => function ( $value ) {
						return "text-align: {$value};";
					},
					'value'          => $this->attrs['paginationAlign'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['paginationColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-postblock .guten-block-pagination .guten-block-loadmore, .{$this->element_id} .guten-postblock .guten_block_nav .btn-pagination",
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
					'selector'       => ".{$this->element_id} .guten-postblock .guten_block_nav .btn-pagination.current",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['paginationCurrentColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['paginationDisabledColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-postblock .guten_block_nav .btn-pagination.disabled",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['paginationDisabledColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['paginationHoverColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-postblock .guten-block-pagination .guten-block-loadmore:hover, .{$this->element_id} .guten-postblock .guten_block_nav .btn-pagination:not(.disabled):not(.current):hover",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['paginationHoverColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['paginationBackground'] ) ) {
			$this->handle_background( ".{$this->element_id} .guten-postblock .guten-block-pagination .guten-block-loadmore, .{$this->element_id} .guten-postblock .guten_block_nav .btn-pagination", $this->attrs['paginationBackground'] );
		}

		if ( isset( $this->attrs['paginationCurrentBackground'] ) ) {
			$this->handle_background( ".{$this->element_id} .guten-postblock .guten_block_nav .btn-pagination.current", $this->attrs['paginationCurrentBackground'] );
		}

		if ( isset( $this->attrs['paginationDisabledBackground'] ) ) {
			$this->handle_background( ".{$this->element_id} .guten-postblock .guten_block_nav .btn-pagination.disabled", $this->attrs['paginationDisabledBackground'] );
		}

		if ( isset( $this->attrs['paginationHoverBackground'] ) ) {
			$this->handle_background( ".{$this->element_id} .guten-postblock .guten-block-pagination .guten-block-loadmore:hover, .{$this->element_id} .guten-postblock .guten_block_nav .btn-pagination:not(.disabled):not(.current):hover", $this->attrs['paginationHoverBackground'] );
		}

		if ( isset( $this->attrs['paginationBorder'] ) ) {
			$this->handle_border( 'paginationBorder', ".{$this->element_id} .guten-postblock .guten-block-pagination .guten-block-loadmore, .{$this->element_id} .guten-postblock .guten_block_nav .btn-pagination" );
		}

		if ( isset( $this->attrs['paginationBorderResponsive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-postblock .guten-block-pagination .guten-block-loadmore, .{$this->element_id} .guten-postblock .guten_block_nav .btn-pagination",
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
			$this->handle_border( 'paginationHoverBorder', ".{$this->element_id} .guten-postblock .guten-block-pagination .guten-block-loadmore:hover, .{$this->element_id} .guten-postblock .guten_block_nav .btn-pagination:hover" );
		}

		if ( isset( $this->attrs['paginationHoverBorderResponsive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-postblock .guten-block-pagination .guten-block-loadmore:hover, .{$this->element_id} .guten-postblock .guten_block_nav .btn-pagination:hover",
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
					'selector'       => ".{$this->element_id} .guten-postblock .guten-block-pagination .guten-block-loadmore, .{$this->element_id} .guten-postblock .guten_block_nav .btn-pagination",
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
					'selector'       => ".{$this->element_id} .guten-postblock .guten-block-pagination .guten-block-loadmore:hover, .{$this->element_id} .guten-postblock .guten_block_nav .btn-pagination:hover",
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
