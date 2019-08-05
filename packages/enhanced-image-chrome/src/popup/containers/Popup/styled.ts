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
`;


export const StyledPopupContainer: any = styled.div`
    height: 100%;
    width: 100%;
    display: grid;
    place-content: center;
`;
