import React, {
    useContext,
    useState,
    useEffect
} from 'react';

import {
    StyledText,
} from './styled';

import {
    ImageText,
} from '../../data/interfaces';

import Context from '../../services/utilities/context';

import Textarea from './components/Textarea';
import Textline from './components/Textline';

import {
    getVersionById,
} from '../../services/utilities/imageText';



const Text: React.FC<any> = () => {
    const context = useContext(Context);
    if (!context) {
        return (<></>);
    }

    const {
        imageBoxDimensions,
        imageText,
        flipHorizontal,
        flipVertical,
    } = context;

    // console.log('imageText from Text', imageText);

    const [transform, setTransform] = useState('');

    useEffect(() => {
        const transform = `${flipVertical ? 'scaleX(-1)': ''} ${flipHorizontal ? 'scaleY(-1' : ''}`;
        setTransform(transform);
    }, [
        flipVertical,
        flipHorizontal,
    ]);

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
            {imageText.map((textItem: ImageText) => {
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
