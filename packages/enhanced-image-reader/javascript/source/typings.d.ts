declare var runner: Runner.runner;


declare namespace Runner {
    export interface RunnerConfiguration<E> {
        expected: E;
        comparison?: RunnerComparison;
        time?: RunnerTime;
        timeless?: boolean;
        name?: string;
        message?: string;

        expect?: (result: E) => void;
    }

    export type RunnerComparison = ':' | '<' | '<:' | '>' | '>:';
    export type RunnerTime = 'instant' | 'fast' | 'network' | 'network-slow' | 'network-fast';


    export type runner = <R>(
        run: () => R | Promise<R>,
        configuration: RunnerConfiguration<R>,
    ) => Promise<void>;
}
