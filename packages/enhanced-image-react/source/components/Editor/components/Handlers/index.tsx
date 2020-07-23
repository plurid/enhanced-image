/** [START] imports */
/** libraries */
import React from 'react';

import {
    Theme,
} from '@plurid/plurid-themes';


/** external */
import ViewableIcon from '#assets/icons/text-editor/viewable';
import NotViewableIcon from '#assets/icons/text-editor/not-viewable';
import DuplicateIcon from '#assets/icons/text-editor/duplicate';
import DeleteIcon from '#assets/icons/text-editor/delete';

import ButtonToggle from '#components/Editor/components/ButtonToggle';
import ButtonClick from '#components/Editor/components/ButtonClick';

/** internal */
/** [END] imports */



/** [START] component */
export interface TypeSelectorProperties {
    /** required */
    /** - values */
    theme: Theme;
    viewable: boolean;
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
        viewable,
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
                toggle={() => {}}
                toggled={viewable}
                icon={viewable ? ViewableIcon : NotViewableIcon}
            />

            <ButtonClick
                theme={theme}
                atClick={() => {}}
                icon={DuplicateIcon}
            />

            <ButtonClick
                theme={theme}
                atClick={() => {}}
                icon={DeleteIcon}
            />
        </>
    );
}


export default TypeSelector;
/** [END] component */