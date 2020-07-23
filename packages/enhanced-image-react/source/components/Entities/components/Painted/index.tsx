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
    ImageEntityPainted,
} from '../../../../data/interfaces';

import {
    Context,
} from '../../../../services/utilities';

import Editor from '../../../Editor';


/** internal */
import {
    StyledPainted,
} from './styled';
/** [END] imports */



/** [START] component */
export interface PaintedProperties {
    entity: ImageEntityPainted;
}

const Painted: React.FC<PaintedProperties> = (
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
        position,
    } = entity.data;

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
        <StyledPainted
            tabIndex={0}
            onMouseEnter={() => handleMouseEnter()}
            onMouseLeave={() => handleMouseLeave()}
            style={{
                top: absoluteY,
                left: absoluteX,
            }}
        >
            <canvas
            />

            {showEditor && (
                <Editor
                    positions={{
                        x: 0,
                        y: 0,
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
        </StyledPainted>
    );
}


export default Painted;
/** [END] component */
