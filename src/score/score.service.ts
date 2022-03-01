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

@Injectable()
export class ScoreService {
    constructor(
        @InjectRepository(Score)
        private scoreRepository : Repository<Score>
    ){}

    async findAll() {
        return this.scoreRepository.find()
    }

    async createScore({student,subject, ...createScoreDto} : CreateScoreDto){
        try {
            const newScore = {
                ...createScoreDto,
                student : {id: student} as Student,
                subject : {id : subject} as Subject
            }
            return await this.scoreRepository.save(newScore)
        } catch (error) {
            console.log(error);
            if(error.driverError.code === 'ER_NO_REFERENCED_ROW_2') {
                throw new HttpException({
                    status: HttpStatus.BAD_REQUEST,
                    error: 'Cannot add a Score row',
                }, HttpStatus.BAD_REQUEST);
            } else {
                throw error;
            }
        }         
    }

    async updateScore({id, student , subject, score}: UpdateScoreDto){
        return this.scoreRepository.update(
            id ? { id } : ({ student, subject } as FindConditions<Score>), {score}
        )
    }

    async deleteScore(param : DeleteScoreDto) {
        await this.scoreRepository.delete(param)
    }
}
