const environment = {
    local: process.env.MODE_ENV === 'local',
    development: process.env.MODE_ENV === 'development',
    production: process.env.MODE_ENV === 'production',
};


export default environment;
