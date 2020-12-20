// #region imports
    // #region external
    import Reader from '#objects/Reader';
    // #endregion external
// #endregion imports



// #region module
const loadEnhancedImage = async (
    filepath: string,
) =>  {
    const reader = new Reader(filepath);
    const data = await reader.read();

    return data;
}
// #endregion module



// #region exports
export {
    loadEnhancedImage,
};
// #endregion exports
