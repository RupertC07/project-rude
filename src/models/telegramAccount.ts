import { Entity, ObjectIdColumn, Column } from "typeorm"
import { ObjectId } from "mongodb"

@Entity()
export class TelegramAccount {
    @ObjectIdColumn()
    _id!: ObjectId;

    @Column()
    firstName!: string;

    @Column({nullable:true})
    lastName?: string;

    @Column()
    userName!: String

    @Column()
    telegramId!: String
    
}
