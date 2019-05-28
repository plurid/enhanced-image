import React, { Component } from 'react';

// import foodImage from './assets/food-vegetables-text.jpg';
import populationDensityEurope from './assets/population-density-europe.png';
// import populationDensityEuropeB from './assets/population-density-europe-b.png';
// import webP from './assets/89d1516a7cf15e086f3cd605a606ce6df78ecc4c3899499cc95a7dca9e30fb4c.webp';
// import image from './assets/image.jpg';

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
                        src={populationDensityEurope}
                        controls={true}
                        apiEndpoint="http://localhost:3360/graphql"
                    />
                </div>

            {
                // <div
                //     style={ {width: 800, margin: '150px auto'} }
                // >
                //     <TextSelectImage
                //         theme="dusk"
                //         src={foodImage}
                //         alt="food image"
                //         about={false}
                //         controls={true}
                //     />
                // </div>

                // <div
                //     style={ {width: 800, margin: '150px auto'} }
                // >
                //     <TextSelectImage
                //         theme="dawn"
                //         src={foodImage}
                //         alt="food image"
                //         about={false}
                //         controls={true}

                //     />
                // </div>

                // <div
                //     style={ {width: 800, margin: '150px auto'} }
                // >
                //     <TextSelectImage
                //         theme="light"
                //         src={foodImage}
                //         alt="food image"
                //         about={false}
                //         controls={true}

                //     />
                // </div>

                // <div
                //     style={ {width: 800, margin: '150px auto'} }
                // >
                //     <TextSelectImage
                //         // theme="light"
                //         src={foodImage}
                //         alt="food image"
                //         about={false}
                //         controls={true}

                //     />
                // </div>
            }
            </div>
        );
    }
}


export default App;
