<?php
/**
 * Gutenverse Portfolio Gallery
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\style
 */

namespace Gutenverse\Style;

use Gutenverse\Framework\Style_Abstract;

/**
 * Class Portfolio Gallery
 *
 * @package gutenverse\style
 */
class Portfolio_Gallery extends Style_Abstract {
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
	protected $name = 'portfolio-gallery';

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
		$this->generate_settings();
		$this->generate_content();
		$this->generate_link();
	}

	/**
	 * Generate style in panel settings
	 */
	public function generate_settings() {
		if ( isset( $this->attrs['rowHeight'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .portfolio-gallery-container .content-items .row-item",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'height' );
					},
					'value'          => $this->attrs['rowHeight'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['column'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .portfolio-gallery-container .content-items .row-item",
					'property'       => function ( $value ) {
						return "flex: calc(100% / {$value}); max-width: calc(100% / {$value});";
					},
					'value'          => $this->attrs['column'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['reversePosition'] ) && $this->attrs['reversePosition'] ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .portfolio-gallery-container .content-items .row-item",
					'property'       => function ( $value ) {
						return 'flex-direction: column-reverse;';
					},
					'value'          => $this->attrs['reversePosition'],
					'device_control' => false,
				)
			);

			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .portfolio-gallery-container .content-items .row-item .row-link-wrapper",
					'property'       => function ( $value ) {
						return 'transform: translateY(-100%);';
					},
					'value'          => $this->attrs['reversePosition'],
					'device_control' => false,
				)
			);

			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .portfolio-gallery-container .content-items .row-item .row-item-info::after",
					'property'       => function ( $value ) {
						return 'transform-origin: 0 100%;';
					},
					'value'          => $this->attrs['reversePosition'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['linkIconPosition'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .portfolio-gallery-container .content-items .row-item .row-link-wrapper a",
					'property'       => function ( $value ) {
						return "flex-direction: {$value});";
					},
					'value'          => $this->attrs['linkIconPosition'],
					'device_control' => false,
				)
			);
		}
	}

	/**
	 * Generate style in panel content
	 */
	public function generate_content() {
		if ( isset( $this->attrs['activeBackground'] ) ) {
			$this->handle_background( ".{$this->element_id} .portfolio-gallery-container .row-item.current-item", $this->attrs['activeBackground'] );
		}

		if ( isset( $this->attrs['contentAlignment'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .portfolio-gallery-container .row-item .row-item-info",
					'property'       => function ( $value ) {
						return "text-align: {$value};";
					},
					'value'          => $this->attrs['contentAlignment'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['contentPadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".guten-portfolio-gallery.{$this->element_id} .portfolio-gallery-container .row-item .row-item-info",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['contentPadding'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['contentBackground'] ) ) {
			$this->handle_background( ".{$this->element_id}.guten-portfolio-gallery .portfolio-gallery-container .row-item .row-item-info::after", $this->attrs['contentBackground'] );
		}

		if ( isset( $this->attrs['titleTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".{$this->element_id} .portfolio-gallery-container .row-item .row-item-info .info-title",
					'property'       => function ( $value ) {},
					'value'          => $this->attrs['titleTypography'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['subTitleTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".{$this->element_id} .portfolio-gallery-container .row-item .row-item-info .info-subtitle",
					'property'       => function ( $value ) {},
					'value'          => $this->attrs['subTitleTypography'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['titleColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .portfolio-gallery-container .row-item .row-item-info .info-title",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['titleColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['subTitleColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .portfolio-gallery-container .row-item .row-item-info .info-subtitle",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['subTitleColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['titleTextShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .portfolio-gallery-container .row-item .row-item-info .info-title",
					'property'       => function ( $value ) {
						return $this->handle_text_shadow( $value );
					},
					'value'          => $this->attrs['titleTextShadow'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['subTitleTextShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .portfolio-gallery-container .row-item .row-item-info .info-subtitle",
					'property'       => function ( $value ) {
						return $this->handle_text_shadow( $value );
					},
					'value'          => $this->attrs['subTitleTextShadow'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['titleColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .portfolio-gallery-container .row-item:hover .row-item-info .info-title",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['titleColorHover'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['subTitleColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .portfolio-gallery-container .row-item:hover .row-item-info .info-subtitle",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['subTitleColorHover'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['titleTextShadowHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .portfolio-gallery-container .row-item:hover .row-item-info .info-title",
					'property'       => function ( $value ) {
						return $this->handle_text_shadow( $value );
					},
					'value'          => $this->attrs['titleTextShadowHover'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['subTitleTextShadowHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .portfolio-gallery-container .row-item:hover .row-item-info .info-subtitle",
					'property'       => function ( $value ) {
						return $this->handle_text_shadow( $value );
					},
					'value'          => $this->attrs['subTitleTextShadowHover'],
					'device_control' => false,
				)
			);
		}
	}
	/**
	 * Generate style in panel link
	 */
	public function generate_link() {
		if ( isset( $this->attrs['linkAlignment'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .portfolio-gallery-container .row-item .row-link-wrapper",
					'property'       => function ( $value ) {
						return "justify-content: {$value};";
					},
					'value'          => $this->attrs['linkAlignment'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['linkPadding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .portfolio-gallery-container .row-item .row-link-wrapper a",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['linkPadding'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['linkMargin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .portfolio-gallery-container .row-item .row-link-wrapper a",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['linkMargin'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['linkBorder'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-portfolio-gallery .portfolio-gallery-container .row-item .row-link-wrapper a",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['linkBorder'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['linkTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".{$this->element_id} .portfolio-gallery-container .row-item .row-link-wrapper a",
					'property'       => function ( $value ) {},
					'value'          => $this->attrs['linkTypography'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['linkIconSpace'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-portfolio-gallery .portfolio-gallery-container .row-item .row-link-wrapper a",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'gap' );
					},
					'value'          => $this->attrs['linkIconSpace'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['linkIconSize'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-portfolio-gallery .portfolio-gallery-container .row-item .row-link-wrapper a i",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'font-size' );
					},
					'value'          => $this->attrs['linkIconSize'],
					'device_control' => true,
				)
			);

			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-portfolio-gallery .portfolio-gallery-container .row-item .row-link-wrapper a svg",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'font-size' );
					},
					'value'          => $this->attrs['linkIconSize'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['linkBackground'] ) ) {
			$this->handle_background( ".{$this->element_id}.guten-portfolio-gallery .portfolio-gallery-container .row-item .row-link-wrapper a", $this->attrs['linkBackground'] );
		}

		if ( isset( $this->attrs['linkColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .portfolio-gallery-container .row-item .row-link-wrapper a",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['linkColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['linkIconColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .portfolio-gallery-container .row-item .row-link-wrapper a i",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['linkIconColor'],
					'device_control' => false,
				)
			);

			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .portfolio-gallery-container .row-item .row-link-wrapper a svg",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'fill' );
					},
					'value'          => $this->attrs['linkIconColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['linkTextShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .portfolio-gallery-container .row-item .row-link-wrapper a",
					'property'       => function ( $value ) {
						return $this->handle_text_shadow( $value );
					},
					'value'          => $this->attrs['linkTextShadow'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['linkBackgroundHover'] ) ) {
			$this->handle_background( ".{$this->element_id}.guten-portfolio-gallery .portfolio-gallery-container .row-item .row-link-wrapper a:hover", $this->attrs['linkBackgroundHover'] );
		}

		if ( isset( $this->attrs['linkColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .portfolio-gallery-container .row-item .row-link-wrapper a:hover",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['linkColorHover'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['linkIconColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .portfolio-gallery-container .row-item .row-link-wrapper a:hover i",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['linkIconColorHover'],
					'device_control' => false,
				)
			);

			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .portfolio-gallery-container .row-item .row-link-wrapper a:hover svg",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'fill' );
					},
					'value'          => $this->attrs['linkIconColorHover'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['linkTextShadowHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .portfolio-gallery-container .row-item .row-link-wrapper a:hover",
					'property'       => function ( $value ) {
						return $this->handle_text_shadow( $value );
					},
					'value'          => $this->attrs['linkTextShadowHover'],
					'device_control' => false,
				)
			);
		}
	}
}
