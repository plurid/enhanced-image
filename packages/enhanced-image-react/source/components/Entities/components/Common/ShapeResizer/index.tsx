/** [START] imports */
/** libraries */
import React from 'react';

import {
    Theme,
} from '@plurid/plurid-themes';

/** external */
/** internal */
import {
    StyledShapeResizer,
} from './styled';
/** [END] imports */



/** [START] component */
export interface ShapeResizerProperties {
    /** required */
    /** - values */
    theme: Theme;
    /** - methods */
    handleMouseDownResize: (event: any) => void;

    /** optional */
    /** - values */
    /** - methods */
}

const ShapeResizer: React.FC<ShapeResizerProperties> = (
    properties,
) => {
    /** properties */
    const {
        /** required */
        /** - values */
        theme,
        /** - methods */
        handleMouseDownResize,

        /** optional */
        /** - values */
        /** - methods */
    } = properties;


    /** render */
    return (
        <StyledShapeResizer
            theme={theme}
            onMouseDown={(event) => handleMouseDownResize(event)}
        />
    );
}


export default ShapeResizer;
/** [END] component */
