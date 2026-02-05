<?php
/**
 * Gutenverse Main class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse
 */

namespace Gutenverse;

/**
 * Class Gutenverse
 *
 * @package gutenverse
 */
class Gutenverse {
	/**
	 * Instance of Gutenverse.
	 *
	 * @var Gutenverse
	 */
	private static $instance;

	/**
	 * Hold instance of Blocks
	 *
	 * @var Blocks
	 */
	public $blocks;

	/**
	 * Hold instance of form
	 *
	 * @var Form
	 */
	public $form;

	/**
	 * Hold instance of entries
	 *
	 * @var Entries
	 */
	public $entries;

	/**
	 * Hold instance of dashboard
	 *
	 * @var Dashboard
	 */
	public $dashboard;

	/**
	 * Hold frontend assets instance
	 *
	 * @var Frontend_Assets
	 */
	public $frontend_assets;

	/**
	 * Hold editor assets instance
	 *
	 * @var Editor_Assets
	 */
	public $editor_assets;

	/**
	 * Hold theme list instance
	 *
	 * @var Theme_List
	 */
	public $theme_list;

	/**
	 * Hold Library Instance.
	 *
	 * @var Library
	 */
	public $library;

	/**
	 * Hold Theme Helper Instance.
	 *
	 * @var Theme_Helper
	 */
	public $theme_helper;

	/**
	 * Hold Style Generator Instance.
	 *
	 * @var Style_Generator
	 */
	public $style_generator;

	/**
	 * Hold Frontend Toolbar Instance.
	 *
	 * @var Frontend_Toolbar
	 */
	public $frontend_toolbar;

	/**
	 * Hold Banner Instance.
	 *
	 * @var Banner
	 */
	public $banner;

	/**
	 * Hold Upgrader Instance.
	 *
	 * @var Upgrader
	 */
	public $upgrader;

	/**
	 * Hold Global Variable Instance.
	 *
	 * @var Global_Variable
	 */
	public $global_variable;

	/**
	 * Hold API Variable Instance.
	 *
	 * @var Api
	 */
	public $api;

	/**
	 * Hold Meta Option Instance.
	 *
	 * @var Meta_Option
	 */
	public $meta_option;

	/**
	 * Upgrade Wizard.
	 *
	 * @var Upgrade_Wizard
	 */
	public $upgrade_wizard;

	/**
	 * Singleton page for Gutenverse Class
	 *
	 * @return Gutenverse
	 */
	public static function instance() {
		if ( null === static::$instance ) {
			static::$instance = new static();
		}

		return static::$instance;
	}

	/**
	 * Init constructor.
	 */
	private function __construct() {
		$flag = $this->register_framework();
		if ( $flag ) {
			// Change priority to 9 to prevent gutenverse form crash at version 1.0.0.
			add_action( 'plugins_loaded', array( $this, 'plugin_loaded' ), 9 );
		}
		add_action( 'plugins_loaded', array( $this, 'framework_loaded' ), 99 );
		add_filter( 'plugin_row_meta', array( $this, 'plugin_meta_links' ), 10, 2 );
		register_activation_hook( GUTENVERSE_FILE, array( $this, 'set_activation_transient' ) );
	}

	/**
	 * Set Activation Transient
	 */
	public function set_activation_transient() {
		$check_url = explode(
			'/',
			$_SERVER['REQUEST_URI']
		);
		if ( 'wp-json' !== $check_url[1] ) {
			set_transient( 'gutenverse_redirect', 1, 30 );

			$flag = get_option( 'gutenverse_theme_select_complete' );
			if ( ! $flag ) {
				set_transient( 'gutenverse_wizard_redirect', true, 30 );
			}
		}
	}

	/**
	 * Plugin Meta Link
	 *
	 * @param array  $links  Initial list of links.
	 * @param string $file   Basename of current plugin.
	 *
	 * @return array
	 */
	public function plugin_meta_links( $links, $file ) {
		if ( plugin_basename( GUTENVERSE_FILE ) === $file ) {
			$support_link = '<a target="_blank" href="https://wordpress.org/support/plugin/gutenverse/">' . esc_html__( 'Got Question?', 'gutenverse' ) . '</a>';
			$rate_link    = '<a target="_blank" href="https://wordpress.org/support/plugin/gutenverse/reviews/#new-post">' . esc_html__( 'Rate us ★★★★★', 'gutenverse' ) . '</a>';

			$links[] = $support_link;
			$links[] = $rate_link;
		}

		return $links;
	}

