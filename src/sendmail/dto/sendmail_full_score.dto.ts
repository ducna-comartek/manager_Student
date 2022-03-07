import { IsString, IsEmail, Length } from 'class-validator';

export class SendMailFullScore {
    @IsString()
    @Length(10, 100)
    readonly name: string;

    @IsEmail()
    readonly email: string;

    readonly data: Buffer;

}
