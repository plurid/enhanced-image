import React from 'react';
import themes from '@plurid/apps.utilities.themes';

import Context from './context';

import Options from './containers/Options';

import { chromeStorage } from '../utils';



class App extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            theme: themes.depict,
            setTheme: this.setTheme,
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
                <Options />
            </Context.Provider>
        );
    }

    private setTheme = (theme: string) => {
        chrome.storage.sync.set({theme: theme}, function() {
            console.log('Value is set to ' + theme);
        });

        this.setState({
            theme: (themes as any)[theme],
        });
    }
}


export default App;
