import styled from 'styled-components';



export const StyledTotalTransformations: any = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0;
    position: relative;

    a {
        text-decoration: none;
    }
`;


export const StyledTotalTransformationsAll: any = styled.div`
    background: ${(props: any) => {
        return props.theme.backgroundColorSecondary;
    }};
    color: ${(props: any) => {
        return props.theme.colorPrimary;
    }};
    box-shadow: 0px 5px 5px 0px ${(props: any) => {
        return props.theme.boxShadowUmbraColor;
    }};
    border-radius: 10px;
    border-top-right-radius: 0;
    position: absolute;
    font-size: 11px;
    padding: 7px;
    margin: 7px;
    min-width: 120px;
    height: auto;
    top: 8px;
    right: -7px;
    z-index: 9991;

    ul {
        padding: 0;
        margin: 0;
        list-style: none;
    }

    ul li {
        margin: 5px 0;
        display: grid;
        grid-gap: 5px;
        grid-template-columns: 1fr 1fr;
    }

    ul li > div:first-child {
        text-align: left;
    }
`;
