<?php
/**
 * Gutenverse Icon List
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\style
 */

namespace Gutenverse\Style;

use Gutenverse\Framework\Style_Abstract;

/**
 * Class Icon List
 *
 * @package gutenverse\style
 */
class Icon_List extends Style_Abstract {
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
	protected $name = 'icon-list';

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
				'positioning' => ".{$this->element_id}.guten-element",
				'animation'   => null,
				'advance'     => null,
				'transform'   => array(
					'normal' => ".{$this->element_id} .list-wrapper",
					'hover'  => ".{$this->element_id}:hover .list-wrapper",
				),
				'mask'        => null,
			)
		);
	}

	/**
	 * Generate style base on attribute.
	 */
	public function generate() {
		if ( isset( $this->attrs['spaceBetween'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}:not(.inline-icon-list) > div.guten-icon-list-item:not(div:first-of-type) > a, .{$this->element_id} > .list-wrapper:not(.inline-icon-list) > div.guten-icon-list-item:not(div:first-of-type) > a",
					'property'       => function ( $value ) {
						return "margin-top: calc({$value}px/2);";
					},
					'value'          => $this->attrs['spaceBetween'],
					'device_control' => true,
				)
			);

			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}:not(.inline-icon-list) > .guten-icon-list-item:not(:last-child), .{$this->element_id} > .list-wrapper:not(.inline-icon-list) > .guten-icon-list-item:not(:last-child)",
					'property'       => function ( $value ) {
						return "padding-bottom: calc({$value}px/2);";
					},
					'value'          => $this->attrs['spaceBetween'],
					'device_control' => true,
				)
			);

			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.inline-icon-list > .guten-icon-list-item:not(:last-child), .{$this->element_id} > .list-wrapper.inline-icon-list > .guten-icon-list-item:not(:last-child)",
					'property'       => function ( $value ) {
						return "margin-right: calc({$value}px/2);";
					},
					'value'          => $this->attrs['spaceBetween'],
					'device_control' => true,
				)
			);
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.inline-icon-list > div.guten-icon-list-item:not(div:first-of-type) > a, .{$this->element_id} > .list-wrapper.inline-icon-list > div.guten-icon-list-item:not(div:first-of-type) > a",
					'property'       => function ( $value ) {
						return "margin-left: calc({$value}px/2);";
					},
					'value'          => $this->attrs['spaceBetween'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['alignList'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}:not(.inline-icon-list), .{$this->element_id} > .list-wrapper:not(.inline-icon-list)",
					'property'       => function ( $value ) {
						return "align-items: {$value};";
					},
					'value'          => $this->attrs['alignList'],
					'device_control' => true,
				)
			);

			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.inline-icon-list, .{$this->element_id} > .list-wrapper:not(.inline-icon-list) > .guten-icon-list-item > a, .{$this->element_id} > .list-wrapper.inline-icon-list, .{$this->element_id} > .list-wrapper:not(.inline-icon-list) > .guten-icon-list-item > a",
					'property'       => function ( $value ) {
						return "justify-content: {$value};";
					},
					'value'          => $this->attrs['alignList'],
					'device_control' => true,
				)
			);

			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}:not(.inline-icon-list) > .guten-icon-list-item > a, .{$this->element_id} > .list-wrapper:not(.inline-icon-list) > .guten-icon-list-item > a",
					'property'       => function ( $value ) {
						return "text-align: {$value};";
					},
					'value'          => $this->attrs['alignList'],
					'device_control' => true,
				)
			);

			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}:not(.inline-icon-list) > .guten-icon-list-item > a, .{$this->element_id} > .list-wrapper:not(.inline-icon-list) > .guten-icon-list-item > .list-divider",
					'property'       => function ( $value ) {
						return "justify-self: {$value};";
					},
					'value'          => $this->attrs['alignList'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['iconColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-icon-list-item i",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['iconColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['iconColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-icon-list-item:hover i",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['iconColorHover'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['iconSize'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-icon-list-item i",
					'property'       => function ( $value ) {
						return "font-size: {$value}px;";
					},
					'value'          => $this->attrs['iconSize'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['textColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-icon-list-item .list-text",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['textColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['verticalAlign'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .list-wrapper .guten-icon-list-item a",
					'property'       => function ( $value ) {
						return "align-items: {$value}";
					},
					'value'          => $this->attrs['verticalAlign'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['adjustVerticalAlign'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-icon-list-item i:before",
					'property'       => function ( $value ) {
						return "margin-top: {$value}px";
					},
					'value'          => $this->attrs['adjustVerticalAlign'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['textColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-icon-list-item:hover .list-text",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['textColorHover'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['textIndent'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .guten-icon-list-item a, .{$this->element_id} .list-wrapper .guten-icon-list-item a",
					'property'       => function ( $value ) {
						return "gap: {$value}px;";
					},
					'value'          => $this->attrs['textIndent'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['textTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".{$this->element_id} .guten-icon-list-item .list-text",
					'property'       => function ( $value ) {},
					'value'          => $this->attrs['textTypography'],
					'device_control' => false,
				)
			);

			if ( isset( $this->attrs['textTypography']['lineHeight'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} .guten-icon-list-item i",
						'property'       => function ( $value ) {
							return $this->handle_unit_point( $value, 'line-height' );
						},
						'value'          => $this->attrs['textTypography']['lineHeight'],
						'device_control' => true,
					)
				);
			}
		}
		
		if ( isset( $this->attrs['isDivider'] ) ) {
			if ( $this->attrs['isDivider'] ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id}:not(.inline-icon-list) .guten-icon-list-item:not(:first-child) .list-divider, .{$this->element_id} .list-wrapper:not(.inline-icon-list) .guten-icon-list-item:not(:first-child) .list-divider",
						'property'       => function () {
							return 'border-top-style : solid;';
						},
						'value'          => $this->attrs['isDivider'],
						'device_control' => false,
					)
				);
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id}.inline-icon-list .guten-icon-list-item:not(:first-child) .list-divider, .{$this->element_id} .list-wrapper.inline-icon-list .guten-icon-list-item:not(:first-child) .list-divider",
						'property'       => function () {
							return 'border-left-style : solid;';
						},
						'value'          => $this->attrs['isDivider'],
						'device_control' => false,
					)
				);
				if ( isset( $this->attrs['spaceDivider'] ) && ! $this->attrs['displayInline'] ) {
					$this->inject_style(
						array(
							'selector'       => ".{$this->element_id}:not(.inline-icon-list) .guten-icon-list-item .list-divider, .{$this->element_id} .list-wrapper:not(.inline-icon-list) .guten-icon-list-item .list-divider",
							'property'       => function ( $value ) {
								return "margin: 0 {$value}px;";
							},
							'value'          => $this->attrs['spaceDivider'],
							'device_control' => true,
						)
					);
				}
				if ( isset( $this->attrs['colorDivider'] ) ) {
					$this->inject_style(
						array(
							'selector'       => ".{$this->element_id}:not(.inline-icon-list) .guten-icon-list-item:not(:first-child) .list-divider, .{$this->element_id} .list-wrapper:not(.inline-icon-list) .guten-icon-list-item:not(:first-child) .list-divider",
							'property'       => function ( $value ) {
								return $this->handle_color( $value, 'border-color' );
							},
							'value'          => $this->attrs['colorDivider'],
							'device_control' => true,
						)
					);
					$this->inject_style(
						array(
							'selector'       => ".{$this->element_id}.inline-icon-list .guten-icon-list-item:not(:first-child) .list-divider, .{$this->element_id} .list-wrapper.inline-icon-list .guten-icon-list-item:not(:first-child) .list-divider",
							'property'       => function ( $value ) {
								return $this->handle_color( $value, 'border-color' );
							},
							'value'          => $this->attrs['colorDivider'],
							'device_control' => true,
						)
					);
				}
				if ( isset( $this->attrs['typeDivider'] ) ) {
					$this->inject_style(
						array(
							'selector'       => ".{$this->element_id}:not(.inline-icon-list) .guten-icon-list-item:not(:first-child) .list-divider, .{$this->element_id} .list-wrapper:not(.inline-icon-list) .guten-icon-list-item:not(:first-child) .list-divider",
							'property'       => function ( $value ) {
								return "border-top-style : {$value};";
							},
							'value'          => $this->attrs['typeDivider'],
							'device_control' => false,
						)
					);
					$this->inject_style(
						array(
							'selector'       => ".{$this->element_id}.inline-icon-list .guten-icon-list-item:not(:first-child) .list-divider, .{$this->element_id} .list-wrapper.inline-icon-list .guten-icon-list-item:not(:first-child) .list-divider",
							'property'       => function ( $value ) {
								return "border-left-style : {$value};";
							},
							'value'          => $this->attrs['typeDivider'],
							'device_control' => false,
						)
					);
				}
				if ( isset( $this->attrs['sizeDivider'] ) ) {
					$this->inject_style(
						array(
							'selector'       => ".{$this->element_id} > .list-wrapper:not(.inline-icon-list) > .guten-icon-list-item:not(:nth-child(1)) .list-divider",
							'property'       => function ( $value ) {
								return $this->handle_unit_point( $value, 'border-top-width' );
							},
							'value'          => $this->attrs['sizeDivider'],
							'device_control' => true,
						)
					);
					$this->inject_style(
						array(
							'selector'       => ".{$this->element_id} > .list-wrapper.inline-icon-list > .guten-icon-list-item:not(:nth-child(1)) .list-divider",
							'property'       => function ( $value ) {
								return $this->handle_unit_point( $value, 'border-left-width' );
							},
							'value'          => $this->attrs['sizeDivider'],
							'device_control' => true,
						)
					);
				}
				if ( isset( $this->attrs['widthDivider'] ) ) {
					$this->inject_style(
						array(
							'selector'       => ".{$this->element_id} .list-wrapper:not(.inline-icon-list) .guten-icon-list-item:not(:first-child) .list-divider",
							'property'       => function ( $value ) {
								return $this->handle_unit_point( $value, 'width' );
							},
							'value'          => $this->attrs['widthDivider'],
							'device_control' => true,
						)
					);
					$this->inject_style(
						array(
							'selector'       => ".{$this->element_id}.inline-icon-list .guten-icon-list-item:not(:first-child) .list-divider, .{$this->element_id} .list-wrapper.inline-icon-list .guten-icon-list-item:not(:first-child) .list-divider",
							'property'       => function ( $value ) {
								return $this->handle_unit_point( $value, 'height' );
							},
							'value'          => $this->attrs['widthDivider'],
							'device_control' => true,
						)
					);
				}
			}
		}
	}
}
