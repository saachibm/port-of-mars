import {
  CreateDateColumn,
  Column,
  Entity,
  Generated,
  OneToMany,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToMany,
} from "typeorm";
import { Game } from "./Game";
import { Player } from "./Player";
import { SoloPlayer } from "./SoloPlayer";
import { Student } from "./Student";
import { TournamentRoundInvite } from "./TournamentRoundInvite";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  username!: string;

  @Column({ unique: true, nullable: true })
  email?: string;

  @OneToMany(type => Player, player => player.user)
  players!: Array<Player>;

  @OneToMany(type => TournamentRoundInvite, invite => invite.user)
  invites!: Array<TournamentRoundInvite>;

  @OneToMany(type => SoloPlayer, soloPlayer => soloPlayer.user)
  soloPlayers!: Array<SoloPlayer>;

  @OneToOne(type => Student, student => student.classroom)
  student!: Student;

  @ManyToMany(type => Game, game => game.user)
  game!: Game;

  @Column({ default: false })
  passedQuiz!: boolean;

  @Column()
  @Generated("uuid")
  registrationToken!: string;

  @Column()
  @Generated("uuid")
  participantId!: string;

  @Column({ default: "" })
  passportId!: string;

  @Column({ default: false })
  isVerified!: boolean;

  @Column({ nullable: true })
  dateConsented?: Date;

  @Column({ default: true })
  isActive!: boolean;

  @Column({ default: false })
  isSystemBot!: boolean;

  @Column({ default: "" })
  lastPlayerIp!: string;

  @CreateDateColumn()
  dateCreated!: Date;

  @Column({ default: false })
  isAdmin!: boolean;

  @Column({ default: false })
  isBanned!: boolean;

  @Column({ default: false })
  isMuted!: boolean;

  @Column({ default: 0 })
  muteStrikes!: number;
}
