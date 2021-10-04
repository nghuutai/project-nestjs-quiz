import { BaseEntity, BeforeInsert, Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { IsDate, IsString, MaxLength, MinLength } from 'class-validator';
import {Type} from 'class-transformer';

@Entity('subject')
export class SubjectEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column()
    @IsString()
    public name: string;

    @Column()
    @IsDate()
    @Type(() => Date)
    create_date: Date;
  
    @Column()
    @IsDate()
    @Type(() => Date)
    @UpdateDateColumn()
    modify_date: Date;
}