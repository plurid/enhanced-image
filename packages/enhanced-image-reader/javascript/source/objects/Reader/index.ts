// #region imports
    // #region libraries
    import fsSync, {
        promises as fs,
    } from 'fs';

    import path from 'path';

    import stream from 'stream';
    import readline from 'readline';
    // #endregion libraries


    // #region external
    import {
        HeaderStart,
        HeaderEnd,
        headerAllowedTypes,
    } from '../../data/constants';
    // #endregion external
// #endregion imports



// #region module
class Reader {
    private filepath: string;


    constructor(
        file: string,
    ) {
        this.filepath = path.isAbsolute(file)
            ? file
            : path.join(
                process.cwd(),
                file,
            );
    }


    public async read() {
        try {
            const data = await fs.readFile(this.filepath, 'utf-8');

            const result = this.handleFile(data);

            return result;
        } catch (error) {
            throw 'Something went wrong.';
        }
    }

    public async readHeader() {
        try {
            const data: string = await new Promise((resolve, reject) => {
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

                    resolve(lines.join('\n'));
                });

                readliner.on('error', () => {
                    reject();
                });
            });

            const header = this.handleHeader(data);

            return header;
        } catch (error) {
            throw 'Something went wrong.';
        }
    }

    public extractHeader(
        data: string,
    ) {
        return '';
    }

    public parseHeader(
        data: string,
    ) {
        return {};
    }


    private handleHeader(
        data: string,
    ) {
        const headerData = this.extractHeader(data);
        const header = this.parseHeader(headerData);

        return header;
    }

    private handleFile(
        data: string,
    ) {
        const header = this.handleHeader(data);
        const image = '';

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
