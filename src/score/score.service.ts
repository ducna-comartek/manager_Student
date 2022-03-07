import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subject } from 'src/subject/subject.entity';
import { Student } from 'src/student/student.entity';
import { FindCondition, FindConditions, Repository } from 'typeorm';
import { CreateScoreDto } from './dto/create-score.dto';
import { Score } from './score.entity';
import { UpdateClassDto } from 'src/class/dto_class/update-class.dto';
import { UpdateScoreDto } from './dto/update-score.dto';
import { DeleteScoreDto } from './dto/delete-score.dto';
import { response } from 'express';
import { catchError, throwError } from 'rxjs';
import { isBuffer } from 'util';
import { HasScoreDto } from './dto/has_score.dto';

@Injectable()
export class ScoreService {
    constructor(
        @InjectRepository(Score)
        private scoreRepository : Repository<Score>
    ){}

    async findAll() {
        return this.scoreRepository.find()
    }
    public async hasScoreSubject(studentId: number) {
        return await this.scoreRepository.count({ student: { id: studentId } as Student });
    }

    public async outcome(studentId: number) {
        return await this.scoreRepository
            .createQueryBuilder('score')
            .select('score')
            .leftJoinAndSelect('score.subject', 'subject')
            .where('studentId = :id', { id: studentId })
            .getRawMany();
    }

    public async avgScore(studentId: number) {
        const info = await this.scoreRepository
            .createQueryBuilder()
            .addSelect('AVG(score)', 'avg')
            .where('studentId = :id', { id: studentId })
            .getRawOne();
        return info.avg;
    }
    
    public async hasScore(hasScoreDto: HasScoreDto) {
        return await this.scoreRepository.findOne({
            student: {
                id: hasScoreDto.student
            } as Student,
            subject: {
                id: hasScoreDto.subject
            } as Subject
        });
    }

    async createScore({student,subject, ...createScoreDto} : CreateScoreDto){
        const newScore = {
            ...createScoreDto,
            student : {id: student} as Student,
            subject : {id : subject} as Subject
        }
            return await this.scoreRepository.save(newScore)
    }

    async updateScore({id, student , subject, score}: UpdateScoreDto){
        return this.scoreRepository.update(
            id ? { id } : ({ student, subject } as FindConditions<Score>), {score}
        )
    }

    async deleteScore(param : DeleteScoreDto) {
        await this.scoreRepository.delete(param)
    }

    async getById(id : number){
        return await this.scoreRepository.findOne(id)
    }
}
