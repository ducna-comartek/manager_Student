import { IsNumberString } from 'class-validator';

export class DeleteSubjectDto {
    @IsNumberString()
    readonly id: number
}