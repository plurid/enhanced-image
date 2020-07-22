import styled from 'styled-components';

import {
    Theme,
} from '@plurid/plurid-themes';



export interface IStyledEnhancedImage {
    theme: Theme;
    topologyOverflow: boolean;
}

export const StyledEnhancedImage = styled.div<IStyledEnhancedImage>`
    box-sizing: border-box;
    font-family: Ubuntu, -apple-system, BlinkMacSystemFont, 'Segoe UI',
        Roboto, Oxygen, Cantarell, 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    position: relative;
    height: auto;
    width: auto;

    color: ${
        ({
            theme,
        }: IStyledEnhancedImage) => theme.colorPrimary
    };
    overflow: ${
        ({
            topologyOverflow,
        }: IStyledEnhancedImage) => topologyOverflow ? 'initial' : 'hidden'
    };

    -ms-overflow-style: none;  /* Internet Explorer 10+ */
    scrollbar-width: none;  /* Firefox */
    ::-webkit-scrollbar {
        display: none;  /* Safari and Chrome */
    }

    img {
        display: block;
        user-select: none;
        pointer-events: all;
        width: 100%;
    }
`;
