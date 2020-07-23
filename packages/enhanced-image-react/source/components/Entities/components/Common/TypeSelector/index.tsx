/** [START] imports */
/** libraries */
import React from 'react';

import {
    Theme,
} from '@plurid/plurid-themes';

import {
    PluridIconRectangle,
    PluridIconCircle,
    PluridIconPaintBrush,
} from '@plurid/plurid-icons-react';


/** external */
import ButtonToggle from '#components/Editor/components/ButtonToggle';

import {
    ImageEntityType,
} from '#data/interfaces';

/** internal */
/** [END] imports */



/** [START] component */
export interface TypeSelectorProperties {
    /** required */
    /** - values */
    theme: Theme;
    type: ImageEntityType;
    /** - methods */

    /** optional */
    /** - values */
    /** - methods */
}

const TypeSelector: React.FC<TypeSelectorProperties> = (
    properties,
) => {
    /** properties */
    const {
        /** required */
        /** - values */
        theme,
        type,
        /** - methods */

        /** optional */
        /** - values */
        /** - methods */
    } = properties;


    /** render */
    return (
        <>
            <ButtonToggle
                theme={theme}
                toggle={() => {
                }}
                toggled={type === 'RECTANGULAR'}
                icon={(
                    <PluridIconRectangle
                        fill={true}
                    />
                )}
            />

            <ButtonToggle
                theme={theme}
                toggle={() => {
                }}
                toggled={type === 'RADIAL'}
                icon={(
                    <PluridIconCircle
                        fill={true}
                    />
                )}
            />

            <ButtonToggle
                theme={theme}
                toggle={() => {
                }}
                toggled={type === 'PAINTED'}
                icon={(
                    <PluridIconPaintBrush />
                )}
            />
        </>
    );
}


export default TypeSelector;
/** [END] component */
