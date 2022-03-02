import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { resolve } from 'path/posix';
import { stderr } from 'process';
import { Student } from 'src/student/student.entity';
import { createQueryBuilder, Repository } from 'typeorm';
import { Class } from './class.entity';
import { CreateClassDto } from './dto_class/create-class.dto';
import { DeleteClassDto } from './dto_class/delete-class.dto';
import { UpdateClassDto } from './dto_class/update-class.dto';
import { Score } from 'src/score/score.entity';
import { StudentService } from 'src/student/student.service';
import { StudentModule } from 'src/student/student.module';
import { FindStudentInfoByNameDto } from './dto_class/find-student-byname.dto';
import { FindClassByNameDto } from './dto_class/find-class-byname.dto';
// import { FindClassByName, FindClassByNameDto } from './dto_class/find-class-byname.dto';
// import { FindStudentInfoByNameDto } from 'src/class/dto_class/find-student-byname.dto';

@Injectable()
export class ClassService {
    public score: Score
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

    // public async getGoodStudents(){
    //     return await this.classRepository
    //         .createQueryBuilder('c')
    //         .select()
    //         .leftJoinAndSelect("c.student", "student")
    //         .leftJoinAndSelect("student.score", "score")
    //         .where("score.score > :score", {score : 8.5})
    //         .getMany()
    // }

    public async getStudentByName({name} : FindStudentInfoByNameDto){
        return await this.classRepository
        .createQueryBuilder('c')
        // .select()
        .leftJoinAndSelect("c.student", "student")
        .leftJoinAndSelect("student.score", "score")
        .where("student.name = :n", {n : name })
        .getOne()
    }

    public async getClassByName({name} : FindClassByNameDto){
        return await this.classRepository
        .createQueryBuilder('c')
        .leftJoinAndSelect("c.student", "student")
        .leftJoinAndSelect("student.score", "score")
        .where("c.name = :n", {n : name })
        .getOne()
    }

    async findClassById(id : number){
        return await this.classRepository.findOne(id)
    }

}
