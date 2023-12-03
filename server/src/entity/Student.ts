import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Role, ROLES } from "@port-of-mars/shared/types";
import { User } from "@port-of-mars/server/entity/User";
import { Classroom } from "./Classroom";

@Entity()
export class Student{
  @OneToOne(type => User, user => user.players, { nullable: false })
  user!: User;

  @ManyToOne(type => Classroom, classroom => classroom.student)
  classroom!: Classroom;

  @Column({ default: "" })
  generatedUsername!: string;

  @Column()
  gameId!: number;
}