const currentEnvironment: any = process.env.ENV_MODE;

export const environment = {
    local: currentEnvironment === 'local',
    development: currentEnvironment === 'development',
    production: currentEnvironment === 'production',
};
