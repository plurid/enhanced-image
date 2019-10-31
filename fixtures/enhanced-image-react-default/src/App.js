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
                        // theme="night"
                        // apiEndpoint="https://api.plurid.dev/graphql"
                        // apiEndpoint="http://192.168.1.2:3360/graphql"
                        // imageStyle={ { width: '300px' } }
                        transparentUI={true}
                        apiKey="depict_228d11d4cfcf128a17ee61da"
                        // userToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM2NDdjM2E2Yzg1NGQ1ZmJmOTRlYjQ4ZmViMjZjNDkiLCJ1c2VybmFtZSI6ImNhdmVsamFuIn0sImlhdCI6MTU3MjUyNDYxMSwiZXhwIjoxNTcyNTI4MjExLCJpc3MiOiJsb2NhbGhvc3QifQ.chFDZGq5uWKd5nI0Mr1wr-eQxuhhLJEDvNYW2nISf3E"
                        depictImageID=""
                    />
                </div>
            </div>
        );
    }
}


export default App;
