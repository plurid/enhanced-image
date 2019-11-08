import React, {
    useState,
} from 'react';

import {
    StyledButtonInput,
    StyledButtonInputContainer,
    StyledButtonInputGotoLink,
} from './styled';

import ButtonToggle from '../ButtonToggle';

import GoToLinkIcon from '../../../../../../../../assets/icons/text-editor/gotolink';

import { Theme } from '@plurid/plurid-themes';



interface ButtonInputProperties {
    theme: Theme;
    icon: JSX.Element;
    value: string;
    toggle: () => void;
    toggled: boolean;
    valueType: string;
    changeValue: (type: string, value: string | number | boolean) => void;
}

const ButtonInput: React.FC<ButtonInputProperties> = (properties) => {
    const {
        icon,
        value,
        theme,
        toggle,
        toggled,
        valueType,
        changeValue,
    } = properties;

    const [show, setShow] = useState(false);

    const handleInput = (event: any) => {
        changeValue(valueType, event.target.value);
    }

    return (
        <StyledButtonInput
            theme={theme}
            onMouseEnter={() => setShow(show => !show)}
            onMouseLeave={() => setShow(show => !show)}
        >
            <ButtonToggle
                theme={theme}
                toggle={toggle}
                toggled={toggled}
                icon={icon}
            />

            {show && (
                <StyledButtonInputContainer
                    theme={theme}
                >
                    <input
                        type="text"
                        value={value}
                        onChange={handleInput}
                    />

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
                </StyledButtonInputContainer>
            )}
        </StyledButtonInput>
    );
}


export default ButtonInput;
