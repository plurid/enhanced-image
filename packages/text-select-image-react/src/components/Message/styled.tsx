import styled, { keyframes } from 'styled-components';



const translateUp = keyframes`
    from { bottom: -100px; }
    to { bottom: 25px; }
`;

export const StyledMessage: any = styled.div`
    color: white;
    position: absolute;
    left: 50%;
    bottom: 25px;
    transform: translateX(-50%);
    background-color: hsla(220, 2%, 10%, 0.3);
    padding: 4px 10px;
    user-select: none;
    pointer-events: ${(props: any) => {
        if (props.link) {
            return 'auto';
        }
        return 'none';
    }};
    animation: ${translateUp} 400ms ease-in-out forwards;

    a {
        text-decoration: none;
        color: #ccc;
    }
`;
