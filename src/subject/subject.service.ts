import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subject } from './subject.entity';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { DeleteSubjectDto } from './dto/delete-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import * as xlsx from 'xlsx';
import * as XlsxTemplate from 'xlsx-template';
import { json } from 'stream/consumers';
import * as fs from 'fs';
import path from 'path';

@Injectable()
export class SubjectService {
    constructor(
        @InjectRepository(Subject)
        private subjectRepository : Repository<Subject>
    ){}

    async findAll() {
        const subject = await this.subjectRepository.find()
        console.log(typeof(subject))
        return subject
    }

    async getExecl(){
        const subject_data = await this.subjectRepository.find()
        const data = await fs.promises.readFile('./src/excel/test1.xlsx')
        // console.log('1')
        const template = new XlsxTemplate(data)
        const sheetNumber = 1
        
        const values = {
            score: subject_data
        };
        template.substitute(sheetNumber, values)
        // template.substitute(sheetNumber, subject_data)
        // const myData = template.
        // console.log(typeof(myData))
        fs.writeFileSync('./src/excel/test1.xlsx',template.generate('base64'),'base64')
        return 'wirte complete'

        // const file = xlsx.readFile('./src/excel/test1.xlsx')
        // const subject_data = await this.subjectRepository.find()
        // console.log(subject_data)
        // const ws = xlsx.utils.json_to_sheet(subject_data)
        // console.log(ws)
        // xlsx.utils.book_append_sheet(file,ws,"cad")
        // xlsx.writeFile(file,'./src/excel/test1.xlsx')
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
