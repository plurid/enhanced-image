import styled from 'styled-components';

import {
    Theme,
} from '@plurid/plurid-themes';



export interface IStyledVerticalDivider {
    theme: Theme;
}

export const StyledVerticalDivider = styled.div<IStyledVerticalDivider>`
    background-color: ${
        ({
            theme,
        }: IStyledVerticalDivider) => theme.colorSecondary
    };

    width: 1px;
    height: 100%;
    user-select: none;
`;
