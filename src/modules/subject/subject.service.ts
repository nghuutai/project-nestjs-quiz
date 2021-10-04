import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {SubjectDTO} from '../../dto/subject.dto';
import {SubjectEntity} from '../../entity/subject.entity';

@Injectable()
export class SubjectService {
    constructor(
        @InjectRepository(SubjectEntity) private subjectRepository: Repository<SubjectEntity>,
    ) {}
    
    async getSubjects(): Promise<SubjectDTO[]> {
        return await this.subjectRepository.createQueryBuilder()
            .select(['id', 'name', 'create_date', 'modify_date'])
            .orderBy('create_date', 'DESC')
            .getRawMany();
    }
}
