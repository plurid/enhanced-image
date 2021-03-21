// #region imports
	// #region libraries
	import React from 'react';

	import { __ } from '@wordpress/i18n';

	import {
		BlockSaveProps,
	} from '@wordpress/blocks';

	import EnhancedImage from '@plurid/enhanced-image-react';
	// #endregion libraries


	// #region external
	import {
		EnhancedImageGutenbergAttributes,
	} from '../data/interfaces';
	// #endregion external
// #endregion imports



// #region module
const Save: React.FC<BlockSaveProps<EnhancedImageGutenbergAttributes>> = (
	properties,
) => {
	const {
		attributes,
	} = properties;

	return (
		<div>
			save

			<EnhancedImage
				src=""
			/>
		</div>
	);
}
// #endregion module



// #region exports
export default Save;
// #endregion exports
