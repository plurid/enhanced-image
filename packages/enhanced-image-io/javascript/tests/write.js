const {
    promises: fs,
} = require('fs');

const {
    Writer,
} = require('../distribution');



const header = {
    "type": "png",
    "text": [
        {
            "id": "1",
            "position": {
                "x": "10",
                "y": "10"
            },
            "data": {
                "type": "TEXTLINE",
                "content": "Some text"
            }
        },
        {
            "id": "2",
            "position": {
                "x": "15",
                "y": "15"
            },
            "data": {
                "type": "TEXTLINE",
                "content": "Some other text"
            }
        }
    ]
};


const main = async () => {
    {
        const image = await fs.readFile('./tests/enhanced-image-text.jpg');

        const writer = new Writer(
            header,
            image,
        );
        const data = await writer.write(
            'jpg.eimg',
        );
        console.log('data', data);
    }

    {
        const image = await fs.readFile('./tests/enhanced-image-text.png');

        const writer = new Writer(
            header,
            image,
        );
        const data = await writer.write(
            'png.eimg',
        );
        console.log('data', data);
    }
}


main();
