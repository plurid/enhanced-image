import styled from 'styled-components';



export const StyledButtonInput = styled.div`
    position: relative;
    height: 100%;
    width: 32px;
    display: grid;

    svg {
        fill: ${props => props.theme.colorPrimary};
        height: 14px;
        width: 14px;
    }
`;


export const StyledButtonInputContainer: any = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    background: ${
        ({
            theme,
            transparentUI,
        }: any) => {
            if (transparentUI) {
                return theme.backgroundColorSecondaryAlpha;
            }
            return theme.backgroundColorSecondary;
        }
    };
    box-shadow: ${
        ({
            theme,
        }: any) => theme.boxShadowUmbra
    };

    :hover {
        background: ${
            ({
                theme,
            }: any) => theme.backgroundColorSecondary
        };
    }

    input {
        width: 110px;
        border: none;
        background: transparent;
        color: ${props => props.theme.colorPrimary};
        text-align: left;
        outline: none;
        padding: 3px 6px;
        height: 26px;
    }
`;


export const StyledButtonInputGotoLink = styled.div`
    display: grid;
    height: 14px;
    width: 14px;
    padding: 0 6px;
    cursor: pointer;
    user-select: none;

    svg {
        fill: ${props => props.theme.colorPrimary};
        height: 14px;
        width: 14px;
    }
`;
