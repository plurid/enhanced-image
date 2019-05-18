import React, { Component } from 'react';



class TextSelectImage extends Component<any, any> {

    public render() {
        const {
            src,
            alt
        } = this.props;

        return (
            <div>
                <img src={src} alt={alt} height={500} />
            </div>
        )
    }
}


export default TextSelectImage;
