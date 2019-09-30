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

import ButtonCheckmark from './components/ButtonCheckmark';
import ButtonItem from './components/ButtonItem';



const SettingsMenu: React.FC<any> = () => {
    const context = useContext(Context);
    if (!context) {
        return (<></>);
    }

    const {
        theme,

        editableText,
        setEditableText,

        addText,
        getText,

        about,
    } = context;

    return (
        <StyledSettingsMenu
            theme={theme}
        >
            <ul>
                <li>
                    <ButtonCheckmark
                        theme={theme}
                        toggle={() => setEditableText(show => !show)}
                        text="Edit Text"
                        checked={editableText}
                    />
                </li>

                <li>
                    <ButtonItem
                        theme={theme}
                        atClick={addText}
                        icon={AddTextIcon}
                        text="Add Text"
                    />
                </li>

                <hr />

                <li>
                    <ButtonItem
                        theme={theme}
                        atClick={getText}
                        icon={GetTextIcon}
                        text="Get Text"
                    />
                </li>

                <li>
                    {/* <ButtonItem
                        theme={theme}
                        atClick={this.extractText}
                        icon={ExtractTextIcon}
                        text="Extract Text"
                    /> */}
                </li>

                <li>
                    {/* <ButtonItem
                        theme={theme}
                        atClick={this.transviewText}
                        icon={TransviewTextIcon}
                        text="Transview Text"
                    /> */}
                </li>

                <hr />

                <li>
                    {/* <ButtonItem
                        theme={theme}
                        atClick={this.generateImage}
                        icon={GenerateImageIcon}
                        text="Generate Image"
                    /> */}
                </li>

                <li>
                    {/* <ButtonItem
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

                {/* {
                    sliders.map(slider => {
                        const {
                            type,
                            min,
                            max,
                            valueSign
                        } = slider;

                        const sliderValue = `${slider.type}Value`;

                        return (
                            <li
                                key={type}
                            >
                                <EnhancedImageSliderItem
                                    theme={theme}
                                    type={type}
                                    min={min}
                                    max={max}
                                    value={this.context[sliderValue]}
                                    valueSign={valueSign}
                                />
                            </li>
                        )
                    })
                } */}

                <li>
                    {/* <EnhancedImageButtonCheckmark
                        theme={theme}
                        toggle={this.toggleDefaults}
                        text="Toggle Defaults"
                        checked={toggledDefaults}
                    /> */}
                </li>

                <li>
                    {/* <ButtonItem
                        theme={theme}
                        atClick={this.handleResetToDefaults}
                        icon={ResetIcon}
                        text="Reset to Defaults"
                    /> */}
                </li>

                <hr />

                <li>
                    {/* <ButtonItem
                        theme={theme}
                        atClick={this.extractText}
                        icon={FullscreenIcon}
                        text="View Fullscreen"
                    /> */}
                </li>

                <li>
                    {/* <ButtonItem
                        theme={theme}
                        atClick={this.shareImage}
                        icon={ShareIcon}
                        text="Share Image"
                    /> */}
                </li>

                {/* <li
                    onMouseEnter={this.saveImage}
                >
                    <a
                        ref={this.saveButton}
                    >
                        <ButtonItem
                            theme={theme}
                            atClick={this.saveImage}
                            icon={SaveIcon}
                            text="Save Image"
                        />
                    </a>
                </li> */}

                {about && (
                    <hr />
                )}

                {about && (
                    <li>
                        {/* <ButtonItem
                            theme={theme}
                            atClick={this.about}
                            icon={AboutIcon}
                            text="About eImage"
                        /> */}
                    </li>
                )}
            </ul>
        </StyledSettingsMenu>
    );
}


export default SettingsMenu;
