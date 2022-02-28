import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsString, IsDate, IsEmail, IsOptional } from 'class-validator';
import { TypeGender } from '../student.entity';


export class UpdateStudentDto{
    @IsNumber()
    readonly id!: number;

    @IsString()
    readonly name?: string;

    @Type(() => Date)
    @IsDate()
    readonly dob?: Date;

    @IsEnum({
        MALE: 'Male',
        FEMALE: 'Female',
        OTHER: 'Other',
    })
    @IsOptional()
    readonly gender?: TypeGender;

    @IsEmail()
    readonly email?: string;

    @IsNumber()
    readonly class?: number;
}