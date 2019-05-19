import styled from 'styled-components';



export const StyledTextImageEditorButtonsColors: any = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 5px;
    margin: 0 5px;
`;

export const StyledTextImageEditorButtonColors: any = styled.div`
    background-color: ${(props: any) => {
        if (props.selected) {
            return props.theme.backgroundColorHover;
        }
        switch (props.color) {
            case 'black':
                return props.theme.backgroundColorHover;
            case 'red':
                return 'red';
            case 'white':
                return 'white';
            default:
                return 'black';
        }
    }};
    height: 14px;
    width: 14px;
    border-radius: 10px;
    border: 1px solid ${(props: any) => {
        return props.theme.colorSecondary;
        // switch (props.color) {
        //     case 'black':
        //         return 'white';
        //     case 'red':
        //         return 'white';
        //     case 'white':
        //         return 'black';
        //     default:
        //         return 'black';
        // }
    }};;
    cursor: pointer;
`;
