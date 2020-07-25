import styled from 'styled-components';



export interface IStyledImage {
    topologyOverflow: boolean;
}

export const StyledImage = styled.div<IStyledImage>`
    position: relative;
    height: 100%;

    overflow: ${
        ({
            topologyOverflow,
        }: IStyledImage) => topologyOverflow ? 'initial' : 'hidden'
    };
`;
