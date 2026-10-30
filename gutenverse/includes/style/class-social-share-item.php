<?php
/**
 * Gutenverse Social_Share_Item
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\style
 */

namespace Gutenverse\Style;

use Gutenverse\Framework\Style_Abstract;

/**
 * Class Social_Share_Item
 *
 * @package gutenverse\style
 */
class Social_Share_Item extends Style_Abstract {
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
	protected $name = 'social-share-item';


	/**
	 * Constructor
	 *
	 * @param array $attrs Attribute.
	 */
	public function __construct( $attrs ) {
		parent::__construct( $attrs );

		$this->set_feature(
			array(
				'mask' => null,
			)
		);
	}

	/**
	 * Generate style base on attribute.
	 */
	public function generate() {
		if ( ! empty( $this->attrs['showText'] ) && isset( $this->attrs['hideText'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "#{$this->element_id}.gutenverse-share-item .gutenverse-share-text",
					'property'       => function ( $value, $device ) {
						if ( ! isset( $this->attrs['hideText'][ $device ] ) ) {
							return '';
						}
						return $value ? 'display: none;' : 'display: flex;';
					},
					'value'          => $this->attrs['hideText'],
					'device_control' => true,
					'ignore_empty'   => true,
				)
			);
			$this->inject_style(
				array(
					'selector'       => ".guten-social-share.horizontal.stretch-layout #{$this->element_id}.gutenverse-share-item .gutenverse-share-icon",
					'property'       => function ( $value, $device ) {
						if ( ! isset( $this->attrs['hideText'][ $device ] ) ) {
							return '';
						}
						return $value ? 'flex-grow: 1;' : 'flex-grow: 0;';
					},
					'value'          => $this->attrs['hideText'],
					'device_control' => true,
					'ignore_empty'   => true,
				)
			);
		}

		if ( ! empty( $this->attrs['showText'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".guten-social-share.button-layout-solid #{$this->element_id}.gutenverse-share-item.has-text .gutenverse-share-icon",
					'property'       => function ( $value, $device ) {
						$hidden = $this->get_inherit_value( $this->attrs['hideText'] ?? array(), $device, false );
						if ( ! $hidden ) {
							return 'padding-right: 4px;';
						}
						$right_padding = array();
						foreach ( $this->attrs['iconPading'] ?? array() as $padding_device => $padding ) {
							$right = $padding['dimension']['right'] ?? null;
							if ( null !== $right && '' !== $right ) {
								$right_padding[ $padding_device ] = $right . ( $padding['unit'] ?? 'px' );
							}
						}
						$padding_right = $this->get_inherit_value( $right_padding, $device, '12px' );
						return 'padding-right: ' . sanitize_text_field( $padding_right ) . ';';
					},
					'value'          => $this->attrs['hideText'] ?? array(),
					'device_control' => true,
					'ignore_empty'   => true,
				)
			);
		}

		if ( isset( $this->attrs['itemGrow'] ) && $this->attrs['itemGrow'] ) {
			$this->inject_style(
				array(
					'selector'       => "#{$this->element_id}.gutenverse-share-item",
					'property'       => function ( $value ) {
						return 'flex: 1 1 0; width: auto;';
					},
					'value'          => $this->attrs['itemGrow'],
					'device_control' => false,
				)
			);
			$this->inject_style(
				array(
					'selector'       => "#{$this->element_id}.gutenverse-share-item a",
					'property'       => function ( $value ) {
						return 'width: 100%;';
					},
					'value'          => $this->attrs['itemGrow'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['itemWidth'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "#{$this->element_id}.gutenverse-share-item",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'width' );
					},
					'value'          => $this->attrs['itemWidth'],
					'device_control' => true,
				)
			);
			$this->inject_style(
				array(
					'selector'       => "#{$this->element_id}.gutenverse-share-item a",
					'property'       => function ( $value ) {
						return 'width: 100%;';
					},
					'value'          => $this->attrs['itemWidth'],
					'device_control' => true,
				)
			);
			$this->inject_style(
				array(
					'selector'       => ".guten-social-share:not(.button-layout-solid) #{$this->element_id}.gutenverse-share-item .gutenverse-share-text",
					'property'       => function ( $value ) {
						return 'flex: 1 1 auto;';
					},
					'value'          => $this->attrs['itemWidth'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['buttonBackgroundColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".guten-social-share.button-layout-solid #{$this->element_id}.gutenverse-share-item a",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['buttonBackgroundColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['buttonBackgroundColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".guten-social-share.button-layout-solid #{$this->element_id}.gutenverse-share-item:hover a",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['buttonBackgroundColorHover'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['iconPading'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "#{$this->element_id}.gutenverse-share-item .gutenverse-share-icon",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['iconPading'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['textPading'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "#{$this->element_id}.gutenverse-share-item .gutenverse-share-text",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['textPading'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['iconColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "#{$this->element_id}.gutenverse-share-item .gutenverse-share-icon svg",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['iconColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['iconBackgroundColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".guten-social-share:not(.button-layout-solid) #{$this->element_id}.gutenverse-share-item .gutenverse-share-icon",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['iconBackgroundColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['backgroundColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".guten-social-share:not(.button-layout-solid) #{$this->element_id}.gutenverse-share-item .gutenverse-share-text",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['backgroundColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['textColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "#{$this->element_id}.gutenverse-share-item .gutenverse-share-text",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['textColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['border'] ) ) {
			$this->handle_border( 'border', "#{$this->element_id}.gutenverse-share-item" );
		}

		if ( isset( $this->attrs['borderResponsive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "#{$this->element_id}.gutenverse-share-item",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['borderResponsive'],
					'device_control' => true,
					'skip_device'    => array(
						'Desktop',
					),
				)
			);
		}

		if ( isset( $this->attrs['iconColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "#{$this->element_id}.gutenverse-share-item:hover .gutenverse-share-icon svg",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['iconColorHover'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['iconBackgroundColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".guten-social-share:not(.button-layout-solid) #{$this->element_id}.gutenverse-share-item:hover .gutenverse-share-icon",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['iconBackgroundColorHover'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['backgroundColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".guten-social-share:not(.button-layout-solid) #{$this->element_id}.gutenverse-share-item:hover .gutenverse-share-text",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['backgroundColorHover'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['textColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "#{$this->element_id}.gutenverse-share-item:hover .gutenverse-share-text",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['textColorHover'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['borderHover'] ) ) {
			$this->handle_border( 'borderHover', "#{$this->element_id}.gutenverse-share-item:hover" );
		}

		if ( isset( $this->attrs['borderHoverResponsive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "#{$this->element_id}.gutenverse-share-item:hover",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['borderHoverResponsive'],
					'device_control' => true,
					'skip_device'    => array(
						'Desktop',
					),
				)
			);
		}

		if ( isset( $this->attrs['typography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => "#{$this->element_id}.gutenverse-share-item .gutenverse-share-text",
					'property'       => function ( $value ) {},
					'value'          => $this->attrs['typography'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['iconSize'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "#{$this->element_id}.gutenverse-share-item svg",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'font-size' );
					},
					'value'          => $this->attrs['iconSize'],
					'device_control' => true,
				)
			);

			$this->inject_style(
				array(
					'selector'       => "#{$this->element_id}.gutenverse-share-item svg",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'width' ) . $this->handle_unit_point( $value, 'height' );
					},
					'value'          => $this->attrs['iconSize'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['boxShadow'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "#{$this->element_id}.gutenverse-share-item",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['boxShadow'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['boxShadowHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => "#{$this->element_id}.gutenverse-share-item:hover",
					'property'       => function ( $value ) {
						return $this->handle_box_shadow( $value );
					},
					'value'          => $this->attrs['boxShadowHover'],
					'device_control' => false,
				)
			);
		}
	}
}
