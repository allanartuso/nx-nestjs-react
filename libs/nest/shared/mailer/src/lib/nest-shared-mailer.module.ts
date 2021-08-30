import { nestAppConfig } from '@dm/nest/shared/config';
import { Module } from '@nestjs/common';
import { MailerService } from './mailer.service';

@Module({
  providers: [MailerService],
  exports: [MailerService],
})
export class NestSharedMailerModule {
  constructor(mailerService: MailerService) {
    mailerService.createTransport(nestAppConfig.mailer());
  }
}
