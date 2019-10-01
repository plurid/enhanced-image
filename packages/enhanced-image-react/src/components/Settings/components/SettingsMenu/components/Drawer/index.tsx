import React, {
    useState,
} from 'react';

import {
    StyledDrawer,
    StyledDrawerTitle,
} from './styled';

import { Theme } from '@plurid/utilities.themes';



interface DrawerProperties {
    title: string;
    theme: Theme;
}

const Drawer: React.FC<DrawerProperties> = (properties) => {
    const {
        title,
        theme,
        children,
    } = properties;

    const [expand, setExpand] = useState(false);

    return (
        <StyledDrawer>
            <StyledDrawerTitle
                theme={theme}
                onClick={() => setExpand(expand => !expand)}
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
