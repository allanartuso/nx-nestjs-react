import { AuthConfig, NestAppConfig, SgMailerOptions } from './be-config.models';

let applicationConfig: NestAppConfig = {
  mailer: {
    host: 'mail.webnapp.eu',
    port: 465,
    secure: true, // use TLS
    auth: {
      user: 'contato@webnapp.eu',
      pass: 'ux2rTD0$ifsD',
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: true,
    },
  },
  auth: null,
};
let configSet: boolean;

export async function setNestAppConfig(config: Partial<NestAppConfig>): Promise<NestAppConfig> {
  console.log('setConfig', config);

  if (configSet) throw new Error('The app config was already set.');
  configSet = true;

  applicationConfig = {
    ...applicationConfig,
    ...config,
  };

  return applicationConfig;
}

export const nestAppConfig = {
  mailer: (): SgMailerOptions => (applicationConfig ? applicationConfig.mailer : null),
  auth: (): AuthConfig => {
    console.log('getAuthConfig', applicationConfig.auth);

    return applicationConfig ? applicationConfig.auth : null;
  },
};
