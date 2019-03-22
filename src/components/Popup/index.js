import React, { Component } from 'react';



const popupStyle = {
    width: 240,
    padding: 20,
    textAlign: 'center',
    cursor: 'pointer',
    userSelect: 'none',
}

class Popup extends Component {
    openOptions = () => {
        chrome.runtime.openOptionsPage(); // eslint-disable-line no-undef
    }

    render() {
        return (
            <div style={popupStyle}>
                Enhanced Image

                <div
                    onClick={this.openOptions}
                >
                    Options
                </div>
            </div>
        );
    }
}

export default Popup;
