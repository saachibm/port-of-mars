import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from "typeorm";
import { SoloMarsEventDeck } from "./SoloMarsEventDeck";
import { SoloGameRound } from "./SoloGameRound";
import { SoloMarsEventCard } from "./SoloMarsEventCard";

@Entity()
export class SoloMarsEventDeckCard{
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn()
  dateCreated!: Date;

  @ManyToOne(type => SoloMarsEventDeck, deck=>deck.cards, { nullable: true })
  deck!: SoloMarsEventDeck;

  @Column()
  deckId!: number;

  @ManyToOne(type => SoloMarsEventCard)
  card!: SoloMarsEventCard;

  @Column()
  cardId!: number;

  @ManyToOne(type => SoloGameRound)
  round!: SoloGameRound;

  @Column()
  roundId!: number;

}