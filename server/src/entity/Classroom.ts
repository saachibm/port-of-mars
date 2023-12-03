import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role, ROLES } from "@port-of-mars/shared/types";
import { Student } from "./Student";
import { Teacher } from "./Teacher";

@Entity()
export class Classroom{
  @OneToMany(type => Student, student => student.classroom, { nullable: false })
  student!: Student;

  @ManyToOne(type => Teacher, teacher => teacher.classroom )
  teacher!: Teacher;

  @Column()
  gamePin!: number;
}

