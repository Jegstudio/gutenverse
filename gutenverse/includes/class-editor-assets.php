<?php
/**
 * Editor Assets class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse
 */

namespace Gutenverse;

/**
 * Class Editor Assets
 *
 * @package gutenverse
 */
class Editor_Assets {
	/**
	 * Init constructor.
	 */
	public function __construct() {
		add_filter( 'gutenverse_block_config', array( $this, 'block_config' ) );
		add_action( 'gutenverse_include_block', array( $this, 'enqueue_scripts' ) );
	}

	/**
	 * Enqueue scripts
	 */
	public function enqueue_scripts() {
		wp_enqueue_style(
			'gutenverse-blocks',
			GUTENVERSE_URL . '/assets/css/blocks.css',
			array( 'wp-edit-blocks', 'fontawesome-gutenverse' ),
			GUTENVERSE_VERSION
		);

		wp_enqueue_style(
			'gutenverse-frontend',
			GUTENVERSE_URL . '/assets/css/frontend.css',
			array( 'gutenverse-iconlist', 'fontawesome-gutenverse' ),
			GUTENVERSE_VERSION
		);

		wp_enqueue_script( 'gutenverse-frontend-event' );

		$include = ( include GUTENVERSE_DIR . '/lib/dependencies/blocks.asset.php' )['dependencies'];

		wp_enqueue_script(
			'gutenverse-blocks',
			GUTENVERSE_URL . '/assets/js/blocks.js',
			$include,
			GUTENVERSE_VERSION,
			true
		);

		wp_set_script_translations(
			'gutenverse-blocks',
			'gutenverse',
			GUTENVERSE_LANG_DIR
		);
	}

	/**
	 * Editor config
	 *
	 * @param array $config Config.
	 */
	public function block_config( $config ) {
		$config['gutenverseImgDir']             = GUTENVERSE_URL . '/assets/img';
		$config['pluginVersions'][ GUTENVERSE ] = array(
			'name'           => GUTENVERSE_NAME,
			'version'        => GUTENVERSE_VERSION,
			'currentNotice'  => GUTENVERSE_NOTICE_VERSION,
			'noticeVersions' => array( '2.0.0', '1.8.0', '1.7.0', '1.6.0' ),
		);

		return $config;
	}
}
