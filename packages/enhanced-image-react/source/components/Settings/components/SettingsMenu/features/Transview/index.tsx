/** [START] imports */
/** libraries */
import React, {
    useContext,
} from 'react';

import {
    universal,
} from '@plurid/plurid-ui-components-react';


/** external */
import {
    Context
} from '#services/utilities';

import {
    transviewAvailableLanguages,
    transviewTargetLanguages,
} from '#data/constants/transview';

import ButtonCheckmark from '../../components/ButtonCheckmark';


/** internal */
import {
    StyledTransview,
    StyledTransviewLanguage,
    StyledTransviewAction,
} from './styled';
/** [END] imports */



/** [START] component */
const {
    inputs: {
        Dropdown: PluridDropdown,
    },
} = universal;

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
/** [END] component */
