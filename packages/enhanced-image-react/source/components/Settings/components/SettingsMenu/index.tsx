/** [START] imports */
/** libraries */
import React, {
    useContext,
    useRef,
    useState,
    useEffect,
    useLayoutEffect,
} from 'react';


/** external */
import AddTextIcon from '../../../../assets/icons/settings-menu/add-text';
import SaveTextIcon from '../../../../assets/icons/settings-menu/save-text';

import GetTextIcon from '../../../../assets/icons/settings-menu/get-text';
import ExtractTextIcon from '../../../../assets/icons/settings-menu/extract-text';
import TransviewTextIcon from '../../../../assets/icons/settings-menu/transview-text';

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

import {
    SETTINGS_MENU_HEIGHT_DIFFERENCE,

    IMAGE_TYPES,

    sliders,
} from '../../../../data/constants';

import {
    Context
} from '../../../../services/utilities';


/** internal */
import ButtonCheckmark from './components/ButtonCheckmark';
import ButtonItem from './components/ButtonItem';
import SliderItem from './components/SliderItem';
import Drawer from './components/Drawer';

import Transview from './features/Transview';

import {
    StyledSettingsMenu,
} from './styled';
/** [END] imports */



/** [START] component */
const SettingsMenu: React.FC<any> = () => {
    /** context */
    const context = useContext(Context);
    if (!context) {
        return (<></>);
    }

    const {
        showTooltips,
        setShowTooltips,

        theme,
        transparentUI,
        about,
        generator,
        development,
        settingsDrawers,
        textDrawer,
        topologyDrawer,
        variaDrawer,

        databaseImageID,

        expandTextDrawer,
        setExpandTextDrawer,
        expandColorDrawer,
        setExpandColorDrawer,
        expandTopologyDrawer,
        setExpandTopologyDrawer,
        expandEntitiesDrawer,
        setExpandEntitiesDrawer,
        expandVariaDrawer,
        setExpandVariaDrawer,

        imageType,

        imageBackground,
        cycleImageBackground,

        imageBoxDimensions,

        editableText,
        setEditableText,
        revealedText,
        setRevealedText,

        editableEntities,
        setEditableEntities,
        revealedEntities,
        setRevealedEntities,

        showTransviewSettings,
        setShowTransviewSettings,

        addText,
        saveText,

        getText,
        extractText,
        downloadText,
        transviewText,

        saveImage,
        saveImageHref,
        saveImageDownload,

        // generateImage,
        // colorizeImage,

        imageColorsInvert,
        setImageColorsInvert,

        defaultsToggled,
        toggleDefaults,
        resetDefaultsColor,

        imageTopologyOverflow,
        setImageTopologyOverflow,
        flipVertical,
        setFlipVertical,
        flipHorizontal,
        setFlipHorizontal,
        imageTopologyDrag,
        setImageTopologyDrag,
        imageTopologyRotate,
        setImageTopologyRotate,
        imageTopologyScale,
        setImageTopologyScale,
        resetDefaultsTopology,

        viewFullscreen,
        shareImage,
        viewAbout,

        /** entities */
        addEntity,
    } = context;


    /** references */
    const settingsMenuWrapper = useRef<HTMLDivElement>(null);


    /** state */
    const [
        menuHeight,
        setMenuHeight,
    ] = useState<number | boolean>(false);
    const [
        resolveImageBackground,
        setResolveImageBackground,
    ] = useState(BackgroundColorTransparent);


    /** effects */
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


    /** render */
    return (
        <StyledSettingsMenu
            theme={theme}
            transparentUI={transparentUI}
            menuHeight={menuHeight}
        >
            <div
                ref={settingsMenuWrapper}
            >
                {(settingsDrawers.includes('ALL') || settingsDrawers.includes('TEXT'))
                && (
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
                                            text="Upload Text"
                                        />
                                    </li>

                                    {development && (
                                        <li>
                                            <ButtonItem
                                                theme={theme}
                                                atClick={downloadText}
                                                icon={SaveIcon}
                                                text="Download Text"
                                            />
                                        </li>
                                    )}

                                    <hr />
                                </>
                            )}

                            {(textDrawer.includes('ALL') || textDrawer.includes('REVEAL_TEXT'))
                            && (
                                <li>
                                    <ButtonCheckmark
                                        theme={theme}
                                        toggle={() => setRevealedText(show => !show)}
                                        text="Reveal Text"
                                        checked={revealedText}
                                    />
                                </li>
                            )}

                            {(textDrawer.includes('ALL') || textDrawer.includes('GET_TEXT'))
                            && (
                                <li>
                                    <ButtonItem
                                        theme={theme}
                                        atClick={async () => await getText()}
                                        icon={GetTextIcon}
                                        text="Get Text"
                                    />
                                </li>
                            )}

                            {(textDrawer.includes('ALL') || textDrawer.includes('EXTRACT_TEXT'))
                            && (
                                <li>
                                    <ButtonItem
                                        theme={theme}
                                        atClick={extractText}
                                        icon={ExtractTextIcon}
                                        text="Extract Text"
                                    />
                                </li>
                            )}

                            {(textDrawer.includes('ALL') || textDrawer.includes('TRANSVIEW_TEXT'))
                            && (
                                <li>
                                    <ButtonItem
                                        theme={theme}
                                        atClick={() => setShowTransviewSettings(show => !show)}
                                        icon={TransviewTextIcon}
                                        text="Transview Text"
                                    />
                                </li>
                            )}

                            {showTransviewSettings && (
                                <li>
                                    <Transview />
                                </li>
                            )}
                        </ul>
                    </Drawer>
                )}


                {(settingsDrawers.includes('ALL') || settingsDrawers.includes('COLOR'))
                && (
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
                                                value={(context as any)[sliderValue]}
                                                valueSign={valueSign}
                                                handleInput={(value: number) => (context as any)[handleInput](value)}
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
                                    atClick={resetDefaultsColor}
                                    icon={ResetIcon}
                                    text="Reset to Defaults"
                                />
                            </li>
                        </ul>
                    </Drawer>
                )}


                {(settingsDrawers.includes('ALL') || settingsDrawers.includes('TOPOLOGY'))
                && (
                    <Drawer
                        title="Topology"
                        theme={theme}
                        expand={expandTopologyDrawer}
                        toggleExpand={() => setExpandTopologyDrawer(expand => !expand)}
                    >
                        <ul>
                            {(topologyDrawer.includes('ALL') || topologyDrawer.includes('OVERFLOW'))
                            && (
                                <li>
                                    <ButtonCheckmark
                                        theme={theme}
                                        toggle={() => setImageTopologyOverflow(show => !show)}
                                        text="Show Overflow"
                                        checked={imageTopologyOverflow}
                                    />
                                </li>
                            )}

                            {(topologyDrawer.includes('ALL') || topologyDrawer.includes('FLIP_VERTICAL'))
                            && (
                                <li>
                                    <ButtonCheckmark
                                        theme={theme}
                                        toggle={() => setFlipVertical(flip => !flip)}
                                        text="Flip Vertical"
                                        checked={flipVertical}
                                    />
                                </li>
                            )}

                            {(topologyDrawer.includes('ALL') || topologyDrawer.includes('FLIP_HORIZONTAL'))
                            && (
                                <li>
                                    <ButtonCheckmark
                                        theme={theme}
                                        toggle={() => setFlipHorizontal(flip => !flip)}
                                        text="Flip Horizontal"
                                        checked={flipHorizontal}
                                    />
                                </li>
                            )}

                            {(topologyDrawer.includes('ALL') || topologyDrawer.includes('DRAG'))
                            && (
                                <li>
                                    <ButtonCheckmark
                                        theme={theme}
                                        toggle={() => setImageTopologyDrag(drag => !drag)}
                                        text="Drag Image"
                                        checked={imageTopologyDrag}
                                    />
                                </li>
                            )}

                            {(topologyDrawer.includes('ALL') || topologyDrawer.includes('ROTATE'))
                            && (
                                <li>
                                    <SliderItem
                                        theme={theme}
                                        type={'TransformRotate'}
                                        min={-180}
                                        max={180}
                                        value={imageTopologyRotate}
                                        valueSign={'°'}
                                        handleInput={(value: number) => setImageTopologyRotate(value)}
                                    />
                                </li>
                            )}

                            {(topologyDrawer.includes('ALL') || topologyDrawer.includes('SCALE'))
                            && (
                                <li>
                                    <SliderItem
                                        theme={theme}
                                        type={'TransformScale'}
                                        min={-100}
                                        max={100}
                                        value={imageTopologyScale}
                                        valueSign={''}
                                        handleInput={(value: number) => setImageTopologyScale(value)}
                                    />
                                </li>
                            )}

                            {(topologyDrawer.includes('ALL') || topologyDrawer.includes('RESET'))
                            && (
                                <li>
                                    <ButtonItem
                                        theme={theme}
                                        atClick={resetDefaultsTopology}
                                        icon={ResetIcon}
                                        text="Reset to Defaults"
                                    />
                                </li>
                            )}
                        </ul>
                    </Drawer>
                )}


                {(settingsDrawers.includes('ALL') || settingsDrawers.includes('ENTITIES'))
                && (
                    <Drawer
                        title="Entities"
                        theme={theme}
                        expand={expandEntitiesDrawer}
                        toggleExpand={() => setExpandEntitiesDrawer(expand => !expand)}
                    >
                        <ul>
                            {generator && (
                                <>
                                    <li>
                                        <ButtonCheckmark
                                            theme={theme}
                                            toggle={() => setEditableEntities(show => !show)}
                                            text="Edit Entities"
                                            checked={editableEntities}
                                        />
                                    </li>

                                    <li>
                                        <ButtonItem
                                            theme={theme}
                                            atClick={addEntity}
                                            icon={AddTextIcon}
                                            text="Add Entity"
                                        />
                                    </li>

                                    <li>
                                        <ButtonItem
                                            theme={theme}
                                            atClick={() => {}}
                                            icon={SaveTextIcon}
                                            text="Upload Entities"
                                        />
                                    </li>

                                    {development && (
                                        <li>
                                            <ButtonItem
                                                theme={theme}
                                                atClick={() => {}}
                                                icon={SaveIcon}
                                                text="Download Entities"
                                            />
                                        </li>
                                    )}

                                    <hr />
                                </>
                            )}

                            <li>
                                <ButtonCheckmark
                                    theme={theme}
                                    toggle={() => setRevealedEntities(show => !show)}
                                    text="Reveal Entities"
                                    checked={revealedEntities}
                                />
                            </li>

                            <li>
                                <ButtonItem
                                    theme={theme}
                                    atClick={() => {}}
                                    icon={GetTextIcon}
                                    text="Get Entities"
                                />
                            </li>

                            <li>
                                <ButtonItem
                                    theme={theme}
                                    atClick={() => {}}
                                    icon={ExtractTextIcon}
                                    text="Extract Entities"
                                />
                            </li>
                        </ul>
                    </Drawer>
                )}


                {(settingsDrawers.includes('ALL') || settingsDrawers.includes('VARIA'))
                && (
                    <Drawer
                        title="Varia"
                        theme={theme}
                        expand={expandVariaDrawer}
                        toggleExpand={() => setExpandVariaDrawer(expand => !expand)}
                    >
                        <ul>
                            {(variaDrawer.includes('ALL') || variaDrawer.includes('SHOW_TOOLTIPS'))
                            && (
                                <li>
                                    <ButtonCheckmark
                                        theme={theme}
                                        toggle={() => setShowTooltips(show => !show)}
                                        text="Show Tooltips"
                                        checked={showTooltips}
                                    />
                                </li>
                            )}

                            {(variaDrawer.includes('ALL') || variaDrawer.includes('VIEW_FULLSCREEN'))
                            && (
                                <li>
                                    <ButtonItem
                                        theme={theme}
                                        atClick={viewFullscreen}
                                        icon={FullscreenIcon}
                                        text="View Fullscreen"
                                    />
                                </li>
                            )}

                            {databaseImageID
                            && (variaDrawer.includes('ALL') || variaDrawer.includes('SHARE_IMAGE'))
                            && (
                                <li>
                                    <ButtonItem
                                        theme={theme}
                                        atClick={shareImage}
                                        icon={ShareIcon}
                                        text="Share Image"
                                    />
                                </li>
                            )}

                            {(variaDrawer.includes('ALL') || variaDrawer.includes('DOWNLOAD_IMAGE'))
                            && (
                                <li
                                    onMouseEnter={() => saveImage()}
                                >
                                    <a
                                        href={saveImageHref}
                                        download={saveImageDownload}
                                    >
                                        <ButtonItem
                                            theme={theme}
                                            atClick={() => {}}
                                            icon={SaveIcon}
                                            text="Download Image"
                                        />
                                    </a>
                                </li>
                            )}

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
                )}
            </div>
        </StyledSettingsMenu>
    );
}


export default SettingsMenu;
