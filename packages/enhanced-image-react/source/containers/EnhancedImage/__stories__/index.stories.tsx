import React, {
    useState,
    useEffect,
} from 'react';

// import themes from '@plurid/plurid-themes';

import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';

import {
    withKnobs,
    boolean,
    // number,
    select,
    text,
} from '@storybook/addon-knobs';

import {
    PreloadedData,
} from '../../../data/interfaces';

import EnhancedImage from '../';

// import foodText from '../../../test/assets/food-text.jpg';



// const actions = {
//     // atClick: action('atClick'),
// };

// const themeLabel = 'Theme';
// const computeThemeOptions = () => {
//     const options: any = {};
//     for (const key of Object.keys(themes)) {
//         options[key] = key;
//     }
//     return options;
// }
// const themeOptions = computeThemeOptions();
// const defaultThemeValue = 'plurid';

storiesOf(
    'EnhancedImage',
    module,
)
.addDecorator(withKnobs)
.add('basic', () => {
    // const theme = select(themeLabel, themeOptions, defaultThemeValue);

    const generator = boolean('Generator', true);
    const development = boolean('Development', true);
    const silent = boolean('Silent', false);

    const settingsDrawers = select(
        'Settings Drawers',
        {
            'ALL': 'ALL',
            'TEXT': 'TEXT',
            'TOPOLOGY': 'TOPOLOGY',
            'VARIA': 'VARIA',
            'COLOR': 'COLOR',
        },
        'ALL',
    );

    const ownerToken = text('Owner Token', '');


    /** state */
    const [preloadedData, setPreloadedData] = useState<PreloadedData | undefined>(undefined);


    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await fetch('/assets/eit-_assets_perspective.png.json');
                const body = await response.json();
                const preloadedData: PreloadedData = {
                    imageText: body,
                    imageID: 'one',
                };
                setPreloadedData(preloadedData);
            } catch (error) {
                return;
            }
        }

        loadData();
    }, []);

    return (
        <div
            style={{
                padding: '4rem',
                width: '500px',
            }}
        >
            <EnhancedImage
                src="/assets/perspective.png"
                // {...actions}
                // theme={themes[theme]}

                generator={generator}
                development={development}
                silent={silent}

                ownerToken={ownerToken}

                preloadedData={preloadedData}

                settingsDrawers={[settingsDrawers]}
            />
        </div>
    );
});
