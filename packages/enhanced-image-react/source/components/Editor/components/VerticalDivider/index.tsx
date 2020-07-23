/** [START] imports */
/** libraries */
import React from 'react';

import {
    Theme,
} from '@plurid/plurid-themes';

/** external */
/** internal */
import {
    StyledVerticalDivider,
} from './styled';
/** [END] imports */



/** [START] component */
export interface VerticalDividerProperties {
    /** required */
    /** - values */
    theme: Theme;
    /** - methods */

    /** optional */
    /** - values */
    /** - methods */
}

const VerticalDivider: React.FC<VerticalDividerProperties> = (
    properties,
) => {
    /** properties */
    const {
        /** required */
        /** - values */
        theme,
        /** - methods */

        /** optional */
        /** - values */
        /** - methods */
    } = properties;


    /** render */
    return (
        <StyledVerticalDivider
            theme={theme}
        >
            &nbsp;
        </StyledVerticalDivider>
    );
}


export default VerticalDivider;
/** [END] component */
