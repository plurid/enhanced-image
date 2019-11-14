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
                        // src={populationDensityEurope}
                        alt="food"
                        apiEndpoint="http://localhost:33600/graphql"
                        transparentUI={true}
                        apiKey="depict_a02d0c48b519"
                        getTextOnLoad={false}
                    />
                </div>
            </div>
        );
    }
}


export default App;
