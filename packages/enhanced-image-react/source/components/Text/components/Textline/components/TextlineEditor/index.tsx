/** [START] imports */
/** libraries */
import React, {
    useContext,
} from 'react';

import {
    objects,
 } from '@plurid/plurid-functions';

import {
    PluridIconText,
    PluridIconGrab,
} from '@plurid/plurid-icons-react';


/** external */
import Editor from '~components/Editor';

import VerticalDivider from '~components/Editor/components/VerticalDivider';
import ButtonToggle from '~components/Editor/components/ButtonToggle';
import Handlers from '~components/Editor/components/Handlers';

import {
    ImageText,
    ImageTextVersionTextline,
} from '~data/interfaces';

import {
    Context,

    /** percentage */
    percentageFromValue,
} from '~services/utilities';


/** internal */
import FontDrawer from './components/FontDrawer';
import TransformDrawer from './components/TransformDrawer';
import ExtraDrawer from './components/ExtraDrawer';
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


    /** handlers */
    const updateField = (
        type: string,
        value: number | string | boolean,
    ) => {
        switch (type) {
            case 'font.size':
                if (typeof value === 'number') {
                    const fontSizePercentage = percentageFromValue(value, imageBoxDimensions.height);
                    updateTextItemField(textItem.id, 'font.size', fontSizePercentage);
                }
                break;
            case 'font.family':
                updateTextItemField(textItem.id, 'font.family', value);
                break;
            case 'font.letterSpacing':
                if (typeof value === 'number') {
                    const letterSpacingPercentage = percentageFromValue(value, imageBoxDimensions.width);
                    updateTextItemField(textItem.id, 'font.letterSpacing', letterSpacingPercentage);
                }
                break;
            case 'font.wordSpacing':
                if (typeof value === 'number') {
                    const wordSpacingPercentage = percentageFromValue(value, imageBoxDimensions.width);
                    updateTextItemField(textItem.id, 'font.wordSpacing', wordSpacingPercentage);
                }
                break;
            case 'link.to':
                updateTextItemField(textItem.id, 'link.to', value);
                break;
            case 'action.type':
                updateTextItemField(textItem.id, 'action.type', value);
                break;
            case 'color':
                updateTextItemField(textItem.id, 'color', value);
                break;
            case 'transform.perspective':
                if (typeof value === 'number') {
                    updateTextItemField(textItem.id, 'transform.perspective', value - 1);
                }
                break;
            case 'transform.rx':
                if (typeof value === 'number') {
                    updateTextItemField(textItem.id, 'transform.rx', value - 1);
                }
                break;
            case 'transform.ry':
                if (typeof value === 'number') {
                    updateTextItemField(textItem.id, 'transform.ry', value - 1);
                }
                break;
            case 'transform.rz':
                if (typeof value === 'number') {
                    updateTextItemField(textItem.id, 'transform.rz', value - 1);
                }
                break;
            case 'transform.sx':
                if (typeof value === 'number') {
                    updateTextItemField(textItem.id, 'transform.sx', value - 1);
                }
                break;
            case 'transform.sy':
                if (typeof value === 'number') {
                    updateTextItemField(textItem.id, 'transform.sy', value - 1);
                }
                break;
        }
    }

    const toggleTextFormat = (
        type: string,
        checkValue: string | boolean,
    ) => {
        const data = objects.getNested(currentVersion, type);

        if (typeof checkValue === 'boolean') {
            if (data) {
                updateTextItemField(textItem.id, type, false);
            } else {
                updateTextItemField(textItem.id, type, true);
            }
        } else {
            if (data === checkValue) {
                updateTextItemField(textItem.id, type, 'normal');
            } else {
                updateTextItemField(textItem.id, type, checkValue);
            }
        }
    }


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
            {({
                renderOutside,
                outsideKind,
                setOutsideKind,
            }: any) => {
                return (
                    <>
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
                            currentVersion={currentVersion}
                            outsideKind={outsideKind}
                            toggleDrawer={toggleDrawer}
                            updateField={updateField}
                            toggleTextFormat={toggleTextFormat}
                            renderOutside={renderOutside}
                            setOutsideKind={setOutsideKind}
                        />

                        <VerticalDivider
                            theme={theme}
                        />

                        <TransformDrawer
                            drawers={drawers}
                            currentVersion={currentVersion}
                            toggleDrawer={toggleDrawer}
                            updateField={updateField}
                            renderOutside={renderOutside}
                        />

                        <VerticalDivider
                            theme={theme}
                        />

                        <ExtraDrawer
                            drawers={drawers}
                            currentVersion={currentVersion}
                            outsideKind={outsideKind}
                            textID={textItem.id}
                            toggleDrawer={toggleDrawer}
                            updateField={updateField}
                            toggleTextFormat={toggleTextFormat}
                            renderOutside={renderOutside}
                            setOutsideKind={setOutsideKind}
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
                    </>
                );
            }}
        </Editor>
    );
}


export default TextlineEditor;
/** [END] component */
