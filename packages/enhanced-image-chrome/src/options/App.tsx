import React from 'react';

import Context from './context';

import Options from './containers/Options';

import themes from '@plurid/apps.utilities.themes';



class App extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            theme: themes.depict,
            setTheme: this.setTheme,
        };
    }

    public render() {
        return (
            <Context.Provider value={this.state}>
                <Options />
            </Context.Provider>
        );
    }

    private setTheme = (theme: string) => {
        this.setState({
            theme: (themes as any)[theme],
        });
    }
}


export default App;
