import styled from 'styled-components';



export interface IStyledPainted {
    dragMode: boolean;
    draggingMode: boolean;
}

export const StyledPainted = styled.div<IStyledPainted>`
    min-height: 20px;
    min-width: 20px;
    position: absolute;
    pointer-events: initial;
    outline: none;

    cursor: ${
        ({
            draggingMode,
            dragMode,
            // toggledEditable,
            // actionable,
        }: IStyledPainted) => {
            // if (actionable && !toggledEditable) {
            //     return 'pointer';
            // }

            if (draggingMode) {
                return 'grabbing';
            }

            if (dragMode) {
                return 'grab';
            }

            return 'initial';
        }
    };

    canvas {
        pointer-events: none;
        background-color: hsla(220, 20%, 40%, 0.3);
    }
`;
