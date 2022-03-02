import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
        try {
            return await this.subjectRepository.delete(param)
        } catch (error) {
            if (error.driverError.code === 'ER_NO_REFERENCED_ROW_2') {
                throw new HttpException({
                    status: HttpStatus.BAD_REQUEST,
                    error: ' Cannot delete or update a parent row: a foreign key constraint fails',
                }, HttpStatus.BAD_REQUEST);
            } else {
                throw error;
            }
        }
    }

    async findById(id : number){
        return await this.subjectRepository.findOne(id)
    }
}
