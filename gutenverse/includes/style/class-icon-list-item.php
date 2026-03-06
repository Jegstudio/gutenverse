<?php
/**
 * Gutenverse Icon List Item
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse\style
 */

namespace Gutenverse\Style;

use Gutenverse\Framework\Style_Abstract;

/**
 * Class Icon List Item
 *
 * @package gutenverse\style
 */
class Icon_List_Item extends Style_Abstract {
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
	protected $name = 'icon-list-item';

	/**
	 * Constructor
	 *
	 * @param array $attrs Attribute.
	 */
	public function __construct( $attrs ) {
		parent::__construct( $attrs );

		$this->set_feature(
			array(
				'advance' => null,
				'mask'    => null,
			)
		);
	}

	/**
	 * Generate style base on attribute.
	 */
	public function generate() {
		if ( isset( $this->attrs['iconLineHeight'] ) ) {
			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} i, .{$this->element_id} .gutenverse-icon-svg",
					'property'       => function ( $value ) {
						return "line-height: {$value}px;";
					},
					'value'          => $this->attrs['iconLineHeight'],
					'device_control' => true,
				)
			);

			$this->inject_style(
				array(
					'selector'       => ".{$this->element_id} .gutenverse-icon-svg",
					'property'       => function ( $value ) {
						return "height: {$value}px;";
					},
					'value'          => $this->attrs['iconLineHeight'],
					'device_control' => true,
				)
			);
		}
	}
}
