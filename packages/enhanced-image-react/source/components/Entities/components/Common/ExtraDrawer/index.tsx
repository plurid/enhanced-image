/** [START] imports */
/** libraries */
import React from 'react';

import {
    Theme,
} from '@plurid/plurid-themes';

import {
    PluridIconPlay,
    PluridIconAnnotation,
    PluridIconTag,
} from '@plurid/plurid-icons-react';


/** external */
import ButtonInput from '#components/Editor/components/ButtonInput';

import {
    ImageEntity,
} from '#data/interfaces';


/** internal */
/** [END] imports */



/** [START] component */
export interface ExtraDrawerProperties {
    /** required */
    /** - values */
    theme: Theme;
    entity: ImageEntity;
    transparentUI: boolean;
    /** - methods */
    updateEntityField: any;

    /** optional */
    /** - values */
    /** - methods */
}

const ExtraDrawer: React.FC<ExtraDrawerProperties> = (
    properties,
) => {
    /** properties */
    const {
        /** required */
        /** - values */
        theme,
        entity,
        transparentUI,
        /** - methods */
        updateEntityField,

        /** optional */
        /** - values */
        /** - methods */
    } = properties;

    const {
        id,
    } = entity;


    /** render */
    return (
        <>
            <ButtonInput
                theme={theme}
                transparentUI={transparentUI}
                toggle={() => {
                    updateEntityField(
                        id,
                        [{
                            type: 'data.action.active',
                            value: !entity.data.action.active,
                        }],
                    );
                }}
                toggled={entity.data.action.active}
                icon={(
                    <PluridIconPlay />
                )}
                value={entity.data.action.type}
                valueType="data.action.type"
                // renderOutside={renderOutside}
                // outsideKind={outsideKind}
                // setOutsideKind={setOutsideKind}
                changeValue={(
                    type,
                    value,
                ) => {
                    updateEntityField(
                        id,
                        [{
                            type,
                            value,
                        }],
                    );
                }}
                renderOutside={() => {}}
                outsideKind={''}
                setOutsideKind={() => {}}
            />

            <ButtonInput
                theme={theme}
                transparentUI={transparentUI}
                toggle={() => {}}
                toggled={entity.data.action.active}
                icon={(
                    <div>
                        CSS
                    </div>
                )}
                value={entity.data.action.type}
                valueType="action.type"
                // changeValue={updateField}
                // renderOutside={renderOutside}
                // outsideKind={outsideKind}
                // setOutsideKind={setOutsideKind}
                changeValue={() => {}}
                renderOutside={() => {}}
                outsideKind={''}
                setOutsideKind={() => {}}
            />

            <ButtonInput
                theme={theme}
                transparentUI={transparentUI}
                toggle={() => {}}
                toggled={entity.data.action.active}
                icon={(
                    <PluridIconAnnotation />
                )}
                value={entity.data.action.type}
                valueType="action.type"
                // changeValue={updateField}
                // renderOutside={renderOutside}
                // outsideKind={outsideKind}
                // setOutsideKind={setOutsideKind}
                changeValue={() => {}}
                renderOutside={() => {}}
                outsideKind={''}
                setOutsideKind={() => {}}
            />

            <ButtonInput
                theme={theme}
                transparentUI={transparentUI}
                toggle={() => {}}
                toggled={entity.data.action.active}
                icon={(
                    <PluridIconTag />
                )}
                value={entity.data.action.type}
                valueType="action.type"
                // changeValue={updateField}
                // renderOutside={renderOutside}
                // outsideKind={outsideKind}
                // setOutsideKind={setOutsideKind}
                changeValue={() => {}}
                renderOutside={() => {}}
                outsideKind={''}
                setOutsideKind={() => {}}
            />
        </>
    );
}


export default ExtraDrawer;
/** [END] component */
