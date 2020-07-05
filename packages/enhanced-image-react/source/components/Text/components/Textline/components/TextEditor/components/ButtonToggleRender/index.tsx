/** [START] imports */
/** libraries */
import React, {
    useRef,
    useEffect,
} from 'react';

import {
    Theme,
} from '@plurid/plurid-themes';

/** external */
import ButtonToggle from '../ButtonToggle';

/** internal */
import {
    StyledButtonToggleRender,
} from './styled';
/** [END] imports */




/** [START] component */
export interface ButtonToggleRenderProperties {
    /** required */
    /** - values */
    theme: Theme;
    toggled: boolean;
    icon: JSX.Element;
    /** - methods */
    toggle: () => void;
    renderOutside: (
        outside: JSX.Element,
        left?: number,
    ) => void;
    Outside: JSX.Element,

    /** optional */
    /** - values */
    /** - methods */
}

const ButtonToggleRender: React.FC<ButtonToggleRenderProperties> = (
    properties,
) => {
    /** properties */
    const {
        /** required */
        /** - values */
        theme,
        toggled,
        icon,
        /** - methods */
        toggle,
        renderOutside,
        Outside,

        /** optional */
        /** - values */
        /** - methods */
    } = properties;


    /** references */
    const button = useRef<HTMLDivElement>(null);


    /** effects */
    useEffect(() => {
        if (!toggled) {
            renderOutside((
                <></>
            ));
            return;
        }

        const outside = (
            <>
                {Outside}
            </>
        );

        const left = button.current
            ? button.current.offsetLeft
            : 0

        renderOutside(
            outside,
            left,
        );
    }, [
        toggled,
        Outside,
    ]);


    /** render */
    return (
        <StyledButtonToggleRender
            theme={theme}
            ref={button}
        >
            <ButtonToggle
                theme={theme}
                toggled={toggled}
                icon={icon}
                toggle={toggle}
            />
        </StyledButtonToggleRender>
    );
}


export default ButtonToggleRender;
/** [END] component */
