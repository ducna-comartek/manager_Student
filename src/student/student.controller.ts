import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { query } from 'express';
import { Observable } from 'rxjs';
// import { Observable } from 'rxjs/internal/Observable';
import { CreateStudentDto } from './dto/create-student.dto';
import { DeleteStudentDto } from './dto/delete-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './student.entity';
import { StudentService } from './student.service';
import { Pagination } from 'nestjs-typeorm-paginate';

@Controller('student')
export class StudentController {
    constructor(
        private studentService : StudentService
    ){}

    @Post()
    async addStudent(@Body() createStudent : CreateStudentDto){
        return this.studentService.createNewStudent(createStudent)
    }

    @Get('goodstudent')
    async getGoodStudent() {
        return this.studentService.isGoodStudent()
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

    // @Get('/name')
    // async findStudentByName(@Param() name )

    // @Get()
    // index(
    //     @Query('page') page: number = 1,
    //     @Query('limit') limit: number = 10,
    //     @Query('name') name: string
    // ): Observable<Pagination<Student>> {
    //     limit = limit > 100 ? 100 : limit;

    //     if (name === null || name === undefined) {
    //         return this.studentService.paginate({ page: Number(page), limit: Number(limit), route: 'http://localhost:3000/' });
    //     } else {
    //         return this.studentService.paginateFilterByUsername(
    //             { page: Number(page), limit: Number(limit), route: 'http://localhost:3000/' },
    //             { name }
    //         )
    //     }
    // }
}
