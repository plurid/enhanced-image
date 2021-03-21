<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              https://plurid.com
 * @since             0.0.0
 * @package           Enhanced_Image
 *
 * @wordpress-plugin
 * Plugin Name:       Enhanced Image
 * Plugin URI:        https://plurid-com/enhanced-image
 * Description:       Enhance images with text selection, colors modification, image transformations, and more.
 * Version:           0.0.0
 * Author:            Plurid, Inc.
 * Author URI:        https://plurid.com
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       enhanced-image
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Currently plugin version.
 * Start at version 1.0.0 and use SemVer - https://semver.org
 * Rename this for your plugin and update it as you release new versions.
 */
define( 'ENHANCED_IMAGE_VERSION', '0.0.0' );

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-enhanced-image-activator.php
 */
function activate_enhanced_image() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-enhanced-image-activator.php';
	Enhanced_Image_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-enhanced-image-deactivator.php
 */
function deactivate_enhanced_image() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-enhanced-image-deactivator.php';
	Enhanced_Image_Deactivator::deactivate();
}

register_activation_hook( __FILE__, 'activate_enhanced_image' );
register_deactivation_hook( __FILE__, 'deactivate_enhanced_image' );

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-enhanced-image.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_enhanced_image() {

	$plugin = new Enhanced_Image();
	$plugin->run();

}
run_enhanced_image();
