/** [START] imports */
/** libraries */
import React, {
    useContext,
} from 'react';


/** external */
import {
    useTransform,
} from '#services/hooks';

import {
    Context,

    getVersionById,
} from '#services/utilities';


/** internal */
import Textarea from './components/Textarea';
import Textline from './components/Textline';

import {
    StyledText,
} from './styled';
/** [END] imports */



/** [START] component */
const Text: React.FC<any> = () => {
    /** context */
    const context = useContext(Context);
    if (!context) {
        return (<></>);
    }

    const {
        imageBoxDimensions,
        imageText,
        flipHorizontal,
        flipVertical,
        imageTopologyRotate,
        imageTopologyScale,
        imageCoordinateX,
        imageCoordinateY,
    } = context;


    /** state */
    const transform = useTransform(
        flipVertical,
        flipHorizontal,
        imageTopologyRotate,
        imageTopologyScale,
        imageCoordinateX,
        imageCoordinateY,
    );


    /** render */
    return (
        <StyledText
            style={{
                width: imageBoxDimensions.width + 'px',
                height: imageBoxDimensions.height + 'px',
                left: imageBoxDimensions.left + 'px',
                top: imageBoxDimensions.top + 'px',
                transform,
            }}
        >
            {imageText.map(textItem => {
                const currentVersion = getVersionById(textItem);

                if (!currentVersion) {
                    return;
                }

                switch (currentVersion.type) {
                    case 'TEXTAREA':
                        return (
                            <Textarea
                                key={textItem.id}
                                data={textItem}
                            />
                        );
                    case 'TEXTLINE':
                        return (
                            <Textline
                                key={textItem.id}
                                data={textItem}
                                currentVersion={currentVersion}
                            />
                        );
                    default:
                        return;
                }
            })}
        </StyledText>
    );
}


export default Text;
/** [END] component */
