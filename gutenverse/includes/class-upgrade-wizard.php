<?php
/**
 * Upgrade Wizard Class.
 *
 * @author Jegstudio
 * @since 2.0.0
 * @package gutenverse
 */

namespace Gutenverse;

use Gutenverse\Framework\Init;

/**
 * Class Upgrade Wizard.
 *
 * @package gutenverse
 */
class Upgrade_Wizard {
	/**
	 * Action Slug
	 *
	 * @var string
	 */
	public static $action = 'gutenverse-upgrade-wizard';

	/**
	 * Upgrade_Wizard constructor.
	 */
	public function __construct() {
		add_action( 'admin_action_' . self::$action, array( $this, 'wizard_page' ) );
		add_action( 'admin_menu', array( $this, 'register_onboarding_page' ) );
		add_filter( 'admin_title', array( $this, 'filter_onboarding_admin_title' ), 10, 2 );
		add_action( 'admin_head', array( $this, 'add_onboarding_meta_tags' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_onboarding_scripts' ), 99 );
	}

	/**
	 * Wizard Page.
	 *
	 * @throws \Exception Throw exception.
	 */
	public function wizard_page() {
		try {
			if ( isset( $_REQUEST['nonce'] ) && wp_verify_nonce( sanitize_key( $_REQUEST['nonce'] ), self::$action ) ) {
				// Nanti implement.
			}

			if ( ! current_user_can( 'install_plugins' ) ) {
				throw new \Exception( 'Access denied', 403 );
			}

			header( 'Content-Type: ' . get_option( 'html_type' ) . '; charset=' . get_option( 'blog_charset' ) );
			$this->set_hook();
			$this->render_wizard();
			exit();
		} catch ( \Exception $e ) {
			echo wp_kses( $e->getMessage(), wp_kses_allowed_html() );
		}
	}

	/**
	 * Render Wizard.
	 */
	public function render_wizard() {
		?>
			<!DOCTYPE html>
			<html <?php language_attributes(); ?>>
			<head>
				<meta charset="utf-8"/>
				<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
				<title><?php esc_html_e( 'Gutenverse Upgrade Wizard', 'gutenverse' ); ?></title>
					<?php wp_head(); ?>
			</head>
			<body>
			<div id="gutenverse-wizard"></div>
					<?php
					wp_footer();
					/** This action is documented in wp-admin/admin-footer.php */
					do_action( 'admin_print_footer_scripts' );
					?>
			</body>
			</html>
		<?php
	}

	/**
	 * Set Hooks
	 */
	public function set_hook() {
		add_filter( 'show_admin_bar', '__return_false' );

		// Remove all HTML related WordPress actions.
		remove_all_actions( 'wp_head' );
		remove_all_actions( 'wp_print_styles' );
		remove_all_actions( 'wp_print_head_scripts' );
		remove_all_actions( 'wp_footer' );

		// Enqueue Script.
		add_action( 'wp_head', 'wp_enqueue_scripts', 1 );
		add_action( 'wp_head', 'wp_print_styles', 8 );
		add_action( 'wp_head', 'wp_print_head_scripts', 9 );
		add_action( 'wp_head', 'wp_site_icon' );

		// Handle `wp_footer`.
		add_action( 'wp_footer', 'wp_print_footer_scripts', 20 );
		add_action( 'wp_footer', 'wp_auth_check_html', 30 );

		// Handle `wp_enqueue_scripts`.
		remove_all_actions( 'wp_enqueue_scripts' );
		add_filter( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts' ), 999999 );
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_styles' ), 999999 );
	}

	/**
	 * Enqueue Scripts
	 */
	public function enqueue_scripts() {
		$include = ( include GUTENVERSE_DIR . '/lib/dependencies/wizard.asset.php' )['dependencies'];

		wp_enqueue_script(
			'gutenverse-wizard',
			GUTENVERSE_URL . '/assets/js/wizard.js',
			$include,
			GUTENVERSE_VERSION,
			true
		);

		wp_localize_script(
			'gutenverse-wizard',
			'GutenverseWizard',
			$this->wizard_config()
		);

		do_action( 'enqueue_script_in_wizard' );
	}

	/**
	 * Wizard Config
	 *
	 * @return array
	 */
	public function wizard_config() {
		$config                 = array();
		$config['dashboard']    = admin_url( 'admin.php?page=gutenverse' );
		$config['ajaxurl']      = admin_url( 'admin-ajax.php' );
		$config['installNonce'] = wp_create_nonce( 'updates' );
		$config['theme_slug']   = apply_filters( 'gutenverse_companion_base_theme', false ) ? wp_get_theme()->get_template() : 'show-case';
		$config['status']       = array(
			'form' => ! is_plugin_active( 'gutenverse-form/gutenverse-form.php' ),
			'icon' => ! Init::instance()->assets->is_font_icon_exists(),
		);

		$active_plugins = get_option( 'active_plugins' );
		$plugins        = array();

		foreach ( $active_plugins as $active ) {
			$plugins[] = explode( '/', $active )[0];
		}

		$config['plugins_url'] = plugins_url();
		$config['plugin_list'] = self::list_plugin();
		$config['plugins']     = array(
			array(
				'slug'         => 'gutenverse-companion',
				'title'        => 'Gutenverse Companion',
				'short_desc'   => '',
				'active'       => in_array( 'gutenverse-companion', $plugins, true ),
				'installed'    => $this->is_installed( 'gutenverse-companion' ),
				'icons'        => array(
					'1x' => 'https://ps.w.org/gutenverse-companion/assets/icon-128x128.png?rev=3162415',
				),
				'download_url' => '',
				'version'      => '2.0.0',
			),
		);

		$config['isProActive']      = defined( 'GUTENVERSE_PRO_VERSION' );
		$config['adminUrl']         = admin_url();
		$config['gutenverseImgDir'] = GUTENVERSE_URL . '/assets/img';
		$config['ImgDir']           = GUTENVERSE_FRAMEWORK_URL_PATH . '/assets/img';
		$config['upgradeProUrl']    = gutenverse_upgrade_pro();

		$response = Api::instance()->base_theme_get( '' );
		if ( isset( $response ) && isset( $response->data['companion'] ) ) {
			$data_list = $response->data['companion'];
			$new_list  = array();

			foreach ( $data_list as $data ) {
				$slug     = $data['slug'];
				$new_data = $data;

				$is_active    = wp_get_theme()->get_stylesheet() === $slug;
				$is_installed = wp_get_theme( $slug )->exists();

				$new_data['active']    = $is_active;
				$new_data['installed'] = $is_installed;

				$new_list[] = $new_data;
			}
			$config['themeData'] = $new_list;
		} else {
			$config['themeData'] = null;
		}
		return $config;
	}

	/**
	 * Get List Of Installed Plugin.
	 *
	 * @return array
	 */
	public static function list_plugin() {
		$plugins = array();
		$active  = array();

		foreach ( get_option( 'active_plugins' ) as  $plugin ) {
			$active[] = explode( '/', $plugin )[0];
		}

		foreach ( get_plugins() as $key => $plugin ) {
			$slug             = explode( '/', $key )[0];
			$data             = array();
			$data['active']   = in_array( $slug, $active, true );
			$data['version']  = $plugin['Version'];
			$data['name']     = $plugin['Name'];
			$data['path']     = str_replace( '.php', '', $key );
			$plugins[ $slug ] = $data;
		}

		return $plugins;
	}

	/**
	 * Enqueue Style
	 */
	public function enqueue_styles() {
		wp_enqueue_style(
			'gutenverse-backend-font',
			'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&amp;family=Roboto:wght@400;500;600&amp;display=swap',
			array(),
			GUTENVERSE_FRAMEWORK_VERSION
		);

		wp_enqueue_style(
			'gutenverse-wizard',
			GUTENVERSE_URL . '/assets/css/wizard.css',
			array(),
			GUTENVERSE_VERSION
		);
	}

	/**
	 * Check if plugin is installed.
	 *
	 * @param string $plugin_slug plugin slug.
	 *
	 * @return boolean
	 */
	public function is_installed( $plugin_slug ) {
		$all_plugins = get_plugins();
		foreach ( $all_plugins as $plugin_file => $plugin_data ) {
			$plugin_dir = dirname( $plugin_file );

			if ( $plugin_dir === $plugin_slug ) {
				return true;
			}
		}

		return false;
	}

	/**
	 * Enqueue Onboarding Scripts
	 */
	public function enqueue_onboarding_scripts( $hook ) {
		if ( 'admin_page_gutenverse-onboarding-wizard' !== $hook ) {
			return;
		}

		$include = ( include GUTENVERSE_DIR . '/lib/dependencies/wizard.asset.php' )['dependencies'];

		wp_enqueue_script(
			'gutenverse-wizard',
			GUTENVERSE_URL . '/assets/js/wizard.js',
			$include,
			GUTENVERSE_VERSION,
			true
		);

		wp_localize_script(
			'gutenverse-wizard',
			'GutenverseWizard',
			$this->wizard_config()
		);
		wp_enqueue_style(
			'gutenverse-backend-font',
			'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&amp;family=Roboto:wght@400;500;600&amp;display=swap',
			array(),
			GUTENVERSE_FRAMEWORK_VERSION
		);

		wp_enqueue_style(
			'gutenverse-wizard',
			GUTENVERSE_URL . '/assets/css/wizard.css',
			array(),
			GUTENVERSE_VERSION
		);
	}

	/**
	 * Register Onboarding Page.
	 */
	public function register_onboarding_page() {
		add_submenu_page(
			'gutenverse', // valid parent.
			__( 'Welcome to Gutenverse', 'gutenverse' ),
			__( 'Gutenverse Onboarding', 'gutenverse' ),
			'manage_options',
			'gutenverse-onboarding-wizard',
			array( $this, 'render_onboard_wizard' )
		);

		// Hide it from the menu.
		remove_submenu_page(
			'gutenverse',
			'gutenverse-onboarding-wizard'
		);
	}

	/**
	 * Filter Onboarding Admin Title.
	 *
	 * @param string $admin_title Admin title.
	 * @param string $title Title.
	 *
	 * @return string
	 */
	public function filter_onboarding_admin_title( $admin_title, $title ) {
		$screen = get_current_screen();

		if ( $screen && 'admin_page_gutenverse-onboarding-wizard' === $screen->id ) {
			return __( 'Welcome to Gutenverse', 'gutenverse' ) . ' ‹ ' . get_bloginfo( 'name' );
		}

		return $admin_title;
	}

	/**
	 * Add Onboarding Meta Tags.
	 */
	public function add_onboarding_meta_tags() {
		$screen = get_current_screen();

		if ( ! $screen || 'admin_page_gutenverse-onboarding-wizard' !== $screen->id ) {
			return;
		}
		?>
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<meta name="description" content="<?php esc_attr_e( 'Gutenverse onboarding wizard', 'gutenverse' ); ?>" />
		<?php
	}

	/**
	 * Render Onboard Wizard.
	 */
	public function render_onboard_wizard() {
		if ( ! current_user_can( 'install_plugins' ) ) {
			wp_die( __( 'Access denied', 'gutenverse' ), 403 );
		}
		?>
		<div class="wrap gutenverse-onboarding-wrap">
			<div id="gutenverse-onboard-wizard"></div>
		</div>
		<?php
	}
}
