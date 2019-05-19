import styled from 'styled-components';



export const StyledTextImage: any = styled.div`
    position: absolute;
    white-space: nowrap;
    color: ${(props: any) => {
        if (props.editMode) {
            return 'red';
        } else {
            return 'transparent';
        }
    }};
    min-width: 30px;
    text-align: left;
    cursor: text;
`;
