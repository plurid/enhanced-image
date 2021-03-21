// #region imports
	// #region libraries
	import React from 'react';

	import { __ } from '@wordpress/i18n';

	import {
		InspectorControls,
		MediaUpload,
		BlockControls,
		AlignmentToolbar,
	} from '@wordpress/block-editor';

	import {
		PanelBody,
	} from '@wordpress/components';

	import {
		BlockEditProps,
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
const Edit: React.FC<BlockEditProps<EnhancedImageGutenbergAttributes>> = (
	properties,
) => {
	// #region properties
	const {
		attributes,
		setAttributes,
	} = properties;

	const {
		backgroundImage,
	} = attributes;
	// #endregion properties


	// #region handlers
	const onSelectImage = (
		image: any,
	) => {
		setAttributes({
			backgroundImage: image.sizes.full.url,
		});
	}
	// #endregion handlers



	return (
		<>
			<InspectorControls>
				<PanelBody
					title="User Interface"
				>

				</PanelBody>
			</InspectorControls>

			<div>
				edit

				<MediaUpload
					onSelect={onSelectImage}
					// type="image"
					// value={backgroundImage}
					render={(renderProps) => {
						return (
							<div />
						);
					}}
				/>

				<EnhancedImage
					src=""
				/>
			</div>
		</>
	);
}
// #endregion module



// #region exports
export default Edit;
// #endregion exports
