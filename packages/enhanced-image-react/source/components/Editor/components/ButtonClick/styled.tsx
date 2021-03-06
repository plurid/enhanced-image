import styled from 'styled-components';



export const StyledButtonClick: any = styled.div`
    cursor: pointer;
    display: grid;
    place-content: center;
    height: 100%;
    min-width: 32px;

    :hover {
        background-color: ${props => props.theme.backgroundColorSecondary};
    }

    svg {
        fill: ${props => props.theme.colorPrimary};
        height: 14px;
        width: 14px;
    }
`;
