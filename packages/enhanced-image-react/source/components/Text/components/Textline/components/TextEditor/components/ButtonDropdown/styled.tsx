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
    position: absolute;
    top: 27px;
    left: 0;
    right: 0;
    display: grid;
    align-content: flex-start;
    max-height: 100px;
    overflow-y: auto;
    overflow-x: hidden;
    scroll-snap-type: y mandatory;

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

    font-family: ${(props: any) => props.fontFamily};
    background: ${(props: any) => {
        const {
            index,
            cursor,
            filtered,
            selected,
            theme,
        } = props;

        // console.log(index, cursor);

        if (index === cursor) {
            return theme.backgroundColorPrimary;
        }

        return theme.backgroundColorSecondary;
    }};

    :hover {
        background: ${props => props.theme.backgroundColorPrimary};
    }
`;
