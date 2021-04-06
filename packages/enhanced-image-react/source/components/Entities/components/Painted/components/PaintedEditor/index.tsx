/** [START] imports */
/** libraries */
import React, {
    useContext,
} from 'react';

import {
    PluridIconGrab,
    PluridIconPaintBrush,
    PluridIconFrame,
    PluridIconObliterate,
    PluridIconEdit,
    PluridIconPaintBucket,
} from '@plurid/plurid-icons-react';


/** external */
import Editor from '~components/Editor';

import Handlers from '~components/Editor/components/Handlers';
import VerticalDivider from '~components/Editor/components/VerticalDivider';
import ButtonToggle from '~components/Editor/components/ButtonToggle';
import ButtonIncrements from '~components/Editor/components/ButtonIncrements';
import SimpleInput from '~components/Editor/components/SimpleInput';
import Drawer from '~components/Editor/components/Drawer';

import TypeSelector from '~components/Entities/components/Common/TypeSelector';
import ShapeTransforms from '~components/Entities/components/Common/ShapeTransforms';
import GeneralTransforms from '~components/Entities/components/Common/GeneralTransforms';
import ExtraDrawer from '~components/Entities/components/Common/ExtraDrawer';

import {
    ImageEntity,
} from '~data/interfaces';

import {
    Context,

    /** ui */
    toggleDrawer,

    /** color */
    resolveColor,
} from '~services/utilities';


/** internal */
/** [END] imports */



/** [START] component */
export interface PaintedEditorProperties {
    /** required */
    /** - values */
    draggable: boolean;
    drawers: string[];
    entity: ImageEntity;

    brushDrawing: any;
    enclosureDrawing: any;
    eraserMode: any;
    brushSize: any;
    brushColor: any;

    /** - methods */
    setDraggable: React.Dispatch<React.SetStateAction<boolean>>;
    setDrawers: React.Dispatch<React.SetStateAction<string[]>>;

    setDrawingMode: any;
    toggleEraser: any;
    setEraserMode: any;
    setBrushSize: any;
    setBrushColor: any;

    /** optional */
    /** - values */
    /** - methods */
}

const PaintedEditor: React.FC<PaintedEditorProperties> = (
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

        convertEntity,
        updateEntityField,
        duplicateEntity,
        obliterateEntity,
    } = context;


    /** properties */
    const {
        /** required */
        /** - values */
        draggable,
        drawers,
        entity,

        brushDrawing,
        enclosureDrawing,
        eraserMode,
        brushSize,
        brushColor,
        /** - methods */
        setDraggable,
        setDrawers,

        setDrawingMode,
        toggleEraser,
        setEraserMode,
        setBrushSize,
        setBrushColor,

        /** optional */
        /** - values */
        /** - methods */
    } = properties;

    const {
        id,
        type,
        data,
    } = entity;

    const {
        viewable,
    } = data;


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
                            toggle={() => setDraggable(drag => !drag)}
                            toggled={draggable}
                            icon={(
                                <PluridIconGrab />
                            )}
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

                        <Drawer
                            theme={theme}
                            title="Shape"
                            expand={drawers.includes('SHAPE')}
                            toggleExpand={() => toggleDrawer('SHAPE', drawers, setDrawers)}
                        >
                            <ButtonToggle
                                theme={theme}
                                toggle={() => setDrawingMode('brush')}
                                toggled={brushDrawing}
                                icon={(
                                    <PluridIconPaintBrush />
                                )}
                            />

                            <ButtonToggle
                                theme={theme}
                                toggle={() => setDrawingMode('enclosure')}
                                toggled={enclosureDrawing}
                                icon={(
                                    <PluridIconFrame />
                                )}
                            />

                            <ButtonToggle
                                theme={theme}
                                toggle={() => {
                                    toggleEraser(!eraserMode);
                                    setEraserMode((mode: any) => !mode);
                                }}
                                toggled={eraserMode}
                                icon={(
                                    <PluridIconObliterate />
                                )}
                            />

                            <ButtonIncrements
                                theme={theme}
                                transparentUI={transparentUI}
                                type={'brush.size'}
                                changeValue={(
                                    type: any,
                                    value: any,
                                ) => {
                                    setBrushSize(value);
                                }}
                                value={brushSize}
                                icon={(
                                    <PluridIconEdit />
                                )}
                            />

                            <SimpleInput
                                value={resolveColor(brushColor)}
                                valueType="brush.color"
                                changeValue={(
                                    type: any,
                                    value: any,
                                ) => {
                                    setBrushColor(value);
                                }}
                                theme={theme}
                                transparentUI={transparentUI}
                                Icon={PluridIconPaintBucket}
                            />

                            <ShapeTransforms
                                theme={theme}
                                transparentUI={transparentUI}
                                imageBoxDimensions={imageBoxDimensions}
                                entity={entity}
                                updateEntityField={updateEntityField}
                            />

                            <GeneralTransforms
                                theme={theme}
                                transparentUI={transparentUI}
                                entity={entity}
                                updateEntityField={updateEntityField}
                            />
                        </Drawer>

                        <VerticalDivider
                            theme={theme}
                        />

                        <Drawer
                            theme={theme}
                            title="Extra"
                            expand={drawers.includes('EXTRA')}
                            toggleExpand={() => toggleDrawer('EXTRA', drawers, setDrawers)}
                        >
                            <ExtraDrawer
                                /** required */
                                /** - values */
                                theme={theme}
                                entity={entity}
                                transparentUI={transparentUI}
                                /** - methods */
                                updateEntityField={updateEntityField}
                            />
                        </Drawer>

                        <VerticalDivider
                            theme={theme}
                        />

                        <Handlers
                            theme={theme}
                            viewable={viewable}
                            toggleViewable={() => {
                                updateEntityField(
                                    id,
                                    [{
                                        type: 'data.viewable',
                                        value: !viewable,
                                    }],
                                );
                            }}
                            duplicate={() => duplicateEntity(id)}
                            obliterate={() => obliterateEntity(id)}
                        />
                    </>
                );
            }}
        </Editor>
    );
}


export default PaintedEditor;
/** [END] component */
