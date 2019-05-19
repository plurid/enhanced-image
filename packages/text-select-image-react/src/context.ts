import React from 'react';

import themes from './data/themes';
import { DEFAULT_THEME } from './data/constants';



export interface IContext {
    about?: boolean;
    controls?: boolean;
    theme: any;
    toggleSettings: () => void;
    toggledSettings: boolean;
    toggleEditable: () => void,
    toggledEditable: boolean,
    selectText: any;
}

const initialContext = {
    about: true,
    theme: themes[DEFAULT_THEME],
    themeName: DEFAULT_THEME,
    controls: false,
    toggleSettings: () => {},
    toggledSettings: false,
    toggleEditable: () => {},
    toggledEditable: false,
    selectText: null,
}


const Context = React.createContext<Partial<IContext>>(initialContext);


export default Context;
