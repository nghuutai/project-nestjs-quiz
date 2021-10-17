import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {UpdateQuizBody, QuizDTO, CreateQuizBody} from 'src/dto/quiz.dto';
import { QuizEntity } from 'src/entity/quiz.entity';
import { Repository } from 'typeorm';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(QuizEntity) private quizRepository: Repository<QuizEntity>,
  ) {}

  async create(createQuizDto: CreateQuizBody): Promise<QuizEntity> {
    const result = await this.quizRepository.save(createQuizDto);
    return result;
  }

  async findAll(option: IPaginationOptions): Promise<Pagination<QuizDTO>> {
    const queryBuilder = this.quizRepository.createQueryBuilder("quiz")
      .innerJoinAndSelect("quiz.subject", 'subject');

    return paginate<QuizDTO>(queryBuilder, option);
  }

  async getQuizBySubject(subjectId: string): Promise<QuizDTO[]> {
    const result = await this.quizRepository.createQueryBuilder('quiz')
      .innerJoinAndSelect("quiz.subject", 'subject')
      .where("quiz.subjectId = :subjectId", {subjectId})
      .limit(10)
      .offset(0)
      .getRawAndEntities<QuizDTO>();

    return result.entities;
  }

  async findOne(quizId: string): Promise<QuizDTO> {
    const result = await this.quizRepository.createQueryBuilder()
      .select("*")
      .where("id = :quizId", {quizId})
      .getRawOne();
    return result;
  }

  async update(id: string, updateQuizDto: UpdateQuizBody): Promise<QuizDTO> {
    const result = await this.quizRepository.update({id}, updateQuizDto);
    return result.raw;
  }

  async remove(id: string): Promise<QuizDTO> {
    const result = await this.quizRepository.delete({id});
    return result.raw;
  }
}