	/**
	 * Check weather a plugin is updated up to a version.
	 *
	 * @param string $plugin plugin name.
	 * @param string $version_to_compare version to check if current plugin is equal to or higher.
	 *
	 * @return bool
	 */
	public function is_plugin_updated( $plugin, $version_to_compare ) {
		$is_updated = false;
		$plugins    = get_plugins();

		if ( isset( $plugins[ $plugin ] ) ) {
			$current_plugin_version = $plugins[ $plugin ]['Version'];
			$is_updated             = version_compare( $current_plugin_version, $version_to_compare, '>=' );
		}

		return $is_updated;
	}

	/**
	 * Get Framework version from file.
	 *
	 * @param string $file file path of the file that has the data framework.
	 */
	public function get_framework_version_from_file( $file ) {
		require_once ABSPATH . 'wp-admin/includes/file.php';
		WP_Filesystem();
		global $wp_filesystem;

		if ( $wp_filesystem->exists( $file ) ) {

			$content = $wp_filesystem->get_contents( $file );
			if ( preg_match( "/define\(\s*'GUTENVERSE_FRAMEWORK_VERSION'\s*,\s*'([^']+)'\s*\)/", $content, $matches ) ) {
				$version = $matches[1];
				return $version;
			}
		}
		return false;
	}

	/**
	 * Register Framework.
	 */
	public function register_framework() {
		require_once GUTENVERSE_DIR . 'lib/framework/init.php';
		$init = \Gutenverse_Initialize_Framework::instance();

		if ( ! function_exists( 'get_plugins' ) ) {
			require_once ABSPATH . 'wp-admin/includes/plugin.php';
		}
		/**Get self framework version */
		$bootstrap_path         = '/lib/framework/bootstrap.php';
		$self_bootstrap_path    = WP_PLUGIN_DIR . '/gutenverse' . $bootstrap_path;
		$self_framework_version = $this->get_framework_version_from_file( $self_bootstrap_path );
		if ( ! $self_framework_version ) {
			$self_framework_version = '1.0.0';
		}
		$plugins = get_plugins();
		$checks  = array(
			'gutenverse-form' => array(
				'plugin' => 'gutenverse-form/gutenverse-form.php',
			),
			'gutenverse-news' => array(
				'plugin' => 'gutenverse-news/gutenverse-news.php',
			),
		);

		$is_using_other_framework = false;
		$arr_equal_ver            = array();

		/**Compare self framework version with other plugin framework version*/
		foreach ( $checks as $key => $plugin ) {
			if ( isset( $plugins[ $plugin['plugin'] ] ) ) {
				if ( is_plugin_active( $plugin['plugin'] ) ) {
					$plugin_bootstrap_path     = WP_PLUGIN_DIR . '/' . $key . '/' . $bootstrap_path;
					$plugin_framework_version  = $this->get_framework_version_from_file( $plugin_bootstrap_path );
					$compare_framework_version = version_compare( $self_framework_version, $plugin_framework_version, '<' );
					/**If there a bigger version framework then self then stop looping */
					if ( $compare_framework_version ) {
						$is_using_other_framework = true;
						break;
					}
					/**If there a equal version framework then self then add plugin name to arr_equal_var */
					$compare_equal_framework_version = version_compare( $self_framework_version, $plugin_framework_version, '=' );
					if ( $compare_equal_framework_version ) {
						array_push( $arr_equal_ver, $key );
					}
				}
			}
		}

		/**If loop done and there is no plugin that has bigger framework version then check arr_equal_var */
		if ( ! $is_using_other_framework && ! empty( $arr_equal_ver ) ) {
			/**add self plugin then sort */
			$arr_equal_ver[] = 'gutenverse';
			sort( $arr_equal_ver );

			/**Check if the first value is self plugin or not, if not then it will not load framework from this plugin */
			if ( GUTENVERSE !== $arr_equal_ver[0] ) {
				$is_using_other_framework = true;
			}
		}

		/**Check if framework is loaded from this plugin or not */
		if ( $is_using_other_framework ) {
			return false;
		}
		$framework_file    = GUTENVERSE_DIR . 'lib/framework/bootstrap.php';
		$framework_version = $init->get_framework_version( $framework_file );
		$init->register_version( GUTENVERSE, $framework_version );
		$init->register_pro_version( GUTENVERSE, GUTENVERSE_REQUIRED_PRO_VERSION );

		return true;
	}

	/**
	 * Check if we can load framework.
	 *
	 * @return boolean
	 */
	public function can_load_framework() {
		require_once GUTENVERSE_DIR . 'lib/framework/init.php';
		$init = \Gutenverse_Initialize_Framework::instance();

		return $init->can_load_version( GUTENVERSE );
	}

