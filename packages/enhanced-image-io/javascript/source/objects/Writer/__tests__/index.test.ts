// #region imports
    // #region libraries
    import {
        promises as fs,
    } from 'fs';
    // #endregion libraries


    // #region external
    import Writer from '../';
    // #endregion external
// #endregion imports



// #region module
const header = {
    type: 'png',
    text: [
        {
            id: '1',
            position: {
                x: 10,
                y: 10,
            },
            data: {
                type: 'TEXTLINE',
                content: 'Some text',
            },
        },
        {
            id: '2',
            position: {
                x: 15,
                y: 15,
            },
            data: {
                type: 'TEXTLINE',
                content: 'Some other text',
            },
        },
    ],
};


describe('Writer', () => {
    it('simple - write() jpg.eimg', async () => {
        const image = await fs.readFile('./tests/enhanced-image-text.jpg');

        const writer = new Writer(
            header,
            image,
        );
        const written = await writer.write(
            './tests/jpg.eimg',
        );

        expect(written).toBeTruthy();
    });

    it('simple - write png.eimg', async () => {
        const image = await fs.readFile('./tests/enhanced-image-text.png');

        const writer = new Writer(
            header,
            image,
        );
        const written = await writer.write(
            './tests/png.eimg',
        );

        expect(written).toBeTruthy();
    });
});
// #endregion module
