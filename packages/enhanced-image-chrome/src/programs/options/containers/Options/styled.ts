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
    margin: 0px auto;
    user-select: none;
    overflow: hidden;

    /* button {
        background: ${(props: any) => {
            return props.theme.backgroundColorSecondary;
        }};
    }

    a {
        text-decoration: none;
    } */
`;


export const StyledOptionsContainer: any = styled.div`
    width: 100%;
    height: 500px;
    display: grid;
    align-items: center;
    justify-content: center;
    overflow: auto;
`;


export const StyledOptionsWrapper: any = styled.div`
    width: 250px;
    margin: 30px auto;
`;


export const StyledOptionsItemLeftRight = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 15px 0;
`;


export const StyledStateContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 21px 60px 200px;

    margin-top: 20px;
    margin-bottom: 20px;

    h1 {
        margin: 0px;
    }
`;

export const StyledUIContainer = styled.div`
    margin-top: 20px;
    margin-bottom: 20px;

    h1 {
        margin: 0px;
    }
`;
