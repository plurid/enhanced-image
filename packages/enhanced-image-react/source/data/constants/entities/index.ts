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
        position: {
            x: 14,
            y: 14,
        },
        viewable: false,
        action: {
            active: false,
            type: '',
        },
        border: {
            color: '',
            width: 0,
        },
        highlight: '',
        customStyle: '',
        opacity: 1,
        annotation: '',
        labels: [],

        color: 'darkslateblue',
        height: 7,
        width: 14,
    },
};


export const emptyImageEntityRadial: ImageEntityRadial = {
    id: uuid.generate(),
    type: 'RADIAL',
    data: {
        position: {
            x: 14,
            y: 14,
        },
        viewable: false,
        action: {
            active: false,
            type: '',
        },
        border: {
            color: '',
            width: 0,
        },
        highlight: '',
        customStyle: '',
        opacity: 1,
        annotation: '',
        labels: [],

        color: 'darkslateblue',
        radius: 7,
    },
};


export const emptyImageEntityPainted: ImageEntityPainted = {
    id: uuid.generate(),
    type: 'PAINTED',
    data: {
        position: {
            x: 14,
            y: 14,
        },
        viewable: false,
        action: {
            active: false,
            type: '',
        },
        border: {
            color: '',
            width: 0,
        },
        highlight: '',
        customStyle: '',
        opacity: 1,
        annotation: '',
        labels: [],
        dataURL: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAFWElEQVR4Xu3TQQ2AQBDFUEYYdwyhAkPcVxjYaDZvFHTa/LnO5zs2uHfds8EbXogZGAOJFYGTMmAgqRxgagYMpFYET8qAgaRygKkZMJBaETwpAwaSygGmZsBAakXwpAwYSCoHmJoBA6kVwZMyYCCpHGBqBgykVgRPyoCBpHKAqRkwkFoRPCkDBpLKAaZmwEBqRfCkDBhIKgeYmgEDqRXBkzJgIKkcYGoGDKRWBE/KgIGkcoCpGTCQWhE8KQMGksoBpmbAQGpF8KQMGEgqB5iaAQOpFcGTMmAgqRxgagYMpFYET8qAgaRygKkZMJBaETwpAwaSygGmZsBAakXwpAwYSCoHmJoBA6kVwZMyYCCpHGBqBgykVgRPyoCBpHKAqRkwkFoRPCkDBpLKAaZmwEBqRfCkDBhIKgeYmgEDqRXBkzJgIKkcYGoGDKRWBE/KgIGkcoCpGTCQWhE8KQMGksoBpmbAQGpF8KQMGEgqB5iaAQOpFcGTMmAgqRxgagYMpFYET8qAgaRygKkZMJBaETwpAwaSygGmZsBAakXwpAwYSCoHmJoBA6kVwZMyYCCpHGBqBgykVgRPyoCBpHKAqRkwkFoRPCkDBpLKAaZmwEBqRfCkDBhIKgeYmgEDqRXBkzJgIKkcYGoGDKRWBE/KgIGkcoCpGTCQWhE8KQOTogHDQMyAgcSCwGkZMJBWDzQxAwYSCwKnZcBAWj3QxAwYSCwInJYBA2n1QBMzYCCxIHBaBgyk1QNNzICBxILAaRkwkFYPNDEDBhILAqdlwEBaPdDEDBhILAiclgEDafVAEzNgILEgcFoGDKTVA03MgIHEgsBpGTCQVg80MQMGEgsCp2XAQFo90MQMGEgsCJyWAQNp9UATM2AgsSBwWgYMpNUDTcyAgcSCwGkZMJBWDzQxAwYSCwKnZcBAWj3QxAwYSCwInJYBA2n1QBMzYCCxIHBaBgyk1QNNzICBxILAaRkwkFYPNDEDBhILAqdlwEBaPdDEDBhILAiclgEDafVAEzNgILEgcFoGDKTVA03MgIHEgsBpGTCQVg80MQMGEgsCp2XAQFo90MQMGEgsCJyWAQNp9UATM2AgsSBwWgYMpNUDTcyAgcSCwGkZMJBWDzQxAwYSCwKnZcBAWj3QxAwYSCwInJYBA2n1QBMzYCCxIHBaBgyk1QNNzICBxILAaRkwkFYPNDEDBhILAqdlwEBaPdDEDBhILAiclgEDafVAEzNgILEgcFoGDKTVA03MgIHEgsBpGTCQVg80MQMGEgsCp2XAQFo90MQMGEgsCJyWAQNp9UATM2AgsSBwWgYMpNUDTcyAgcSCwGkZMJBWDzQxAwYSCwKnZcBAWj3QxAwYSCwInJYBA2n1QBMzYCCxIHBaBgyk1QNNzICBxILAaRkwkFYPNDEDBhILAqdlwEBaPdDEDBhILAiclgEDafVAEzNgILEgcFoGDKTVA03MgIHEgsBpGTCQVg80MQMGEgsCp2XAQFo90MQMGEgsCJyWAQNp9UATM2AgsSBwWgYMpNUDTcyAgcSCwGkZMJBWDzQxAwYSCwKnZcBAWj3QxAwYSCwInJYBA2n1QBMzYCCxIHBaBgyk1QNNzICBxILAaRkwkFYPNDEDBhILAqdlwEBaPdDEDBhILAiclgEDafVAEzNgILEgcFoGDKTVA03MgIHEgsBpGTCQVg80MQMGEgsCp2XAQFo90MQMGEgsCJyWAQNp9UATM2AgsSBwWgYMpNUDTcyAgcSCwGkZMJBWDzQxAwYSCwKnZcBAWj3QxAwYSCwInJYBA2n1QBMzYCCxIHBaBgyk1QNNzICBxILAaRn4AfLfGNjXpvhUAAAAAElFTkSuQmCC',
    },
};


export const baseEntitiesData = {
    RECTANGULAR: {
        ...emptyImageEntityRectangular.data,
    },
    RADIAL: {
        ...emptyImageEntityRadial.data,
    },
    PAINTED: {
        ...emptyImageEntityPainted.data,
    },
};
