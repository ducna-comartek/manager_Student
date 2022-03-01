import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Class } from 'src/class/class.entity';
import { Like, Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { DeleteStudentDto } from './dto/delete-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student, TypeGender } from './student.entity';
import {paginate, Pagination, IPaginationOptions} from 'nestjs-typeorm-paginate';
import { from, map, Observable } from 'rxjs';
import { Score } from 'src/score/score.entity';

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
        try {
            const newStudent={
                ...createStudentDto, 
                class: {id: clss} as Class
            }
            return await this.studentsRepository.save(newStudent)
        } catch (error) {
            if (error.driverError.code === 'ER_NO_REFERENCED_ROW_2') {
                throw new HttpException({
                    status: HttpStatus.BAD_REQUEST,
                    error: 'Cannot add a student row: a foreign key (classId) constraint fails',
                }, HttpStatus.BAD_REQUEST);
            } else {
                throw error;
            }
        }
        
    }

    public async isGoodStudent(){
        return await this.studentsRepository
        .createQueryBuilder("std")
        .select(
            [
                "std.id",
                "std.name",
                "class.name",
            ]
        )
        .leftJoin("std.class", "class")
        .leftJoin(
            subQuery => {
                return subQuery
                    .select("studentId")
                    .addSelect("MIN(score)", "minscore")
                    .from(Score, "s")
                    .groupBy("studentId")
            }, "min", "min.studentId = std.id"
        )
        // .groupBy("std.id")
        .where("min.minscore > :min", { min: 8 })
        .getRawMany();
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

    async findByName (name : Student) {
        return await this.studentsRepository.findOne(name)
    }

    // paginate(options: IPaginationOptions): Observable<Pagination<Student>> {
    //     return from(paginate<Student>(this.studentsRepository, options)).pipe(
    //         map((usersPageable: Pagination<Student>) => {
    //             usersPageable.items.forEach(function (v) {delete v.name});
    //             return usersPageable;
    //         })
    //     )
    // }

    // paginateFilterByUsername(options: IPaginationOptions, user: Student): Observable<Pagination<Student>>{
    //     return from(this.studentsRepository.findAndCount({
    //         skip: Number(options.page) * Number(options.limit) || 0,
    //         take: Number(options.limit) || 10,
    //         order: {id: "ASC"},
    //         select: ['id', 'name', 'username', 'email', ''],
    //         where: [
    //             { name: Like(`%${user.name}%`)}
    //         ]
    //     })).pipe(
    //         map(([users, totalUsers]) => {
    //             const usersPageable: Pagination<Student> = {
    //                 items: users,
    //                 links: {
    //                     first: options.route + `?limit=${options.limit}`,
    //                     previous: options.route + ``,
    //                     next: options.route + `?limit=${options.limit}&page=${Number(options.page) + 1}`,
    //                     last: options.route + `?limit=${options.limit}&page=${Math.ceil(totalUsers / Number(options.limit))}`
    //                 },
    //                 meta: {
    //                     currentPage: Number(options.page),
    //                     itemCount: users.length,
    //                     itemsPerPage: Number(options.limit),
    //                     totalItems: totalUsers,
    //                     totalPages: Math.ceil(totalUsers / Number(options.limit))
    //                 }
    //             };              
    //             return usersPageable;
    //         })
    //     )
    // }

}
