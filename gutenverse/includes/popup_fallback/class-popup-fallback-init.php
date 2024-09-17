<?php
/**
 * Gutenverse Popup Main class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse
 */

namespace Gutenverse\Popup_Fallback;

/**
 * Class Init
 *
 * @package gutenverse-popup
 */
class Popup_Fallback_Init {

	/**
	 * Hold Style Generator Instance.
	 *
	 * @var Style_Generator
	 */
	public $style_generator;
	
	public function __construct() {
		$this->style_generator = new Style_Generator();
		// $this->blocks          = new Blocks();
	}
}
