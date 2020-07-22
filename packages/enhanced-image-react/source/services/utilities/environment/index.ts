export const environment = {
    local: process.env.ENV_MODE === 'local',
    development: process.env.ENV_MODE === 'development',
    production: process.env.ENV_MODE === 'production',
};
