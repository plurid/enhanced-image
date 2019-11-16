import React from 'react';

import {
    StyledDrawer,
    StyledDrawerTitle,
} from './styled';

import { Theme } from '@plurid/plurid-themes';



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
