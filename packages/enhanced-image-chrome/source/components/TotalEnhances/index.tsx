import React, {
    useState,
} from 'react';

import {
    Theme,
} from '@plurid/plurid-themes';

import {
    StyledTotalEnhances,
    StyledTotalEnhancesAll,
} from './styled';



export interface TotalEnhancesProperties {
    theme: Theme;
    imageEnhances: any;
}

const TotalEnhances: React.FC<TotalEnhancesProperties> = (
    properties,
) => {
    /** properties */
    const {
        theme,
        imageEnhances,
    } = properties;

    const {
        free,
        paid,
        subscription,
    } = imageEnhances;

    const total = free + paid + subscription;

    const items = [
        {
            name: 'free',
            value: free,
        },
        {
            name: 'paid',
            value: paid,
        },
        {
            name: 'subscription',
            value: subscription,
        },
    ];


    /** state */
    const [
        mouseOver,
        setMouseOver,
    ] = useState(false);


    /** render */
    return (
        <StyledTotalEnhances
            onMouseEnter={() => setMouseOver(true)}
            onMouseLeave={() => setMouseOver(false)}
            onMouseMove={() => {!mouseOver ? setMouseOver(true) : null}}
        >
            <div>
                {total}
            </div>

            {mouseOver && (
                <StyledTotalEnhancesAll
                    theme={theme}
                >
                    <ul>
                        {items.map(item => (
                            <li
                                key={item.name}
                            >
                                <div>
                                    {item.name}
                                </div>
                                <div>
                                    {item.value}
                                </div>
                            </li>
                        ))}
                    </ul>
                </StyledTotalEnhancesAll>
            )}
        </StyledTotalEnhances>
    );
}


export default TotalEnhances;
