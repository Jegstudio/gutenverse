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
				'positioning' => ".{$this->element_id}.guten-element, .{$this->element_id}.guten-element.inline-icon-list ",
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
		if ( isset( $this->attrs['spaceBetween'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}:not(.inline-icon-list) div.guten-icon-list-item:not(div:first-of-type) > a",
					'property'       => function ( $value ) {
						return "margin-top: calc({$value}px/2);";
					},
					'value'          => $this->attrs['spaceBetween'],
					'device_control' => true,
				)
			);

			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}:not(.inline-icon-list) .guten-icon-list-item:not(:last-child)",
					'property'       => function ( $value ) {
						return "padding-bottom: calc({$value}px/2);";
					},
					'value'          => $this->attrs['spaceBetween'],
					'device_control' => true,
				)
			);

			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.inline-icon-list .guten-icon-list-item:not(:last-child)",
					'property'       => function ( $value ) {
						return "margin-right: {$value}px;";
					},
					'value'          => $this->attrs['spaceBetween'],
					'device_control' => true,
				)
			);
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.inline-icon-list div.guten-icon-list-item:not(div:first-of-type) > a",
					'property'       => function ( $value ) {
						return "margin-left: {$value}px;";
					},
					'value'          => $this->attrs['spaceBetween'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['alignList'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}:not(.inline-icon-list)",
					'property'       => function ( $value ) {
						return "text-align: {$this->handle_align( $value )};";
					},
					'value'          => $this->attrs['alignList'],
					'device_control' => true,
				)
			);

			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.inline-icon-list, .{$this->element_id}:not(.inline-icon-list) .guten-icon-list-item a",
					'property'       => function ( $value ) {
						return "justify-content: {$value};";
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
					'selector'       => ".{$this->element_id} a",
					'property'       => function ( $value ) {
						return "align-items: {$value}";
					},
					'value'          => $this->attrs['verticalAlign'],
					'device_control' => false,
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
					'selector'       => ".{$this->element_id} .guten-icon-list-item .list-text",
					'property'       => function ( $value ) {
						return "padding-left: {$value}px;";
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
		}
		if ( isset( $this->attrs['isDivider'] ) ) {
			if ( $this->attrs['isDivider'] ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id}:not(.inline-icon-list) .guten-icon-list-item:not(:first-child)",
						'property'       => function ( $value ) {
							return 'border-top-style : solid;';
						},
						'value'          => $this->attrs['isDivider'],
						'device_control' => false,
					)
				);
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id}.inline-icon-list .guten-icon-list-item:not(:first-child)",
						'property'       => function ( $value ) {
							return 'border-left-style : solid;';
						},
						'value'          => $this->attrs['isDivider'],
						'device_control' => false,
					)
				);
				if ( isset( $this->attrs['colorDivider'] ) ) {
					$this->inject_style(
						array(
							'selector'       => ".{$this->element_id}:not(.inline-icon-list) .guten-icon-list-item:not(:first-child)",
							'property'       => function ( $value ) {
								return $this->handle_color( $value, 'border-color' );
							},
							'value'          => $this->attrs['colorDivider'],
							'device_control' => false,
						)
					);
					$this->inject_style(
						array(
							'selector'       => ".{$this->element_id}.inline-icon-list .guten-icon-list-item:not(:first-child)",
							'property'       => function ( $value ) {
								return $this->handle_color( $value, 'border-color' );
							},
							'value'          => $this->attrs['colorDivider'],
							'device_control' => false,
						)
					);
				}
				if ( isset( $this->attrs['typeDivider'] ) ) {
					$this->inject_style(
						array(
							'selector'       => ".{$this->element_id}:not(.inline-icon-list) .guten-icon-list-item:not(:first-child)",
							'property'       => function ( $value ) {
								return "border-top-style : {$value};";
							},
							'value'          => $this->attrs['typeDivider'],
							'device_control' => false,
						)
					);
					$this->inject_style(
						array(
							'selector'       => ".{$this->element_id}.inline-icon-list .guten-icon-list-item:not(:first-child)",
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
							'selector'       => ".{$this->element_id}:not(.inline-icon-list) .guten-icon-list-item:not(:first-child)",
							'property'       => function ( $value ) {
								return "border-top-width : {$value['point']}{$value['unit']};";
							},
							'value'          => $this->attrs['sizeDivider'],
							'device_control' => false,
						)
					);
					$this->inject_style(
						array(
							'selector'       => ".{$this->element_id}.inline-icon-list .guten-icon-list-item:not(:first-child)",
							'property'       => function ( $value ) {
								return "border-left-width : {$value['point']}{$value['unit']};";
							},
							'value'          => $this->attrs['sizeDivider'],
							'device_control' => false,
						)
					);
				}
				if ( isset( $this->attrs['widthDivider'] ) ) {
					$this->inject_style(
						array(
							'selector'       => ".{$this->element_id}:not(.inline-icon-list) .guten-icon-list-item:not(:first-child)",
							'property'       => function ( $value ) {
								return "width : {$value['point']}{$value['unit']};";
							},
							'value'          => $this->attrs['widthDivider'],
							'device_control' => false,
						)
					);
					$this->inject_style(
						array(
							'selector'       => ".{$this->element_id}.inline-icon-list .guten-icon-list-item:not(:first-child)",
							'property'       => function ( $value ) {
								return "width : {$value['point']}{$value['unit']};";
							},
							'value'          => $this->attrs['widthDivider'],
							'device_control' => false,
						)
					);
				}
			}
		}
	}
}
