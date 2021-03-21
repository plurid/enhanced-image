<?php
/**
 * Plugin Name:     Enhanced Image
 * Description:     Enhanced Image.
 * Version:         0.0.0
 * Author:          a
 * Author URI:      b
 * License:         c
 * License URI:     d
 * Text Domain:     enhancedImage
 *
 * @package         enhancedImage
 */

add_action( 'init', function() {
	$dir = dirname( __FILE__ );

	$asset_file = include( plugin_dir_path( __FILE__ ) . 'build/index.asset.php');

	wp_register_script(
		'plurid-enhanced-image-editor',
		plugins_url( 'build/index.js', __FILE__ ),
		$asset_file['dependencies'],
		$asset_file['version']
	);

	register_block_type( 'plurid/enhanced-image', array(
		'editor_script' => 'plurid-enhanced-image-editor',
	) );
} );
