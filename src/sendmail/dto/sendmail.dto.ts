import { IsString, IsEmail, Length, IsNumber } from 'class-validator';

export class SendMailDto {
    @IsString()
    @Length(10, 100)
    readonly name: string;

    @IsEmail()
    readonly email: string;

    @IsString()
    @Length(1, 100)
    readonly subject: string;

    @IsNumber()
    readonly score: number;

    readonly data: Buffer;

}