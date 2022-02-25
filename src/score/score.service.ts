import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subject } from 'src/subject/subject.entity';
import { Student } from 'src/student/student.entity';
import { Repository } from 'typeorm';
import { CreateScoreDto } from './dto/create-score.dto';
import { Score } from './score.entity';
import { UpdateClassDto } from 'src/class/dto_class/update-class.dto';
import { UpdateScoreDto } from './dto/update-score.dto';
import { DeleteScoreDto } from './dto/delete-score.dto';

@Injectable()
export class ScoreService {
    constructor(
        @InjectRepository(Score)
        private scoreRepository : Repository<Score>
    ){}

    async findAll() {
        return this.scoreRepository.find()
    }

    async createScore({id,student,subject, ...createScoreDto} : CreateScoreDto){
        const newScore = {
            ...createScoreDto,
            student : {id} as Student,
            subject : {id} as Subject
        }
        return this.scoreRepository.save(newScore)
    }

    async updateScore({id, student, subject, ...updateScoreDto}: UpdateScoreDto){
        const newScore = {
            ...updateScoreDto,
            student : {id} as Student,
            subject : {id} as Subject
        }
        await this.scoreRepository.update({id},newScore)
    }

    async deleteScore(param : DeleteScoreDto) {
        await this.scoreRepository.delete(param)
    }
}
