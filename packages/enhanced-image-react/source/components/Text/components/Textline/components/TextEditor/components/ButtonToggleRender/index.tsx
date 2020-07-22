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
    type: string;
    toggled: boolean;
    icon: JSX.Element;
    outsideKind: string;
    /** - methods */
    toggle: () => void;
    renderOutside: (
        outside: JSX.Element,
        left?: number,
    ) => void;
    setOutsideKind: React.Dispatch<React.SetStateAction<string>>;
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
        type,
        toggled,
        icon,
        outsideKind,
        /** - methods */
        toggle,
        renderOutside,
        setOutsideKind,
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
            if (outsideKind !== type) {
                return;
            }

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

        setOutsideKind(type);

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
