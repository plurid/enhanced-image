import styled from 'styled-components';

import {
    Theme,
} from '@plurid/plurid-themes';



export interface IStyledSimpleInput {
    theme: Theme;
    transparentUI: boolean;
    inputWidth: string;
}

export const StyledSimpleInput = styled.div<IStyledSimpleInput>`
    display: flex;
    align-items: center;

    input {
        background: ${
            ({
                theme,
                transparentUI,
            }: IStyledSimpleInput) => {
                if (transparentUI) {
                    return theme.backgroundColorSecondaryAlpha;
                }
                return theme.backgroundColorSecondary;
            }
        };
        color: ${
            ({
                theme,
            }: IStyledSimpleInput) => theme.colorPrimary
        };

        width: ${
            ({
                inputWidth,
            }: IStyledSimpleInput) => inputWidth
        };

        height: 18px;
        border: none;
        text-align: left;
        outline: none;
        padding: 3px 6px;
    }

    input:hover {
        background: ${(props: any) => {
            return props.theme.backgroundColorSecondary;
        }};
    }
`;


export const StyledInfo = styled.div`
    margin-right: 3px;
    pointer-events: none;
`;
