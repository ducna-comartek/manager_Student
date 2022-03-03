import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Class } from 'src/class/class.entity';
import { Like, Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { DeleteStudentDto } from './dto/delete-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student, TypeGender } from './student.entity';
import {paginate, Pagination, IPaginationOptions} from 'nestjs-typeorm-paginate';
import * as xlsx from 'xlsx';
import { Score } from 'src/score/score.entity';
import { FindStudentDto } from './dto/find-student.dto';
import { PaginateDto } from './dto/paginate-student.dto';

@Injectable()
export class StudentService {
    constructor(
        @InjectRepository(Student)
        private studentsRepository : Repository<Student>
    ){}

    async searchAll() : Promise<Student[]>{
        return this.studentsRepository.find()
    }

    async searchOne(id : string) : Promise<Student> {
        return this.studentsRepository.findOne(id)
    } 

    async createNewStudent({class: clss, ...createStudentDto} : CreateStudentDto) {
        const newStudent={
            ...createStudentDto, 
            class: {id: clss} as Class
        }
        return await this.studentsRepository.save(newStudent)
    
    }

    public async resultScoreStudent (paginateDto : PaginateDto){
        const limit = paginateDto.limit
        const offset = paginateDto.offset
        const typeOf = paginateDto.typeOf

        return await this.studentsRepository
        .createQueryBuilder('std')
        .select(
            [
                "std.name",
                "class.name",
            ]
        )
        .leftJoin('std.class', 'class')
        .leftJoinAndSelect(
            subQuery => {
                return subQuery
                .select('studentId')
                .addSelect('avg(score)', 'tb')
                .addSelect(`case when avg(score) > 8 then 'Good' when avg(score) < 8 and avg(score) > 5 then 'Medium' else 'Bad' end`, 'result')
                .from(Score, 'score')
                .groupBy('studentId')
            }, 'info', 'std.id = info.studentId'
        )
        .where('info.result = :typeOf', {typeOf : typeOf})
        .orderBy('std.id')
        .limit(limit)
        .offset(offset)
        .getRawMany()
    }

    public async isGoodStudent(paginateDto : PaginateDto){
        // const take = query.take || 10
        // const skip = query.skip || 0
        // const keyword = query.keyword || ''
        const limit = paginateDto.limit
        const offset = paginateDto.offset

        return await this.studentsRepository
            .createQueryBuilder("std")
            .select(
                [
                    "std.id",
                    "std.name",
                    "class.name",
                ]
            )
            .leftJoin("std.class", "class")
            .leftJoin(
                subQuery => {
                    return subQuery
                        .select("studentId")
                        .addSelect("MIN(score)", "minscore")
                        .from(Score, "s")
                        .groupBy("studentId")
                }, "min", "min.studentId = std.id"
            )
            // .groupBy("std.id")
            .where("min.minscore > :min", { min: 8 })
            .limit(limit)
            .offset(offset)
            .getRawMany()
       }

    async updateStudent({id, class : clss, ...updateStudentDto} : UpdateStudentDto ) {
        const newStudent = {
            ...updateStudentDto,
            class: {id : clss} as Class
        }
        await this.studentsRepository.update({id}, newStudent)
    }

    async deleteStudent(param : DeleteStudentDto) : Promise<void> {
        await this.studentsRepository.delete(param)
    }

    public async getByName(query: FindStudentDto) {
        const student = await this.studentsRepository.findOne({ name: query.name })
        return student
    }

    async findById (id : number){
        return await this.studentsRepository.findOne(id)
    } 

    async getExcelForStudentGood (){
        const student_good = await this.studentsRepository
            .createQueryBuilder("std")
            .select(
                [
                    "std.id",
                    "std.name",
                    "class.name",
                ]
            )
            .leftJoin("std.class", "class")
            .leftJoin(
                subQuery => {
                    return subQuery
                        .select("studentId")
                        .addSelect("MIN(score)", "minscore")
                        .from(Score, "s")
                        .groupBy("studentId")
                }, "min", "min.studentId = std.id"
            )
            .where("min.minscore > :min", { min: 8 })
            .getRawMany()
       const file = xlsx.readFile('./src/excel/type_of_student.xlsx')
       const ws = xlsx.utils.json_to_sheet(student_good)
       xlsx.utils.book_append_sheet(file,ws,'Sheet3')
       xlsx.writeFile(file,'./src/excel/type_of_student.xlsx')
       return 'write excel succesfully'
    }

    async getExcelForTypeOfStudent(){
        const typeOfStudent = await this.studentsRepository
            .createQueryBuilder('std')
            .select(
                [
                    "std.name",
                    "class.name",
                ]
            )
            .leftJoin('std.class', 'class')
            .leftJoinAndSelect(
                subQuery => {
                    return subQuery
                    .select('studentId')
                    .addSelect('avg(score)', 'tb')
                    .addSelect(`case when avg(score) > 8 then 'Good' when avg(score) < 8 and avg(score) > 5 then 'Medium' else 'Bad' end`, 'result')
                    .from(Score, 'score')
                    .groupBy('studentId')
                }, 'info', 'std.id = info.studentId'
            )
            .orderBy('std.id')
            .getRawMany()
        const file = xlsx.readFile('./src/excel/type_of_student.xlsx')
        const ws = xlsx.utils.json_to_sheet(typeOfStudent)
        xlsx.utils.book_append_sheet(file,ws,"Sheet2")
        xlsx.writeFile(file,'./src/excel/type_of_student.xlsx')
        return 'write excel succesfully'
    }

}
