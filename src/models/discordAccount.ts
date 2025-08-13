import { Entity, ObjectIdColumn, Column } from "typeorm"
import { ObjectId } from "mongodb"

@Entity()
export class DiscordAccount {
    @ObjectIdColumn()
    _id!: ObjectId;

    @Column()
    userName!: string;

    @Column()
    globalName!: string;

    @Column({nullable:true})
    avatar?: string;

    @Column()
    discordId!: String

    @Column()
    refreshToken!: String

    @Column()
    accessToken!: String

    @Column()
    tokenExpiration!: Number

}
