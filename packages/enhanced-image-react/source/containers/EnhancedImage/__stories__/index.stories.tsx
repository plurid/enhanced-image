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

import {
    ENHANCED_IMAGE_ACTION,
} from '../../../data/constants';

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
    const textDrawer = select(
        'Text Drawer',
        {
            'ALL': 'ALL',
            'REVEAL_TEXT': 'REVEAL_TEXT',
            'GET_TEXT': 'GET_TEXT',
            'EXTRACT_TEXT': 'EXTRACT_TEXT',
            'TRANSVIEW_TEXT': 'TRANSVIEW_TEXT',
        },
        'ALL',
    );
    const variaDrawer = select(
        'Varia Drawer',
        {
            'ALL': 'ALL',
            'VIEW_FULLSCREEN': 'VIEW_FULLSCREEN',
            'SHARE_IMAGE': 'SHARE_IMAGE',
            'DOWNLOAD_IMAGE': 'DOWNLOAD_IMAGE',
        },
        'ALL',
    );

    const ownerToken = text('Owner Token', '');


    /** state */
    const [preloadedData, setPreloadedData] = useState<PreloadedData | undefined>(undefined);


    /** effects */
    /** Load data. */
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

    /** Handle action. */
    useEffect(() => {
        const handleAction = (
            event?: any,
        ) => {
            console.log(event.detail);
        }

        window.addEventListener(ENHANCED_IMAGE_ACTION, handleAction);

        return () => {
            window.removeEventListener(ENHANCED_IMAGE_ACTION, handleAction);
        };
    }, []);


    /** render */
    return (
        <div
            style={{
                padding: '4rem',
                // width: '500px',
            }}
        >
            <EnhancedImage
                // src="/assets/food-text.jpg"
                // src="/assets/perspective.png"
                // src="/assets/screenshot.png"
                src="/assets/transview-initial.jpg"
                // {...actions}
                // theme={themes[theme]}

                generator={generator}
                development={development}
                silent={silent}


                ownerToken={ownerToken}

                // preloadedData={preloadedData}

                settingsDrawers={[settingsDrawers]}
                textDrawer={[textDrawer]}
                variaDrawer={[variaDrawer]}
            />
        </div>
    );
});
