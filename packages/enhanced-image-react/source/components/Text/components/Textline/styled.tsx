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
    pointer-events: initial;
`;


export const StyledTextContent: any = styled.div`
    color: ${
        ({
            revealedText,
            viewable,
            editableText,
            color,
        }: any) => {
            if (revealedText || viewable || editableText) {
                return color;
            }

            return 'transparent';
        }
    };

    background: ${
        ({
            backgrounded,
            revealedText,
            editableText,
        }: any) => {
            if (backgrounded) {
                return backgrounded;
            }

            if (revealedText || editableText) {
                return 'hsla(220, 2%, 10%, 0.3)';
            }

            return 'transparent';
        }
    };

    user-select: ${(props: any) => {
        if (props.draggingMode) {
            return 'none';
        }

        return 'text';
    }};

    cursor: ${
        ({
            draggingMode,
            dragMode,
            editMode,
            toggledEditable,
            actionable,
        }: any) => {
            if (actionable && !toggledEditable) {
                return 'pointer';
            }

            if (draggingMode) {
                return 'grabbing';
            }

            if (dragMode) {
                return 'grab';
            }

            if (editMode) {
                return 'text';
            }

            if (toggledEditable) {
                return 'default';
            }

            return 'initial';
        }
    };

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

    user-select: ${
        ({
            editableText,
        }: any) => {
            if (editableText) {
                return 'none';
            }

            return 'auto';
        }
    };

    ::selection {
        background: hsla(220, 2%, 10%, 0.3);
        color: ${
            ({
                viewable,
                revealedText,
                editableText,
            }: any) => {
                if (viewable || revealedText || editableText) {
                    return 'initial';
                }

                return 'transparent';
            }
        };
    }
`;
