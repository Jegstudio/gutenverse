<?php
/**
 * Gutenverse Accordion
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\style
 */

namespace Gutenverse\Style;

use Gutenverse\Framework\Style_Abstract;

/**
 * Class Breadcrumb
 *
 * @package gutenverse\style
 */
class Breadcrumb extends Style_Abstract {
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
	protected $name = 'breadcrumb';

	/**
	 * Constructor
	 *
	 * @param array $attrs Attribute.
	 */
	public function __construct( $attrs ) {
		parent::__construct( $attrs );
		$this->set_feature(
			array(
				'background'  => array(
					'normal' => ".guten-element.{$this->element_id}.guten-breadcrumb",
					'hover'  => ".guten-element.{$this->element_id}.guten-breadcrumb:hover",
				),
				'border'      => array(
					'normal' => ".guten-element.{$this->element_id}.guten-breadcrumb",
					'hover'  => ".guten-element.{$this->element_id}.guten-breadcrumb:hover",
				),
				'positioning' => null,
			)
		);
	}

	/**
	 * Undocumented function
	 *
	 * @return void
	 */
	public function generate() {
		$this->styling_panel();
		$this->layout_panel();
	}

	/**
	 * Undocumented function
	 *
	 * @return void
	 */
	private function styling_panel() {
		if ( isset( $this->attrs['typography'] ) ) {
			$this->inject_typography(
				array(
					'selector'       => ".guten-element.{$this->element_id}.guten-breadcrumb .breadcrumb-nav li span,
                    					.guten-element.{$this->element_id}.guten-breadcrumb .breadcrumb-nav li i",
					'property'       => function ( $value ) {},
					'value'          => $this->attrs['typography'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['gap'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".guten-element.{$this->element_id}.guten-breadcrumb .breadcrumb-nav li.separator",
					'property'       => function ( $value ) {
						return "
								margin-right: {$value}px;
								margin-left: {$value}px;
								";
					},
					'value'          => $this->attrs['gap'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['linkColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".guten-element.{$this->element_id}.guten-breadcrumb .breadcrumb-nav a span.breadcrumb-link",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['linkColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['linkColorHover'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".guten-element.{$this->element_id}.guten-breadcrumb .breadcrumb-nav a span.breadcrumb-link:hover",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['linkColorHover'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['lastTextColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".guten-element.{$this->element_id}.guten-breadcrumb .breadcrumb-nav span.breadcrumb-text",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['lastTextColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['iconColor'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".guten-element.{$this->element_id}.guten-breadcrumb .breadcrumb-nav li.separator",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'color' );
					},
					'value'          => $this->attrs['iconColor'],
					'device_control' => false,
				)
			);

			$this->inject_style(
				array(
					'selector'       => ".guten-element.{$this->element_id}.guten-breadcrumb .breadcrumb-nav li.separator svg",
					'property'       => function ( $value ) {
						return $this->handle_color( $value, 'fill' );
					},
					'value'          => $this->attrs['iconColor'],
					'device_control' => false,
				)
			);
		}

		if ( isset( $this->attrs['iconSize'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".guten-element.{$this->element_id}.guten-breadcrumb .breadcrumb-nav li.separator i",
					'property'       => function ( $value ) {
						return "font-size: {$value}px;";
					},
					'value'          => $this->attrs['iconSize'],
					'device_control' => false,
				)
			);

			$this->inject_style(
				array(
					'selector'       => ".guten-element.{$this->element_id}.guten-breadcrumb .breadcrumb-nav li.separator svg",
					'property'       => function ( $value ) {
						return "font-size: {$value}px;";
					},
					'value'          => $this->attrs['iconSize'],
					'device_control' => false,
				)
			);
		}
	}

	/**
	 * Undocumented function
	 *
	 * @return void
	 */
	private function layout_panel() {
		$selector = ".guten-element.{$this->element_id}.guten-breadcrumb";

		if ( isset( $this->attrs['margin'] ) ) {
			$this->inject_style(
				array(
					'selector'       => $selector,
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'margin' );
					},
					'value'          => $this->attrs['margin'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['padding'] ) ) {
			$this->inject_style(
				array(
					'selector'       => $selector,
					'property'       => function ( $value ) {
						return $this->handle_dimension( $value, 'padding' );
					},
					'value'          => $this->attrs['padding'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['zIndex'] ) ) {
			$this->inject_style(
				array(
					'selector'       => $selector,
					'property'       => function ( $value ) {
						return "z-index: {$value};";
					},
					'value'          => $this->attrs['zIndex'],
					'device_control' => true,
				)
			);
		}

		if ( isset( $this->attrs['alignment'] ) ) {
			$this->inject_style(
				array(
					'selector'       => $selector,
					'property'       => function ( $value ) {
						return "justify-content: {$value};";
					},
					'value'          => $this->attrs['alignment'],
					'device_control' => true,
				)
			);
			$this->inject_style(
				array(
					'selector'       => $selector,
					'property'       => function ( $value ) {
						return 'text-align: ' .
						( 'flex-start' === $value ? 'left' :
						( 'flex-end' === $value ? 'right' : 'center' ) ) .
						';';
					},
					'value'          => $this->attrs['alignment'],
					'device_control' => true,
				)
			);
		}
	}
}
