<?php
/**
 * Dashboard class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse
 */

namespace Gutenverse;

use Gutenverse\Framework\Init;

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
		add_filter( 'gutenverse_dashboard_config', array( $this, 'dashboard_config' ), 9 );
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

		wp_enqueue_style(
			'gutenverse-dashboard',
			GUTENVERSE_URL . '/assets/css/update-notice.css',
			array(),
			GUTENVERSE_VERSION
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
			'noticeVersions' => array( '3.2.0' ),
		);

		$upgrader     = new Upgrader();
		$done         = get_option( $upgrader->get_plugin_upgrade_option_name() );
		$flag         = get_option( $upgrader->get_plugin_split_option_name() );
		$font         = Init::instance()->assets->is_font_icon_exists();
		$form         = is_plugin_active( 'gutenverse-form/gutenverse-form.php' );
		$theme        = wp_get_theme();
		$flag_content = get_option( $upgrader->get_page_content_option_name() );

		$plugin_requirement = array(
			'gutenverse-form' => array(
				'path'   => 'gutenverse-form/gutenverse-form.php',
				'active' => false,
			),
		);
		$all_plugin         = get_plugins();
		foreach ( $plugin_requirement as $key => &$value ) {
			$active = is_plugin_active( $value['path'] );
			if ( isset( $all_plugin[ $value['path'] ] ) ) {
				if ( $active ) {
					$value['active'] = true;
				} else {
					$value['active'] = false;
				}
			} else {
				$value['active'] = false;
			}
		}

		$config['noticeActions'] = ! empty( $config['noticeActions'] ) ? $config['noticeActions'] : array();

		$config['noticeActions']['gutenverse-notice-banner'] = array(
			'show' => Banner::can_render_notice(),
		);

		$config['noticeActions']['gutenverse-upgrade-notice'] = array(
			'show'       => $flag && ! $done && ( ! $font || ! $form ),
			'action_url' => admin_url( 'admin.php?action=gutenverse-upgrade-wizard' ),
		);

		$config['noticeActions']['gutenverse-page-content-notice'] = array(
			'show'       => $upgrader->check_old_theme( $theme ) && $flag_content,
			'action_url' => admin_url( 'themes.php' ),
			'theme_name' => $theme->name,
		);

		$config['noticeActions']['gutenverse-form-entries-notice'] = array(
			'show' => ! $plugin_requirement['gutenverse-form']['active'],
		);

		return $config;
	}
}
