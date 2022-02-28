import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subject } from './subject.entity';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { DeleteSubjectDto } from './dto/delete-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';

@Injectable()
export class SubjectService {
    constructor(
        @InjectRepository(Subject)
        private subjectRepository : Repository<Subject>
    ){}

    async findAll() {
        return this.subjectRepository.find()
    }

    async createNewSubject(createSubjectDto : CreateSubjectDto){
        await this.subjectRepository.save(createSubjectDto)
    }

    async updateSubject({id, ...updateSubjectDto} : UpdateSubjectDto){
        await this.subjectRepository.update({id}, updateSubjectDto)
    }

    async deleteSubject(param : DeleteSubjectDto){
        await this.subjectRepository.delete(param)
    }
}
