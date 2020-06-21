import React, {
    useContext,
    useState,
} from 'react';

import {
    PluridDropdown,
} from '@plurid/plurid-ui-react';

import {
    StyledTransview,
    StyledTransviewLanguage,
    StyledTransviewAction,
} from './styled';

import ButtonCheckmark from '../../components/ButtonCheckmark';

import Context from '../../../../../../services/utilities/context';

import {
    transviewAvailableLanguages,
    transviewTargetLanguages,
} from '../../../../../../data/constants/transview';



const Transview: React.FC<any> = (
    properties,
) => {
    /** context */
    const context = useContext(Context);
    if (!context) {
        return (<></>);
    }

    const {
        transviewActive,
        setTransviewActive,
        transviewSourceLanguage,
        setTransviewSourceLanguage,
        transviewTargetLanguage,
        setTransviewTargetLanguage,
        theme,
    } = context;


    /** render */
    return (
        <StyledTransview>
            <StyledTransviewLanguage>
                <div>
                    From
                </div>

                <PluridDropdown
                    selected={transviewSourceLanguage}
                    selectables={transviewAvailableLanguages}
                    atSelect={(selection) => {
                        if (typeof selection === 'string') {
                            setTransviewSourceLanguage(selection);
                        }
                    }}
                    filterable={true}
                    selectAtHover={false}
                    hideAtSelect={false}
                    heightItems={4}
                    width={120}
                />
            </StyledTransviewLanguage>

            <StyledTransviewLanguage>
                <div>
                    To
                </div>

                <PluridDropdown
                    selected={transviewTargetLanguage}
                    selectables={transviewTargetLanguages}
                    atSelect={(selection) => {
                        if (typeof selection === 'string') {
                            setTransviewTargetLanguage(selection);
                        }
                    }}
                    filterable={true}
                    selectAtHover={false}
                    hideAtSelect={false}
                    heightItems={4}
                    width={120}
                />
            </StyledTransviewLanguage>

            <StyledTransviewAction
                theme={theme}
            >
                <ButtonCheckmark
                    theme={theme}
                    toggle={() => {
                        setTransviewActive(active => !active);
                    }}
                    text="Transview"
                    checked={transviewActive}
                />
            </StyledTransviewAction>
        </StyledTransview>
    );
}


export default Transview;
