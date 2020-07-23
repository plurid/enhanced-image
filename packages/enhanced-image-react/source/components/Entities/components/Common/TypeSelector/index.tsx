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
    id: string;
    type: ImageEntityType;
    /** - methods */
    convertEntity: (
        id: string,
        to: ImageEntityType,
    ) => void;

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
        id,
        type,
        /** - methods */
        convertEntity,

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
                    if (type !== 'RECTANGULAR') {
                        convertEntity(id, 'RECTANGULAR')
                    }
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
                    if (type !== 'RADIAL') {
                        convertEntity(id, 'RADIAL')
                    }
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
                    if (type !== 'PAINTED') {
                        convertEntity(id, 'PAINTED')
                    }
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
