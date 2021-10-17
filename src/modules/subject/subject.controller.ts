import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { SubjectService } from './subject.service';
import {SubjectDTO} from '../../dto/subject.dto'
import { JwtAuthGuard } from '../auth-jwt/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/entity/user.entity';
import {QuizDTO} from '../../dto/quiz.dto';
import {QuizService} from '../quiz/quiz.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('subject')
export class SubjectController {
    constructor(
        private readonly subjectService: SubjectService,
        private readonly quizService: QuizService,
    ) {}
    
    @Get()
    @Roles(Role.Admin)
    async getSubjects(): Promise<SubjectDTO[]> {
        return await this.subjectService.getSubjects();
    }

    @Get('/:id/quiz')
    @Roles(Role.Admin)
    async getQuizBySubject(@Param('id') id: string): Promise<QuizDTO[]> {
        return this.quizService.getQuizBySubject(id);
    }
}
