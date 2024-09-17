<?php
/**
 * Gutenverse Main class
 *
 * @author Jegstudio
 * @since 1.0.0
 * @package gutenverse
 */

namespace Gutenverse;

use Gutenverse\Form_Fallback\Form_Fallback_Init;
use Gutenverse\Popup_Fallback\Popup_Fallback_Init;

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
	 * Form Fallback
	 *
	 * @var Form_Fallback
	 */
	public $form_fallback;

	/**
	 * Popup Fallback
	 *
	 * @var Popup_Fallback
	 */
	public $popup_fallback;

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
			add_action( 'plugins_loaded', array( $this, 'framework_loaded' ), 99 );
			add_filter( 'plugin_row_meta', array( $this, 'plugin_meta_links' ), 10, 2 );
		}
		register_activation_hook( GUTENVERSE_FILE, array( $this, 'set_activation_transient' ) );
	}

	/**
	 * Set Activation Transient
	 */
	public function set_activation_transient() {
		set_transient( 'gutenverse_redirect', 1, 30 );
	}
	/**
	 * Plugin Update Notice.
	 *
	 * @param string $plugin String Update Notice.
	 */
	public function plugin_update_notice( $plugin ) {
		$plugin_name = '';

		switch ( $plugin ) {
			case 'gutenverse-form/gutenverse-form.php':
				$plugin_name = 'Gutenverse Form';
				break;
			case 'gutenverse-news/gutenverse-news.php':
				$plugin_name = 'Gutenverse News';
				break;
		}

		?>
		<style>
			.gutenverse-upgrade-notice .notice-logo {
				background: #ffe2e2;
				border-left-color: #ff0909;
			}
		</style>
		<div class="notice gutenverse-upgrade-notice page-content-upgrade">
				<div class="notice-logo">
					<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M10 0C4.47754 0 0 4.47915 0 10C0 15.5241 4.47754 20 10 20C15.5225 20 20 15.5241 20 10C20 4.47915 15.5225 0 10 0ZM10 4.43548C10.9353 4.43548 11.6935 5.19371 11.6935 6.12903C11.6935 7.06435 10.9353 7.82258 10 7.82258C9.06468 7.82258 8.30645 7.06435 8.30645 6.12903C8.30645 5.19371 9.06468 4.43548 10 4.43548ZM12.2581 14.6774C12.2581 14.9446 12.0414 15.1613 11.7742 15.1613H8.22581C7.95859 15.1613 7.74194 14.9446 7.74194 14.6774V13.7097C7.74194 13.4425 7.95859 13.2258 8.22581 13.2258H8.70968V10.6452H8.22581C7.95859 10.6452 7.74194 10.4285 7.74194 10.1613V9.19355C7.74194 8.92633 7.95859 8.70968 8.22581 8.70968H10.8065C11.0737 8.70968 11.2903 8.92633 11.2903 9.19355V13.2258H11.7742C12.0414 13.2258 12.2581 13.4425 12.2581 13.7097V14.6774Z" fill="#ff0909"/>
					</svg>
				</div>
				<div class="notice-content">
					<h2>
						<?php
						printf(
							// translators: %s is plugin name.
							esc_html__( 'Update %s Plugin!', 'gutenverse' ),
							esc_html( $plugin_name )
						);
						?>
					</h2>
					<p>
						<?php
						printf(
							// translators: %s is plugin name.
							esc_html__( 'We notice that you are using old version of %s plugin and will cause gutenverse plugin crashed. ', 'gutenverse' ),
							esc_html( $plugin_name )
						);
						?>
					</p>				
					<p>
						<?php
						printf(
							'%s <strong>%s %s</strong> %s',
							esc_html__( 'We currently disabled gutenverse plugin.', 'gutenverse' ),
							esc_html__( 'Please update', 'gutenverse' ),
							esc_html( $plugin_name ),
							esc_html__( 'to prevent your site from crashed.', 'gutenverse' )
						);
						?>
					</p>
					<div class="gutenverse-upgrade-action">
						<a class='button-primary upgrade-themes' href="<?php echo esc_url( admin_url( 'plugins.php' ) ); ?>"><?php esc_html_e( 'Update Gutenverse Form Plugin', 'gutenverse' ); ?></a>						
					</div>
				</div>
			</div>
		<?php
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
	 * Register Framework.
	 */
	public function register_framework() {
		require_once GUTENVERSE_DIR . 'lib/framework/init.php';
		$init = \Gutenverse_Initialize_Framework::instance();

		if ( ! function_exists( 'get_plugins' ) ) {
			require_once ABSPATH . 'wp-admin/includes/plugin.php';
		}

		$plugins = get_plugins();
		$checks  = array(
			'gutenverse-form/gutenverse-form.php',
			'gutenverse-news/gutenverse-news.php',
		);

		$instance = $this;

		foreach ( $checks as $plugin ) {
			if ( isset( $plugins[ $plugin ] ) ) {
				$form = $plugins[ $plugin ];

				if ( version_compare( $form['Version'], '1.0.0', '<' ) && is_plugin_active( $plugin ) ) {
					add_action(
						'admin_notices',
						function () use ( $instance, $plugin ) {
							$instance->plugin_update_notice( $plugin );
						}
					);
					return false;
				}
			}
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
		$this->load_textdomain();
		$this->init_instance();
		$this->init_post_type();
	}

	/**
	 * Initialize Framework.
	 */
	public function init_framework() {
		if ( $this->can_load_framework() ) {
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
	 * Initialize Dashboard
	 */
	public function init_post_type() {
		$this->dashboard = new Dashboard();
	}

	/**
	 * Initialize Instance
	 */
	public function init_instance() {
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
		if ( ! in_array( 'gutenverse-form/gutenverse-form.php', $active_plugins ) ) {
			$this->form_fallback = new Form_Fallback_Init();
		}
		if ( ! in_array( 'gutenverse-popup/gutenverse-popup.php', $active_plugins ) ) {
			$this->popup_fallback = new Popup_Fallback_Init();
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
