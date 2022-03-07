import { IsNumber } from 'class-validator';
import { Expose } from 'class-transformer';


export class HasScoreDto {
    @Expose({ name: 'studentId' })
    @IsNumber()
    readonly student: number;

    @Expose({ name: 'subjectId' })
    @IsNumber()
    readonly subject: number;
}
