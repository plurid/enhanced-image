import styled from 'styled-components';



export const StyledTextSelectImageButtonCheckmark = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 7px 10px;
    height: 32px;

    .enhanced-image-button-checkbox {
        display: block;
        height: 10px;
        width: 10px;
        border-radius: 50%;
        border: 2px solid ${props => props.theme.color};
        background-color: ${props => props.theme.backgroundColor};
    }

    .enhanced-image-button-checkbox-fill {
        background-color: ${props => props.theme.color};
    }
`;
