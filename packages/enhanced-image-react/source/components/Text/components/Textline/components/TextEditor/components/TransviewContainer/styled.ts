import styled from 'styled-components';

import {
    Theme,
} from '@plurid/plurid-themes';



export interface IStyledTransviewContainer {
    theme: Theme;
    transparentUI: boolean;
}

export const StyledTransviewContainer = styled.div<IStyledTransviewContainer>`
    display: grid;
    grid-template-columns: 1fr;
    text-align: left;
    align-items: center;
    justify-items: left;
    width: 140px;
    cursor: default;
    font-size: 0.7rem;

    background: ${
        ({
            theme,
            transparentUI,
        }: IStyledTransviewContainer) => {
            if (transparentUI) {
                return theme.backgroundColorSecondaryAlpha;
            }
            return theme.backgroundColorSecondary;
        }
    };
    box-shadow: ${
        ({
            theme,
        }: IStyledTransviewContainer) => theme.boxShadowUmbra
    };

    :hover {
        background: ${
            ({
                theme,
            }: IStyledTransviewContainer) => theme.backgroundColorSecondary
        };
    }
`;


export const StyledLanguageSelect = styled.div`
    box-sizing: border-box;
    display: flex;
    width: 100%;
    padding: 10px 7px;
    align-items: center;
    justify-content: space-between;
`;


export const StyledLanguage = styled.div`
    box-sizing: border-box;
    display: flex;
    width: 100%;
    padding: 10px 7px;
    align-items: center;
    justify-content: space-between;
`;


export const StyledLanguageButtons = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 0.3rem;
    align-items: center;
`;
