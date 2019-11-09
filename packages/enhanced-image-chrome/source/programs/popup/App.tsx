import React from 'react';
import themes from '@plurid/plurid-themes';

import Context from './context';

import Popup from './containers/Popup';

import {
    chromeStorage,
} from '../../services/utilities';



class App extends React.Component {
    constructor(props: any) {
        super(props);

        this.state = {
            theme: themes.depict,
        };
    }

    async componentDidMount() {
        const { theme } = await chromeStorage.get('theme');
        if (theme) {
            this.setState({
                theme: (themes as any)[theme],
            });
        }
    }

    public render() {
        return (
            <Context.Provider value={this.state}>
                <Popup />
            </Context.Provider>
        );
    }
}


export default App;
