import React from 'react';

import {
    StyledDrawer,
    StyledDrawerTitle,
    StyledDrawerContents,
} from './styled';

import { Theme } from '@plurid/utilities.themes';



interface DrawerProperties {
    title: string;
    theme: Theme;
    expand: boolean;
    toggleExpand: () => void;
}

const Drawer: React.FC<DrawerProperties> = (properties) => {
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
