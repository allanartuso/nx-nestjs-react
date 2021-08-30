import { AppConfig } from './application-config.model';

let applicationConfig: AppConfig = {
  prod: false,
  apiUrl: '',
  wsUrl: '',
  i18n: undefined,
};
let configSet: boolean;

export async function setAppConfig(config: AppConfig): Promise<AppConfig> {
  if (configSet) throw new Error('The app config was already set.');
  configSet = true;

  applicationConfig = config;

  return applicationConfig;
}

export const appConfig = {
  getIsProd: () => applicationConfig?.prod,
  apiUrl: () => applicationConfig?.apiUrl,
  wsUrl: () => applicationConfig?.wsUrl,
  i18n: () => applicationConfig?.i18n,
};
