<?php
/**
 * Gutenverse Post_Author
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\style
 */

namespace Gutenverse\Style;

use Gutenverse\Framework\Style_Abstract;

/**
 * Class Post_Author
 *
 * @package gutenverse\style
 */
class Post_Author extends Style_Abstract {
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
	protected $name = 'post-author';

	/**
	 * Constructor
	 *
	 * @param array $attrs Attribute.
	 */
	public function __construct( $attrs ) {
		parent::__construct( $attrs );

		$this->in_block = false;
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
						return "justify-content: {$value};";
					},
					'value'          => $this->attrs['alignment'],
					'device_control' => true,
				)
			);
		}
		if ( isset( $this->attrs['verticalAlignment'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}",
					'property'       => function ( $value ) {
						return "align-items: {$value};";
					},
					'value'          => $this->attrs['verticalAlignment'],
					'device_control' => true,
				)
			);
		}

		$this->name_style();
		$this->avatar_style();
		$this->biography_style();
	}

	/**
	 * Name styling
	 *
	 * @return void
	 */
	private function name_style() {
		$selector       = ".guten-post-author.{$this->element_id} .author-name,
							.guten-post-author.{$this->element_id} .author-name a";
		$selector_hover = ".guten-post-author.{$this->element_id} .author-name:hover,
							.guten-post-author.{$this->element_id}:hover .author-name";
		if ( isset( $this->attrs['typography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => "{$selector}",
					'property'       => function ( $value ) {},
					'value'          => $this->attrs['typography'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['color'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "{$selector}",
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
					'selector'       => "{$selector}",
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
					'selector'       => "{$selector_hover}",
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
					'selector'       => "{$selector_hover}",
					'property'       => function ( $value ) {
						return $this->handle_text_shadow( $value );
					},
					'value'          => $this->attrs['textShadowHover'],
					'device_control' => false,
				)
			);
		}
	}

	/**
	 * Name styling
	 *
	 * @return void
	 */
	private function biography_style() {
		$selector = ".guten-post-author.{$this->element_id} span.author-bio";

		if ( isset( $this->attrs['biographyMargintop'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "{$selector}",
					'property'       => function ( $value ) {
						return "margin-top: {$value}px;";
					},
					'value'          => $this->attrs['biographyMargintop'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['biographyTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => "{$selector}",
					'property'       => function ( $value ) {},
					'value'          => $this->attrs['biographyTypography'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['biographyColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "{$selector}",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['biographyColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['biographyTextShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "{$selector}",
					'property'       => function ( $value ) {
						return $this->handle_text_shadow( $value );
					},
					'value'          => $this->attrs['biographyTextShadow'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['biographyColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "{$selector}:hover",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['biographyColorHover'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['biographyTextShadowHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "{$selector}:hover",
					'property'       => function ( $value ) {
						return $this->handle_text_shadow( $value );
					},
					'value'          => $this->attrs['biographyTextShadowHover'],
					'device_control' => false,
				)
			);
		}
	}

	/**
	 * Avatar styling
	 *
	 * @return void
	 */
	private function avatar_style() {
		if ( ! empty( $this->attrs['authorAvatar'] ) ) {
			if ( isset( $this->attrs['size'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} img",
						'property'       => function ( $value ) {
							return $this->handle_unit_point( $value, 'width' );
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

			if ( isset( $this->attrs['avatarGap'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} img",
						'property'       => function ( $value ) {
							return "margin-right: {$value}px;";
						},
						'value'          => $this->attrs['avatarGap'],
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

			if ( isset( $this->attrs['authorBorder'] ) ) {
				$this->handle_border( 'authorBorder', ".{$this->element_id} img" );
			}

			if ( isset( $this->attrs['authorBorderResponsive'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} img",
						'property'       => function ( $value ) {
							return $this->handle_border_responsive( $value );
						},
						'value'          => $this->attrs['authorBorderResponsive'],
						'device_control' => true,
						'skip_device'    => array(
							'Desktop',
						),
					)
				);
			}

			if ( isset( $this->attrs['authorBoxShadow'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} img",
						'property'       => function ( $value ) {
							return $this->handle_box_shadow( $value );
						},
						'value'          => $this->attrs['authorBoxShadow'],
						'device_control' => false,
					)
				);
			}
		}
	}
}
