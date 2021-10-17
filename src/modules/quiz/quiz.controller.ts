import { Controller, Get, Post, Body, Put, Param, Delete, Query, UseGuards, ParseIntPipe } from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import {QuizDTO, UpdateQuizBody, CreateQuizBody} from 'src/dto/quiz.dto';
import { QuizEntity } from 'src/entity/quiz.entity';
import { Role } from 'src/entity/user.entity';
import { RolesGuard } from 'src/guards/roles.guard';
import { JwtAuthGuard } from '../auth-jwt/jwt-auth.guard';
import { QuizService } from './quiz.service';
import { Pagination } from 'nestjs-typeorm-paginate';


@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('quiz')
export class QuizController {
  constructor(
    private readonly quizService: QuizService
  ) {}

  @Post()
  create(@Body() createQuizDto: CreateQuizBody): Promise<QuizEntity> {
    return this.quizService.create(createQuizDto);
  }

  @Get()
  @Roles(Role.Admin)
  findAll(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ): Promise<Pagination<QuizDTO>> {
    limit = limit > 100 ? 100 : limit;
    return this.quizService.findAll({
      page,
      limit,
      route: 'http://localhost:3000/quizs',
    });
  }

  @Get(':id')
  @Roles(Role.Admin)
  findOne(@Param('id') id: string): Promise<QuizDTO> {
    return this.quizService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateQuizDto: UpdateQuizBody): Promise<QuizDTO> {
    return this.quizService.update(id, updateQuizDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<QuizDTO> {
    return this.quizService.remove(id);
  }
}
