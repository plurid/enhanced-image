import React, {
    useState,
} from 'react';

import {
    StyledSliderItem,
    StyledSliderType,
    StyledSliderValue,
    StyledSliderInputContainer,
} from './styled';

import {
    SLIDER_NAMES,
    SLIDER_INPUT_DEFAULTS,
    SLIDER_VALUE_DEFAULTS,
} from '../../../../../../data/constants';

import Context from '../../../../../../services/utilities/context';

import { Theme } from '@plurid/plurid-themes';



interface SliderItemProperties {
    theme: Theme;
    type: string;
    min?: number;
    max?: number;
    value: number;
    valueSign?: string;
    handleInput: (value: number) => void;
}

const SliderItem: React.FC<SliderItemProperties> = (
    properties,
) => {
    const {
        theme,
        type,
        min,
        max,
        value,
        valueSign,
        handleInput,
    } = properties;

    const [hovered, setHovered] = useState(false);

    const handleDoubleClick = () => {
        handleInput((SLIDER_VALUE_DEFAULTS as any)[type]);
    }

    return (
        <StyledSliderItem>
            <StyledSliderType>
                {(SLIDER_NAMES as any)[type]}

                <StyledSliderValue>
                    {value}{valueSign || SLIDER_INPUT_DEFAULTS.valueSign}
                </StyledSliderValue>
            </StyledSliderType>

            <StyledSliderInputContainer
                theme={theme}
                hovered={hovered}
            >
                <input
                    type="range"
                    min={min || SLIDER_INPUT_DEFAULTS.min}
                    max={max || SLIDER_INPUT_DEFAULTS.max}
                    name={type}
                    value={value}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    onChange={(event: any) => handleInput(parseInt(event.target.value))}
                    // onMouseDown={toggleMenuOpaque}
                    // onMouseUp={toggleMenuOpaque}
                    onDoubleClick={handleDoubleClick}
                />
            </StyledSliderInputContainer>

        </StyledSliderItem>
    );
}


// class SliderItem extends Component<
//     any, any
// > {
//     static contextType = Context;

//     constructor(props: any) {
//         super(props);

//         this.state = {
//             hovered: false,
//         };
//     }

//     public render() {
//         const {
//             hovered,
//         } = this.state;

//         const {
//             theme,
//             type,
//             min,
//             max,
//             value,
//             valueSign
//         } = this.props;

//         const {
//             toggleMenuOpaque
//         } = this.context;

//         return (
//             <StyledEnhancedImageSliderItem
//             >
//                 <StyledEnhancedImageSliderType>
//                     {SLIDER_NAMES[type]}

//                     <StyledEnhancedImageSliderValue>
//                         {value}{valueSign || SLIDER_INPUT_DEFAULTS.valueSign}
//                     </StyledEnhancedImageSliderValue>
//                 </StyledEnhancedImageSliderType>

//                 <StyledEnhancedImageSliderInputContainer
//                     theme={theme}
//                     hovered={hovered}
//                 >
//                     <input
//                         type="range"
//                         min={min || SLIDER_INPUT_DEFAULTS.min}
//                         max={max || SLIDER_INPUT_DEFAULTS.max}
//                         name={type}
//                         value={value}
//                         onMouseEnter={this.toggleHover}
//                         onMouseLeave={this.toggleHover}
//                         onChange={this.handleSliderInput}
//                         onMouseDown={toggleMenuOpaque}
//                         onMouseUp={toggleMenuOpaque}
//                         onDoubleClick={this.handleDoubleClick}
//                     />
//                 </StyledEnhancedImageSliderInputContainer>
//             </StyledEnhancedImageSliderItem>
//         );
//     }

//     private toggleHover = () => {
//         this.setState({
//             hovered: !this.state.hovered,
//         });
//     }

//     private handleSliderInput = (event: any) => {
//         const { value } = event.target;

//         const {
//             type
//         } = this.props;

//         const {
//             toggleDefaults,
//             toggledDefaults,
//             setColorValue,
//         } = this.context;

//         if (toggledDefaults) {
//             toggleDefaults();
//         }

//         setColorValue(type, value);
//     }

//     private handleDoubleClick = () => {
//         const {
//             type
//         } = this.props;

//         const {
//             setColorValue,
//         } = this.context;

//         setColorValue(type, SLIDER_VALUE_DEFAULTS[type]);
//     }
// }


export default SliderItem;
