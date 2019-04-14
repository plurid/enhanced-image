import * as React from 'react';

import './styles.css';



class Popup extends React.Component {
    public state = {
        extensionOn: true,
        loggedIn: true,
    }

    public openOptions = () => {
        chrome.runtime.openOptionsPage();
    }

    public openImages = () => {
        console.log('openImagesRepo');
    }

    public toggleExtension = () => {
        this.setState({
            extensionOn: !this.state.extensionOn
        });
    }

    public render() {
        return (
            <ul className="popup">
                <li className="onOff">
                    <div>
                        Enhanced Image is
                    </div>
                    <div className="onOffButtons">
                        <span
                            className="button onOffButton"
                            onClick={this.toggleExtension}
                        >
                            {this.state.extensionOn ? 'on' : 'off'}
                        </span>
                    </div>
                </li>

                <li className="logged">
                    {this.state.loggedIn && (
                        <>
                            <div className="loggedUser">
                                <div>Logged in as</div>
                                <div className="username">caveljan</div>
                            </div>
                            <div className="button logoutButton">
                                Logout
                            </div>
                        </>
                    )}

                    {!this.state.loggedIn && (
                        <div>
                            <span className="button">
                                Login
                            </span>
                        </div>
                    )}
                </li>

                {this.state.loggedIn && (
                    <li className="available">
                        <ul>
                            <li>1,624 text extractions</li>
                            <li>567 generates</li>
                            <li>984 transviews</li>
                        </ul>
                    </li>
                )}

                {this.state.loggedIn && (
                    <li>
                        <span
                            className="button buttonImages"
                            onClick={this.openImages}
                        >
                            Images
                        </span>
                    </li>
                )}

                <li>
                    <span
                        className="button buttonOptions"
                        onClick={this.openOptions}
                    >
                        Options
                    </span>
                </li>
            </ul>
        );
    }
}

export default Popup;
