/** [START] imports */
/** libraries */
import React, {
    useContext,
    useState,
    useEffect,
} from 'react';

import {
    Theme,
} from '@plurid/plurid-themes';

import {
    uuid,
} from '@plurid/plurid-functions';

import {
    PluridIconAdd,
    PluridIconDelete,
    PluridIconFrame,
} from '@plurid/plurid-icons-react';

import {
    universal,
} from '@plurid/plurid-ui-components-react';


/** external */
import {
    transviewTargetLanguages,
} from '#data/constants/transview';

import {
    TextlineTransview,
} from '#data/interfaces/text';

import {
    Context,
} from '#services/utilities';


/** internal */
import {
    StyledTransviewContainer,
    StyledLanguageSelect,
    StyledLanguage,
    StyledLanguageActivate,
    StyledLanguageButtons,
} from './styled';
/** [END] imports */



const TRANSVIEW_DEFAULT_SELECT = 'Select';

/** [START] component */
const {
    inputs: {
        Dropdown: PluridDropdown,
    },
} = universal;

export interface TransviewContainerProperties {
    /** required */
    /** - values */
    theme: Theme;
    transparentUI: boolean;
    textID: string;
    transview: TextlineTransview;
    /** - methods */

    /** optional */
    /** - values */
    /** - methods */
}

const TransviewContainer: React.FC<TransviewContainerProperties> = (
    properties,
) => {
    /** context */
    const context = useContext(Context);

    if (!context) {
        return (<></>);
    }

    const {
        addTransviewLanguage,
        removeTransviewLanguage,
        setActiveTransview,
        toggleBackgroundedTransview,
    } = context;


    /** properties */
    const {
        /** required */
        /** - values */
        theme,
        transparentUI,
        textID,
        transview,
        /** - methods */

        /** optional */
        /** - values */
        /** - methods */
    } = properties;


    /** state */
    const [
        selectedLanguage,
        setSelectedLanguage,
    ] = useState(TRANSVIEW_DEFAULT_SELECT);
    const [
        selectableLanguages,
        setSelectableLanguages,
    ] = useState(transviewTargetLanguages);


    /** handle */
    const addLanguage = () => {
        if (selectedLanguage === TRANSVIEW_DEFAULT_SELECT) {
            return;
        }

        addTransviewLanguage(textID, selectedLanguage);
        setSelectedLanguage(TRANSVIEW_DEFAULT_SELECT);
    }


    /** effects */
    useEffect(() => {
        const transviewLanguages = transview.data.map(
            data => data.language
        );

        const languages = transviewTargetLanguages.filter(
            language => !transviewLanguages.includes(language)
        );

        setSelectableLanguages(languages);
    }, [
        transview.data,
        transview.data.length,
    ]);


    /** render */
    return (
        <StyledTransviewContainer
            theme={theme}
            transparentUI={transparentUI}
        >
            <StyledLanguageSelect>
                <PluridDropdown
                    selected={selectedLanguage}
                    selectables={selectableLanguages}
                    atSelect={(selection) => {
                        if (typeof selection === 'string') {
                            setSelectedLanguage(selection);
                        }
                    }}
                    filterable={true}
                    selectAtHover={false}
                    heightItems={4}
                    width={120}
                    left={true}
                />

                {selectedLanguage !== TRANSVIEW_DEFAULT_SELECT && (
                    <PluridIconAdd
                        atClick={() => addLanguage()}
                    />
                )}
            </StyledLanguageSelect>

            {transview.data.map(data => {
                const {
                    backgrounded,
                    language,
                } = data;

                return (
                    <StyledLanguage
                        key={uuid.generate()}
                        theme={theme}
                        active={transview.active === language}
                    >
                        <StyledLanguageActivate
                            onClick={() => {
                                if (transview.active === language) {
                                    setActiveTransview(textID, 'SOURCE');
                                    return;
                                }

                                setActiveTransview(textID, language);
                            }}
                        >
                            {language}
                        </StyledLanguageActivate>

                        <StyledLanguageButtons>
                            <PluridIconFrame
                                atClick={() => toggleBackgroundedTransview(textID, language)}
                                opacity={backgrounded ? 1 : 0.3}
                            />

                            <PluridIconDelete
                                atClick={() => {
                                    if (transview.active === language) {
                                        setActiveTransview(textID, 'SOURCE');
                                    }

                                    removeTransviewLanguage(textID, language);
                                }}
                            />
                        </StyledLanguageButtons>
                    </StyledLanguage>
                );
            })}
        </StyledTransviewContainer>
    );
}


export default TransviewContainer;
/** [END] component */
