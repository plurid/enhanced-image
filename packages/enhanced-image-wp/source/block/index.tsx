// #region imports
	// #region libraries
	import { registerBlockType } from '@wordpress/blocks';
	import { __ } from '@wordpress/i18n';
	// #endregion libraries
// #endregion imports



/**
 * Internal dependencies
 */
import edit from './edit';
import save from './save';


// #region module
registerBlockType(
	'plurid/enhanced-image',
	{
		title: __( 'enhanced-image', 'enhancedImage' ),
		description: __(
			'enhanced-image.',
			'enhancedImage'
		),
		category: 'widgets',
		icon: 'cover-image',
		supports: {
			// Removes support for an HTML mode.
			html: false,
		},
		attributes: {},
		edit,
		save,
	},
);
// #endregion module
