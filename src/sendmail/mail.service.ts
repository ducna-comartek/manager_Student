import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { SendMailDto } from './dto/sendmail.dto';
import { SendMailFullScore } from './dto/sendmail_full_score.dto';

@Injectable()
export class MailService {
    constructor(
        private readonly mailerService: MailerService
    ) { }

    public async sendMail(sendMailDto: SendMailDto) {
        await this.mailerService.sendMail({
            to: sendMailDto.email,
            subject: 'Bạn có kết quả!', 
            template: 'score',
            attachments: [
                {
                    filename: 'score.xlsx',
                    contentType:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                    content: sendMailDto.data,
                },
            ],
            context: {
                name: sendMailDto.name,
                subject: sendMailDto.subject
            }
        });
    }

    public async sendMailFullScore(sendMailFullScore : SendMailFullScore){
        await this.mailerService.sendMail({
            to: sendMailFullScore.email,
            subject: 'Bảng kết quả học tập',
            template: 'scorefull',
            content: {
                name: sendMailFullScore.name
            },
            attachments: [{
                filename: 'ResultAll.xlsx',
                contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                content: sendMailFullScore.data
            }],
        })
    }
}
