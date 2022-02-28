import { IsOptional } from "class-validator";
import { Score } from "src/score/score.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export type TypeStatus = 'Online' | 'Offline'

@Entity()
export class Subject {
    @PrimaryGeneratedColumn()
    id : number

    @OneToMany(() => Score, score => score.id)
    score : Score[]

    @Column()
    name : string

    @Column({
        type : 'enum',
        enum : ['Online', 'Offline'],
        default : 'Offline'
    })
    // @IsOptional()
    type : TypeStatus
}