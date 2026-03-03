<?php
/**
 * Gutenverse Dynamic Pagination Style
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\style
 */

namespace Gutenverse\Style;

use Gutenverse\Framework\Style_Abstract;

/**
 * Class Dynamic_Pagination
 *
 * @package gutenverse\style
 */
class Dynamic_Pagination extends Style_Abstract {
	/**
	 * Block Name
	 *
	 * @var array
	 */
	protected $name = 'dynamic-pagination';

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
					'normal' => ".{$this->element_id}.guten-element",
					'hover'  => ".{$this->element_id}.guten-element:hover",
				),
				'border'      => array(
					'normal' => ".{$this->element_id}.guten-element",
					'hover'  => ".{$this->element_id}.guten-element:hover",
				),
				'positioning' => null,
				'animation'   => null,
				'advance'     => null,
				'transform'   => array(
					'normal' => ".{$this->element_id}.guten-element",
					'hover'  => ".{$this->element_id}.guten-element:hover",
				),
				'mask'        => null,
			)
		);
	}

	/**
	 * Generate style base on attribute.
	 */
	public function generate() {
		if ( isset( $this->attrs['paginationAlign'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id}.guten-element, .{$this->element_id} .guten_block_nav",
					'property'       => function ( $value ) {
						return "justify-content: {$this->handle_align_reverse($value)};";
					},
					'value'          => $this->attrs['paginationAlign'],
					'device_control' => true,
				)
			);
		}
	}}