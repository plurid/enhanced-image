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
    StyledButtonContainer,
} from './styled';
/** [END] imports */




/** [START] component */
export interface ButtonToggleRenderProperties {
    /** required */
    /** - values */
    theme: Theme;
    toggled: boolean;
    transparentUI: boolean;
    icon: JSX.Element;
    /** - methods */
    toggle: () => void;
    renderOutside: (
        outside: JSX.Element,
        left?: number,
    ) => void;

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
        transparentUI,
        icon,
        /** - methods */
        toggle,
        renderOutside,

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
            <StyledButtonContainer
                theme={theme}
                transparentUI={transparentUI}
            >
                <div>
                    <div>
                        select
                    </div>

                    <div>
                        +
                    </div>
                </div>

                <div>
                    <div>
                        english
                    </div>

                    <div>
                        bg
                    </div>

                    <div>
                        x
                    </div>
                </div>

                <div>
                    <div>
                        french
                    </div>

                    <div>
                        bg
                    </div>

                    <div>
                        x
                    </div>
                </div>
            </StyledButtonContainer>
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
