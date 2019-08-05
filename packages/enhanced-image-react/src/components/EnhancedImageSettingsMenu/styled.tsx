import styled from 'styled-components';


const SETTINGS_MENU_TOP = 70;

export const StyledEnhancedImageSettingsMenu: any = styled.div`
    font-family: 'Ubuntu', 'Work Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
        'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;

    box-sizing: border-box;
    opacity: ${(props: any) => {
        if (props.menuOpaque) {
            return 1;
        } else {
            return 0.75;
        }
    }};

    transition: opacity 600ms linear;
    z-index: 9999;

    height: ${(props: any) => {
        const auto = (props.settingsMenuHeight + SETTINGS_MENU_TOP) < props.imageHeight;
        const height = auto ? 'auto' : props.imageHeight - SETTINGS_MENU_TOP + 'px';
        return height;
    }};
    overflow: auto;
    border-radius: 10px;
    margin-top: 10px;

    ul {
        font-family: 'Ubuntu', 'Work Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
            'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;

        background-color: ${props => props.theme.backgroundColorPrimary};
        background: ${props => {
            const { backgroundGradient, backgroundColorPrimary } = props.theme;
            if (backgroundGradient) {
                return backgroundGradient;
            } else {
                return backgroundColorPrimary;
            }
        }};

        box-shadow: 0px 0px 5px 1px hsla(220, 10%, 2%, 0.7);
        min-width: 130px;
        width: 150px;
        display: flex;
        flex-direction: column;
        list-style: none;
        user-select: none;
        border-radius: 10px;
        padding: 0;
        margin: 0;
        font-size: 13px;
        line-height: 1.1;
    }

    ul li {
        line-height: 1.1;
        min-height: 32px;

        font-family: 'Ubuntu', 'Work Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
            'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
    }

    ul li:first-child {
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
    }

    ul li:last-child {
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
    }

    ul li:hover {
        background-color: ${props => props.theme.backgroundColorTertiary};
    }

    hr {
        border: none;
        border-top: 1px solid hsl(220, 2%, 55%);
        margin: 0;
    }
`;
