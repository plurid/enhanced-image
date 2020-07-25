/** [START] imports */
/** libraries */
import React, {
    useContext,
} from 'react';

import {
    PluridIconGrab,
} from '@plurid/plurid-icons-react';


/** external */
import Editor from '#components/Editor';

import Handlers from '#components/Editor/components/Handlers';
import VerticalDivider from '#components/Editor/components/VerticalDivider';
import ButtonToggle from '#components/Editor/components/ButtonToggle';
import Drawer from '#components/Editor/components/Drawer';

import TypeSelector from '#components/Entities/components/Common/TypeSelector';
import ShapeTransforms from '#components/Entities/components/Common/ShapeTransforms';
import GeneralTransforms from '#components/Entities/components/Common/GeneralTransforms';

import {
    ImageEntity,
} from '#data/interfaces';

import {
    Context,

    /** ui */
    toggleDrawer,
} from '#services/utilities';


/** internal */
/** [END] imports */



/** [START] component */
export interface RegularShapesEditorProperties {
    /** required */
    /** - values */
    draggable: boolean;
    drawers: string[];
    entity: ImageEntity;
    /** - methods */
    setDraggable: React.Dispatch<React.SetStateAction<boolean>>;
    setDrawers: React.Dispatch<React.SetStateAction<string[]>>;

    /** optional */
    /** - values */
    /** - methods */
}

const RegularShapesEditor: React.FC<RegularShapesEditorProperties> = (
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

        duplicateEntity,
        obliterateEntity,

        convertEntity,
        updateEntityField,
    } = context;


    /** properties */
    const {
        /** required */
        /** - values */
        draggable,
        drawers,
        entity,
        /** - methods */
        setDraggable,
        setDrawers,

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


export default RegularShapesEditor;
/** [END] component */
