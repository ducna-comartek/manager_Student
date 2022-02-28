import { IsNumberString } from 'class-validator';

export class DeleteStudentDto {
    @IsNumberString()
    readonly id: number;
}
