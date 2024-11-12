import { DataTypes, Model} from "sequelize";
import { sequelize } from "../utils/db";
import { bookStatus } from "../utils/type";

interface readingListAttributes {
    id?: number
    status: string
}

class ReadingList extends Model<readingListAttributes> implements readingListAttributes {
    public id!:number
    public status!: bookStatus
}

ReadingList.init(
    {
        id:{
            type:DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        status:{
            type:DataTypes.STRING,
            defaultValue: bookStatus.UNREAD
        }
    },
    {
        sequelize,
        tableName: 'readingLists',
        timestamps:true,
        modelName: "readingList"
    }
)

export default ReadingList