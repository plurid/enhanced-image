/** [START] imports */
/** libraries */
import React from 'react';

import {
    Theme,
} from '@plurid/plurid-themes';

import {
    PluridIconPalette,
} from '@plurid/plurid-icons-react';


/** external */
import ButtonIncrements from '#components/Editor/components/ButtonIncrements';
import SimpleInput from '#components/Editor/components/SimpleInput';

import {
    ImageEntityRectangular,
    ImageEntityRadial,
    ImageBoxDimensions,
    updateEntityField,
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
export interface RegularShapesTransformsProperties {
    /** required */
    /** - values */
    theme: Theme;
    transparentUI: boolean;
    imageBoxDimensions: ImageBoxDimensions;
    entity: ImageEntityRectangular | ImageEntityRadial;
    /** - methods */
    updateEntityField: updateEntityField;

    /** optional */
    /** - values */
    /** - methods */
}

const RegularShapesTransforms: React.FC<RegularShapesTransformsProperties> = (
    properties,
) => {
    /** properties */
    const {
        /** required */
        /** - values */
        theme,
        transparentUI,
        imageBoxDimensions,
        entity,
        /** - methods */
        updateEntityField,

        /** optional */
        /** - values */
        /** - methods */
    } = properties;

    const {
        id,
        type,
        data,
    } = entity;


    /** render */
    return (
        <>
            <ButtonIncrements
                theme={theme}
                transparentUI={transparentUI}
                type={type === 'RECTANGULAR'
                    ? 'data.width'
                    : 'data.radius'
                }
                changeValue={(
                    type: any,
                    value: any,
                ) => {
                    const percentage = percentageFromValue(
                        value,
                        imageBoxDimensions.width,
                    );

                    updateEntityField(
                        id,
                        [{
                            type,
                            value: percentage,
                        }],
                    );
                }}
                value={type === 'RECTANGULAR'
                    ? Math.round(valueFromPercentage((data as any).width, imageBoxDimensions.width))
                    : Math.round(valueFromPercentage((data as any).radius, imageBoxDimensions.width))
                }
                icon={(
                    <div>
                        {type === 'RECTANGULAR'
                            ? 'W'
                            : 'R'
                        }
                    </div>
                )}
            />

            {type === 'RECTANGULAR' && (
                <ButtonIncrements
                    theme={theme}
                    transparentUI={transparentUI}
                    type="data.height"
                    changeValue={(
                        type: any,
                        value: any,
                    ) => {
                        const percentage = percentageFromValue(
                            value,
                            imageBoxDimensions.height,
                        );

                        updateEntityField(
                            id,
                            [{
                                type,
                                value: percentage,
                            }],
                        );
                    }}
                    value={type === 'RECTANGULAR'
                        ? Math.round(valueFromPercentage((data as any).height, imageBoxDimensions.height))
                        : 0
                    }
                    icon={(
                        <div>H</div>
                    )}
                />
            )}

            <SimpleInput
                value={resolveColor(data.color)}
                valueType="data.color"
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
                Icon={PluridIconPalette}
            />
        </>
    );
}


export default RegularShapesTransforms;
/** [END] component */
