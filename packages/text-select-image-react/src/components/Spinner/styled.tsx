import styled from 'styled-components';



export const StyledSpinner = styled.div`
    position: absolute;
    right: 25px;
    bottom: 25px;
`;

export const StyledLoader = styled.div`
    border-radius: 50%;
    width: 25px;
    height: 25px;

    position: relative;
    border-top: 0.2em solid rgba(255, 255, 255, 0.1);
    border-right: 0.2em solid rgba(255, 255, 255, 0.1);
    border-bottom: 0.2em solid rgba(255, 255, 255, 0.1);
    border-left: 0.2em solid rgba(255, 255, 255, 0.9);
    animation: rotate 1.2s infinite cubic-bezier(0.445, 0.05, 0.55, 0.95);

    @keyframes rotate {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;
