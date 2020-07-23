import styled from 'styled-components';



export const StyledButtonDropdown = styled.div`
    display: grid;
    place-content: center;
    position: relative;
`;


export const StyledButtonDropdownSelected: any = styled.div`
    input {
        background: ${(props: any) => {
            if (props.transparentUI) {
                return props.theme.backgroundColorSecondaryAlpha;
            }
            return props.theme.backgroundColorSecondary;
        }};
        color: ${props => props.theme.colorPrimary};

        width: 110px;
        height: 18px;
        border: none;
        text-align: left;
        outline: none;
        padding: 3px 6px;
    }

    input:hover {
        background: ${(props: any) => {
            return props.theme.backgroundColorSecondary;
        }};
    }
`;


export const StyledButtonDropdownList: any = styled.div`
    width: 122px;
    display: grid;
    align-content: flex-start;
    max-height: 100px;
    overflow-y: auto;
    overflow-x: hidden;
    scroll-snap-type: y mandatory;

    box-shadow: ${
        ({
            theme,
        }: any) => theme.boxShadowUmbra
    };

    ul {
        margin: 0;
        padding: 0;
        list-style: none;
    }
`;


export const StyledButtonDropdownListItem: any = styled.li`
    cursor: pointer;
    padding: 4px 6px;
    font-size: 11px;
    scroll-snap-align: start;
    height: 20px;
    display: flex;
    align-items: center;

    font-family: ${(props: any) => props.fontFamily};
    background: ${(props: any) => {
        const {
            index,
            cursor,
            theme,
            transparentUI,
        } = props;

        if (index === cursor) {
            return theme.backgroundColorPrimary;
        }

        if (transparentUI) {
            return theme.backgroundColorSecondaryAlpha;
        }

        return theme.backgroundColorSecondary;
    }};
    color: ${
        ({
            theme,
        }: any) => theme.colorPrimary
    };
    letter-spacing: 0;
    word-spacing: 0;
    font-weight: normal;
    font-style: normal;

    :hover {
        background: ${props => props.theme.backgroundColorPrimary};
    }
`;
