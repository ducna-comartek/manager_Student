import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { query } from 'express';
import { CreateStudentDto } from './dto/create-student.dto';
import { DeleteStudentDto } from './dto/delete-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
    constructor(
        private studentService : StudentService
    ){}

    @Post()
    async addStudent(@Body() createStudent : CreateStudentDto){
        return this.studentService.createNewStudent(createStudent)
    }

    @Get()
    async getAll(){
        return this.studentService.searchAll()
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

}
