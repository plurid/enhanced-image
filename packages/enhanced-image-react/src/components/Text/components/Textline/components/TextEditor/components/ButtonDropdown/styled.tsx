import styled from 'styled-components';



export const StyledTextVideoEditorButtonDropdown = styled.div`
    display: grid;
    place-content: center;
    position: relative;
`;


export const StyledTextVideoEditorButtonDropdownSelected = styled.div`
    input {
        width: 110px;
        border: none;
        background: ${props => props.theme.backgroundColorSecondary};
        color: ${props => props.theme.colorPrimary};
        text-align: left;
        outline: none;
        padding: 3px 6px;
    }
`;


export const StyledTextVideoEditorButtonDropdownList: any = styled.div`
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


export const StyledTextVideoEditorButtonDropdownListItem: any = styled.li`
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
