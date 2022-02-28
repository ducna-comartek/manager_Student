import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { DeleteStudentDto } from 'src/student/dto/delete-student.dto';
import { ClassService } from './class.service';
import { CreateClassDto } from './dto_class/create-class.dto';
import { UpdateClassDto } from './dto_class/update-class.dto';

@Controller('class')
export class ClassController {
    constructor (
        private classService : ClassService
    ){}

    @Post()
    async createClass(@Body() createClassDto : CreateClassDto){
        return this.classService.createNewClass(createClassDto)
    }

    @Get()
    async getAll(){
        return this.classService.findClass()
    }

    @Patch()
    async updateClass(@Body() updateClass : UpdateClassDto){
        console.log(updateClass)
        return this.classService.updateClass(updateClass)
    }

    @Delete(':id')
    async deleteClass(@Param() param : DeleteStudentDto){
        return this.classService.deleteClass(param)
    }
}
