import React, {
    useContext,
} from 'react';

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
                from
            </StyledTransviewLanguage>

            <StyledTransviewLanguage>
                to
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
