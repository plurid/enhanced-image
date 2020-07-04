import styled from 'styled-components';

import {
    Theme,
} from '@plurid/plurid-themes';



export interface IStyledButtonToggleRender {
    theme: Theme;
}

export const StyledButtonToggleRender = styled.div<IStyledButtonToggleRender>`
`;


export interface IStyledButtonContainer {
    theme: Theme;
    transparentUI: boolean;
}

export const StyledButtonContainer = styled.div<IStyledButtonContainer>`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 1rem;
    width: 110px;

    background: ${
        ({
            theme,
            transparentUI,
        }: IStyledButtonContainer) => {
            if (transparentUI) {
                return theme.backgroundColorSecondaryAlpha;
            }
            return theme.backgroundColorSecondary;
        }
    };
    box-shadow: ${
        ({
            theme,
        }: IStyledButtonContainer) => theme.boxShadowUmbra
    };

    :hover {
        background: ${
            ({
                theme,
            }: IStyledButtonContainer) => theme.backgroundColorSecondary
        };
    }
`;
