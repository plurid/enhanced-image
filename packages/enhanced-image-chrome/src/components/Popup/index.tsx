import * as React from 'react';

import './styles.css';



class Popup extends React.Component {
    public state = {
        extensionOn: true,
        loggedIn: true,
        username: 'caveljan',
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

                <li
                    className={`
                        logged
                        ${this.state.loggedIn ? 'loggedIn' : 'loggedOut'}
                    `}
                >
                    {this.state.loggedIn && (
                        <>
                            <div className="loggedUser">
                                Logged in as&nbsp;
                                <span>
                                    {this.state.username}
                                </span>
                            </div>
                            <div className="logoutButton">
                                <span className="button">
                                    Logout
                                </span>
                            </div>
                        </>
                    )}

                    {!this.state.loggedIn && (
                        <>
                            <div style={ {textAlign: 'left'}}>
                                <span className="button">
                                    Login
                                </span>
                            </div>
                            <div style={ {textAlign: 'right'}}>
                                <span className="button">
                                    Create Account
                                </span>
                            </div>
                        </>
                    )}
                </li>

                {this.state.loggedIn && (
                    <li className="available">
                        <ul>
                            <li>1,624 text extractions</li>
                            <li>567 generates</li>
                            <li>984 transviews</li>
                            <li>
                                <span className="button">
                                    <a
                                        href="https://textselectimage.plurid.com/get-more"
                                        target="_blank"
                                    >
                                        Get More
                                    </a>
                                </span>
                            </li>
                        </ul>
                    </li>
                )}

                {this.state.loggedIn && (
                    <li>
                        <span
                            className="button buttonImages"
                            onClick={this.openImages}
                        >
                            <a
                                href="https://textselectimage.plurid.com/user-images"
                                target="_blank"
                            >
                                Images
                            </a>
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
