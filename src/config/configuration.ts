import { Configuration } from '../interfaces/configuration.interface';

export default (): Configuration =>
  ({
    // Default Sandbox
    [process.env.NODE_ENV]: {
      saasUrl: process.env.SAAS_URL || 'https://api.sandbox-unumid.org/',
      logLevel: process.env.LOG_LEVEL || 'debug',
      port: parseInt(process.env.PORT) || 4100
    },
    development: {
      saasUrl: process.env.SAAS_URL || 'https://api.dev-unumid.org/',
      logLevel: process.env.LOG_LEVEL || 'debug',
      port: parseInt(process.env.PORT) || 4100
    },
    production: {
      saasUrl: process.env.SAAS_URL || 'https://api.unumid.org/',
      logLevel: process.env.LOG_LEVEL || 'info',
      port: parseInt(process.env.PORT) || 4100
    },
    local: {
      saasUrl: process.env.SAAS_URL || 'http://localhost:3030/',
      logLevel: process.env.LOG_LEVEL || 'debug',
      port: parseInt(process.env.PORT) || 4100
    }
  }[process.env.NODE_ENV]);
