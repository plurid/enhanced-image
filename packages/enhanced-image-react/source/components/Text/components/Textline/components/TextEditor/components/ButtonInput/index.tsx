import React, {
    useRef,
    useState,
    useEffect,
} from 'react';

import {
    Theme,
} from '@plurid/plurid-themes';

import {
    StyledButtonInput,
    StyledButtonInputContainer,
    StyledButtonInputGotoLink,
} from './styled';

import ButtonToggle from '../ButtonToggle';

import GoToLinkIcon from '../../../../../../../../assets/icons/text-editor/gotolink';



export interface ButtonInputProperties {
    theme: Theme;
    transparentUI: boolean;
    icon: JSX.Element;
    value: string;
    toggle: () => void;
    toggled: boolean;
    valueType: string;
    changeValue: (
        type: string,
        value: string | number | boolean,
    ) => void;
    renderOutside: (
        outside: JSX.Element,
        left?: number,
    ) => void;
    outsideKind: string;
    setOutsideKind: React.Dispatch<React.SetStateAction<string>>;

    goToLink?: boolean;
}

const ButtonInput: React.FC<ButtonInputProperties> = (
    properties,
) => {
    /** properties */
    const {
        icon,
        value,
        theme,
        transparentUI,
        toggle,
        toggled,
        valueType,
        changeValue,
        renderOutside,
        outsideKind,
        setOutsideKind,

        goToLink,
    } = properties;


    /** references */
    const input = useRef<HTMLDivElement>(null);
    const timeout = useRef<any>();


    /** state */
    const [show, setShow] = useState(false);


    /** handlers */
    const handleInput = (
        event: any,
    ) => {
        changeValue(valueType, event.target.value);
    }


    /** effects */
    useEffect(() => {
        if (!show) {
            if (outsideKind !== valueType) {
                return;
            }

            const outside = (<></>);
            renderOutside(outside);
            return;
        }

        setOutsideKind(valueType);

        const outside = (
            <StyledButtonInputContainer
                theme={theme}
                transparentUI={transparentUI}
                onMouseEnter={() => {
                    if (timeout.current) {
                        clearTimeout(timeout.current);
                    }
                }}
                onMouseLeave={() => setShow(show => !show)}
            >
                <input
                    type="text"
                    value={value}
                    onChange={handleInput}
                    onKeyDown={(event) => {
                        event.stopPropagation();
                    }}
                />

                {goToLink && (
                    <a
                        href={value}
                        target="_blank"
                        rel="noreferrer noopener"
                    >
                        <StyledButtonInputGotoLink
                            theme={theme}
                        >
                            {GoToLinkIcon}
                        </StyledButtonInputGotoLink>
                    </a>
                )}
            </StyledButtonInputContainer>
        );

        const left = input.current
            ? input.current.offsetLeft
            : 0

        renderOutside(outside, left);
    }, [
        value,
        show,
    ]);


    /** render */
    return (
        <StyledButtonInput
            theme={theme}
            ref={input}
            onMouseEnter={() => setShow(show => !show)}
            onMouseLeave={() => {
                timeout.current = setTimeout(() => {
                    setShow(show => !show)
                }, 500);
            }}
        >
            <ButtonToggle
                theme={theme}
                toggle={toggle}
                toggled={toggled}
                icon={icon}
            />
        </StyledButtonInput>
    );
}


export default ButtonInput;
