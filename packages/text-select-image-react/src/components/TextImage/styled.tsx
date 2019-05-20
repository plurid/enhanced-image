import styled from 'styled-components';



export const StyledTextImage: any = styled.div`
    position: absolute;
    white-space: nowrap;
    min-width: 30px;
    text-align: left;
    cursor: text;

    a {
        color: inherit;
    }
`;


export const StyledTextImageTextContent: any = styled.div`
    background: ${(props: any) => {
        if (props.editMode) {
            return 'hsla(220, 2%, 10%, 0.3)';
        }

        return 'transparent';
    }};

    user-select: ${(props: any) => {
        if (props.editMode) {
            return 'none';
        }

        return 'auto';
    }};

    cursor: ${(props: any) => {
        if (props.editMode) {
            return 'default';
        }

        return 'initial';
    }};
`;
