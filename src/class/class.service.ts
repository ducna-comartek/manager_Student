import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Class } from './class.entity';
import { CreateClassDto } from './dto_class/create-class.dto';
import { DeleteClassDto } from './dto_class/delete-class.dto';
import { UpdateClassDto } from './dto_class/update-class.dto';

@Injectable()
export class ClassService {
    constructor(
        @InjectRepository(Class)
        private classRepository : Repository<Class>
    ){}
    
    async createNewClass(createClassDto : CreateClassDto) {
        await this.classRepository.save(createClassDto)
    }

    async findClass() : Promise<Class[]>{
        return this.classRepository.find()
    }

    async updateClass({id, ...updateClassDto}: UpdateClassDto) {
        await this.classRepository.update({id}, updateClassDto)
    }

    async deleteClass(param : DeleteClassDto) {
        await this.classRepository.delete(param)
    } 
}
