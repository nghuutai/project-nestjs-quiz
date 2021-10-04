import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { FindAllQuizQuery, QuizDTO } from 'src/dto/quiz.dto';
import { QuizEntity } from 'src/entity/quiz.entity';
import { Role } from 'src/entity/user.entity';
import { RolesGuard } from 'src/guards/roles.guard';
import { JwtAuthGuard } from '../auth-jwt/jwt-auth.guard';
import { QuizService } from './quiz.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('quizs')
export class QuizController {
  constructor(
    private readonly quizService: QuizService
  ) {}

  @Post()
  create(@Body() createQuizDto: QuizDTO): Promise<QuizEntity> {
    console.log(createQuizDto.incorrect_answer);
    return this.quizService.create(createQuizDto);
  }

  @Get()
  @Roles(Role.Admin)
  findAll(@Query() query: FindAllQuizQuery) {
    return this.quizService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quizService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuizDto: QuizDTO) {
    return this.quizService.update(+id, updateQuizDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quizService.remove(+id);
  }
}
