import { Type } from "class-transformer";
import { IsDate, IsEmail, IsEnum, IsNumber, IsString } from "class-validator";
import { TypeGender } from "../student.entity";

export class CreateStudentDto{
    @IsNumber()
    id : number

    @IsString()
    name : string

    @Type(() => Date)
    @IsDate()
    dob : Date

    @IsEnum({
        MALE : 'Male',
        FEMALE : 'Female',
        OTHER : 'Other'
    })
    gender : TypeGender

    @IsEmail()
    email : string

    @IsNumber()
    class : number
}