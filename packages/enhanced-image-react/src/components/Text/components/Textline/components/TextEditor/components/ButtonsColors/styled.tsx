import styled from 'styled-components';



export const StyledTextVideoEditorButtonsColors: any = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 5px;
    margin: 0 5px;
    place-content: center;
`;

export const StyledTextVideoEditorButtonColors: any = styled.div`
    background-color: ${(props: any) => {
        if (props.selected) {
            return props.theme.backgroundColorSecondary;
        }
        switch (props.color) {
            case 'black':
                return 'black'
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
    border: 1px solid ${(props: any) => props.theme.colorSecondary};
    cursor: pointer;
`;
