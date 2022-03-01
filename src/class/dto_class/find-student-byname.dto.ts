import { IsString, Length } from "class-validator";

export class FindStudentInfoByNameDto{
    @IsString()
    @Length(1,50)
    name : string
}