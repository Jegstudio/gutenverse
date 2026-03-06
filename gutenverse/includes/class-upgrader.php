<?php
/**
 * Upgrader class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse
 */

namespace Gutenverse;

use Gutenverse\Framework\Api;
use Gutenverse\Framework\Meta_Option;

/**
 * Class Upgrader
 *
 * @package gutenverse
 */
class Upgrader {
	/**
	 * Class constructor.
	 */
	public function __construct() {
		add_action( 'init', array( $this, 'set_upgrader_page_content' ), 99 );
		add_action( 'admin_init', array( $this, 'set_upgrader_theme_select' ), 99 );
		add_action( 'wp_ajax_gutenverse_upgrader_page_content_close', array( $this, 'upgrader_page_content_close' ) );
		add_action( 'wp_ajax_gutenverse_upgrader_page_upgrade_close', array( $this, 'upgrader_page_upgrade_close' ) );
		add_action( 'gutenverse_plugin_upgrade', array( $this, 'upgrade_like' ), 20 );
	}

	/**
	 * Set form split option meta
	 */
	public function set_upgrader_theme_select() {
		if ( ! apply_filters( 'gutenverse_wporg_plus_mechanism', false ) ) {
			return;
		}

		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}

		$needs_redirect = get_transient( 'gutenverse_wizard_redirect' );
		$option_key    = 'gutenverse-onboard-lite-theme-' . get_stylesheet();

		if ( ! $needs_redirect || get_option( $option_key ) ) {
			return;
		}

		delete_transient( 'gutenverse_wizard_redirect' );
		update_option( $option_key, true, false );

		wp_safe_redirect(
			admin_url( 'admin.php?page=gutenverse-onboarding-wizard' )
		);
		exit;
	}

	/**
	 * Enqueue Script.
	 */
	public function enqueue_script() {
		wp_enqueue_style( 'fontawesome-gutenverse' );
	}

	/**
	 * Upgrade like
	 */
	public function upgrade_like() {
		if ( ! apply_filters( 'gutenverse_server_mode', false ) ) {
			$flag     = Meta_Option::instance()->get_option( 'converted-library', false );
			$layouts  = Meta_Option::instance()->get_option( 'liked_layout' );
			$sections = Meta_Option::instance()->get_option( 'liked_section' );

			if ( ! $flag && count( $layouts ) > 0 && count( $sections ) > 0 ) {
				// Force to update library.
				Api::instance()->update_library_data();
				$data = Api::instance()->library_data();

				$this->upgrade_like_layout( $data['theme-data'] );
				$this->upgrade_like_section( $data['section-data'] );
			}

			Meta_Option::instance()->set_option( 'converted-library', true );
		}
	}

	/**
	 * Upgrade like layout data.
	 *
	 * @param array $data Layout Data.
	 */
	public function upgrade_like_layout( $data ) {
		$layouts = Meta_Option::instance()->get_option( 'liked_layout' );

		/** Replace Layouts */
		$liked_layouts = array();
		foreach ( $layouts as $layout ) {
			foreach ( $data as $item ) {
				if ( $item['id'] === $layout ) {
					// Replace id to slug.
					$liked_layouts[] = $item['data']['slug'];
				}
			}
		}

		Meta_Option::instance()->set_option( 'liked_layout', $liked_layouts );
	}

	/**
	 * Upgrade like section data.
	 *
	 * @param array $data Section Data.
	 */
	public function upgrade_like_section( $data ) {
		$sections = Meta_Option::instance()->get_option( 'liked_section' );

		/** Replace Layouts */
		$liked_sections = array();
		foreach ( $sections as $section ) {
			foreach ( $data as $item ) {
				if ( $item['id'] === $section ) {
					// Replace id to slug.
					$liked_sections[] = $item['data']['slug'];
				}
			}
		}

		Meta_Option::instance()->set_option( 'liked_section', $liked_sections );
	}

	/**
	 * Change option page content to false.
	 */
	public function upgrader_page_content_close() {
		update_option( $this->get_page_content_option_name(), false, false );
	}

	/**
	 * Change option page upgrade to true.
	 */
	public function upgrader_page_upgrade_close() {
		update_option( $this->get_plugin_upgrade_option_name(), true, false );
	}

	/**
	 * Get Page Content Upgrader Option Name.
	 *
	 * @return string.
	 */
	public function get_page_content_option_name() {
		return 'gutenverse_' . wp_get_theme()->template . '_upgrader_page_content';
	}

	/**
	 * Get Form Split Upgrader Option Name.
	 *
	 * @return string.
	 */
	public function get_plugin_split_option_name() {
		return 'gutenverse_upgrader_plugin_split';
	}

	/**
	 * Ge Upgrader Option Name.
	 *
	 * @return string.
	 */
	public function get_plugin_upgrade_option_name() {
		return 'gutenverse_upgrader_completed';
	}

	/**
	 * Ge Upgrader Option Name.
	 *
	 * @return string.
	 */
	public function get_plugin_theme_select_name() {
		return 'gutenverse_theme_select_complete';
	}

	/**
	 * Set content width upgrader option meta
	 */
	public function set_upgrader_page_content() {
		$flag = get_option( $this->get_page_content_option_name() );

		if ( ! $flag ) {
			add_option( $this->get_page_content_option_name(), true );
		}
	}

	/**
	 * Check old theme
	 *
	 * @param object $theme : Old theme data.
	 */
	public function check_old_theme( $theme ) {
		$versions = array(
			'accountra' => '1.0.1',
			'financio'  => '1.1.1',
			'hypebiz'   => '1.0.2',
			'intrace'   => '1.0.8',
			'photology' => '1.1.1',
			'renovater' => '1.0.3',
			'restance'  => '1.0.2',
			'startupzy' => '1.0.9',
			'travey'    => '1.0.2',
			'waterlava' => '1.0.4',
			'zeever'    => '1.0.8',
		);

		if ( isset( $versions[ $theme->template ] ) ) {
			return version_compare( $theme->get( 'Version' ), $versions[ $theme->template ], '<=' );
		}

		return false;
	}
}
