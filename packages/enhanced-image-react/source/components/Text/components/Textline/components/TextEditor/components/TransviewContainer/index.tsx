/** [START] imports */
/** libraries */
import React, {
    useState,
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
    PluridDropdown,
} from '@plurid/plurid-ui-react';


/** external */
import {
    transviewTargetLanguages,
} from '../../../../../../../../data/constants/transview';


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
export interface TransviewContainerProperties {
    /** required */
    /** - values */
    theme: Theme;
    transparentUI: boolean;
    /** - methods */

    /** optional */
    /** - values */
    /** - methods */
}

const TransviewContainer: React.FC<TransviewContainerProperties> = (
    properties,
) => {
    /** properties */
    const {
        /** required */
        /** - values */
        theme,
        transparentUI,
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
        activeTransview,
        setActiveTransview,
    ] = useState('');
    const [
        addedLanguages,
        setAddedLanguages,
    ] = useState<string[]>([]);


    /** handle */
    const addLanguage = () => {
        if (selectedLanguage === TRANSVIEW_DEFAULT_SELECT) {
            return;
        }

        const languages = [
            ...addedLanguages
        ];
        languages.push(selectedLanguage);
        setAddedLanguages(languages);
        setSelectedLanguage(TRANSVIEW_DEFAULT_SELECT);
    }

    const removeLanguage = (
        language: string,
    ) => {
        const languages = addedLanguages.filter(addedLanguage => addedLanguage !== language);
        setAddedLanguages(languages);
    }

    const setBackgrounded = (
        language: string,
    ) => {
    }


    /** render */
    return (
        <StyledTransviewContainer
            theme={theme}
            transparentUI={transparentUI}
        >
            <StyledLanguageSelect>
                <PluridDropdown
                    selected={selectedLanguage}
                    selectables={transviewTargetLanguages}
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

            {addedLanguages.map(language => {
                return (
                    <StyledLanguage
                        key={uuid.generate()}
                        theme={theme}
                        active={activeTransview === language}
                    >
                        <StyledLanguageActivate
                            onClick={() => {
                                if (activeTransview === language) {
                                    setActiveTransview('');
                                    return;
                                }

                                setActiveTransview(language);
                            }}
                        >
                            {language}
                        </StyledLanguageActivate>

                        <StyledLanguageButtons>
                            <PluridIconFrame
                                atClick={() => setBackgrounded(language)}
                            />

                            <PluridIconDelete
                                atClick={() => removeLanguage(language)}
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
