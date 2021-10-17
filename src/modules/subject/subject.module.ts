import { Module } from '@nestjs/common';
import {SubjectService} from './subject.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubjectEntity } from 'src/entity/subject.entity';
import { SubjectController } from './subject.controller'
import {QuizService} from '../quiz/quiz.service';
import { QuizEntity } from 'src/entity/quiz.entity';

@Module({
    imports: [TypeOrmModule.forFeature([SubjectEntity, QuizEntity])],
    controllers: [SubjectController],
    providers: [SubjectService, QuizService]
})
export class SubjectModule {}
