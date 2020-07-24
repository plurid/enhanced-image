export interface ImageEntityPosition {
    x: number;
    y: number;
}

export interface ImageEntityBorder {
    color: string;
    width: number;
}

export interface ImageEntityAction {
    active: boolean;
    type: string;
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
    color: string;
    highlight: string
    border: ImageEntityBorder;
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
}



export type ImageEntityRadialType = 'RADIAL';

export interface ImageEntityRadial extends ImageEntityBase {
    type: ImageEntityRadialType;
    data: ImageEntityRadialData;
}

export interface ImageEntityRadialData extends ImageEntityDataBase {
    radius: number;
}



export type ImageEntityPaintedType = 'PAINTED';

export interface ImageEntityPainted extends ImageEntityBase {
    type: ImageEntityPaintedType;
    data: ImageEntityPaintedData;
}

export interface ImageEntityPaintedData extends ImageEntityDataBase {
    dataURL: string;
    width: number;
    height: number;
}



export type ImageEntityType =
    | ImageEntityRectangularType
    | ImageEntityRadialType
    | ImageEntityPaintedType;


export type ImageEntity =
    | ImageEntityRectangular
    | ImageEntityRadial
    | ImageEntityPainted;
