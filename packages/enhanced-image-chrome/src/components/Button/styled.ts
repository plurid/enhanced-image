import styled from 'styled-components';



export const StyledButton: any = styled.div`
    button {
        background-color: ${(props: any) => {
            return props.theme.backgroundColorSecondary;
        }};
        color: ${(props: any) => {
            return props.theme.colorPrimary;
        }};
        cursor: pointer;
        user-select: none;
        box-shadow: 0px 5px 5px 0px ${(props: any) => {
            return props.theme.shadow;
        }};
        border: none;
        outline: none;
        padding: 0;
        text-align: center;
        font-size: 14px;
        width: 100%;
        height: 30px;
        border-radius: 30px;
        margin-bottom: 10px;
        transition: box-shadow 100ms linear;
    }

    button:active {
        box-shadow: 0px 2px 2px 0px ${(props: any) => {
            return props.theme.shadow;
        }};
    }

    button:disabled {
        opacity: 0.5;
        box-shadow: 0px 5px 5px 0px ${(props: any) => {
            return props.theme.shadow;
        }};
        cursor: none;
    }
`;
