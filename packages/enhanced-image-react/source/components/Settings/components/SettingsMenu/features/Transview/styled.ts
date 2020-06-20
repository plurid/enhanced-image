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
    font-size: 0.8rem;

    li {
        font-size: 0.8rem;
        width: 120px;
    }
`;


export const StyledTransviewAction = styled.div`
    margin: 0 -10px;
    padding: 0 10px;
    height: 100%;
    cursor: pointer;
    user-select: none;

    display: flex;
    align-items: center;

    :hover {
        background-color: ${props => props.theme.backgroundColorTertiary};
    }
`;
