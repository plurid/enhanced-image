import React, { Component } from 'react';

import foodImage from './assets/food-vegetables-text.jpg';
// import populationDensityEurope from './assets/population-density-europe.png';

import EnhancedImage from '@plurid/enhanced-image-react';



class App extends Component {
    render () {
        return (
            <div className="app">
                <div
                    style={ {width: 800, margin: '150px auto'} }
                >
                    <EnhancedImage
                        src={foodImage}
                    />
                </div>
            </div>
        );
    }
}


export default App;
