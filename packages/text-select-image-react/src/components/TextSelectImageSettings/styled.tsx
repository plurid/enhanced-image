import styled from 'styled-components';



export const StyledTextSelectImageSettings = styled.div`
    position: absolute;
    top: 20px;
    right: 20px;
    display: grid;
    align-items: center;
    justify-items: right;
`;

export const StyledTextSelectImageSettingsButton = styled.div`
    cursor: pointer;
    user-select: none;
    height: 30px;
    width: 30px;

    img {
        box-shadow: 0px 2px 2px 0px hsla(220, 2%, 4%, 0.5);
    }
`;
