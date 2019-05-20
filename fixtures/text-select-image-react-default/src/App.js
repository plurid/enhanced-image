import React, { Component } from 'react';

import foodImage from './assets/food-vegetables-text.jpg';
// import populationDensityEurope from './assets/population-density-europe.png';

import TextSelectImage from '@plurid/text-select-image-react';



class App extends Component {
    render () {
        return (
            <div className="app">
                <div
                    style={ {width: 800, margin: '150px auto'} }
                >
                    <TextSelectImage
                        theme="night"
                        src={foodImage}
                        about={false}
                    />
                </div>

                <div
                    style={ {width: 800, margin: '150px auto'} }
                >
                    <TextSelectImage
                        theme="dusk"
                        src={foodImage}
                        alt="food image"
                        about={false}

                    />
                </div>

                <div
                    style={ {width: 800, margin: '150px auto'} }
                >
                    <TextSelectImage
                        theme="dawn"
                        src={foodImage}
                        alt="food image"
                        about={false}

                    />
                </div>

                <div
                    style={ {width: 800, margin: '150px auto'} }
                >
                    <TextSelectImage
                        theme="light"
                        src={foodImage}
                        alt="food image"
                        about={false}

                    />
                </div>

                <div
                    style={ {width: 800, margin: '150px auto'} }
                >
                    <TextSelectImage
                        // theme="light"
                        src={foodImage}
                        alt="food image"
                        about={false}
                    />
                </div>
            </div>
        );
    }
}


export default App;
