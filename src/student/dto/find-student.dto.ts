import { IsNumber, IsString } from "class-validator"

export class FindStudentDto{
    @IsNumber()
    id : number

    @IsString()
    name : string
        
}