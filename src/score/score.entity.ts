import { Subject } from "src/subject/subject.entity";
import { Student } from "src/student/student.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Score{
    @PrimaryGeneratedColumn()
    id : number

    // @Column()
    @ManyToOne(() => Student, student => student.id)
    student : Student

    // @Column()
    @ManyToOne(() => Subject, subject => subject.id)
    subject : Subject

    @Column({
        type : "float"
    })
    score : number
}