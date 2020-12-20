// #region module
const cliVersion = '0.0.0-0';


const HeaderStart = new RegExp('^--- eimg\\.(deon|json)$');
const HeaderEnd = new RegExp('^eimg\\.(deon|json) ---$');

const headerAllowedTypes = [
    'deon',
    'json',
];
// #endregion module



// #region exports
export {
    cliVersion,

    HeaderStart,
    HeaderEnd,
    headerAllowedTypes,
};
// #endregion exports
