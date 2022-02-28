import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Student } from "src/student/student.entity";

@Entity()
export class Class{
    @PrimaryGeneratedColumn()
    id : number

    @Column()
    name : string

    @Column()
    totalMember : number

    @Column()
    teacherName : string

    @OneToMany(() => Student, student => student.class)
    student : Student[]
}