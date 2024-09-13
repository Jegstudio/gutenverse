<?php
/**
 * Plugin Name: Gutenverse
 * Description: Collection of easy to use and customizable blocks for WordPress Block Editor. Build a great website using block provided with Gutenverse.
 * Plugin URI: https://gutenverse.com/
 * Author: Jegstudio
 * Version: 2.0.4
 * Author URI: https://jegtheme.com/
 * License: GPLv3
 * Text Domain: gutenverse
 *
 * @package gutenverse
 */

use Gutenverse\Gutenverse;

defined( 'GUTENVERSE' ) || define( 'GUTENVERSE', 'gutenverse' );
defined( 'GUTENVERSE_VERSION' ) || define( 'GUTENVERSE_VERSION', '2.0.4' );
defined( 'GUTENVERSE_NOTICE_VERSION' ) || define( 'GUTENVERSE_NOTICE_VERSION', '2.0.0' );
defined( 'GUTENVERSE_NAME' ) || define( 'GUTENVERSE_NAME', 'Gutenverse' );
defined( 'GUTENVERSE_URL' ) || define( 'GUTENVERSE_URL', plugins_url( GUTENVERSE ) );
defined( 'GUTENVERSE_PLUGIN_URL' ) || define( 'GUTENVERSE_PLUGIN_URL', plugins_url( GUTENVERSE ) );
defined( 'GUTENVERSE_FILE' ) || define( 'GUTENVERSE_FILE', __FILE__ );
defined( 'GUTENVERSE_DIR' ) || define( 'GUTENVERSE_DIR', plugin_dir_path( __FILE__ ) );
defined( 'GUTENVERSE_CLASS_DIR' ) || define( 'GUTENVERSE_CLASS_DIR', GUTENVERSE_DIR . 'includes/' );
defined( 'GUTENVERSE_LANG_DIR' ) || define( 'GUTENVERSE_LANG_DIR', GUTENVERSE_DIR . 'languages' );
defined( 'GUTENVERSE_PATH' ) || define( 'GUTENVERSE_PATH', plugin_basename( __FILE__ ) );
defined( 'GUTENVERSE_FRAMEWORK_URL' ) || define( 'GUTENVERSE_FRAMEWORK_URL', plugins_url( GUTENVERSE ) . '/lib/framework' );

// Required Pro Version.
defined( 'GUTENVERSE_REQUIRED_PRO_VERSION' ) || define( 'GUTENVERSE_REQUIRED_PRO_VERSION', '1.0.0' );

require_once GUTENVERSE_DIR . 'lib/autoload.php';
Gutenverse::instance();
