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
        await this.subjectRepository.insert(createSubjectDto)
    }

    async updateSubject({id, name, type} : UpdateSubjectDto){
        if (id && name)
            return this.subjectRepository.update({ id }, { name, type })
        if (id && !name) return this.subjectRepository.update({ id }, { type })
            return this.subjectRepository.update({ name }, { type })
    }

    async deleteSubject(param : DeleteSubjectDto){
        await this.subjectRepository.delete(param)
    }
}
