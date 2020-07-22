import {
    uuid,
} from '@plurid/plurid-functions';

import {
    ImageEntityRectangular,
    ImageEntityRadial,
    ImageEntityPainted,
} from '../../interfaces';



export const emptyImageEntityRectangular: ImageEntityRectangular = {
    id: uuid.generate(),
    type: 'RECTANGULAR',
    data: {
        color: 'black',
        height: 7,
        width: 7,
        position: {
            x: 14,
            y: 14,
        },
        viewable: false,
        action: {
            active: false,
            type: '',
        },
        customStyle: '',
    },
};


export const emptyImageEntityRadial: ImageEntityRadial = {
    id: uuid.generate(),
    type: 'RADIAL',
    data: {
        color: 'black',
        radius: 7,
        position: {
            x: 14,
            y: 14,
        },
        viewable: false,
        action: {
            active: false,
            type: '',
        },
        customStyle: '',
    },
};


export const emptyImageEntityPainted: ImageEntityPainted = {
    id: uuid.generate(),
    type: 'PAINTED',
    data: {
        dataURL: '',
        position: {
            x: 14,
            y: 14,
        },
        viewable: false,
        action: {
            active: false,
            type: '',
        },
        customStyle: '',
    },
};
