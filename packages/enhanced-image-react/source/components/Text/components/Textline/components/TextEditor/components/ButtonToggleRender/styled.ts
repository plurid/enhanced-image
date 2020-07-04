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
    font-size: 0.9rem;
    text-align: left;
    justify-content: left;
    justify-items: left;
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


export const StyledLanguageSelect = styled.div`
    display: flex;
    margin: 10px 0;
`;


export const StyledLanguage = styled.div`
    display: flex;
    margin: 10px 0;
`;
