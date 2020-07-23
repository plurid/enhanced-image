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
    ImageEntityRectangular,
} from '../../../../data/interfaces';

import {
    Context,
} from '../../../../services/utilities';

import Editor from '../../../Editor';


/** internal */
import {
    StyledRectangular,
} from './styled';
/** [END] imports */



/** [START] component */
export interface RectangularProperties {
    entity: ImageEntityRectangular;
}

const Rectangular: React.FC<RectangularProperties> = (
    properties,
) => {
    /** context */
    const context = useContext(Context);
    if (!context) {
        return (<></>);
    }

    const {
        imageBoxDimensions,

        editableEntities,
    } = context;


    /** properties */
    const {
        entity,
    } = properties;

    const {
        color,
        height,
        width,
        position,
    } = entity.data;

    const absoluteWidth = width * imageBoxDimensions.width / 100 + 'px';
    const absoluteHeight = height * imageBoxDimensions.height / 100 + 'px';

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


    /** effects */
    /** Handle editable entities */
    useEffect(() => {
        if (!editableEntities) {
            setShowEditor(false);
        }
    }, [
        editableEntities,
    ]);


    /** render */
    return (
        <StyledRectangular
            tabIndex={0}
            onMouseEnter={() => handleMouseEnter()}
            onMouseLeave={() => handleMouseLeave()}
            style={{
                top: absoluteY,
                left: absoluteX,
                width: absoluteWidth,
                height: absoluteHeight,
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
        </StyledRectangular>
    );
}


export default Rectangular;
/** [END] component */
