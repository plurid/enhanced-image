// #region module
const HeaderStart = new RegExp('^--- eimg\\.(deon|json)$');
const HeaderEnd = new RegExp('^eimg\\.(deon|json) ---$');

const headerAllowedTypes = [
    'deon',
    'json',
];
// #endregion module



// #region exports
export {
    HeaderStart,
    HeaderEnd,
    headerAllowedTypes,
};
// #endregion exports
