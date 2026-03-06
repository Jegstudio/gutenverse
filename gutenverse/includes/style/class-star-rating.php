<?php
/**
 * Gutenverse Star Rating
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\style
 */

namespace Gutenverse\Style;

use Gutenverse\Framework\Style_Abstract;

/**
 * Class Star Rating
 *
 * @package gutenverse\style
 */
class Star_Rating extends Style_Abstract {
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
	protected $name = 'star-rating';

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
					'selector'       => ".{$this->element_id} .rating-wrapper",
					'property'       => function ( $value ) {
						return "justify-content: {$value};";
					},
					'value'          => $this->attrs['align'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['titleColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .rating-title",
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
					'selector'       => ".{$this->element_id} .rating-title",
					'property'       => function ( $value ) {},
					'value'          => $this->attrs['titleTypography'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['gap'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .rating-title",
					'property'       => function ( $value ) {
						return "margin-right: {$value}px;";
					},
					'value'          => $this->attrs['gap'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['iconSize'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .rating-icons i",
					'property'       => function ( $value ) {
						return "font-size: {$value}px;";
					},
					'value'          => $this->attrs['iconSize'],
					'device_control' => true,
				)
			);

			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .rating-icons svg",
					'property'       => function ( $value ) {
						return "font-size: {$value}px;";
					},
					'value'          => $this->attrs['iconSize'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['iconGap'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .rating-icons i",
					'property'       => function ( $value ) {
						return "margin-right: {$value}px;";
					},
					'value'          => $this->attrs['iconGap'],
					'device_control' => true,
				)
			);

			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .rating-icons svg",
					'property'       => function ( $value ) {
						return "margin-right: {$value}px;";
					},
					'value'          => $this->attrs['iconGap'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['iconColorMarked'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .rating-icons i.full",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['iconColorMarked'],
					'device_control' => false,
				)
			);

			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gutenverse-icon-svg.full svg",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'fill' );
					},
					'value'          => $this->attrs['iconColorMarked'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['iconColorUnmarked'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .rating-icons i.empty",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['iconColorUnmarked'],
					'device_control' => false,
				)
			);

			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gutenverse-icon-svg.empty svg",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'fill' );
					},
					'value'          => $this->attrs['iconColorUnmarked'],
					'device_control' => false,
				)
			);
		}
	}
}
