import styled from 'styled-components';



export interface IStyledPainted {
    dragMode: boolean;
    draggingMode: boolean;
    brushDrawing: boolean;
    enclosureDrawing: boolean;
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
            brushDrawing,
            enclosureDrawing,
            // toggledEditable,
            // actionable,
        }: IStyledPainted) => {
            if (brushDrawing || enclosureDrawing) {
                return 'crosshair';
            }

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
        display: block;
        pointer-events: none;
    }
`;


export const StyledDisplayCanvas = styled.canvas`
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    pointer-events: none;
`;
