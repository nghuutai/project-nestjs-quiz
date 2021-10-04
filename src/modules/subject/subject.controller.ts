import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { SubjectService } from './subject.service';
import {SubjectDTO} from '../../dto/subject.dto'
import { JwtAuthGuard } from '../auth-jwt/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/entity/user.entity';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('subjects')
export class SubjectController {
    constructor(private readonly subjectService: SubjectService) {}
    
    @Get()
    @Roles(Role.Admin)
    async getSubjects(): Promise<SubjectDTO[]> {
        return await this.subjectService.getSubjects();
    }
}
