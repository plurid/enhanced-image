import * as React from 'react';



const popupStyle: any = {
    cursor: 'pointer',
    padding: 20,
    textAlign: 'center',
    userSelect: 'none',
    width: 240,
}

class Popup extends React.Component {
    public openOptions = () => {
        // chrome.runtime.openOptionsPage();
    }

    public render() {
        return (
            <div style={ {...popupStyle} }>
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
