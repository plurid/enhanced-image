/** [START] imports */
/** libraries */
import React, {
    useContext,
} from 'react';


/** external */
import {
    useTransform,
} from '../../services/hooks';

import {
    Context,
} from '../../services/utilities';


/** internal */
import RectangularEntity from './components/Rectangular';
import RadialEntity from './components/Radial';
import PaintedEntity from './components/Painted';

import {
    StyledEntities,
} from './styled';
/** [END] imports */



/** [START] component */
const Entities: React.FC<any> = () => {
    /** context */
    const context = useContext(Context);
    if (!context) {
        return (<></>);
    }

    const {
        imageEntities,

        imageBoxDimensions,
        flipHorizontal,
        flipVertical,
        imageTopologyRotate,
        imageTopologyScale,
        imageCoordinateX,
        imageCoordinateY,
    } = context;


    /** state */
    const transform = useTransform(
        flipVertical,
        flipHorizontal,
        imageTopologyRotate,
        imageTopologyScale,
        imageCoordinateX,
        imageCoordinateY,
    );


    /** render */
    return (
        <StyledEntities
            style={{
                width: imageBoxDimensions.width + 'px',
                height: imageBoxDimensions.height + 'px',
                left: imageBoxDimensions.left + 'px',
                top: imageBoxDimensions.top + 'px',
                transform,
            }}
        >
            {imageEntities.map(entity => {
                switch (entity.type) {
                    case 'RECTANGULAR':
                        return (
                            <RectangularEntity
                                key={entity.id}
                                data={entity}
                            />
                        );
                    case 'RADIAL':
                        return (
                            <RadialEntity
                                key={entity.id}
                                data={entity}
                            />
                        );
                    case 'PAINTED':
                        return (
                            <PaintedEntity
                                key={entity.id}
                                data={entity}
                            />
                        );
                    default:
                        return;
                }
            })}
        </StyledEntities>
    );
}


export default Entities;
/** [END] component */
