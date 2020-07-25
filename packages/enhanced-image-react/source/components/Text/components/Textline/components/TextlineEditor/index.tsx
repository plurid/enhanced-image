/** [START] imports */
/** libraries */
import React, {
    useContext,
    useRef,
    useState,
    useEffect,
} from 'react';

import {
    Theme,
} from '@plurid/plurid-themes';

import {
    objects,
 } from '@plurid/plurid-functions';

import {
    PluridIconPalette,
    PluridIconSpace,
    PluridIconPlay,

    PluridIconText,
    PluridIconGrab,
    PluridIconFontSize,
    PluridIconLink,
    PluridIconBold,
    PluridIconItalic,
    PluridIconLetterSpacing,
    PluridIconWordSpacing,
    PluridIconTransview,
} from '@plurid/plurid-icons-react';


/** external */
import Editor from '#components/Editor';

import VerticalDivider from '#components/Editor/components/VerticalDivider';
import ButtonDropdown from '#components/Editor/components/ButtonDropdown';
import ButtonIncrements from '#components/Editor/components/ButtonIncrements';
import ButtonInput from '#components/Editor/components/ButtonInput';
import ButtonToggle from '#components/Editor/components/ButtonToggle';
import ButtonToggleRender from '#components/Editor/components/ButtonToggleRender';
import ButtonsColors from '#components/Editor/components/ButtonsColors';
import SimpleInput from '#components/Editor/components/SimpleInput';
import Slider from '#components/Editor/components/Slider';
import Drawer from '#components/Editor/components/Drawer';
import Handlers from '#components/Editor/components/Handlers';

import {
    selectableFonts,
 } from '#data/constants/fonts';

import {
    ImageText,
    ImageTextVersionTextline,
} from '#data/interfaces';

import {
    Context,

    /** percentage */
    valueFromPercentage,
    percentageFromValue,

    /** color */
    resolveColor
} from '#services/utilities';


/** internal */
import FontDrawer from './components/FontDrawer';
import TransformDrawer from './components/TransformDrawer';
import TransviewContainer from './components/TransviewContainer';

/** [END] imports */



/** [START] component */
export interface TextlineEditorProperties {
    /** required */
    /** - values */
    textItem: ImageText;
    currentVersion: ImageTextVersionTextline;
    editable: boolean;
    draggable: boolean;
    drawers: string[];
    /** - methods */
    setEditable: React.Dispatch<React.SetStateAction<boolean>>;
    setDraggable: React.Dispatch<React.SetStateAction<boolean>>;
    setViewable: () => void;
    saveTextValue: () => void;
    toggleDrawer: (
        drawer: string,
    ) => void;

    /** optional */
    /** - values */
    /** - methods */
}

const TextlineEditor: React.FC<TextlineEditorProperties> = (
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

        duplicateTextItem,
        deleteTextItem,

        updateTextItemField,
    } = context;


    /** properties */
    const {
        /** required */
        /** - values */
        textItem,
        currentVersion,
        editable,
        draggable,
        drawers,
        /** - methods */
        setEditable,
        setDraggable,
        setViewable,
        saveTextValue,
        toggleDrawer,

        /** optional */
        /** - values */
        /** - methods */
    } = properties;


    /** render */
    return (
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
                    if (draggable) {
                        setDraggable(false);
                    }

                    if (editable) {
                        saveTextValue();
                    }

                    setEditable(editable => !editable);
                }}
                toggled={editable}
                icon={(
                    <PluridIconText />
                )}
            />

            <ButtonToggle
                theme={theme}
                toggle={() => {
                    if (editable) {
                        saveTextValue();
                        setEditable(false);
                    }

                    setDraggable(draggable => !draggable)
                }}
                toggled={draggable}
                icon={(
                    <PluridIconGrab />
                )}
            />

            <VerticalDivider
                theme={theme}
            />

            <FontDrawer
                drawers={drawers}
                toggleDrawer={toggleDrawer}
            />

            <VerticalDivider
                theme={theme}
            />

            <TransformDrawer
                drawers={drawers}
                toggleDrawer={toggleDrawer}
            />

            <VerticalDivider
                theme={theme}
            />

            <Handlers
                theme={theme}
                viewable={currentVersion.viewable}
                toggleViewable={() => setViewable()}
                duplicate={() => duplicateTextItem(textItem.id)}
                obliterate={() => deleteTextItem(textItem.id)}
            />
        </Editor>
    );
}


export default TextlineEditor;
/** [END] component */
