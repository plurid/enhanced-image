/** [START] imports */
/** libraries */
import React, {
    useContext,
} from 'react';


/** external */
import Drawer from '#components/Editor/components/Drawer';

import {
    Context,
} from '#services/utilities';


/** internal */
/** [END] imports */



/** [START] component */
export interface FontDrawerProperties {
    /** required */
    /** - values */
    drawers: string[];
    /** - methods */
    toggleDrawer: (
        drawer: string,
    ) => void;

    /** optional */
    /** - values */
    /** - methods */
}

const FontDrawer: React.FC<FontDrawerProperties> = (
    properties,
) => {
    /** context */
    const context = useContext(Context);
    if (!context) {
        return (<></>);
    }

    const {
        theme,
    } = context;


    /** properties */
    const {
        /** required */
        /** - values */
        drawers,
        /** - methods */
        toggleDrawer,

        /** optional */
        /** - values */
        /** - methods */
    } = properties;


    /** render */
    return (
        <Drawer
            theme={theme}
            title="Font"
            expand={drawers.includes('FONT')}
            toggleExpand={() => toggleDrawer('FONT')}
        >
            {/* <ButtonIncrements
                theme={theme}
                transparentUI={transparentUI}
                type="font.size"
                changeValue={updateField}
                value={Math.round(valueFromPercentage(currentVersion.font.size, imageBoxDimensions.height))}
                icon={(
                    <PluridIconFontSize />
                )}
            />

            <ButtonDropdown
                theme={theme}
                transparentUI={transparentUI}
                type="font.family"
                alterStyle="font.family"
                selected={currentVersion.font.family}
                selectables={selectableFonts}
                changeSelected={updateField}
                toggleEditor={() => {}}
                textDraggable={false}
                toggleTextDraggable={() => {}}
                toggleTextSelected={() => {}}
                renderOutside={renderOutside}
                outsideKind={outsideKind}
                setOutsideKind={setOutsideKind}
            />

            <ButtonInput
                theme={theme}
                transparentUI={transparentUI}
                toggle={() => toggleTextFormat('link.active', true)}
                toggled={currentVersion.link.active}
                icon={(
                    <PluridIconLink />
                )}
                value={currentVersion.link.to}
                valueType="link.to"
                changeValue={updateField}
                renderOutside={renderOutside}
                outsideKind={outsideKind}
                setOutsideKind={setOutsideKind}
                goToLink={true}
            />

            <ButtonInput
                theme={theme}
                transparentUI={transparentUI}
                toggle={() => toggleTextFormat('action.active', true)}
                toggled={currentVersion.action.active}
                icon={(
                    <PluridIconPlay />
                )}
                value={currentVersion.action.type}
                valueType="action.type"
                changeValue={updateField}
                renderOutside={renderOutside}
                outsideKind={outsideKind}
                setOutsideKind={setOutsideKind}
            />

            <ButtonToggleRender
                theme={theme}
                type={'transview'}
                toggle={() => setShowTransview(show => !show)}
                toggled={showTransview}
                icon={(
                    <PluridIconTransview />
                )}
                renderOutside={renderOutside}
                outsideKind={outsideKind}
                setOutsideKind={setOutsideKind}
                Outside={transviewContainer}
            />

            <ButtonToggle
                theme={theme}
                toggle={() => toggleTextFormat('font.weight', 'bold')}
                toggled={currentVersion.font.weight === 'bold'}
                icon={(
                    <PluridIconBold />
                )}
            />

            <ButtonToggle
                theme={theme}
                toggle={() => toggleTextFormat('font.style', 'italic')}
                toggled={currentVersion.font.style === 'italic'}
                icon={(
                    <PluridIconItalic />
                )}
            />

            <ButtonIncrements
                theme={theme}
                transparentUI={transparentUI}
                type="font.letterSpacing"
                changeValue={updateField}
                value={valueFromPercentage(currentVersion.font.letterSpacing, imageBoxDimensions.width)}
                icon={(
                    <PluridIconLetterSpacing />
                )}
                step={0.1}
            />

            <ButtonIncrements
                theme={theme}
                transparentUI={transparentUI}
                type="font.wordSpacing"
                changeValue={updateField}
                value={valueFromPercentage(currentVersion.font.wordSpacing, imageBoxDimensions.width)}
                icon={(
                    <PluridIconWordSpacing />
                )}
                step={0.1}
            />

            <ButtonsColors
                theme={theme}
                selectedColor={currentVersion.color}
                changeValue={updateField}
            />

            <SimpleInput
                value={resolveColor(currentVersion.color)}
                valueType="color"
                changeValue={updateField}
                theme={theme}
                transparentUI={transparentUI}
                Icon={PluridIconPalette}
            /> */}
        </Drawer>
    );
}


export default FontDrawer;
/** [END] component */
