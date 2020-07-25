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
    user-select: none;

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
`;


export const StyledLanguageSelect = styled.div`
    box-sizing: border-box;
    display: flex;
    width: 100%;
    min-height: 36px;
    padding: 10px 7px;
    align-items: center;
    justify-content: space-between;
`;


export interface IStyledLanguage {
    theme: Theme;
    active: boolean;
}

export const StyledLanguage = styled.div<IStyledLanguage>`
    box-sizing: border-box;
    display: flex;
    width: 100%;
    min-height: 36px;
    padding: 10px 7px;
    align-items: center;
    justify-content: space-between;

    background: ${
        ({
            theme,
            active,
        }: IStyledLanguage) => {
            if (active) {
                return theme.backgroundColorSecondary;
            }

            return 'initial';
        }
    };
`;


export const StyledLanguageActivate = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    margin: -24px 0;
    height: 36px;
`;


export const StyledLanguageButtons = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 0.5rem;
    align-items: center;
`;
