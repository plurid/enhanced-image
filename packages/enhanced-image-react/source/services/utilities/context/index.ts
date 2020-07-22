import React from 'react';

import {
    Context as IContext,
} from '../../../data/interfaces';



export const Context = React.createContext<IContext | null>(null);
