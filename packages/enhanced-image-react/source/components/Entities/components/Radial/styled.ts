import styled from 'styled-components';



export interface IStyledRadial {
    dragMode: boolean;
    draggingMode: boolean;
}

export const StyledRadial = styled.div<IStyledRadial>`
    position: absolute;
    pointer-events: initial;
    outline: none;

    cursor: ${
        ({
            draggingMode,
            dragMode,
            // toggledEditable,
            // actionable,
        }: IStyledRadial) => {
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
