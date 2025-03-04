import { DataTypes, Model} from "sequelize";
import { sequelize } from "../utils/db";
import { blogStatus } from "../utils/type";

interface readingListAttributes {
    id?: number
    status?: string
    userId: number
}

class ReadingList extends Model<readingListAttributes> implements readingListAttributes {
    public id!:number
    public status!: blogStatus
    public userId!: number
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
            defaultValue: blogStatus.UNREAD
        },
        userId:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
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