import * as React from 'react';

import Popup from './components/Popup';



class App extends React.Component {
    public render() {
        console.log(location);

        return (
            <div>
                {/* Enhanced Image */}
                <Popup />
            </div>
        );
    }
}

export default App;
