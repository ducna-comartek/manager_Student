import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { DeleteSubjectDto } from 'src/Subject/dto/delete-Subject.dto';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { SubjectService } from './subject.service';

@Controller('subject')
export class SubjectController {
    constructor(
        private subjectService : SubjectService
    ){}
    @Post()
    async addSubject(@Body() createSubject : CreateSubjectDto){
        return this.subjectService.createNewSubject(createSubject)
    }

    @Get()
    async getAll(){
        return this.subjectService.findAll()
    }

    @Patch()
    async updateSubject(@Body() updateSubject : UpdateSubjectDto){
        console.log(updateSubject)
        return this.subjectService.updateSubject(updateSubject)
    }

    @Delete(':id')
    async deleteSubject(@Param() param : DeleteSubjectDto){
        return this.subjectService.deleteSubject(param)
    }

    @Get('getbyid')
    async findSubjectById(@Query() id : number){
        return this.subjectService.findById(id)
    }

}
