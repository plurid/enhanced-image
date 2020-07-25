/** [START] imports */
/** libraries */
import React, {
    useContext,
    useState,
    useEffect,
} from 'react';

import {
    PluridIconPalette,
    PluridIconPlay,

    PluridIconFontSize,
    PluridIconLink,
    PluridIconBold,
    PluridIconItalic,
    PluridIconLetterSpacing,
    PluridIconWordSpacing,
    PluridIconTransview,
} from '@plurid/plurid-icons-react';


/** external */
import Drawer from '#components/Editor/components/Drawer';
import ButtonIncrements from '#components/Editor/components/ButtonIncrements';
import ButtonDropdown from '#components/Editor/components/ButtonDropdown';
import ButtonInput from '#components/Editor/components/ButtonInput';
import ButtonToggle from '#components/Editor/components/ButtonToggle';
import ButtonToggleRender from '#components/Editor/components/ButtonToggleRender';
import ButtonsColors from '#components/Editor/components/ButtonsColors';
import SimpleInput from '#components/Editor/components/SimpleInput';

import {
    selectableFonts,
 } from '#data/constants/fonts';

import {
    Context,

    /** percentage */
    valueFromPercentage,

    /** color */
    resolveColor,
} from '#services/utilities';

import TransviewContainer from '../TransviewContainer';


/** internal */
/** [END] imports */



/** [START] component */
export interface FontDrawerProperties {
    /** required */
    /** - values */
    drawers: string[];
    currentVersion: any;
    outsideKind: any;
    textID: string;
    /** - methods */
    toggleDrawer: (
        drawer: string,
    ) => void;
    updateField: any;
    toggleTextFormat: any;
    renderOutside: any;
    setOutsideKind: any;

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
        transparentUI,
        imageBoxDimensions,
    } = context;


    /** properties */
    const {
        /** required */
        /** - values */
        drawers,
        currentVersion,
        outsideKind,
        textID,
        /** - methods */
        toggleDrawer,
        updateField,
        toggleTextFormat,
        renderOutside,
        setOutsideKind,

        /** optional */
        /** - values */
        /** - methods */
    } = properties;


    /** state */
    const [showTransview, setShowTransview] = useState(false);
    const [transviewContainer, setTransviewContainer] = useState((
        <TransviewContainer
            theme={theme}
            transparentUI={transparentUI}
            textID={textID}
            transview={currentVersion.transview}
        />
    ));


    /** effects */
    /** Transview Container */
    useEffect(() => {
        const transviewContainer = (
            <TransviewContainer
                theme={theme}
                transparentUI={transparentUI}
                textID={textID}
                transview={currentVersion.transview}
            />
        );

        setTransviewContainer(transviewContainer);
    }, [
        currentVersion.transview,
        currentVersion.transview.active,
        currentVersion.transview.data,
        currentVersion.transview.data.length,
    ]);

    /** Show Transview */
    useEffect(() => {
        if (outsideKind !== 'transview') {
            setShowTransview(false);
        }
    }, [
        outsideKind,
    ]);


    /** render */
    return (
        <Drawer
            theme={theme}
            title="Font"
            expand={drawers.includes('FONT')}
            toggleExpand={() => toggleDrawer('FONT')}
        >
            <ButtonIncrements
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
            />
        </Drawer>
    );
}


export default FontDrawer;
/** [END] component */
