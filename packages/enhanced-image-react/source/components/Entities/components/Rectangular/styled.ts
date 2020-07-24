import styled from 'styled-components';



export interface IStyledRectangular {
    draggingMode: boolean;
    dragMode: boolean;
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


export interface IStyledRectangularView {
}

export const StyledRectangularView = styled.div<IStyledRectangularView>`
    width: 100%;
    height: 100%;
    pointer-events: none;
    outline: none;
    box-sizing: border-box;
`;
