import {IsString, IsOptional, IsUUID, IsJSON} from 'class-validator';
import {Transform} from 'class-transformer';

export class QuizDTO {
    @IsUUID()
    @IsOptional()
    public id?: string;

    @IsUUID()
    public subject_id: string;

    @IsString()
    public question: string;

    @IsString()
    public correct_answer: string;

    @IsJSON()
    @Transform((value) => JSON.stringify(value.value))
    public incorrect_answer: string;
}

export class FindAllQuizQuery {
    @IsUUID()
    public subjectId: string;
}