	/**
	 * Plugin Loaded.
	 */
	public function plugin_loaded() {
		$this->init_framework();
	}

	/**
	 * Framework Loaded
	 */
	public function framework_loaded() {

		if ( ! function_exists( 'get_plugins' ) ) {
			require_once ABSPATH . 'wp-admin/includes/plugin.php';
		}

		$plugins = \get_plugins();
		$checks  = array(
			'gutenverse-form/gutenverse-form.php',
			'gutenverse-news/gutenverse-news.php',
			'gutenverse-pro/gutenverse-pro.php',
		);

		$notices = array();
		foreach ( $checks as $plugin ) {
			if ( isset( $plugins[ $plugin ] ) ) {
				$form             = $plugins[ $plugin ];
				$plugin_name      = '';
				$required_version = '1.0.0';
				$plugin_arr       = explode( '/', $plugin );
				$plugin_slug      = $plugin_arr[0];

				switch ( $plugin ) {
					case 'gutenverse-form/gutenverse-form.php':
						$required_version = '2.0.0';
						$plugin_name      = 'Gutenverse Form';
						break;
					case 'gutenverse-news/gutenverse-news.php':
						$required_version = '1.0.0';
						$plugin_name      = 'Gutenverse News';
						break;
					case 'gutenverse-pro/gutenverse-pro.php':
						$required_version = '2.0.0';
						$plugin_name      = 'Gutenverse Pro';
						break;
				}

				if ( version_compare( $form['Version'], $required_version, '<' ) && is_plugin_active( $plugin ) ) {
					$notices[ 'gutenverse-update-' . $plugin_slug . '-notice' ] = array(
						'show'               => true,
						'notice_header'      => "Update {$plugin_name} Plugin!",
						'notice_description' => "We notice that you haven't update {$plugin_name} plugin to version {$required_version} or above but, currently using Gutenverse version 3.0.0 or above.",
						'notice_action'      => 'You might see issue on the Editor. ',
						'notice_action_2'    => 'to ensure smooth editing experience!',
						'action_url'         => admin_url( 'plugins.php' ),
						'plugin_name'        => $plugin_name,
					);
				}
			}
		}

		add_filter(
			'gutenverse_dashboard_config',
			function ( $config ) use ( $notices ) {
				$config['noticeActions'] = ! empty( $config['noticeActions'] ) ? $config['noticeActions'] : array();
				$merging_notices         = array_merge( $config['noticeActions'], $notices );
				$config['noticeActions'] = $merging_notices;
				return $config;
			}
		);

		$this->load_textdomain();
		$this->init_instance();
	}

	/**
	 * Initialize Framework.
	 */
	public function init_framework() {
		if ( $this->can_load_framework() ) {
			defined( 'GUTENVERSE_FRAMEWORK_URL_PATH' ) || define( 'GUTENVERSE_FRAMEWORK_URL_PATH', plugins_url( GUTENVERSE ) . '/lib/framework' );
			require_once GUTENVERSE_DIR . 'lib/framework/bootstrap.php';
		}
	}

	/**
	 * Load text domain
	 */
	public function load_textdomain() {
		add_action( 'rest_api_init', array( $this, 'init_api' ) );
		load_plugin_textdomain( 'gutenverse', false, GUTENVERSE_LANG_DIR );
	}

	/**
	 * Initialize Instance
	 */
	public function init_instance() {
		$this->dashboard       = new Dashboard();
		$this->blocks          = new Blocks();
		$this->frontend_assets = new Frontend_Assets();
		$this->editor_assets   = new Editor_Assets();
		$this->style_generator = new Style_Generator();
		$this->banner          = new Banner();
		$this->upgrader        = new Upgrader();
		$this->meta_option     = new Meta_Option();
		$this->upgrade_wizard  = new Upgrade_Wizard();

		$active_plugins    = get_option( 'active_plugins' );
		$multisite_plugins = get_site_option( 'active_sitewide_plugins' );
		if ( $multisite_plugins ) {
			$active_plugins_multisite = array_keys( $multisite_plugins );
			$active_plugins           = array_merge( $active_plugins, $active_plugins_multisite );
		}
	}

	/**
	 * Init Rest API
	 */
	public function init_api() {
		$this->api = Api::instance();
	}

	/**
	 * WP API URL
	 */
	public function wp_api_url() {
		return esc_url_raw( rest_url( 'wp/v2' ) );
	}
}
