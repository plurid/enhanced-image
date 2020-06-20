import React, {
    useContext,
} from 'react';

import {
    PluridDropdown,
} from '@plurid/plurid-ui-react';

import {
    StyledTransview,
    StyledTransviewLanguage,
    StyledTransviewAction,
} from './styled';

import Context from '../../../../../../services/utilities/context';



const Transview: React.FC<any> = (
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



    /** render */
    return (
        <StyledTransview>
            <StyledTransviewLanguage>
                <div>
                    From
                </div>

                <PluridDropdown
                    selected="English"
                    selectables={[
                        'English',
                        'French',
                        'German',
                        'Romanian',
                    ]}
                    atSelect={() => {}}
                    heightItems={3}
                    width={120}
                />
            </StyledTransviewLanguage>

            <StyledTransviewLanguage>
                <div>
                    To
                </div>

                <PluridDropdown
                    selected="English"
                    selectables={[
                        'English',
                        'French',
                        'German',
                        'Romanian',
                    ]}
                    atSelect={() => {}}
                    heightItems={3}
                    width={120}
                />
            </StyledTransviewLanguage>

            <StyledTransviewAction
                theme={theme}
            >
                Transview
            </StyledTransviewAction>
        </StyledTransview>
    );
}


export default Transview;
