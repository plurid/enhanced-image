import uuidv4 from './uuid';



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

        // console.log(previousTextVersion)
        // console.log(currentTextVersion);

        if (previousTextVersion !== currentTextVersion) {
            // console.log('AAAA');
            return true;
        }
        return false;
    }
    return true;
}
