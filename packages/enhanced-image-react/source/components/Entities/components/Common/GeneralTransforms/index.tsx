/** [START] imports */
/** libraries */
import React from 'react';

import {
    Theme,
} from '@plurid/plurid-themes';

import {
    PluridIconPalette,
    PluridIconPlay,
    PluridIconSquare,
    PluridIconFrame,
} from '@plurid/plurid-icons-react';


/** external */
import ButtonIncrements from '#components/Editor/components/ButtonIncrements';
import ButtonInput from '#components/Editor/components/ButtonInput';
import SimpleInput from '#components/Editor/components/SimpleInput';

import {
    ImageEntity,
} from '#data/interfaces';

import {
    /** percentage */
    valueFromPercentage,
    percentageFromValue,

    /** color */
    resolveColor,
} from '#services/utilities';


/** internal */
/** [END] imports */




/** [START] component */
export interface GeneralTransformsProperties {
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

const GeneralTransforms: React.FC<GeneralTransformsProperties> = (
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
        data,
    } = entity;

    const {
        opacity,
    } = data;


    /** render */
    return (
        <>
            <SimpleInput
                value={resolveColor(entity.data.border.color)}
                valueType="data.border.color"
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
                theme={theme}
                transparentUI={transparentUI}
                Icon={PluridIconSquare}
            />

            <ButtonIncrements
                theme={theme}
                transparentUI={transparentUI}
                type="data.border.width"
                changeValue={(
                    type: any,
                    value: any,
                ) => {
                    updateEntityField(
                        id,
                        [{
                            type,
                            value,
                        }],
                    );
                }}
                value={entity.data.border.width}
                icon={(
                    <div>H</div>
                )}
            />

            <ButtonIncrements
                theme={theme}
                transparentUI={transparentUI}
                type="data.opacity"
                changeValue={(
                    type: any,
                    value: any,
                ) => {
                    if (value > 1 || value < 0.1) {
                        return;
                    }

                    updateEntityField(
                        id,
                        [{
                            type,
                            value,
                        }],
                    );
                }}
                value={opacity}
                step={0.1}
                icon={(
                    <div>O</div>
                )}
            />

            <SimpleInput
                value={resolveColor(entity.data.highlight)}
                valueType="data.highlight"
                changeValue={(
                    type: any,
                    value: any,
                ) => {
                    updateEntityField(
                        id,
                        [{
                            type,
                            value,
                        }],
                    );
                }}
                theme={theme}
                transparentUI={transparentUI}
                Icon={PluridIconFrame}
            />

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
                    <div>
                        {/* annotation  */}
                        A
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
                    <div>
                        {/* labels  */}
                        L
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
        </>
    );
}


export default GeneralTransforms;
/** [END] component */
