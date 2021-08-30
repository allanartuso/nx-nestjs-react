export interface AppConfig {
  prod: boolean;
  apiUrl: string;
  wsUrl?: string;
  i18n?: I18nConfig;
  // version: string;
  // buildNumber: string;
  // availableLangs: string[];
  // defaultLang: string;
}

export interface I18nConfig {
  availableLangs: string[];
  defaultLang: string;
  prodMode: boolean;
  reRenderOnLangChange: boolean;
}
