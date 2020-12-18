// #region imports
    // #region external
    import Reader from '../';
    // #endregion external
// #endregion imports



// #region module
describe('Reader', () => {
    it('simple - read()', async () => {
        const reader = new Reader('./tests/enhanced-image-from-jpg.eimg');
        const data = await reader.read();

        expect(data.headerLines).toEqual(29);
    });

    it('simple - readHeader()', async () => {
        const reader = new Reader('./tests/enhanced-image-from-jpg.eimg');
        const data = await reader.readHeader();

        expect(data.headerLines).toEqual(29);
    });
});
// #endregion module
