import { IsNumberString } from 'class-validator'

export class DeleteScoreDto {
    @IsNumberString()
    id: number;
}