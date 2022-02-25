import { IsNumberString } from 'class-validator';

export class DeleteClassDto {
    @IsNumberString()
    readonly id: number;
}
