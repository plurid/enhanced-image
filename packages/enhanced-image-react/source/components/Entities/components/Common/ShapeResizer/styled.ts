import styled from 'styled-components';

import {
    Theme,
} from '@plurid/plurid-themes';



export interface IStyledShapeResizer {
    theme: Theme;
}

export const StyledShapeResizer = styled.div<IStyledShapeResizer>`
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: 99;
    height: 9px;
    width: 9px;
    cursor: nwse-resize;

    background-color: ${
        ({
            theme
        }: IStyledShapeResizer) => theme.backgroundColorDark
    };
`;
