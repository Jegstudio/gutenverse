<?php
/**
 * Gutenverse Post_Terms
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\style
 */

namespace Gutenverse\Style;

use Gutenverse\Framework\Style_Abstract;

/**
 * Class Post_Terms
 *
 * @package gutenverse\style
 */
class Post_Terms extends Style_Abstract {
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
	protected $name = 'post-terms';

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
		if ( isset( $this->attrs['alignment'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}",
					'property'       => function ( $value ) {
						return "justify-content: {$value}; display:flex;";
					},
					'value'          => $this->attrs['alignment'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['typography'] ) ) {
			$this->inject_typography(
				array(
					'selector' => ".{$this->element_id} h1, .{$this->element_id} h2, .{$this->element_id} h3, .{$this->element_id} h4, .{$this->element_id} h5, .{$this->element_id} h6, .{$this->element_id} span, .{$this->element_id} a",
					'value'    => $this->attrs['typography'],
				)
			);
		}

		if ( isset( $this->attrs['color'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} h1, .{$this->element_id} h2, .{$this->element_id} h3, .{$this->element_id} h4, .{$this->element_id} h5, .{$this->element_id} h6, .{$this->element_id} span, .{$this->element_id} a",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['color'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['textShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} h1, .{$this->element_id} h2, .{$this->element_id} h3, .{$this->element_id} h4, .{$this->element_id} h5, .{$this->element_id} h6, .{$this->element_id} span",
					'property'       => function ( $value ) {
						return $this->handle_text_shadow( $value );
					},
					'value'          => $this->attrs['textShadow'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['colorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}:hover h1, .{$this->element_id}:hover h2, .{$this->element_id}:hover h3, .{$this->element_id}:hover h4, .{$this->element_id}:hover h5, .{$this->element_id}:hover h6, .{$this->element_id}:hover span, .{$this->element_id}:hover a",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['colorHover'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['textShadowHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}:hover h1, .{$this->element_id}:hover h2, .{$this->element_id}:hover h3, .{$this->element_id}:hover h4, .{$this->element_id}:hover h5, .{$this->element_id}:hover h6, .{$this->element_id}:hover span",
					'property'       => function ( $value ) {
						return $this->handle_text_shadow( $value );
					},
					'value'          => $this->attrs['textShadowHover'],
					'device_control' => false,
				)
			);
		}
	}
}
