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



function plurid_enhanced_image_block () {
	// $dir = dirname( __FILE__ );

	// $asset_file = include( plugin_dir_path( __FILE__ ) . 'distribution/index.asset.php');

	wp_register_script(
		'plurid-enhanced-image-editor',
		plugins_url( 'distribution/index.js', __FILE__ ),
		array(
			'wp-blocks'
		)
		// $asset_file['dependencies'],
		// $asset_file['version']
	);

	register_block_type(
		'plurid/enhanced-image',
		array(
			'editor_script' => 'plurid-enhanced-image-editor',
		)
	);
}

add_action( 'init', 'plurid_enhanced_image_block' );
