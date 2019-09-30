import React, {
    useContext,
} from 'react';

import {
    StyledSettingsMenu,
} from './styled';

import Context from '../../../../services/utilities/context';

import AboutIcon from '../../../../assets/icons/settings-menu/about';
import AddTextIcon from '../../../../assets/icons/settings-menu/add-text';
import GetTextIcon from '../../../../assets/icons/settings-menu/get-text';
import ExtractTextIcon from '../../../../assets/icons/settings-menu/extract-text';
// import TransviewTextIcon from '../../../../assets/icons/settings-menu/transview-text';

// import GenerateImageIcon from '../../../../assets/icons/settings-menu/generate-image';
// import ColorizeImageIcon from '../../../../assets/icons/settings-menu/colorize-image';

import ResetIcon from '../../../../assets/icons/settings-menu/reset';
import FullscreenIcon from '../../../../assets/icons/settings-menu/fullscreen';
import ShareIcon from '../../../../assets/icons/settings-menu/share';
import SaveIcon from '../../../../assets/icons/settings-menu/save';



const SettingsMenu: React.FC<any> = () => {
    const context = useContext(Context);
    if (!context) {
        return (<></>);
    }

    const {
        theme,
    } = context;

    return (
        <StyledSettingsMenu
            theme={theme}
        >
            <ul>
                <li>
                    {/* <EnhancedImageButtonCheckmark
                        theme={theme}
                        toggle={this.toggleEditable}
                        text="Edit Text"
                        checked={toggledEditable}
                    /> */}
                </li>

                <li>
                    {/* <li>
                        <EnhancedImageButtonItem
                            theme={theme}
                            atClick={this.addText}
                            icon={AddTextIcon}
                            text="Add Text"
                        />
                    </li> */}
                </li>

                <hr />

                <li>
                    {/* <EnhancedImageButtonItem
                        theme={theme}
                        atClick={this.getText}
                        icon={GetTextIcon}
                        text="Get Text"
                    /> */}
                </li>

                <li>
                    {/* <EnhancedImageButtonItem
                        theme={theme}
                        atClick={this.extractText}
                        icon={ExtractTextIcon}
                        text="Extract Text"
                    /> */}
                </li>

                <li>
                    {/* <EnhancedImageButtonItem
                        theme={theme}
                        atClick={this.transviewText}
                        icon={TransviewTextIcon}
                        text="Transview Text"
                    /> */}
                </li>

                <hr />

                <li>
                    {/* <EnhancedImageButtonItem
                        theme={theme}
                        atClick={this.generateImage}
                        icon={GenerateImageIcon}
                        text="Generate Image"
                    /> */}
                </li>

                <li>
                    {/* <EnhancedImageButtonItem
                        theme={theme}
                        atClick={this.colorizeImage}
                        icon={ColorizeImageIcon}
                        text="Colorize Image"
                    /> */}
                </li>

                <li>
                    {/* <EnhancedImageButtonCheckmark
                        theme={theme}
                        toggle={this.toggleInvert}
                        text="Invert Colors"
                        checked={!!invertValue}
                    /> */}
                </li>
            </ul>
        </StyledSettingsMenu>
    );
}


export default SettingsMenu;




    // {
    //     sliders.map(slider => {
    //         const {
    //             type,
    //             min,
    //             max,
    //             valueSign
    //         } = slider;

    //         const sliderValue = `${slider.type}Value`;

    //         return (
    //             <li
    //                 key={type}
    //             >
    //                 <EnhancedImageSliderItem
    //                     theme={theme}
    //                     type={type}
    //                     min={min}
    //                     max={max}
    //                     value={this.context[sliderValue]}
    //                     valueSign={valueSign}
    //                 />
    //             </li>
    //         )
    //     })
    // }

    // <li>
    //     <EnhancedImageButtonCheckmark
    //         theme={theme}
    //         toggle={this.toggleDefaults}
    //         text="Toggle Defaults"
    //         checked={toggledDefaults}
    //     />
    // </li>

    // <li>
    //     <EnhancedImageButtonItem
    //         theme={theme}
    //         atClick={this.handleResetToDefaults}
    //         icon={ResetIcon}
    //         text="Reset to Defaults"
    //     />
    // </li>

    // <hr />

    // <li>
    //     <EnhancedImageButtonItem
    //         theme={theme}
    //         atClick={this.extractText}
    //         icon={FullscreenIcon}
    //         text="View Fullscreen"
    //     />
    // </li>

    // <li>
    //     <EnhancedImageButtonItem
    //         theme={theme}
    //         atClick={this.shareImage}
    //         icon={ShareIcon}
    //         text="Share Image"
    //     />
    // </li>

    // <li
    //     onMouseEnter={this.saveImage}
    // >
    //     <a
    //         ref={this.saveButton}
    //     >
    //         <EnhancedImageButtonItem
    //             theme={theme}
    //             atClick={this.saveImage}
    //             icon={SaveIcon}
    //             text="Save Image"
    //         />
    //     </a>
    // </li>

    // {about && (
    //     <hr />
    // )}

    // {about && (
    //     <li>
    //         <EnhancedImageButtonItem
    //             theme={theme}
    //             atClick={this.about}
    //             icon={AboutIcon}
    //             text="About eImage"
    //         />
    //     </li>
    // )}
