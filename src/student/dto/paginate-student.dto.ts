import { IsEnum, IsNumber, IsString } from "class-validator";

export class PaginateDto {
    @IsNumber()
    limit : number

    @IsNumber()
    offset : number

    @IsEnum({
        GOOD: 'Good',
        MEDIUM: 'Medium',
        BAD: 'Bad'
    })
    typeOf : string
}