import styled from 'styled-components';



export const StyledDropdown = styled.div`
    text-align: right;
    position: relative;
`;


export const StyledDropdownSelected: any = styled.div`
    cursor: pointer;
`;


export const StyledDropdownList: any = styled.div`
    background: ${(props: any) => {
        return props.theme.backgroundColorSecondary;
    }};
    color: ${(props: any) => {
        return props.theme.colorPrimary;
    }};

    position: absolute;
    top: 20px;
    right: 0px;
    border-radius: 10px;
    width: 60px;
    z-index: 9999;
    box-shadow: 0px 3px 5px 1px hsla(327, 94%, 10%, 0.7);

    ul {
        margin: 0;
        padding: 0;
        list-style: none;
    }

    ul li {
        padding: 5px;
        cursor: pointer;
    }

    ul li:hover {
        background: ${(props: any) => {
            return props.theme.backgroundColorTertiary;
        }};
    }

    ul li:first-child {
        border-top-right-radius: 10px;
        border-top-left-radius: 10px;
    }

    ul li:last-child {
        border-bottom-right-radius: 10px;
        border-bottom-left-radius: 10px;
    }
`;
