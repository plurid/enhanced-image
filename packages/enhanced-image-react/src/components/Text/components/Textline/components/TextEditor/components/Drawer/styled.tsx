import styled from 'styled-components';



export const StyledDrawer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`;


export const StyledDrawerTitle = styled.div`
    font-size: 0.9rem;
    user-select: none;
    cursor: pointer;
    text-align: left;
    padding: 0 7px;
    display: flex;
    align-items: center;
    height: 100%;

    :hover {
        background-color: ${props => props.theme.backgroundColorSecondary};
    }
`;


export const StyledDrawerContents = styled.div`
    display: flex;
    flex-direction: column;
    flex-flow: row;
`;
