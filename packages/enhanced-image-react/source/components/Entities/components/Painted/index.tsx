/** [START] imports */
/** libraries */
import React, {
    useContext,
    useRef,
    useState,
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
    data: ImageEntityPainted;
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
    } = context;


    /** properties */
    const {
        data,
    } = properties;

    const {
        position,
    } = data.data;

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
