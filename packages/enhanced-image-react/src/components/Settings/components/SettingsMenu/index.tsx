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
import Drawer from './components/Drawer';

import sliders from '../../../../data/constants/sliders';



const SettingsMenu: React.FC<any> = () => {
    const context = useContext(Context);
    if (!context) {
        return (<></>);
    }

    const {
        theme,
        transparentUI,
        about,

        expandTextDrawer,
        setExpandTextDrawer,
        expandColorDrawer,
        setExpandColorDrawer,
        expandTopologyDrawer,
        setExpandTopologyDrawer,
        expandVariaDrawer,
        setExpandVariaDrawer,

        imageBoxDimensions,

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

        defaultsToggled,
        toggleDefaults,
        resetToDefaults,

        flipVertical,
        setFlipVertical,
        flipHorizontal,
        setFlipHorizontal,

        viewFullscreen,
        shareImage,
        viewAbout,
    } = context;

    return (
        <StyledSettingsMenu
            theme={theme}
            transparentUI={transparentUI}
            height={imageBoxDimensions.height}
        >
            <Drawer
                title="Text"
                theme={theme}
                expand={expandTextDrawer}
                toggleExpand={() => setExpandTextDrawer(expand => !expand)}
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
                            atClick={async () => await getText()}
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
                </ul>
            </Drawer>

            <Drawer
                title="Color"
                theme={theme}
                expand={expandColorDrawer}
                toggleExpand={() => setExpandColorDrawer(expand => !expand)}
            >
                <ul>
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

                            const sliderValue = `imageColors${slider.type}`;
                            const handleInput = `setImageColors${slider.type}`;

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
                                        handleInput={(value: number) => context[handleInput](value)}
                                    />
                                </li>
                            )
                        })
                    }

                    <li>
                        <ButtonCheckmark
                            theme={theme}
                            toggle={() => toggleDefaults()}
                            text="Toggle Defaults"
                            checked={defaultsToggled}
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
                </ul>
            </Drawer>

            <Drawer
                title="Topology"
                theme={theme}
                expand={expandTopologyDrawer}
                toggleExpand={() => setExpandTopologyDrawer(expand => !expand)}
            >
                <ul>
                    <li>
                        <ButtonCheckmark
                            theme={theme}
                            toggle={() => setFlipVertical(flip => !flip)}
                            text="Flip Vertical"
                            checked={flipVertical}
                        />
                    </li>

                    <li>
                        <ButtonCheckmark
                            theme={theme}
                            toggle={() => setFlipHorizontal(flip => !flip)}
                            text="Flip Horizontal"
                            checked={flipHorizontal}
                        />
                    </li>
                </ul>
            </Drawer>

            <Drawer
                title="Varia"
                theme={theme}
                expand={expandVariaDrawer}
                toggleExpand={() => setExpandVariaDrawer(expand => !expand)}
            >
                <ul>
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
            </Drawer>
        </StyledSettingsMenu>
    );
}


export default SettingsMenu;
