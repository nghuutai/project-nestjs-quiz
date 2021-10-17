import { BaseEntity, BeforeInsert, Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { IsDate, IsString, MaxLength, MinLength } from 'class-validator';
import {Type} from 'class-transformer';

export enum Role {
    User = 'user',
    Admin = 'admin',
}

@Entity('user')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column()
    @MinLength(1)
    @MaxLength(150)
    @IsString()
    public username: string;

    @Column()
    @MinLength(1)
    @IsString()
    public password: string;

    @Column({default: Role.User})
    @IsString()
    public role: string;

    @Column()
    @IsDate()
    @Type(() => Date)
    create_date: Date;
  
    @Column()
    @IsDate()
    @Type(() => Date)
    @UpdateDateColumn()
    modify_date: Date;

    @BeforeInsert()
	public generateDateBeforeInsert(): void {
		this.role = "admin";
	}
}