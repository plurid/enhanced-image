import styled from 'styled-components';



export const StyledOptions: any = styled.div`
    background-color: ${(props: any) => {
        return props.theme.backgroundColorPrimary;
    }};
    color: ${(props: any) => {
        return props.theme.colorPrimary;
    }};
    height: 500px;
    width: 100%;
    margin: 0 auto;
`;


export const StyledOptionsContainer: any = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    place-content: center;
`;


export const StyledOptionsItemLeftRight = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 15px 0;
`;
