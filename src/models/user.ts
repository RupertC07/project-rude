
import { Entity, ObjectIdColumn, Column } from "typeorm";
import { ObjectId } from "mongodb";

@Entity()
export class User {
  @ObjectIdColumn()
  _id!: ObjectId;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column({ nullable: true })
  email?: string;

  @Column({ default: false })
  isSubscribedToForecast!: boolean;

  @Column({ default: false })
  foreCastSubscription!: boolean;

  @Column({ nullable: true })
  telegramId?: string; 

  @Column({ nullable: true })
  discordId?: string; 
}
