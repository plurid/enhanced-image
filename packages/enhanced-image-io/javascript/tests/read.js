const {
    promises: fs,
} = require('fs');

const {
    Reader,
} = require('../distribution');



const main = async () => {
    // {
    //     const reader = new Reader('./tests/enhanced-image-from-jpg.eimg');
    //     const data = await reader.read();
    //     // console.log('data', data);

    //     await fs.writeFile(
    //         'eimg.jpg',
    //         data.image,
    //     );
    // }

    {
        const reader = new Reader('./tests/enhanced-image-from-png.eimg');
        const data = await reader.read();
        // console.log('data', data);

        await fs.writeFile(
            'eimg.png',
            data.image,
        );
    }
}


main();
