import uuidv4 from './uuid';
import {
    IImageText,
} from '../interfaces/image-text';



export const getVersionById = (id: string, versions: any[]) => {
    const item = versions.filter(version => {
        if (id === version.id) {
            return true;
        }
        return false;
    });

    if (item) {
        return item[0];
    } else {
        return {};
    }
}


export const updateVersion = (imageText: any, version: any) => {
    const {
        currentVersionId,
        versions,
    } = imageText;

    imageText.versions = versions.map((imgTxt: any) => {
        if (imgTxt.id === currentVersionId) {
            const updatedVersion = {...imgTxt, ...version};
            return updatedVersion;
        }
        return imgTxt;
    });

    return imageText;
}


export const pushNewVersion = (imageText: any, version: any) => {
    const versionId = `tsi-text-${uuidv4()}`;

    imageText.currentVersionId = versionId;
    version.id = versionId;
    imageText.versions.push(version);

    return imageText;
}


export const checkDifferentTexts = (
    previousText: any,
    currentText: any
): boolean => {
    if (previousText.currentVersionId === currentText.currentVersionId) {
        const previousTextVersion = getVersionById(
            previousText.currentVersionId,
            previousText.versions
        );
        const currentTextVersion = getVersionById(
            currentText.currentVersionId,
            currentText.versions
        );

        if (previousTextVersion !== currentTextVersion) {
            return true;
        }
        return false;
    }
    return true;
}


export const duplicateTextImage = (
    duplicateId: string,
    imageText: IImageText[],
): IImageText[] => {
    const updatedImageText: IImageText[] = [];

    imageText.map((imgText: IImageText) => {
        updatedImageText.push({ ...imgText });

        if (imgText.id === duplicateId) {
            const duplicateTextId = `tsi-text-${uuidv4()}`;
            const currentVersionId = imgText.currentVersionId;
            const getVersion = getVersionById(currentVersionId, imgText.versions);
            const currentVersion = { ...getVersion };
            const newVersionId = `tsi-version-${uuidv4()}`;
            currentVersion.id = newVersionId;
            if (currentVersion.yCoordPercentage < 80) {
                currentVersion.yCoordPercentage = currentVersion.yCoordPercentage + 12;
            } else {
                currentVersion.yCoordPercentage = currentVersion.yCoordPercentage - 12;
            }
            const versions = [currentVersion];

            const duplicateText = {
                id: duplicateTextId,
                currentVersionId: newVersionId,
                versions,
            };

            updatedImageText.push({ ...duplicateText });
        }
    });

    return updatedImageText;
}
