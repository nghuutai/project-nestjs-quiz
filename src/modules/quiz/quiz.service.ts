import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindAllQuizQuery, QuizDTO } from 'src/dto/quiz.dto';
import { QuizEntity } from 'src/entity/quiz.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(QuizEntity) private quizRepository: Repository<QuizEntity>,
  ) {}

  async create(createQuizDto: QuizDTO): Promise<QuizEntity> {
    const quiz = new QuizEntity();
    quiz.subject_id = createQuizDto.subject_id;
    quiz.question = createQuizDto.question;
    quiz.correct_answer = createQuizDto.correct_answer;
    quiz.incorrect_answer = createQuizDto.incorrect_answer;
    const result = await quiz.save()
    return result;
  }

  async findAll(query: FindAllQuizQuery): Promise<QuizDTO[]> {
    const result = await this.quizRepository.createQueryBuilder()
      .select('*')
      .where("subject_id = :subjectId", {subjectId: query.subjectId})
      .limit(10)
      .offset(0)
      .getRawMany<QuizDTO>();
    return result;
  }

  findOne(id: number) {
    return `This action returns a #${id} quiz`;
  }

  update(id: number, updateQuizDto: QuizDTO) {
    return `This action updates a #${id} quiz`;
  }

  remove(id: number) {
    return `This action removes a #${id} quiz`;
  }
}
