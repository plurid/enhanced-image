import React, { Component } from 'react';

import foodImage from './assets/food-vegetables-text.jpg';

import TextSelectImage from '@plurid/text-select-image-react';


export default class App extends Component {
    render () {
        return (
            <div className="app">
                <TextSelectImage
                    src={foodImage}
                    alt="food image"
                />
            </div>
        );
    }
}
