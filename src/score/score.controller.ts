import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { CreateScoreDto } from './dto/create-score.dto';
import { DeleteScoreDto } from './dto/delete-score.dto';
import { UpdateScoreDto } from './dto/update-score.dto';
import { StudentService } from 'src/student/student.service';
// import { create } from 'domain';
import { ScoreService } from './score.service';
import { Student } from 'src/student/student.entity';
import { FindStudentDto } from 'src/student/dto/find-student.dto';
import { SubjectService } from 'src/subject/subject.service';

@Controller('score')
export class ScoreController {
    constructor(
        private scoreService : ScoreService,
        private studentService : StudentService,
        private subjectService : SubjectService
    ){}

    @Post()
    async addScore(@Body() createScore : CreateScoreDto){
        const student = await this.studentService.findById(createScore.student)
        const subject = await this.subjectService.findById(createScore.subject)

        if(!student && !subject){
            throw new HttpException('Cannot found student and subject !!!!',HttpStatus.BAD_REQUEST)
        }

        if(!student){
            throw new HttpException('Cannot found student !!!!',HttpStatus.BAD_REQUEST)
        }

        if(!subject){
            throw new HttpException('Cannot found subject !!!!',HttpStatus.BAD_REQUEST)
        }

        return this.scoreService.createScore(createScore)
    }

    @Get()
    async getAll(){
        return this.scoreService.findAll()
    }

    @Patch()
    async updateScore(@Body() updateScore : UpdateScoreDto){
        console.log(updateScore)
        return this.scoreService.updateScore(updateScore)
    }

    @Delete(':id')
    async deleteScore(@Param() param : DeleteScoreDto){
        const score = await this.scoreService.getById(param.id)
        if(!score){
            throw new HttpException('Cannot found score !!!!',HttpStatus.BAD_REQUEST)
        }
        return await this.scoreService.deleteScore(param)
    }
}
