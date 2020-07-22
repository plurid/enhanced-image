import React from 'react';

import {
    Theme,
} from '@plurid/plurid-themes';

import ButtonSwitch from '../ButtonSwitch';

import {
    StyledItemExtensionOnOff,
} from './styled';



export interface ItemExtensionOnOffProperties {
    theme: Theme;
    extensionOnOff: any;
    setExtensionOnOff: any;
}

const ItemExtensionOnOff: React.FC<ItemExtensionOnOffProperties> = (
    properties,
) => {
    /** properties */
    const {
        theme,
        extensionOnOff,
        setExtensionOnOff,
    } = properties;


    /** render */
    return (
        <StyledItemExtensionOnOff
            theme={theme}
        >
            <div>
                enhanced image is {extensionOnOff ? 'on' : 'off'}
            </div>

            <ButtonSwitch
                checked={extensionOnOff}
                toggle={setExtensionOnOff}
                theme={theme}
            />
        </StyledItemExtensionOnOff>
    );
}


export default ItemExtensionOnOff;
