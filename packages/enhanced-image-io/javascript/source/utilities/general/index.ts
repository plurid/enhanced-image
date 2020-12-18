// #region imports
    // #region libraries
    import path from 'path';
    // #endregion libraries
// #endregion imports



// #region module
const resolveAbsolutePath = (
    filepath: string,
) => {
    const absoluteFilepath = path.isAbsolute(filepath)
        ? filepath
        : path.join(
            process.cwd(),
            filepath,
        );

    return absoluteFilepath;
}
// #endregion module



// #region exports
export {
    resolveAbsolutePath,
};
// #endregion exports
