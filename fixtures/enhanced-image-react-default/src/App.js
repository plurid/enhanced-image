import React, { Component } from 'react';

import foodImage from './assets/food-vegetables-text.jpg';
// import populationDensityEurope from './assets/population-density-europe.png';

import EnhancedImage from '@plurid/enhanced-image-react';



class App extends Component {
    render () {
        return (
            <div className="app">
                <div
                    style={ {width: 900, margin: '150px auto'} }
                >
                    <EnhancedImage
                        src={foodImage}
                        alt="food"
                        theme="depict"
                        about={false}
                        apiEndpoint="http://192.168.1.2:33600/graphql"
                        // apiEndpoint="https://api.plurid.dev/graphql"
                        // textFunctions={false}
                    />
                </div>
            </div>
        );
    }
}


export default App;
