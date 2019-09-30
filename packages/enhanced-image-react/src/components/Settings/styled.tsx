import styled from 'styled-components';



export const StyledSettings = styled.div`
    position: absolute;
    top: 20px;
    right: 20px;
    display: grid;
    align-items: center;
    justify-items: right;
`;

export const StyledSettingsButton = styled.div`
    cursor: pointer;
    user-select: none;
    height: 30px;
    width: 30px;
    z-index: 9999;

    img {
        box-shadow: 0px 2px 2px 0px hsla(220, 2%, 4%, 0.5);
    }
`;
