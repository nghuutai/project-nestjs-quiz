import {IsString, IsOptional, IsUUID} from 'class-validator';

export class SubjectDTO {
    @IsUUID()
    @IsOptional()
    public id?: string;

    @IsString()
    public name: string;
}