import React, {
    useContext,
    useRef,
    useState,
    useEffect,
    useLayoutEffect,
} from 'react';

import {
    StyledSettingsMenu,
} from './styled';

import Context from '../../../../services/utilities/context';

import AddTextIcon from '../../../../assets/icons/settings-menu/add-text';
import SaveTextIcon from '../../../../assets/icons/settings-menu/save-text';

import GetTextIcon from '../../../../assets/icons/settings-menu/get-text';
import ExtractTextIcon from '../../../../assets/icons/settings-menu/extract-text';
// import TransviewTextIcon from '../../../../assets/icons/settings-menu/transview-text';

import BackgroundColorTransparent from '../../../../assets/icons/settings-menu/background-color-transparent';
import BackgroundColorWhite from '../../../../assets/icons/settings-menu/background-color-white';
import BackgroundColorBlack from '../../../../assets/icons/settings-menu/background-color-black';

// import GenerateImageIcon from '../../../../assets/icons/settings-menu/generate-image';
// import ColorizeImageIcon from '../../../../assets/icons/settings-menu/colorize-image';

import ResetIcon from '../../../../assets/icons/settings-menu/reset';
import FullscreenIcon from '../../../../assets/icons/settings-menu/fullscreen';
import ShareIcon from '../../../../assets/icons/settings-menu/share';
import SaveIcon from '../../../../assets/icons/settings-menu/save';

import AboutIcon from '../../../../assets/icons/settings-menu/about';

import ButtonCheckmark from './components/ButtonCheckmark';
import ButtonItem from './components/ButtonItem';
import SliderItem from './components/SliderItem';
import Drawer from './components/Drawer';

import {
    SETTINGS_MENU_HEIGHT_DIFFERENCE,

    IMAGE_TYPES,
} from '../../../../data/constants';

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
        generator,
        development,

        databaseImageID,

        expandTextDrawer,
        setExpandTextDrawer,
        expandColorDrawer,
        setExpandColorDrawer,
        expandTopologyDrawer,
        setExpandTopologyDrawer,
        expandVariaDrawer,
        setExpandVariaDrawer,

        imageType,

        imageBackground,
        cycleImageBackground,

        imageBoxDimensions,

        editableText,
        setEditableText,

        addText,
        saveText,

        getText,
        extractText,
        downloadText,
        // transviewText,

        saveImage,
        saveImageHref,
        saveImageDownload,

        // generateImage,
        // colorizeImage,

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

    const settingsMenuWrapper = useRef<HTMLDivElement>(null);

    const [menuHeight, setMenuHeight] = useState<number | boolean>(false);

    const [resolveImageBackground, setResolveImageBackground] = useState(BackgroundColorTransparent);

    useLayoutEffect(() => {
        if (settingsMenuWrapper.current) {
            const menuHeight = settingsMenuWrapper.current.getBoundingClientRect().height;
            const imageHeight = imageBoxDimensions.height;

            if (menuHeight + SETTINGS_MENU_HEIGHT_DIFFERENCE <= imageHeight) {
                setMenuHeight(false);
            } else {
                setMenuHeight(imageHeight - SETTINGS_MENU_HEIGHT_DIFFERENCE);
            }
        }
    }, [
        settingsMenuWrapper.current,
        expandTextDrawer,
        expandColorDrawer,
        expandTopologyDrawer,
        expandVariaDrawer,
    ]);

    useEffect(() => {
        switch (imageBackground) {
            case 0:
                setResolveImageBackground(BackgroundColorTransparent);
                break;
            case 1:
                setResolveImageBackground(BackgroundColorWhite);
                break;
            case 2:
                setResolveImageBackground(BackgroundColorBlack);
                break;
            default:
                setResolveImageBackground(BackgroundColorTransparent);
        }
    }, [
        imageBackground
    ]);

    return (
        <StyledSettingsMenu
            theme={theme}
            transparentUI={transparentUI}
            menuHeight={menuHeight}
        >
            <div
                ref={settingsMenuWrapper}
            >
                <Drawer
                    title="Text"
                    theme={theme}
                    expand={expandTextDrawer}
                    toggleExpand={() => setExpandTextDrawer(expand => !expand)}
                >
                    <ul>
                        {generator && (
                            <>
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
                            </>
                        )}

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

                        {development && (
                            <li>
                                <ButtonItem
                                    theme={theme}
                                    atClick={downloadText}
                                    icon={ExtractTextIcon}
                                    text="Download Text"
                                />
                            </li>
                        )}

                        {/* <li>
                            <ButtonItem
                                theme={theme}
                                atClick={transviewText}
                                icon={TransviewTextIcon}
                                text="Transview Text"
                            />
                        </li> */}
                    </ul>
                </Drawer>

                <Drawer
                    title="Color"
                    theme={theme}
                    expand={expandColorDrawer}
                    toggleExpand={() => setExpandColorDrawer(expand => !expand)}
                >
                    <ul>
                        {/* <li>
                            <ButtonItem
                                theme={theme}
                                atClick={generateImage}
                                icon={GenerateImageIcon}
                                text="Generate Image"
                            />
                        </li> */}

                        {/* <li>
                            <ButtonItem
                                theme={theme}
                                atClick={colorizeImage}
                                icon={ColorizeImageIcon}
                                text="Colorize Image"
                            />
                        </li> */}

                        {(
                            imageType === IMAGE_TYPES.PNG
                            || imageType === IMAGE_TYPES.WEBP
                            || imageType === IMAGE_TYPES.GIF
                        ) && (
                            <li>
                                <ButtonItem
                                    theme={theme}
                                    atClick={cycleImageBackground}
                                    icon={resolveImageBackground}
                                    text="Background Color"
                                />
                            </li>
                        )}

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

                        {databaseImageID && (
                            <li>
                                <ButtonItem
                                    theme={theme}
                                    atClick={shareImage}
                                    icon={ShareIcon}
                                    text="Share Image"
                                />
                            </li>
                        )}

                        <li
                            onMouseEnter={() => saveImage()}
                        >
                            <a
                                href={saveImageHref}
                                download={saveImageDownload}
                                // ref={saveButton}
                            >
                                <ButtonItem
                                    theme={theme}
                                    atClick={() => {}}
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
            </div>
        </StyledSettingsMenu>
    );
}


export default SettingsMenu;
