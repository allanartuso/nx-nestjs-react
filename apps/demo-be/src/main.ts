/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { setNestAppConfig } from '@dm/nest/shared/config';
import { authConfig } from './config/auth.config';
import { mailerConfig } from './config/mailer.config';

async function main() {
  await setNestAppConfig({
    mailer: mailerConfig,
    auth: authConfig,
  });

  const app = await import('./bootstrap');
  app.bootstrap();
}

main();
