import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Class } from 'src/class/class.entity';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { DeleteStudentDto } from './dto/delete-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student, TypeGender } from './student.entity';

@Injectable()
export class StudentService {
    constructor(
        @InjectRepository(Student)
        private studentsRepository : Repository<Student>
    ){}

    async searchAll() : Promise<Student[]>{
        return this.studentsRepository.find()
    }

    async searchOne(id : string) : Promise<Student> {
        return this.studentsRepository.findOne(id)
    } 

    async createNewStudent({class: clss, ...createStudentDto} : CreateStudentDto) {
        const newStudent={
            ...createStudentDto, 
            class: {id: clss} as Class
        }
        return this.studentsRepository.save(newStudent)
    }

    async updateStudent({id, class : clss, ...updateStudentDto} : UpdateStudentDto ) {
        const newStudent = {
            ...updateStudentDto,
            class: {id : clss} as Class
        }
        await this.studentsRepository.update({id}, newStudent)
    }

    async deleteStudent(param : DeleteStudentDto) : Promise<void> {
        await this.studentsRepository.delete(param)
    }
}
