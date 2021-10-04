import { Module } from '@nestjs/common';
import {SubjectService} from './subject.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubjectEntity } from 'src/entity/subject.entity';
import { SubjectController } from './subject.controller'

@Module({
    imports: [TypeOrmModule.forFeature([SubjectEntity])],
    controllers: [SubjectController],
    providers: [SubjectService]
})
export class SubjectModule {}
