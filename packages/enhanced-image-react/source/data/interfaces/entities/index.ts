export interface ImageEntityAction {
    active: boolean;
    type: string;
}


export interface ImageEntityPosition {
    x: number;
    y: number;
}

export interface ImageEntityLabel {
    confidence: number;
    name: string;
}



export interface ImageEntityBase {
    id: string;
    type: ImageEntityType;
}

export interface ImageEntityDataBase {
    position: ImageEntityPosition;
    viewable: boolean;
    action: ImageEntityAction;
    customStyle: string;
    opacity: number;
    annotation: string;
    labels: ImageEntityLabel[];
}



export type ImageEntityRectangularType = 'RECTANGULAR';

export interface ImageEntityRectangular extends ImageEntityBase {
    type: ImageEntityRectangularType;
    data: ImageEntityRectangularData;
}

export interface ImageEntityRectangularData extends ImageEntityDataBase {
    width: number;
    height: number;
    color: string;
    border: string;
}



export type ImageEntityRadialType = 'RADIAL';

export interface ImageEntityRadial extends ImageEntityBase {
    type: ImageEntityRadialType;
    data: ImageEntityRadialData;
}

export interface ImageEntityRadialData extends ImageEntityDataBase {
    radius: number;
    color: string;
    border: string;
}



export type ImageEntityPaintedType = 'PAINTED';

export interface ImageEntityPainted extends ImageEntityBase {
    type: ImageEntityPaintedType;
    data: ImageEntityPaintedData;
}

export interface ImageEntityPaintedData extends ImageEntityDataBase {
    dataURL: string;
}



export type ImageEntityType =
    | ImageEntityRectangularType
    | ImageEntityRadialType
    | ImageEntityPaintedType;


export type ImageEntity =
    | ImageEntityRectangular
    | ImageEntityRadial
    | ImageEntityPainted;
