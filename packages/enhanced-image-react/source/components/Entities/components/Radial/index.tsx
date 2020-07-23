/** [START] imports */
/** libraries */
import React, {
    useContext,
    useRef,
    useState,
    useEffect,
} from 'react';


/** external */
import {
    ImageEntityRadial,
} from '../../../../data/interfaces';

import {
    Context,
} from '../../../../services/utilities';

import Editor from '../../../Editor';


/** internal */
import {
    StyledRadial,
} from './styled';
/** [END] imports */



/** [START] component */
export interface RadialProperties {
    data: ImageEntityRadial;
}

const Radial: React.FC<RadialProperties> = (
    properties,
) => {
    /** context */
    const context = useContext(Context);
    if (!context) {
        return (<></>);
    }

    const {
        imageBoxDimensions,
    } = context;


    /** properties */
    const {
        data,
    } = properties;

    const {
        color,
        radius,
        position,
    } = data.data;

    const absoluteRadius = radius * imageBoxDimensions.width / 100;

    const absoluteWidth = absoluteRadius + 'px';
    const absoluteHeight = absoluteRadius + 'px';

    const absoluteX = position.x * imageBoxDimensions.width / 100 + 'px';
    const absoluteY = position.y * imageBoxDimensions.height / 100 + 'px';


    /** references */
    const timeoutMouseOver = useRef<any>(0);


    /** state */
    const [showEditor, setShowEditor] = useState(false);
    const [mouseOver, setMouseOver] = useState(false);


    /** handlers */
    const handleMouseEnter = () => {
        clearTimeout(timeoutMouseOver.current);
        setMouseOver(true);
    }

    const handleMouseLeave = () => {
        timeoutMouseOver.current = setTimeout(() => {
            if (mouseOver) {
                setMouseOver(false)
            }
        }, 700);
    }


    /** effects */
    /**
     * Handle showEditor
     */
    useEffect(() => {
        if (
            mouseOver
            // && editableText
        ) {
            setShowEditor(true);
        } else {
            setShowEditor(false);
        }
    }, [
        // editableText,
        mouseOver,
    ]);


    /** render */
    return (
        <StyledRadial
            tabIndex={0}
            onMouseEnter={() => handleMouseEnter()}
            onMouseLeave={() => handleMouseLeave()}
            style={{
                top: absoluteY,
                left: absoluteX,
                width: absoluteWidth,
                height: absoluteHeight,
                borderRadius: absoluteRadius / 2 + 'px',
                backgroundColor: color,
            }}
        >
            {showEditor && (
                <Editor
                    positions={{
                        x: -17,
                        y: -34,
                    }}
                    drawers={[]}
                    toggleDrawer={() => {}}
                    setWidth={() => {}}
                    fullWidth={false}
                >
                    <div>
                        button
                    </div>
                </Editor>
            )}
        </StyledRadial>
    );
}


export default Radial;
/** [END] component */
