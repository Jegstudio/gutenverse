<?php
/**
 * Gutenverse Taxonomy_List
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\style
 */

namespace Gutenverse\Style;

use Gutenverse\Framework\Style_Abstract;

/**
 * Class Taxonomy_List
 *
 * @package gutenverse\style
 */
class Taxonomy_List extends Style_Abstract {
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
	protected $name = 'taxonomy-list';

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

		$this->divider_style();

		if ( isset( $this->attrs['iconColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .taxonomy-list-wrapper .taxonomy-list-item a .icon-list",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['iconColor'],
					'device_control' => false,
				)
			);

			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .taxonomy-list-wrapper .taxonomy-list-item a .icon-list svg",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'fill' );
					},
					'value'          => $this->attrs['iconColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['iconColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .taxonomy-list-wrapper .taxonomy-list-item a:hover .icon-list",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['iconColorHover'],
					'device_control' => false,
				)
			);

			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .taxonomy-list-wrapper .taxonomy-list-item a:hover .icon-list svg",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'fill' );
					},
					'value'          => $this->attrs['iconColorHover'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['iconSize'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .taxonomy-list-wrapper .taxonomy-list-item a .icon-list",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'font-size' );
					},
					'value'          => $this->attrs['iconSize'],
					'device_control' => true,
				)
			);

			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .taxonomy-list-wrapper .taxonomy-list-item a .icon-list svg",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'font-size' );
					},
					'value'          => $this->attrs['iconSize'],
					'device_control' => true,
				)
			);
		}
		if ( isset( $this->attrs['iconSpace'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .taxonomy-list-wrapper .taxonomy-list-item a .icon-list",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'margin-right' );
					},
					'value'          => $this->attrs['iconSpace'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['layout'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .taxonomy-list-wrapper",
					'property'       => function ( $value ) {
						return "flex-direction: {$value};";
					},
					'value'          => $this->attrs['layout'],
					'device_control' => true,
				)
			);
			if ( isset( $this->attrs['contentAlignment'] ) ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} .taxonomy-list-item",
						'property'       => function ( $value ) {
							return "justify-content: {$value};";
						},
						'value'          => $this->attrs['contentAlignment'],
						'device_control' => true,
					)
				);
			}
		}

		if ( isset( $this->attrs['contentSpacing'] ) && 'row' !== $this->attrs['layout'] ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .taxonomy-list-wrapper",
					'property'       => function ( $value ) {
						$unit  = $value['unit'] ?? '';
						$point = $value['point'] ?? '';

						if ( '' === $point || ! is_numeric( $point ) ) {
							return '';
						}

						return "row-gap: calc({$point}{$unit} / 2);";
					},
					'value'          => $this->attrs['contentSpacing'],
					'device_control' => true,
				)
			);

			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .taxonomy-list-wrapper .taxonomy-list-item:not(:first-child)",
					'property'       => function ( $value ) {
						$unit  = $value['unit'] ?? '';
						$point = $value['point'] ?? '';

						if ( '' === $point || ! is_numeric( $point ) ) {
							return '';
						}

						return "padding-top: calc({$point}{$unit} / 2);";
					},
					'value'          => $this->attrs['contentSpacing'],
					'device_control' => true,
				)
			);
		} else if ( isset( $this->attrs['contentSpacing'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .taxonomy-list-wrapper",
					'property'       => function ( $value ) {
						$unit  = $value['unit'] ?? '';
						$point = $value['point'] ?? '';

						if ( '' === $point || ! is_numeric( $point ) ) {
							return '';
						}

						return "row-gap: {$point}{$unit};";
					},
					'value'          => $this->attrs['contentSpacing'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['contentSpacingHorizontal'] ) && 'column' !== $this->attrs['layout'] ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .taxonomy-list-wrapper",
					'property'       => function ( $value ) {
						$unit  = $value['unit'];
						if ( ! isset( $value['point'] ) ) {
							return '';
						}
						$value = $value['point'];
						return "column-gap: calc({$value}{$unit} / 2);";
					},
					'value'          => $this->attrs['contentSpacingHorizontal'],
					'device_control' => true,
				)
			);

			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .taxonomy-list-item:not(:first-child)",
					'property'       => function ( $value ) {
						$unit  = $value['unit'];
						if ( ! isset( $value['point'] ) ) {
							return '';
						}
						$value = $value['point'];
						return "padding-left: calc({$value}{$unit} / 2);";
					},
					'value'          => $this->attrs['contentSpacingHorizontal'],
					'device_control' => true,
				)
			);
		}

		$this->column_style();

		if ( isset( $this->attrs['itemWidth'] ) ) {
			if ( 'row' === $this->attrs['layout'] ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} .taxonomy-list-wrapper .taxonomy-list-item",
						'property'       => function ( $value ) {
							if ( 'custom' !== $value ) {
								return "width: {$value};";
							}
						},
						'value'          => $this->attrs['itemWidth'],
						'device_control' => true,
					)
				);
			}
		}

		if ( isset( $this->attrs['customItemWidth'] ) ) {
			if ( 'row' === $this->attrs['layout'] ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} .taxonomy-list-wrapper .taxonomy-list-item",
						'property'       => function ( $value, $device ) {
							if ( isset( $this->attrs['itemWidth'][ $device ] ) && 'custom' === $this->attrs['itemWidth'][ $device ] ) {
								return $this->handle_unit_point( $value, 'width' );
							}
						},
						'value'          => $this->attrs['customItemWidth'],
						'device_control' => true,
					)
				);
			}
		}

		if ( isset( $this->attrs['contentTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".{$this->element_id} .taxonomy-list-wrapper .taxonomy-list-item a .taxonomy-list-content",
					'property'       => function ( $value ) {},
					'value'          => $this->attrs['contentTypography'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['contentColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .taxonomy-list-item a",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['contentColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['contentColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .taxonomy-list-item a:hover",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['contentColorHover'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['contentBgColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .taxonomy-list-item a",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['contentBgColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['contentBgColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .taxonomy-list-item a:hover",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'background-color' );
					},
					'value'          => $this->attrs['contentBgColorHover'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['contentBorder'] ) ) {
			$this->handle_border( 'contentBorder', ".{$this->element_id} .taxonomy-list-item a" );
		}

		if ( isset( $this->attrs['contentBorderResponsive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .taxonomy-list-item a",
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

		if ( isset( $this->attrs['contentBorderHover'] ) ) {
			$this->handle_border( 'contentBorderHover', ".{$this->element_id} .taxonomy-list-item a:hover" );
		}

		if ( isset( $this->attrs['contentBorderHoverResponsive'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .taxonomy-list-item a:hover",
					'property'       => function ( $value ) {
						return $this->handle_border_responsive( $value );
					},
					'value'          => $this->attrs['contentBorderHoverResponsive'],
					'device_control' => true,
					'skip_device'    => array(
						'Desktop',
					),
				)
			);
		}

		if ( isset( $this->attrs['contentMargin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .taxonomy-list-item a",
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
					'selector'       => ".{$this->element_id} .taxonomy-list-item a",
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['contentPadding'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['countTypography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".{$this->element_id} .taxonomy-list-wrapper .taxonomy-list-item span.taxonomy-list-count.guten-taxonomy",
					'property'       => function ( $value ) {},
					'value'          => $this->attrs['countTypography'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['countColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .taxonomy-list-wrapper .taxonomy-list-item span.taxonomy-list-count.guten-taxonomy",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['countColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['countJustify'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .taxonomy-list-item",
					'property'       => function ( $value ) {
						if ( ( 'space-around' === $value || 'space-between' === $value ) ) {
							return "justify-content: {$value};";
						}
					},
					'value'          => $this->attrs['countJustify'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['countSpacing'] ) && isset( $this->attrs['countJustify'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .taxonomy-list-item",
					'property'       => function ( $value, $device ) {
						if ( 'custom' === $this->attrs['countJustify'][ $device ] ) {
							return $this->handle_unit_point( $value, 'gap' );
						}
					},
					'value'          => $this->attrs['countSpacing'],
					'device_control' => true,
				)
			);
		}
	}

	/**
	 * Resolve a content value, inheriting from larger breakpoints when empty.
	 *
	 * @param array  $values Responsive values.
	 * @param string $device Device name.
	 * @return mixed
	 */
	private function get_content_responsive_value( $values, $device ) {
		if ( ! is_array( $values ) ) {
			return null;
		}

		$devices = array( 'Desktop', 'Tablet', 'Mobile' );
		$index   = array_search( $device, $devices, true );

		if ( false === $index ) {
			return null;
		}

		for ( ; $index >= 0; $index-- ) {
			$value = $values[ $devices[ $index ] ] ?? null;
			if ( null !== $value && '' !== $value ) {
				return $value;
			}
		}

		return null;
	}

	/**
	 * Responsive column layout, spacing and first-row dividers.
	 */
	private function column_style() {
		if ( 'column' !== ( $this->attrs['layout'] ?? '' ) || empty( $this->attrs['columnCount'] ) ) {
			return;
		}

		foreach ( array( 'Desktop', 'Tablet', 'Mobile' ) as $device ) {
			$count = $this->get_content_responsive_value( $this->attrs['columnCount'], $device );
			$count = is_numeric( $count ) ? max( 1, (int) $count ) : 1;

			$this->inject_style(
				array(
					'selector'        => ".{$this->element_id} .taxonomy-list-wrapper",
					'property'        => function ( $value ) {
						return 1 === (int) $value ? 'display: flex; grid-template-columns: none;' : "display: grid; grid-template-columns: repeat({$value}, 1fr);";
					},
					'value'           => $count,
					'device_control'  => false,
					'specific_device' => $device,
				)
			);

			$reset     = '';
			$first_row = '';
			if ( ! empty( $this->attrs['showDivider'] ) && ! empty( $this->attrs['typeDivider'] ) ) {
				$divider    = $this->attrs['typeDivider'];
				$divider    = $this->sanitize_value( $divider );
				$reset     .= "border-top-style: {$divider} !important;";
				$first_row .= 'border-top-style: none !important;';
			}

			$spacing = $this->get_content_responsive_value( $this->attrs['contentSpacing'] ?? null, $device );
			if ( isset( $spacing['point'] ) && is_numeric( $spacing['point'] ) ) {
				$point      = $spacing['point'];
				$unit       = $spacing['unit'] ?? '';
				$unit       = $this->sanitize_value( $unit );
				$reset     .= "padding-top: calc({$point}{$unit} / 2) !important;";
				$first_row .= 'padding-top: 0 !important;';
			}

			// Restore later rows before overriding the current first row at each breakpoint.
			foreach ( array( 'n + 2' => $reset, "-n + {$count}" => $first_row ) as $range => $property ) {
				if ( '' === $property ) {
					continue;
				}

				$this->inject_style(
					array(
						'selector'        => ".{$this->element_id} .taxonomy-list-item:nth-child({$range})",
						'property'        => function ( $value ) {
							return $value;
						},
						'value'           => $property,
						'device_control'  => false,
						'specific_device' => $device,
					)
				);
			}

			$gap = $this->get_content_responsive_value( $this->attrs['contentSpacingHorizontal'] ?? null, $device );
			if ( isset( $gap['point'] ) && is_numeric( $gap['point'] ) ) {
				$this->inject_style(
					array(
						'selector'        => ".{$this->element_id} .taxonomy-list-wrapper",
						'property'        => function ( $value ) use ( $count ) {
							return 1 === $count ? 'column-gap: normal;' : $this->handle_unit_point( $value, 'column-gap' );
						},
						'value'           => $gap,
						'device_control'  => false,
						'specific_device' => $device,
					)
				);
			}
		}
	}

	/**
	 * Divider style
	 */
	private function divider_style() {
		if ( ! isset( $this->attrs['showDivider'] ) ) {
			return;
		}

		if ( ! $this->attrs['showDivider'] ) {
			return;
		}

		if ( 'column' === $this->attrs['layout'] ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .taxonomy-list-item:not(:first-child)",
					'property'       => function ( $value ) {
						return 'border-top-style : solid;';
					},
					'value'          => $this->attrs['showDivider'],
					'device_control' => false,
				)
			);
		} elseif ( 'row' === $this->attrs['layout'] ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .taxonomy-list-item:not(:first-child)",
					'property'       => function ( $value ) {
						return 'border-left-style : solid;';
					},
					'value'          => $this->attrs['showDivider'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['colorDivider'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .taxonomy-list-item:not(:first-child)",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'border-color' );
					},
					'value'          => $this->attrs['colorDivider'],
					'device_control' => false,
				)
			);
		}
		if ( isset( $this->attrs['typeDivider'] ) ) {
			if ( 'column' === $this->attrs['layout'] ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} .taxonomy-list-item:not(:first-child)",
						'property'       => function ( $value ) {
							return "border-top-style : {$value};";
						},
						'value'          => $this->attrs['typeDivider'],
						'device_control' => false,
					)
				);
			} elseif ( 'row' === $this->attrs['layout'] ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} .taxonomy-list-item:not(:first-child)",
						'property'       => function ( $value ) {
							return "border-left-style : {$value};";
						},
						'value'          => $this->attrs['typeDivider'],
						'device_control' => false,
					)
				);
			}
		}
		if ( isset( $this->attrs['widthDivider'] ) ) {
			if ( 'column' === $this->attrs['layout'] ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} .taxonomy-list-item",
						'property'       => function ( $value ) {
							return $this->handle_unit_point( $value, 'width' );
						},
						'value'          => $this->attrs['widthDivider'],
						'device_control' => false,
					)
				);
			} elseif ( 'row' === $this->attrs['layout'] ) {
				$this->inject_style(
					array(
						'selector'       => ".{$this->element_id} .taxonomy-list-item",
						'property'       => function ( $value ) {
							return $this->handle_unit_point( $value, 'height' );
						},
						'value'          => $this->attrs['widthDivider'],
						'device_control' => false,
					)
				);
			}
		}
		if ( isset( $this->attrs['sizeDivider'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .taxonomy-list-item",
					'property'       => function ( $value ) {
						return $this->handle_unit_point( $value, 'border-width' );
					},
					'value'          => $this->attrs['sizeDivider'],
					'device_control' => false,
				)
			);
		}
	}
}
