import React, { Component } from 'react';

import foodImage from './assets/food-vegetables-text.jpg';
// import catsImage from './assets/cats.jpg';
// import imagePurpose from './assets/image-purpose.jpg';
// import img from './assets/img.png';
// import img2 from './assets/img2.jpg';
// import imageBlack from './assets/image-black.jpg';
// import populationDensityEurope from './assets/population-density-europe.png';
// import populationDensityEuropeB from './assets/population-density-europe-b.png';
// import webP from './assets/89d1516a7cf15e086f3cd605a606ce6df78ecc4c3899499cc95a7dca9e30fb4c.webp';
// import image from './assets/image.jpg';

import TextSelectImage from '@plurid/text-select-image-react';



class App extends Component {
    render () {
        return (
            <div className="app">
                <div
                    style={ {width: 600, height: 500, margin: '150px auto'} }
                >
                    <TextSelectImage
                        theme="depict"
                        src={foodImage}
                        // src={imagePurpose}
                        controls={true}
                        // getTextOnLoad={true}
                        // depictImageID="b08fb57bbaf34157bffaf14147ba7efbf12a00e9b48e4ee4953abfe1d463dd66"
                        depictImageID="891a3dce43a24665a6cc6ac5b7b48bf5b6ab38ab7fb54303ad03f94b31b18a32"
                        // apiEndpoint="http://192.168.1.2:33600/graphql"
                        apiEndpoint="http://localhost:33600/graphql"
                        // apiEndpoint="http://localhost:33600/graphql"
                        // apiEndpoint="https://api.plurid.com/graphql"
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
