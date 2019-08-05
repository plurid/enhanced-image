import styled from 'styled-components';



export const StyledPopup: any = styled.div`
    background-color: ${(props: any) => {
        return props.theme.backgroundColorPrimary;
    }};
    color: ${(props: any) => {
        return props.theme.colorPrimary;
    }};

    height: 200px;
    width: 250px;
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
    width: 200px;
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
        fill: white;
    }
`;
