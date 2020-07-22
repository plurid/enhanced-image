import React, {
    useContext,
} from 'react';

import {
    useTransform,
} from '../../services/hooks';

import {
    getVersionById,
} from '../../services/utilities/imageText';

import Context from '../../services/utilities/context';

import {
    StyledText,
} from './styled';

import Textarea from './components/Textarea';
import Textline from './components/Textline';



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
    } = context;


    /** state */
    const transform = useTransform(
        flipVertical,
        flipHorizontal,
        imageTopologyRotate,
        imageTopologyScale,
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
                        return (
                            <></>
                        );
                }
            })}
        </StyledText>
    );
}


export default Text;
