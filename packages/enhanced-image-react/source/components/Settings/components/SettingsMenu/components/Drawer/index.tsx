import React from 'react';

import {
    Theme,
} from '@plurid/plurid-themes';

import {
    StyledDrawer,
    StyledDrawerTitle,
} from './styled';



export interface DrawerProperties {
    title: string;
    theme: Theme;
    expand: boolean;
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
