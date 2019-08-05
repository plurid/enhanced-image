import styled from 'styled-components';



export const StyledEnhancedImageSliderItem = styled.div`
    box-sizing: border-box;
    padding: 7px 10px;
    height: 50px;
    font-family: 'Ubuntu', 'Work Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
        'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
`;


export const StyledEnhancedImageSliderType = styled.div`
    text-align: left;
`;


export const StyledEnhancedImageSliderValue = styled.div`
    float: right;
    font-size: 12px;
`;


export const StyledEnhancedImageSliderInputContainer: any = styled.div`
    /*
        article: https://css-tricks.com/styling-cross-browser-compatible-range-inputs-css/
        tool: http://danielstern.ca/range.css/
    */
    input[type=range] {
        -webkit-appearance: none;
        width: 100%;
        margin: 6.5px 0;
        padding: 5px 0;
        background: transparent;
    }

    input[type=range]:focus {
        outline: none;
    }

    input[type=range]::-webkit-slider-runnable-track {
        width: 100%;
        height: 2px;
        cursor: pointer;
        background: ${(props: any) => props.theme.color };
        border-radius: 0px;
    }

    input[type=range]::-webkit-slider-thumb {
        border: 2px solid ${(props: any) => props.theme.color };
        height: 15px;
        width: 15px;
        border-radius: 50px;
        background: ${(props: any) => {
            if (props.hovered) {
                return props.theme.color;
            }

            return props.theme.backgroundColor;
        }};
        cursor: pointer;
        -webkit-appearance: none;
        margin-top: -6.5px;
    }

    input[type=range]:focus::-webkit-slider-runnable-track {
        background: ${(props: any) => props.theme.color };
    }

    input[type=range]::-moz-range-track {
        width: 100%;
        height: 2px;
        cursor: pointer;
        background: ${(props: any) => props.theme.color };
        border-radius: 0px;
    }

    input[type=range]::-moz-range-thumb {
        border: 2px solid ${(props: any) => props.theme.color };
        height: 15px;
        width: 15px;
        border-radius: 50px;
        background: ${(props: any) => {
            if (props.hovered) {
                return props.theme.color;
            }

            return props.theme.backgroundColor;
        }};
        cursor: pointer;
    }

    input[type=range]::-ms-track {
        width: 100%;
        height: 2px;
        cursor: pointer;
        background: transparent;
        border-color: transparent;
        color: transparent;
    }

    input[type=range]::-ms-fill-lower {
        background: ${(props: any) => props.theme.color };
        border-radius: 0px;
    }

    input[type=range]::-ms-fill-upper {
        background: ${(props: any) => props.theme.color };
        border-radius: 0px;
    }

    input[type=range]::-ms-thumb {
        border: 2px solid ${(props: any) => props.theme.color };
        height: 15px;
        width: 15px;
        border-radius: 50px;
        background: ${(props: any) => {
            if (props.hovered) {
                return props.theme.color;
            }

            return props.theme.backgroundColor;
        }};
        cursor: pointer;
        height: 2px;
    }

    input[type=range]:focus::-ms-fill-lower {
        background: ${(props: any) => props.theme.color };
    }

    input[type=range]:focus::-ms-fill-upper {
        background: ${(props: any) => props.theme.color };
    }
`;
