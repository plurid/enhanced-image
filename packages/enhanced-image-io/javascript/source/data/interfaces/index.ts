// #region module
export type HeaderType = 'deon' | 'json';


export type Header = {
    type: string;
    height: number;
    width: number;
    defaults: Partial<HeaderDefaults>;
    text: Partial<Text>[];
};


export type PartialHeader = Partial<Header>;


export interface HeaderDefaults {
    [key: string]: any;
}


export interface Text {
    [key: string]: any;
}
// #endregion module
