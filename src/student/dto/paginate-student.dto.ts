import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";

export class PaginateDto {
    @IsNumber()
    limit : number

    @IsNumber()
    offset : number

    @IsOptional()
    @IsEnum({
        GOOD: 'Good',
        MEDIUM: 'Medium',
        BAD: 'Bad'
    })
    typeOf : string
}