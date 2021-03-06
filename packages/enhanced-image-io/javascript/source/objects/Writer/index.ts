// #region imports
    // #region libraries
    import {
        promises as fs,
    } from 'fs';

    import Deon from '@plurid/deon';
    // #endregion libraries


    // #region external
    import {
        HeaderType,
        PartialHeader,
    } from '#data/interfaces';

    import {
        resolveAbsolutePath,
    } from '#utilities/general';
    // #endregion external
// #endregion imports



// #region module
class Writer {
    private header: PartialHeader;
    private image: Buffer;

    constructor(
        header: PartialHeader,
        image: Buffer,
    ) {
        this.header = header;
        this.image = image;
    }


    /**
     * Writes the enhanced image.
     */
    public async write(
        filepath: string,
        headerType?: HeaderType,
    ) {
        try {
            const header = this.composeHeader(
                headerType || 'deon',
            );

            const headerBuffer = Buffer.from(
                header,
            );

            const bufferList = [
                headerBuffer,
                this.image,
            ];

            const file = Buffer.concat(
                bufferList,
            );

            await fs.writeFile(
                resolveAbsolutePath(filepath),
                file,
            );

            return true;
        } catch (error) {
            return false;
        }
    }

    /**
     * Writes only the header.
     */
    public async writeHeader(
        filepath: string,
        headerType?: HeaderType,
    ) {
        try {
            const header = this.composeHeader(
                headerType || 'deon',
            );

            await fs.writeFile(
                resolveAbsolutePath(filepath),
                header,
            );

            return true;
        } catch (error) {
            return false;
        }
    }

    /**
     * Writes only the image.
     */
    public async writeImage(
        filepath: string,
    ) {
        try {
            await fs.writeFile(
                resolveAbsolutePath(filepath),
                this.image,
            );

            return true;
        } catch (error) {
            return false;
        }
    }


    private composeHeader(
        headerType: HeaderType,
    ) {
        const headerStart = `--- eimg.${headerType}`;
        const headerData = this.resolveHeaderData(headerType);
        const headerEnd = `eimg.${headerType} ---`;

        const header = headerStart
            + '\n'
            + headerData
            + '\n'
            + headerEnd
            + '\n';

        return header;
    }

    private resolveHeaderData(
        headerType: HeaderType,
    ) {
        if (headerType === 'json') {
            return JSON.stringify(this.header);
        }

        const deon = new Deon();
        const headerData = deon.stringify(
            this.header,
            {
                indentation: 0,
            },
        );

        return headerData;
    }
}
// #endregion module



// #region exports
export default Writer;
// #endregion exports
