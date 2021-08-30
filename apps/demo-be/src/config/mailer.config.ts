import { SgMailerOptions } from '@dm/nest/shared/config';

export const mailerConfig: SgMailerOptions = {
  host: process.env.MAILER_HOST,
  port: 465,
  secure: true, // use TLS
  auth: {
    user: process.env.MAILER_SENDER,
    pass: process.env.MAILER_SENDER_PWD,
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: true,
  },
};
