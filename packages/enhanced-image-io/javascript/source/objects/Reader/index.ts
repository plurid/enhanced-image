// #region imports
    // #region libraries
    import fsSync, {
        promises as fs,
    } from 'fs';

    import stream from 'stream';
    import readline from 'readline';

    import Deon, {
        typer,
    } from '@plurid/deon';
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
            const data = await fs.readFile(
                this.filepath,
            );

            const result = await this.handleFile(data);

            return result;
        } catch (error) {
            throw 'Something went wrong.';
        }
    }

    public async readHeader() {
        try {
            const data: any = await new Promise((resolve, reject) => {
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

                        lines.push(line);

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
                        headerData: Buffer.from(
                            lines.join('\n'),
                        ),
                        lineCount,
                    });
                });

                readliner.on('error', () => {
                    reject();
                });
            });

            if (!data) {
                throw 'Something went wrong reading the file.';
            }

            const {
                headerData,
            } = data;

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
            headerRaw: lines.join('\n'),
            lineCount,
        };
    }

    public async parseHeader(
        data: string,
    ) {
        const deon = new Deon();
        const parsed = await deon.parse(data);
        const typed = typer(parsed);

        return typed;
    }


    private async handleHeader(
        data: Buffer,
    ) {
        const {
            headerRaw,
            lineCount,
        } = this.extractHeader(data.toString());
        const header = await this.parseHeader(headerRaw);

        return {
            header,
            headerRaw,
            headerLines: lineCount,
        };
    }

    private async handleFile(
        data: Buffer,
    ) {
        const {
            header,
            headerRaw,
            headerLines,
        } = await this.handleHeader(data);

        let lineCount = 0;
        let sliceIndex = 0;

        for (const [index, byte] of data.entries()) {
            if (String.fromCharCode(byte) === '\n') {
                lineCount += 1;
            }

            if (lineCount === headerLines) {
                sliceIndex = index + 1;
                break;
            }
        }

        const image = data.slice(sliceIndex);

        return {
            header,
            headerRaw,
            headerLines,
            image,
        };
    }
}
// #endregion module



// #region exports
export default Reader;
// #endregion exports
