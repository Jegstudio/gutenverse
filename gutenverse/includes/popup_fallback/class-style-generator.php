<?php
/**
 * Style Generator class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse
 */

namespace Gutenverse\Popup_Fallback;

use Gutenverse\Popup_Fallback\Style\Popup_Builder;

/**
 * Class Style Generator
 *
 * @package gutenverse
 */
class Style_Generator {
	/**
	 * Font Families
	 *
	 * @var array
	 */
	protected $font_families = array();

	/**
	 * Font Variables
	 *
	 * @var array
	 */
	protected $font_variables = array();

	/**
	 * Init constructor.
	 */
	public function __construct() {
		add_filter( 'gutenverse_block_style_instance', array( $this, 'get_block_style_instance' ), 10, 3 );
	}

	/**
	 * Get Block Style Instance.
	 *
	 * @param object $instance Block Instance.
	 * @param string $name Block Name.
	 * @param array  $attrs Block Attribute.
	 *
	 * @return Style_Abstract
	 */
	public function get_block_style_instance( $instance, $name, $attrs ) {
		switch ( $name ) {
			case 'gutenverse/popup-builder':
				$instance = new Popup_Builder( $attrs );
				break;
		}

		return $instance;
	}
}