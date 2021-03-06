import { Body, Controller, Delete, Get, Header, HttpException, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { query } from 'express';
import { Observable } from 'rxjs';
// import { Observable } from 'rxjs/internal/Observable';
import { CreateStudentDto } from './dto/create-student.dto';
import { DeleteStudentDto } from './dto/delete-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './student.entity';
import { StudentService } from './student.service';
import { Pagination } from 'nestjs-typeorm-paginate';
import { FindStudentDto } from './dto/find-student.dto';
import { ClassService } from 'src/class/class.service';
import { PaginateDto } from './dto/paginate-student.dto';

@Controller('student')
export class StudentController {
    constructor(
        private studentService : StudentService,
        private classService : ClassService
    ){}

    @Post()
    async addStudent(@Body() createStudent : CreateStudentDto){
        const _class = await this.classService.findClassById(createStudent.class)
        if(!_class){
            throw new HttpException('Cannot found Class',HttpStatus.BAD_REQUEST)
        }
        return this.studentService.createNewStudent(createStudent)
    }

    @Get('goodstudent')
    async getGoodStudent(@Query() page : PaginateDto) {
        return this.studentService.isGoodStudent(page)
    }

    @Get('getbyid')
    async getStudentById(@Query() id : number){
        return this.studentService.findById(id)
    }

    @Get()
    async getAll(){
        return this.studentService.searchAll()
    }

    @Get('resultscore')
    async getResultScore(@Query() page : PaginateDto){
        return this.studentService.resultScoreStudent(page)
    }

    @Patch()
    async updateStudent(@Body() updateStudent : UpdateStudentDto){
        console.log(updateStudent)
        return this.studentService.updateStudent(updateStudent)
    }

    @Delete(':id')
    async deleteStudent(@Param() param : DeleteStudentDto){
        return this.studentService.deleteStudent(param)
    }

    @Get('findName')
    async getByName(@Query() query: FindStudentDto) {
        return this.studentService.getByName(query);
    }

    @Get('GetExcelStudentGood')
    @Header(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    )
    async getExcelStudentGood(@Query() query : PaginateDto){
        return this.studentService.exportExcel(query)
    }

    @Get('GetExcelTypeOfStudent')
    @Header(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    )
    async getExcelTypeOfStudent(){
        return this.studentService.getExcelForTypeOfStudent()
    }
}
