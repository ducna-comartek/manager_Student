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
import { MailService } from 'src/sendmail/mail.service';
import * as XlsxTemplate from 'xlsx-template';
import * as fs from 'fs';

@Controller('score')
export class ScoreController {
    constructor(
        private scoreService : ScoreService,
        private studentService : StudentService,
        private subjectService : SubjectService,
        private mailService : MailService
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
        const result = this.scoreService.createScore(createScore);
        //Thông báo điểm nếu thành công
        if (result) {
            const data = await fs.promises.readFile('./src/excel/score_each_attch.xlsx');
            const template = new XlsxTemplate(data);
            const values = {
                subject: subject.name,
                std: student,
                score: createScore.score,
                class: await this.studentService.inClass(student.id)
            };
            template.substitute(1, values);
            const dataAttch = Buffer.from(template.generate('base64'), 'base64');

            this.mailService.sendMail({
                name: student.name,
                email: student.email,
                subject: subject.name,
                score: createScore.score,
                data: dataAttch
            });
        }

        // Nếu điểm đã tồn tại thì không thể thêm vào
        const hasScore = Boolean(await this.scoreService.hasScore(createScore));
        if (hasScore) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: `Bad Request: Score already exists!`,
            }, HttpStatus.BAD_REQUEST);
        }

        // Thông báo kết quả học tập nếu có điểm các môn
        if (await this.scoreService.hasScoreSubject(student.id) == await this.subjectService.hasSubject()) {
            const outcome = await this.scoreService.outcome(student.id);
            const avg = await this.scoreService.avgScore(student.id);
            let kindOf;
            if (avg < 5) kindOf = 'BAD';
            else if (avg >= 8) kindOf = 'GOOD';
            else kindOf = 'AVERAGE';
            const data = await fs.promises.readFile('./src/excel/score_all_attch.xlsx');
            const template = new XlsxTemplate(data);
            const values = {
                std: student,
                info: outcome as { score_score: number, subject_name: string }[],
                avg: avg.toFixed(2),
                kindof: kindOf
            };
            template.substitute(1, values);
            const dataFile = Buffer.from(template.generate('base64'), 'base64');

            this.mailService.sendMailFullScore({
                name: student.name,
                email: student.email,
                data: dataFile
            });
        }
        return result
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
