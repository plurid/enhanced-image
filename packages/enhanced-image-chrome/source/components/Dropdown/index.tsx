import React, {
    useState,
} from 'react';

import {
    StyledDropdown,
    StyledDropdownSelected,
    StyledDropdownList,
} from './styled';



interface DropdownProps {
    selected: string;
    items: any;
    onSelect: any;
    theme: any;
}


const Dropdown: React.FC<DropdownProps> = (props) => {
    const [showList, setShowList] = useState(false);

    const {
        selected,
        items,
        onSelect,
        theme,
    } = props;

    return (
        <StyledDropdown>
            <StyledDropdownSelected
                onClick={() => {
                    setShowList(!showList);
                }}
            >
                {selected}
            </StyledDropdownSelected>

            {showList && (
                <StyledDropdownList
                    theme={theme}
                >
                    <ul>
                        {items.map((item: any) => {
                            return (
                                <li
                                    key={item}
                                    onClick={() => onSelect(item)}
                                    style={{backgroundColor: selected === item ? theme.backgroundColorTertiary : ''}}
                                >
                                    {item}
                                </li>
                            );
                        })}
                    </ul>
                </StyledDropdownList>
            )}
        </StyledDropdown>
    );
}


export default Dropdown;
