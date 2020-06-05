import React from 'react';

import {
    StyledItemExtensionOnOff,
} from './styled';

import ButtonSwitch from '../ButtonSwitch';



interface ItemExtensionOnOffProps {
    theme: any;
    extensionOnOff: any;
    setExtensionOnOff: any;
}

const ItemExtensionOnOff: React.FC<ItemExtensionOnOffProps> = (props) => {
    const {
        theme,
        extensionOnOff,
        setExtensionOnOff,
    } = props;

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
