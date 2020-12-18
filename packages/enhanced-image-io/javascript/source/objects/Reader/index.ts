// #region imports
    // #region libraries
    import fsSync, {
        promises as fs,
    } from 'fs';

    import stream from 'stream';
    import readline from 'readline';

    import Deon from '@plurid/deon';
    // #endregion libraries


    // #region external
    import {
        HeaderStart,
        HeaderEnd,
        headerAllowedTypes,
    } from '#data/constants';

    import {
        resolveAbsolutePath,
    } from '#utilities/general';
    // #endregion external
// #endregion imports



// #region module
class Reader {
    private filepath: string;


    constructor(
        file: string,
    ) {
        this.filepath = resolveAbsolutePath(file);
    }


    public async read() {
        try {
            console.log('this.filepath', this.filepath);
            // const data = await fs.readFile(this.filepath, 'utf-8');
            // console.log('data', data);

            // const result = await this.handleFile(data);

            // return result;
        } catch (error) {
            throw 'Something went wrong.';
        }
    }

    public async readHeader() {
        try {
            const {
                headerData,
            }: any = await new Promise((resolve, reject) => {
                const instream = fsSync.createReadStream(this.filepath);
                const outstream = new stream.Writable();

                const readliner = readline.createInterface(instream, outstream);

                let headerStart = false;
                let headerEnd = false;
                let headerStartType = '';
                let headerEndType = '';
                let lineCount = 0;

                const lines: string[] = [];

                readliner.on('line', (line) => {
                    lineCount += 1;

                    const headerStartMatch = line.match(HeaderStart);
                    if (
                        !headerStart
                        && headerStartMatch
                    ) {
                        headerStart = true;
                        headerStartType = headerStartMatch[1];
                    }

                    const headerEndMatch = line.match(HeaderEnd);
                    if (
                        !headerEnd
                        && headerEndMatch
                    ) {
                        headerEnd = true;
                        headerEndType = headerEndMatch[1];

                        readliner.emit('close');
                    }

                    if (headerStart) {
                        lines.push(line);
                    }
                });

                readliner.on('close', () => {
                    if (
                        headerStartType !== headerEndType
                        || !headerAllowedTypes.includes(headerStartType)
                    ) {
                        reject('Header type error.');
                    }

                    resolve({
                        headerData: lines.join('\n'),
                        lineCount,
                    });
                });

                readliner.on('error', () => {
                    reject();
                });
            });

            const header = await this.handleHeader(headerData);

            return header;
        } catch (error) {
            throw 'Something went wrong.';
        }
    }

    public extractHeader(
        data: string,
    ) {
        const lines: string[] = [];

        let headerStart = false;
        let headerEnd = false;
        let headerStartType = '';
        let headerEndType = '';
        let lineCount = 0;

        for (const line of data.split('\n')) {
            lineCount += 1;

            const headerStartMatch = line.match(HeaderStart);
            if (
                !headerStart
                && headerStartMatch
            ) {
                headerStart = true;
                headerStartType = headerStartMatch[1];

                continue;
            }

            const headerEndMatch = line.match(HeaderEnd);
            if (
                !headerEnd
                && headerEndMatch
            ) {
                headerEnd = true;
                headerEndType = headerEndMatch[1];

                break;
            }

            if (headerStart) {
                lines.push(line);
            }
        }

        if (
            headerStartType !== headerEndType
            || !headerAllowedTypes.includes(headerStartType)
        ) {
            throw 'Header type error.';
        }

        return {
            headerData: lines.join('\n'),
            lineCount,
        };
    }

    public async parseHeader(
        data: string,
    ) {
        const deon = new Deon();
        const parsed = await deon.parse(data);

        return parsed;
    }


    private async handleHeader(
        data: string,
    ) {
        const {
            headerData,
            lineCount,
        } = this.extractHeader(data);
        const header = await this.parseHeader(headerData);

        return {
            header,
            headerLines: lineCount,
        };
    }

    private async handleFile(
        data: string,
    ) {
        const {
            header,
            headerLines,
        } = await this.handleHeader(data);

        const lines = data.split('\n');
        const image = lines
            .slice(0, headerLines)
            .join('\n');

        return {
            header,
            image,
        };
    }
}
// #endregion module



// #region exports
export default Reader;
// #endregion exports
