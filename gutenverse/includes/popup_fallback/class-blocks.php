<?php
/**
 * Blocks class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse-popup
 */

namespace Gutenverse\Popup_Fallback;

/**
 * Class Blocks
 *
 * @package gutenverse-popup
 */
class Blocks {
	/**
	 * Blocks constructor.
	 */
	public function __construct() {
		add_action( 'init', array( $this, 'register_blocks' ), 99 );
		add_filter( 'gutenverse_block_categories', array( $this, 'block_category' ) );
	}

	/**
	 * Block Category
	 *
	 * @param array $categories Block Categories.
	 *
	 * @return array
	 */
	public function block_category( $categories ) {
		$categories['gutenverse-structure'] = __( 'Gutenverse Wrapper', 'gutenverse' );
		$categories['gutenverse-popup']     = __( 'Gutenverse Popup', 'gutenverse' );

		return $categories;
	}

	/**
	 * Register All Blocks
	 */
	public function register_blocks() {
		register_block_type( GUTENVERSE_DIR . '/popup_fallback/block/popup-builder/block.json' );
		register_block_type( GUTENVERSE_DIR . '/popup_fallback/block/popup-container/block.json' );
	}
}
