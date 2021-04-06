/** [START] imports */
/** libraries */
import React from 'react';

import {
    Theme,
} from '@plurid/plurid-themes';

import {
    PluridIconViewable,
    PluridIconNotViewable,
    PluridIconDuplicate,
    PluridIconDelete,
} from '@plurid/plurid-icons-react';


/** external */
import ButtonToggle from '~components/Editor/components/ButtonToggle';
import ButtonClick from '~components/Editor/components/ButtonClick';

/** internal */
/** [END] imports */



/** [START] component */
export interface TypeSelectorProperties {
    /** required */
    /** - values */
    theme: Theme;
    viewable: boolean;
    /** - methods */
    toggleViewable: () => void;
    duplicate: () => void;
    obliterate: () => void;

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
        viewable,
        /** - methods */
        toggleViewable,
        duplicate,
        obliterate,

        /** optional */
        /** - values */
        /** - methods */
    } = properties;


    /** render */
    return (
        <>
            <ButtonToggle
                theme={theme}
                toggle={() => toggleViewable()}
                toggled={viewable}
                icon={viewable
                    ? (<PluridIconViewable />)
                    : (<PluridIconNotViewable />)
                }
            />

            <ButtonClick
                theme={theme}
                atClick={() => duplicate()}
                icon={(
                    <PluridIconDuplicate />
                )}
            />

            <ButtonClick
                theme={theme}
                atClick={() => obliterate()}
                icon={(
                    <PluridIconDelete />
                )}
            />
        </>
    );
}


export default TypeSelector;
/** [END] component */
