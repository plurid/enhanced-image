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


export interface IStyledRadialView {
}

export const StyledRadialView = styled.div<IStyledRadialView>`
    width: 100%;
    height: 100%;
    pointer-events: none;
    outline: none;
    border-radius: 50%;
`;
