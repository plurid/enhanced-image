import styled from 'styled-components';



export const StyledLoggedInView: any = styled.div`
`;


export const StyledOptionsItemLeftRight = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 15px 0;

    svg {
        width: 14px;
        height: 14px;
        margin: 5px;
    }
`;


export const StyledGetMore = styled.div`
    width: 180px;
    margin: 0 auto;
    margin-top: 30px;

    a {
        color: ${(props: any) => {
            return props.theme.colorPrimary;
        }};
        text-decoration: none;
        font-weight: normal;
    }

    button {
        background: ${(props: any) => {
            return props.theme.backgroundColorSecondary;
        }};
        background-image: none !important;
        border-color: transparent !important;
        text-shadow: none !important;

        :hover {
            /** fix options bug */
            color: ${(props: any) => {
                return props.theme.colorPrimary;
            }} !important;
            background: ${(props: any) => {
                return props.theme.backgroundColorTertiary;
            }};
            background-image: none !important;
            box-shadow: none !important;
            border-color: transparent !important;
            text-shadow: none !important;
        }
    }
`;
