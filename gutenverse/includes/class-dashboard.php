<?php
/**
 * Dashboard class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse
 */

namespace Gutenverse;

/**
 * Class Dashboard
 *
 * @package gutenverse
 */
class Dashboard {
	/**
	 * Init constructor.
	 */
	public function __construct() {
		add_filter( 'gutenverse_dashboard_config', array( $this, 'dashboard_config' ) );
		add_filter( 'gutenverse_include_dashboard', array( $this, 'enqueue_scripts' ) );
	}

	/**
	 * Dashboard scripts.
	 */
	public function enqueue_scripts() {
		wp_enqueue_script( 'gutenverse-frontend-event' );

		$include = ( include GUTENVERSE_DIR . '/lib/dependencies/blocks.asset.php' )['dependencies'];

		wp_enqueue_script(
			'gutenverse-blocks',
			GUTENVERSE_URL . '/assets/js/blocks.js',
			$include,
			GUTENVERSE_VERSION,
			true
		);

		$include = ( include GUTENVERSE_DIR . '/lib/dependencies/dashboard.asset.php' )['dependencies'];

		wp_enqueue_script(
			'gutenverse-dashboard',
			GUTENVERSE_URL . '/assets/js/dashboard.js',
			$include,
			GUTENVERSE_VERSION,
			true
		);
	}

	/**
	 * Editor config
	 *
	 * @param array $config Config.
	 */
	public function dashboard_config( $config ) {
		$config['gutenverseAssetURL']           = GUTENVERSE_URL . '/assets/';
		$config['pluginVersions'][ GUTENVERSE ] = array(
			'name'           => GUTENVERSE_NAME,
			'version'        => GUTENVERSE_VERSION,
			'currentNotice'  => GUTENVERSE_NOTICE_VERSION,
			'noticeVersions' => array( '2.0.0', '1.8.0', '1.7.0', '1.6.0' ),
		);

		return $config;
	}
}
