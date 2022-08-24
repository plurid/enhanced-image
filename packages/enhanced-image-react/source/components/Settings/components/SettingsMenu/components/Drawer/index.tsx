/** [START] imports */
/** libraries */
import React from 'react';

import {
    Theme,
} from '@plurid/plurid-themes';


/** internal */
import {
    StyledDrawer,
    StyledDrawerTitle,
} from './styled';
/** [END] imports */



/** [START] component */
export interface DrawerProperties {
    title: string;
    theme: Theme;
    expand: boolean;
    children: React.ReactNode;
    toggleExpand: () => void;
}

const Drawer: React.FC<DrawerProperties> = (
    properties,
) => {
    /** properties */
    const {
        title,
        theme,
        expand,
        toggleExpand,
        children,
    } = properties;


    /** render */
    return (
        <StyledDrawer>
            <StyledDrawerTitle
                theme={theme}
                onClick={() => toggleExpand()}
            >
                {title}
            </StyledDrawerTitle>

            <div>
                {expand && (
                    <>
                        {children}
                    </>
                )}
            </div>
        </StyledDrawer>
    );
}


export default Drawer;
/** [END] component */
