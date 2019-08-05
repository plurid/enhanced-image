import * as React from 'react';

import Popup from './components/Popup';



class App extends React.Component {
    public render() {
        console.log(location);

        return (
            <div>
                <Popup />
            </div>
        );
    }
}

export default App;
