import styled from 'styled-components';



export const StyledTextItem: any = styled.div`
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
`;


export const StyledTextContent: any = styled.div`
    color: ${(props: any) => {
        if (props.revealedText) {
            return props.color;
        }

        if (props.viewable || props.editableText) {
            return props.color;
        }
        return 'transparent';
    }};

    background: ${(props: any) => {
        if (props.revealedText) {
            return 'hsla(220, 2%, 10%, 0.3)';
        }

        if (props.editableText) {
            return 'hsla(220, 2%, 10%, 0.3)';
        }

        return 'transparent';
    }};

    user-select: ${(props: any) => {
        if (props.draggingMode) {
            return 'none';
        }

        return 'text';
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

    border: 1px solid ${(props: any) => {
        if (props.toggledEditable && props.selected) {
            return 'hsla(220, 2%, 10%, 0.6)';
        } else {
            return 'transparent';
        }
    }};

    min-width: 20px;
    min-height: 10px;
`;


export const StyledTextContentLink: any = styled.a`
    color: ${(props: any) => {
        if (props.viewable || props.revealed) {
            return props.color;
        }

        return 'transparent';
    }} !important;
`;


export const StyledEditableDiv: any = styled.div`
    outline: none;
    white-space: pre;

    ::selection {
        color: ${(props: any) => {
            if (props.toggledEditable) {
                return 'initial';
            }

            return 'transparent';
        }};
        background: hsla(220, 2%, 10%, 0.3);
    }

    user-select: ${(props: any) => {
        if (props.toggledEditable) {
            return 'none';
        }

        return 'auto';
    }};
`;
