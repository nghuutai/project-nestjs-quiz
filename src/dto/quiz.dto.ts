import {IsString, IsOptional, IsUUID, IsJSON, IsNumber, IsObject} from 'class-validator';
import {Transform} from 'class-transformer';
// import { SubjectEntity } from 'src/entity/subject.entity';
import { SubjectDTO } from './subject.dto';

export class QuizDTO {
    @IsUUID()
    @IsOptional()
    public id?: string;

    @IsUUID()
    public subjectId: string;

    @IsString()
    public question: string;

    @IsString()
    public correct_answer: string;

    @IsObject()
    public subject: SubjectDTO;

    @IsJSON()
    @Transform((value) => JSON.stringify(value.value))
    public incorrect_answer: string;
}

export class FindAllQuizQuery {
    @IsNumber()
    public limit: number;

    @IsNumber()
    public page: number;
}

export class CreateQuizBody {
    @IsUUID()
    public subjectId: string;

    @IsString()
    public question: string;

    @IsString()
    public correct_answer: string;

    @IsJSON()
    @Transform((value) => JSON.stringify(value.value))
    public incorrect_answer: string;
}

export class UpdateQuizBody {
    @IsUUID()
    public subjectId: string;

    @IsString()
    public question: string;

    @IsString()
    public correct_answer: string;

    @IsJSON()
    @Transform((value) => JSON.stringify(value.value))
    public incorrect_answer: string;
}