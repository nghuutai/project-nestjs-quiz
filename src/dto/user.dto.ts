import {IsString, IsOptional, IsUUID} from 'class-validator';

export class UserDTO {
    @IsUUID()
    @IsOptional()
    public id?: string;

    @IsString()
    public username: string;

    @IsString()
    public password: string;

    @IsString()
    public role: string;
}