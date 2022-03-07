import { MailService } from './mail.service';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

@Module({
  providers: [MailService],
  exports: [MailService]
})

export class MailModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
  }
}
