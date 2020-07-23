import styled from 'styled-components';



export interface IStyledRectangular {
    dragMode: boolean;
    draggingMode: boolean;
}

export const StyledRectangular = styled.div<IStyledRectangular>`
    position: absolute;
    pointer-events: initial;
    outline: none;

    cursor: ${
        ({
            draggingMode,
            dragMode,
            // toggledEditable,
            // actionable,
        }: IStyledRectangular) => {
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
`;
