import styled from 'styled-components';



export const StyledButtonToggle: any = styled.div`
    background-color: ${(props: any) => {
        if (props.toggled) {
            return props.theme.backgroundColorSecondary;
        } else {
            return 'transparent';
        }
    }};

    cursor: pointer;
    display: grid;
    place-content: center;
    height: 100%;
    min-width: 32px;

    svg {
        fill: ${props => props.theme.colorPrimary};
        height: 14px;
        width: 14px;
    }
`;
