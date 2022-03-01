import { IsString } from "class-validator";

export class FindClassByNameDto{
    @IsString()
    name : string
}