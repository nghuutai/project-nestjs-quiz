import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { IsDate, IsString, IsJSON } from 'class-validator';
import {Type} from 'class-transformer';
import { SubjectEntity } from './subject.entity';

@Entity('quiz')
export class QuizEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column()
    @IsString()
    public subjectId: string;

    @Column()
    @IsString()
    public question: string;

    @Column()
    @IsString()
    public correct_answer: string;

    @Column()
    @IsJSON()
    public incorrect_answer: string;

    @Column()
    @IsDate()
    @Type(() => Date)
    create_date: Date;
  
    @Column()
    @IsDate()
    @Type(() => Date)
    @UpdateDateColumn()
    modify_date: Date;

    @ManyToOne(() => SubjectEntity, user => user.quizs)
    subject: SubjectEntity;
}