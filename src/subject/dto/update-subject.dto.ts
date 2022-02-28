import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { TypeStatus } from '../subject.entity';

export class UpdateSubjectDto {
    @IsNumber()
    readonly id!: number;

    @IsString()
    readonly name?: string;

    @IsEnum({
        ONLINE: 'Online',
        OFFLINE: 'Offline'
    })
    @IsOptional()
    readonly type?: TypeStatus
}