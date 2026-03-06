<?php
/**
 * Gutenverse Image
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\style
 */

namespace Gutenverse\Style;

use Gutenverse\Framework\Style_Abstract;

/**
 * Class Image
 *
 * @package gutenverse\style
 */
class Image extends Style_Abstract {
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
	protected $name = 'image';

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
		if ( isset( $this->attrs['align'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-image .guten-image-wrapper",
					'property'       => function ( $value ) {
						return "justify-content: {$this->handle_align_reverse($value)};";
					},
					'value'          => $this->attrs['align'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['width'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} img",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'width' );
					},
					'value'          => $this->attrs['width'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['height'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} img",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'height' );
					},
					'value'          => $this->attrs['height'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['opacity'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} img",
					'property'       => function ( $value ) {
						return "opacity: {$value};";
					},
					'value'          => $this->attrs['opacity'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['imgFilter'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} img",
					'property'       => function ( $value ) {
						$brightness = ! gutenverse_truly_empty( $value['brightness'] ) ? $value['brightness'] . '%' : '100%';
						$contrast = ! gutenverse_truly_empty( $value['contrast'] ) ? $value['contrast'] . '%' : '100%';
						$saturation = ! gutenverse_truly_empty( $value['saturation'] ) ? $value['saturation'] . '%' : '100%';
						$blur = ! gutenverse_truly_empty( $value['blur'] ) ? $value['blur'] . 'px' : '0px';
						$hue = ! gutenverse_truly_empty( $value['hue'] ) ? $value['hue'] . 'deg' : '0deg';

						return "filter: brightness({$brightness}) contrast({$contrast}) saturate({$saturation}) blur({$blur})hue-rotate({$hue});";
					},
					'value'          => $this->attrs['imgFilter'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['opacityHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}:hover img",
					'property'       => function ( $value ) {
						return "opacity: {$value};";
					},
					'value'          => $this->attrs['opacityHover'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['imgFilterHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}:hover img",
					'property'       => function ( $value ) {
						$brightness = ! gutenverse_truly_empty( $value['brightness'] ) ? $value['brightness'] . '%' : '100%';
						$contrast = ! gutenverse_truly_empty( $value['contrast'] ) ? $value['contrast'] . '%' : '100%';
						$saturation = ! gutenverse_truly_empty( $value['saturation'] ) ? $value['saturation'] . '%' : '100%';
						$blur = ! gutenverse_truly_empty( $value['blur'] ) ? $value['blur'] . 'px' : '0px';
						$hue = ! gutenverse_truly_empty( $value['hue'] ) ? $value['hue'] . 'deg' : '0deg';

						return "filter: brightness({$brightness}) contrast({$contrast}) saturate({$saturation}) blur({$blur})hue-rotate({$hue});";
					},
					'value'          => $this->attrs['imgFilterHover'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['imageFit'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} img",
					'property'       => function ( $value ) {
						if ( 'default' !== $value ) {
							return "object-fit: {$value};";
						}
					},
					'value'          => $this->attrs['imageFit'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['imgBorder'] ) ) {
			$this->handle_border( 'imgBorder', ".{$this->element_id} img" );
		}

		if ( isset( $this->attrs['imgBorderResponsive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} img",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['imgBorderResponsive'],
					'device_control' => true,
					'skip_device'    => array(
						'Desktop',
					),
				)
			);
		}

		if ( isset( $this->attrs['imgShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} img",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['imgShadow'],
					'device_control' => false,
				)
			);
		}

		if ( ( isset( $this->attrs['captionCustom'] ) && $this->attrs['captionCustom'] ) || ( isset( $this->attrs['captionOriginal'] ) && $this->attrs['captionOriginal'] ) ) {
			if ( isset( $this->attrs['typography'] ) ) {
				$this->inject_typography(
					array(
						'selector'       => ".{$this->element_id} .guten-caption",
						'property'       => function ( $value ) {},
						'value'          => $this->attrs['typography'],
						'device_control' => false,
					)
				);
			}

			if ( isset( $this->attrs['captionColor'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} .guten-caption",
						'property'       => function ( $value ) {
							return $this->handle_color( $value, 'color' );
						},
						'value'          => $this->attrs['captionColor'],
						'device_control' => false,
					)
				);
			}
		}

		if ( isset( $this->attrs['captionSpace'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-caption",
					'property'       => function ( $value ) {
						return "margin-top: {$value}px;";
					},
					'value'          => $this->attrs['captionSpace'],
					'device_control' => true,
				)
			);
		}
	}
}
