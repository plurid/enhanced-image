import React, {
    useState,
} from 'react';

import {
    StyledTotalTransformations,
    StyledTotalTransformationsAll,
} from './styled';



interface TotalTransformationsProperties {
    theme: any;
    imageTransformations: any;
}


const TotalTransformations: React.FC<TotalTransformationsProperties> = (properties) => {
    const [mouseOver, setMouseOver] = useState(false);

    const {
        theme,
        imageTransformations,
    } = properties;

    const {
        free,
        paid,
        subscription,
    } = imageTransformations;

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

    return (
        <StyledTotalTransformations
            onMouseEnter={() => setMouseOver(true)}
            onMouseLeave={() => setMouseOver(false)}
            onMouseMove={() => {!mouseOver ? setMouseOver(true) : null}}
        >
            <div>
                {total}
            </div>

            {mouseOver && (
                <StyledTotalTransformationsAll
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
                </StyledTotalTransformationsAll>
            )}
        </StyledTotalTransformations>
    );
}


export default TotalTransformations;
