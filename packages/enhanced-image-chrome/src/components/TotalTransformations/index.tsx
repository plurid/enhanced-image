import React from 'react';



const TotalTransformations: React.FC<any> = (properties) => {
    const {
        imageTransformations,
    } = properties;

    const {
        free,
        paid,
        subscription,
    } = imageTransformations;

    const total = free + paid + subscription;

    return (
        <>
            {total}
        </>
    );
}


export default TotalTransformations;
