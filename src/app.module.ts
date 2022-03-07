import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentModule } from './student/student.module';
import { ClassModule } from './class/class.module';
import { ScoreModule } from './score/score.module';
import { SubjectModule } from './subject/subject.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseConfig } from './database.config';
import { config } from './config';
import { MailerModule } from '@nestjs-modules/mailer';
import { TransportType } from '@nestjs-modules/mailer/dist/interfaces/mailer-options.interface';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailModule } from './sendmail/mail.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConfig,
    }),
    ClassModule,
    SubjectModule,
    ScoreModule,
    StudentModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('MAIL_HOST'),
          secure: true,
          requireTLS: true,
          auth: {
            user: configService.get<string>('MAIL_AUTH_USER'),
            pass: configService.get<string>('MAIL_AUTH_PASS'),
          },
        } as TransportType,

        template: {
          dir: './src/templates',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
    MailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
