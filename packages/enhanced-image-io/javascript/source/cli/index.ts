// #region imports
    // #region libraries
    import program, {
        CommanderStatic,
    } from 'commander';
    // #endregion libraries


    // #region external
    import {
        cliVersion,
    } from '#data/constants';

    // import {
    // } from '#commands/index';
    // #endregion external
// #endregion imports



// #region module
const main = async (
    program: CommanderStatic,
) => {
    program
        .storeOptionsAsProperties(false)
        .passCommandToAction(false);

    program
        .name('eimg')
        .usage('<command>')
        .version(cliVersion, '-v, --version')
        .action(() => {
            program.outputHelp();
        });

    program.parseAsync(
        process.argv,
    );
}


const cli = () => {
    main(program);
}
// #endregion module



// #region exports
export default cli;
// #endregion exports
