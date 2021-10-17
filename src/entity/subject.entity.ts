import { BaseEntity, OneToMany, Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { IsDate, IsString } from 'class-validator';
import {Type} from 'class-transformer';
import {QuizEntity} from './quiz.entity';

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

    @OneToMany(() => QuizEntity, quiz => quiz.subject)
    quizs: QuizEntity[];
}