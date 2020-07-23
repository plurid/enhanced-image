/** [START] imports */
/** libraries */
import React from 'react';

import {
    Theme,
} from '@plurid/plurid-themes';

import {
    StyledDrawer,
    StyledDrawerTitle,
    StyledDrawerContents,
} from './styled';
/** [END] imports */



/** [START] component */
export interface DrawerProperties {
    title: string;
    theme: Theme;
    expand: boolean;
    toggleExpand: () => void;
}

const Drawer: React.FC<DrawerProperties> = (
    properties,
) => {
    const {
        title,
        theme,
        expand,
        toggleExpand,
        children,
    } = properties;

    return (
        <StyledDrawer>
            <StyledDrawerTitle
                theme={theme}
                onClick={() => toggleExpand()}
            >
                {title}
            </StyledDrawerTitle>

            <StyledDrawerContents>
                {expand && (
                    <>
                        {children}
                    </>
                )}
            </StyledDrawerContents>
        </StyledDrawer>
    );
}


export default Drawer;
/** [END] component */
