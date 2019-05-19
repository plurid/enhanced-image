import styled from 'styled-components';



export const StyledTextSelectImageButtonCheckmark = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 7px 10px;
    height: 32px;
`;

export const StyledTextSelectImageButtonCheckmarkCheckbox: any = styled.div`
    display: block;
    height: 13px;
    width: 13px;
    border-radius: 50%;
    border: 2px solid ${props => props.theme.color};
    background-color: ${(props: any) => {
        if (props.isChecked) {
            return props.theme.color;
        }
        return 'transparent';
    }};
`;
