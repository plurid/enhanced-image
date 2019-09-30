import React, {
    useContext,
} from 'react';

import {
    StyledSettingsMenu,
} from './styled';

import Context from '../../../../services/utilities/context';

import AddTextIcon from '../../../../assets/icons/settings-menu/add-text';
import SaveTextIcon from '../../../../assets/icons/settings-menu/save-text';

import GetTextIcon from '../../../../assets/icons/settings-menu/get-text';
import ExtractTextIcon from '../../../../assets/icons/settings-menu/extract-text';
import TransviewTextIcon from '../../../../assets/icons/settings-menu/transview-text';

import GenerateImageIcon from '../../../../assets/icons/settings-menu/generate-image';
import ColorizeImageIcon from '../../../../assets/icons/settings-menu/colorize-image';

import ResetIcon from '../../../../assets/icons/settings-menu/reset';
import FullscreenIcon from '../../../../assets/icons/settings-menu/fullscreen';
import ShareIcon from '../../../../assets/icons/settings-menu/share';
import SaveIcon from '../../../../assets/icons/settings-menu/save';

import AboutIcon from '../../../../assets/icons/settings-menu/about';

import ButtonCheckmark from './components/ButtonCheckmark';
import ButtonItem from './components/ButtonItem';
import SliderItem from './components/SliderItem';

import sliders from '../../../../data/constants/sliders';



const SettingsMenu: React.FC<any> = () => {
    const context = useContext(Context);
    if (!context) {
        return (<></>);
    }

    const {
        theme,
        about,

        editableText,
        setEditableText,

        addText,
        saveText,

        getText,
        extractText,
        transviewText,

        saveImage,

        generateImage,
        colorizeImage,

        imageColorsInvert,
        setImageColorsInvert,

        toggledDefaults,
        toggleDefaults,
    } = context;

    const resetToDefaults = () => {}
    const viewFullscreen = () => {}
    const shareImage = () => {}
    const viewAbout = () => {}

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

                <li>
                    <ButtonItem
                        theme={theme}
                        atClick={saveText}
                        icon={SaveTextIcon}
                        text="Save Text"
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
                    <ButtonItem
                        theme={theme}
                        atClick={extractText}
                        icon={ExtractTextIcon}
                        text="Extract Text"
                    />
                </li>

                <li>
                    <ButtonItem
                        theme={theme}
                        atClick={transviewText}
                        icon={TransviewTextIcon}
                        text="Transview Text"
                    />
                </li>

                <hr />

                <li>
                    <ButtonItem
                        theme={theme}
                        atClick={generateImage}
                        icon={GenerateImageIcon}
                        text="Generate Image"
                    />
                </li>

                <li>
                    <ButtonItem
                        theme={theme}
                        atClick={colorizeImage}
                        icon={ColorizeImageIcon}
                        text="Colorize Image"
                    />
                </li>

                <li>
                    <ButtonCheckmark
                        theme={theme}
                        toggle={() => setImageColorsInvert(invert => !invert)}
                        text="Invert Colors"
                        checked={imageColorsInvert}
                    />
                </li>

                {
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
                                <SliderItem
                                    theme={theme}
                                    type={type}
                                    min={min}
                                    max={max}
                                    value={context[sliderValue]}
                                    valueSign={valueSign}
                                />
                            </li>
                        )
                    })
                }

                <li>
                    <ButtonCheckmark
                        theme={theme}
                        toggle={() => toggleDefaults(show => !show)}
                        text="Toggle Defaults"
                        checked={toggledDefaults}
                    />
                </li>

                <li>
                    <ButtonItem
                        theme={theme}
                        atClick={resetToDefaults}
                        icon={ResetIcon}
                        text="Reset to Defaults"
                    />
                </li>

                <hr />

                <li>
                    <ButtonItem
                        theme={theme}
                        atClick={viewFullscreen}
                        icon={FullscreenIcon}
                        text="View Fullscreen"
                    />
                </li>

                <li>
                    <ButtonItem
                        theme={theme}
                        atClick={shareImage}
                        icon={ShareIcon}
                        text="Share Image"
                    />
                </li>

                <li
                    // onMouseEnter={saveImage}
                >
                    <a
                        // ref={saveButton}
                    >
                        <ButtonItem
                            theme={theme}
                            atClick={saveImage}
                            icon={SaveIcon}
                            text="Save Image"
                        />
                    </a>
                </li>

                {about && (
                    <hr />
                )}

                {about && (
                    <li>
                        <ButtonItem
                            theme={theme}
                            atClick={viewAbout}
                            icon={AboutIcon}
                            text="About eImage"
                        />
                    </li>
                )}
            </ul>
        </StyledSettingsMenu>
    );
}


export default SettingsMenu;
