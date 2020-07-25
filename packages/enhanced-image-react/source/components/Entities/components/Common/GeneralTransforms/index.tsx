/** [START] imports */
/** libraries */
import React from 'react';

import {
    Theme,
} from '@plurid/plurid-themes';

import {
    PluridIconSquare,
    PluridIconOpacity,
    PluridIconHighlight,
} from '@plurid/plurid-icons-react';


/** external */
import ButtonIncrements from '#components/Editor/components/ButtonIncrements';
import SimpleInput from '#components/Editor/components/SimpleInput';

import {
    ImageEntity,
} from '#data/interfaces';

import {
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
                    <div>❚</div>
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
                    <PluridIconOpacity />
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
                Icon={PluridIconHighlight}
            />
        </>
    );
}


export default GeneralTransforms;
/** [END] component */
