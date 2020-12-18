const {
    promises: fs,
} = require('fs');

const {
    Writer,
} = require('../distribution');



const main = async () => {
    {
        const writer = new Writer(
            {
                type: 'jpg',
            },
        );
        const data = await writer.write(
            'eimg.jpg',
        );
        console.log('data', data);
    }

    {
        const writer = new Writer(
            {
                type: 'png',
            },
        );
        const data = await writer.write(
            'eimg.png',
        );
        console.log('data', data);
    }
}


main();
