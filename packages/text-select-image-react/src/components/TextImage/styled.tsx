import styled from 'styled-components';



export const StyledTextImage: any = styled.div`
    z-index: ${(props: any) => {
        if (props.dragMode) {
            return '9999';
        }

        return 'inherit';
    }};

    position: absolute;
    white-space: nowrap;
    min-width: 30px;
    text-align: left;
    cursor: text;
    outline: none;

    display: flex;
    flex-direction: row;
    align-items: center;

    a {
        color: inherit;
    }
`;


export const StyledTextImageTextContent: any = styled.div`
    color: ${(props: any) => {
        if (props.viewable) {
            return props.color;
        }

        return 'inherit';
    }};

    background: ${(props: any) => {
        if (props.toggledEditable) {
            return 'hsla(220, 2%, 10%, 0.3)';
        }

        return 'transparent';
    }};

    cursor: ${(props: any) => {
        if (props.draggingMode) {
            return 'grabbing';
        }

        if (props.dragMode) {
            return 'grab';
        }

        if (props.editMode) {
            return 'text';
        }

        if (props.toggledEditable) {
            return 'default';
        }

        return 'initial';
    }};

`;


export const StyledEditableDiv: any = styled.div`
    outline: none;

    user-select: ${(props: any) => {
        if (props.toggledEditable) {
            return 'none';
        }

        return 'auto';
    }};
`;
