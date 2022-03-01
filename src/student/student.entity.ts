import { Class } from "src/class/class.entity";
import { Score } from "src/score/score.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export type TypeGender = 'Male' | 'Female' | 'Other';

@Entity()
export class Student{
    @PrimaryGeneratedColumn()
    // @Column()
    id : number

    @OneToMany(() => Score, score => score.student)
    score : Score[]

    @Column()
    name : string

    @Column('date')
    dob : Date

    @Column({
        type : 'enum',
        enum : ['Male', 'Female', 'Other'],
        default : 'Male'
    })
    gender : TypeGender

    @Column()
    email : string

    // @Column()
    @ManyToOne(() => Class, _class => _class.id)
    class : Class
}