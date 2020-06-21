import styled from 'styled-components';



export const StyledTransview = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(3, 30px);
    align-items: center;
    padding: 0 10px;
    padding-bottom: 7px;
`;


export const StyledTransviewLanguage = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 0.7rem;

    li {
        font-size: 0.7rem;
        width: 120px;
    }
`;


export const StyledTransviewAction = styled.div`
    margin: 0 -10px;
    height: 100%;

    :hover {
        background-color: ${props => props.theme.backgroundColorTertiary};
    }
`;
