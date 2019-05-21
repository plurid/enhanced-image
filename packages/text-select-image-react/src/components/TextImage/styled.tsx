import styled from 'styled-components';



export const StyledTextImage: any = styled.div`
    position: absolute;
    white-space: nowrap;
    min-width: 30px;
    text-align: left;
    cursor: text;
    outline: none;

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

    user-select: ${(props: any) => {
        if (props.toggledEditable) {
            return 'none';
        }

        return 'auto';
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
