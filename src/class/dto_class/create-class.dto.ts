import { IsNumber, IsString } from 'class-validator';

export class CreateClassDto {
    @IsNumber()
    readonly id: number;

    @IsString()
    readonly name: string;

    @IsNumber()
    readonly dob: number;

    @IsString()
    readonly teacherName: string;
}

