import styled from 'styled-components';



export const StyledInputText: any = styled.div`
    input {
        color: ${(props: any) => {
            return props.theme.colorPrimary;
        }};

        background: transparent;
        border: none;
        outline: none;
        padding: 0;
        text-align: center;
        font-size: 14px;
        width: 100%;
        height: 30px;
    }

    input::placeholder {
        color: ${(props: any) => {
            return props.theme.colorTertiary;
        }};
    }
`;
