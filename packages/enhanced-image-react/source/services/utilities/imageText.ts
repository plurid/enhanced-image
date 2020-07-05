// import uuidv4 from './uuid';

import {
    ImageText,
    ImageTextVersionTextline,
    ImageTextVersionTextarea,
} from '../../data/interfaces';



export const getImmutableTextline = (
    item: ImageTextVersionTextline,
) => {
    const textline: ImageTextVersionTextline = {
        ...item,
        position: {
            ...item.position,
        },
        transform: {
            ...item.transform,
        },
        font: {
            ...item.font,
        },
        link: {
            ...item.link,
        },
        action: {
            ...item.action,
        },
        transview: {
            ...item.transview,
            data: [
                ...item.transview.data,
            ],
        },
    };

    return textline;
}


export const getImmutableTextarea = (
    item: ImageTextVersionTextarea,
) => {
    const textarea: ImageTextVersionTextarea = {
        ...item,
        position: {
            ...item.position,
        },
        transform: {
            ...item.transform,
        },
    };

    return textarea;
}


export const getVersionById = (
    imageText: ImageText,
) => {
    const {
        currentVersionId,
        versions,
    } = imageText;

    const item = versions.find(version => version.id === currentVersionId);

    if (!item) {
        return;
    }

    if (item.type === 'TEXTLINE') {
        return getImmutableTextline(item);
    }

    return getImmutableTextarea(item);
}


export const updateVersion = (
    imageText: ImageText,
    version: ImageTextVersionTextline | ImageTextVersionTextarea,
): ImageText => {
    const {
        id,
    } = version;

    const updatedVersions = imageText.versions.map((
        versionData: ImageTextVersionTextline | ImageTextVersionTextarea
    ) => {
        if (versionData.id === id) {
            const updatedVersion: ImageTextVersionTextline | ImageTextVersionTextarea = {
                ...version,
            };
            return updatedVersion;
        }
        return versionData;
    });

    imageText.versions = [
        ...updatedVersions,
    ];

    return imageText;
}


export const imageURLFromSrc = (
    src: string,
) => {
    if (src[0] === '/') {
        return location.origin + src;
    }

    return src;
}


// export const pushNewVersion = (imageText: any, version: any) => {
//     const versionId = `tsi-text-${uuidv4()}`;

//     imageText.currentVersionId = versionId;
//     version.id = versionId;
//     imageText.versions.push(version);

//     return imageText;
// }


// export const checkDifferentTexts = (
//     previousText: any,
//     currentText: any
// ): boolean => {
//     if (previousText.currentVersionId === currentText.currentVersionId) {
//         const previousTextVersion = getVersionById(
//             previousText.currentVersionId,
//             previousText.versions
//         );
//         const currentTextVersion = getVersionById(
//             currentText.currentVersionId,
//             currentText.versions
//         );

//         if (previousTextVersion !== currentTextVersion) {
//             return true;
//         }
//         return false;
//     }
//     return true;
// }


// export const duplicateTextVideo = (
//     duplicateId: string,
//     imageText: IVideoText[],
// ): IVideoText[] => {
//     const updatedVideoText: IVideoText[] = [];

//     imageText.map((imgText: IVideoText) => {
//         updatedVideoText.push({ ...imgText });

//         if (imgText.id === duplicateId) {
//             const duplicateTextId = `tsi-text-${uuidv4()}`;
//             const currentVersionId = imgText.currentVersionId;
//             const getVersion = getVersionById(currentVersionId, imgText.versions);
//             const currentVersion = { ...getVersion };
//             const newVersionId = `tsi-version-${uuidv4()}`;
//             currentVersion.id = newVersionId;
//             if (currentVersion.yCoordPercentage < 80) {
//                 currentVersion.yCoordPercentage = currentVersion.yCoordPercentage + 12;
//             } else {
//                 currentVersion.yCoordPercentage = currentVersion.yCoordPercentage - 12;
//             }
//             const versions = [currentVersion];

//             const duplicateText = {
//                 id: duplicateTextId,
//                 currentVersionId: newVersionId,
//                 versions,
//             };

//             updatedVideoText.push({ ...duplicateText });
//         }
//     });

//     return updatedVideoText;
// }
