/** [START] imports */
/** libraries */
import React, {
    useContext,
    useRef,
    useState,
    useEffect,
} from 'react';


/** external */
import GrabIcon from '#assets/icons/text-editor/grab';

import Editor from '#components/Editor';

import Handlers from '#components/Editor/components/Handlers';
import VerticalDivider from '#components/Editor/components/VerticalDivider';
import ButtonToggle from '#components/Editor/components/ButtonToggle';
import ButtonIncrements from '#components/Editor/components/ButtonIncrements';
import ButtonInput from '#components/Editor/components/ButtonInput';
import SimpleInput from '#components/Editor/components/SimpleInput';
import Drawer from '#components/Editor/components/Drawer';

import TypeSelector from '#components/Entities/components/Common/TypeSelector';

import {
    ImageEntityPainted,
} from '#data/interfaces';

import {
    Context,

    /** percentage */
    valueFromPercentage,
    percentageFromValue,

    /** color */
    resolveColor,

    /** ui */
    toggleDrawer,
} from '#services/utilities';


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
        theme,
        transparentUI,

        imageBoxDimensions,

        editableEntities,
        convertEntity,
    } = context;


    /** properties */
    const {
        entity,
    } = properties;

    const {
        id,
        type,
        data,
    } = entity;

    const {
        dataURL,
        position,
        viewable,
    } = data;

    const absoluteX = position.x * imageBoxDimensions.width / 100 + 'px';
    const absoluteY = position.y * imageBoxDimensions.height / 100 + 'px';


    /** references */
    const timeoutMouseOver = useRef<any>(0);
    const canvasElement = useRef<HTMLCanvasElement>(null);


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

    useEffect(() => {
        if (!canvasElement.current) {
            return;
        }

        const context = canvasElement.current.getContext('2d');
        if (!context) {
            return;
        }

        const image = new Image;
        image.onload = () => {
            if (!canvasElement.current) {
                return;
            }

            // Clear Old Image and Reset Bounds
            context.clearRect(0, 0, canvasElement.current.width, canvasElement.current.height);
            canvasElement.current.height = image.height;
            canvasElement.current.width = image.width;

            // Redraw Image
            context.drawImage(
                image,
                0,
                0,
                image.width,
                image.height,
            );
        };
        image.src = dataURL;
    }, []);

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
                ref={canvasElement}
            />

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
                    <ButtonToggle
                        theme={theme}
                        toggle={() => {

                        }}
                        toggled={false}
                        icon={GrabIcon}
                    />

                    <TypeSelector
                        theme={theme}
                        id={id}
                        type={type}
                        convertEntity={convertEntity}
                    />

                    <VerticalDivider
                        theme={theme}
                    />

                    <VerticalDivider
                        theme={theme}
                    />

                    <Handlers
                        theme={theme}
                        viewable={viewable}
                    />

                    {/* <div>
                        color

                        brush size

                        eraser
                    </div> */}
                </Editor>
            )}
        </StyledPainted>
    );
}


export default Painted;
/** [END] component */
