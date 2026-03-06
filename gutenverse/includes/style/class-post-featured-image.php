<?php
/**
 * Gutenverse Post_Featured_Image
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\style
 */

namespace Gutenverse\Style;

use Gutenverse\Framework\Style_Abstract;

/**
 * Class Post_Featured_Image
 *
 * @package gutenverse\style
 */
class Post_Featured_Image extends Style_Abstract {
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
	protected $name = 'post-featured-image';

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
					'normal' => ".{$this->element_id} img",
					'hover'  => ".{$this->element_id} img:hover",
				),
				'mask'        => null,
			)
		);
	}

	/**
	 * Generate style base on attribute.
	 */
	public function generate() {
		if ( isset( $this->attrs['alignment'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}",
					'property'       => function ( $value ) {
						return "justify-content: {$value};";
					},
					'value'          => $this->attrs['alignment'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['size'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} img",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'max-width' );
					},
					'value'          => $this->attrs['size'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['opacity'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} img",
					'property'       => function ( $value ) {
						return "opacity: calc({$value}/100);";
					},
					'value'          => $this->attrs['opacity'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['rotate'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} img",
					'property'       => function ( $value ) {
						return "transform: rotate({$value}deg);";
					},
					'value'          => $this->attrs['rotate'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['imageRatio'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} img",
					'property'       => function ( $value ) {
						$value = ( $value && 0 !== $value ) ? $value : 'auto';
						return "aspect-ratio: {$value};";
					},
					'device_control' => true,
					'value'          => $this->attrs['imageRatio'],
				)
			);
		}

		if ( isset( $this->attrs['imageRatio'] ) && 'custom' === $this->attrs['imageRatio'] && isset( $this->attrs['imageRatioCustom'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} img",
					'property'       => function ( $value ) {
						$value = ( $value && 0 !== $value ) ? $value : 'auto';
						return "aspect-ratio: {$value};";
					},
					'device_control' => true,
					'value'          => $this->attrs['imageRatioCustom'],
				)
			);
		}

		if ( isset( $this->attrs['imageFit'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} img",
					'property'       => function ( $value ) {
						if ( 'default' === $value || ! $value ) {
							return null;
						}
						return "object-fit: {$value};";
					},
					'device_control' => true,
					'value'          => $this->attrs['imageFit'],
				)
			);
		}

		if ( isset( $this->attrs['imagePosition'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} img",
					'property'       => function ( $value ) {
						if ( 'default' === $value || ! $value ) {
							return 'object-position: center center;';
						}
						return "object-position: {$value};";
					},
					'device_control' => true,
					'value'          => $this->attrs['imagePosition'],
				)
			);
		}

		if ( isset( $this->attrs['imageBorder'] ) ) {
			$this->handle_border( 'imageBorder', ".{$this->element_id} img" );
		}

		if ( isset( $this->attrs['imageBorderResponsive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} img",
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
					'selector'       => ".{$this->element_id} img",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['imageBoxShadow'],
					'device_control' => false,
				)
			);
		}
	}
}
