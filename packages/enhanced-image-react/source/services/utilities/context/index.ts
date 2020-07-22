import React from 'react';

import {
    Context as IContext,
} from '../../../data/interfaces';



const Context = React.createContext<IContext | null>(null);


export default Context;
