import styled from 'styled-components';



export const StyledPopup: any = styled.div`
    background-color: ${(props: any) => {
        return props.theme.backgroundColorPrimary;
    }};
    color: ${(props: any) => {
        return props.theme.colorPrimary;
    }};

    height: 320px;
    width: 300px;
    text-align: left;
    user-select: none;

     a {
        color: ${(props: any) => {
            return props.theme.colorSecondary;
        }};
        text-decoration: none;
     }
`;


export const StyledPopupContainer: any = styled.div`
    height: 100%;
    width: 260px;
    display: grid;
    align-items: center;
    margin: 0 auto;
`;


export const StyledOptionsItemLeftRight = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 5px 0;

    svg {
        width: 14px;
        height: 14px;
        margin: 5px;
    }
`;


export const StyledHR: any = styled.hr`
    width: 70%;
    border: none;
    border-top: 1px solid ${(props: any) => {
        return props.theme.colorPrimary;
    }};
`;
