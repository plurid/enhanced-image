/** [START] imports */
/** libraries */
import React, {
    useContext,
    useState,
    useEffect,
} from 'react';

import {
    PluridIconPlay,
    PluridIconLink,
    PluridIconTransview,
} from '@plurid/plurid-icons-react';


/** external */
import Drawer from '#components/Editor/components/Drawer';
import ButtonInput from '#components/Editor/components/ButtonInput';
import ButtonToggleRender from '#components/Editor/components/ButtonToggleRender';

import {
    Context,
} from '#services/utilities';


/** internal */
import TransviewContainer from './components/TransviewContainer';
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

const ExtraDrawer: React.FC<FontDrawerProperties> = (
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
            title="Extra"
            expand={drawers.includes('EXTRA')}
            toggleExpand={() => toggleDrawer('EXTRA')}
        >
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
        </Drawer>
    );
}


export default ExtraDrawer;
/** [END] component */
