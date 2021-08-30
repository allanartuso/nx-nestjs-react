export interface NestAppConfig {
  mailer: SgMailerOptions;
  auth: AuthConfig;
}

export interface SgMailerOptions {
  pool?: boolean;
  host: string;
  port: number;
  secure: boolean; // use TLS
  auth: {
    user: string;
    pass: string;
  };
  tls?: {
    // do not fail on invalid certs
    rejectUnauthorized: boolean;
  };
}

export interface AuthConfig {
  appId: string;
  signUp: boolean;
  secret: string;
  signOptions: {
    expiresIn: number;
  };
}
