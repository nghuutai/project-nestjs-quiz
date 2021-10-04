import { Module } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizEntity } from 'src/entity/quiz.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QuizEntity])],
  controllers: [QuizController],
  providers: [QuizService]
})
export class QuizModule {}
