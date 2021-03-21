// #region imports
	// #region libraries
	import React from 'react';

	import { __ } from '@wordpress/i18n';

	import EnhancedImage from '@plurid/enhanced-image-react';
	// #endregion libraries
// #endregion imports



// #region module
type EditProps = {
	'className': string,
};

const Edit = ( { className }: EditProps ) => {
	return (
		<div>
			edit

			<EnhancedImage
				src=""
			/>
		</div>
	);
}
// #endregion module



// #region exports
export default Edit;
// #endregion exports
