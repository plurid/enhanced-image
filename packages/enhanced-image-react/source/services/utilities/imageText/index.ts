import {
    ImageText,
    ImageTextVersionTextline,
    ImageTextVersionTextarea,
} from '../../../data/interfaces';



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
