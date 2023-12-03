import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Role, ROLES } from "@port-of-mars/shared/types";
import { Game } from "@port-of-mars/server/entity/Game";
import { Classroom } from "./Classroom";
import { User } from "@port-of-mars/server/entity/User";

@Entity()
export class Teacher{
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToMany(type => Game, game => game.user, { nullable: false })
  game!: Game;

  @OneToMany(type => Classroom, classroom => classroom.teacher)
  classroom!: Classroom;

  @Column({ unique: true })
  username!: string;

  @Column({ unique: true, nullable: true })
  email?: string;

  @Column()
  password!: string;
}