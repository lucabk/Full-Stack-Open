import { DataTypes, Model} from "sequelize";
import { sequelize } from "../utils/db";

interface membershipAttributes {
    id?: number
    readingListId: number
    blogId: number
}

class Membership extends Model<membershipAttributes> implements membershipAttributes {
    id!: number
    readingListId!: number
    blogId!: number
}

Membership.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        readingListId : {
            type: DataTypes.INTEGER,
            allowNull:false,
            references: {
                model:'readingLists',
                key:'id'
            }
        },
        blogId: {
            type: DataTypes.INTEGER,
            allowNull:false,
            references: {
                model:'blogs',
                key:'id'
            }        
        }
    },
    {
        sequelize,
        tableName:'memberships',
        timestamps:true,
        modelName:'membership'
    }
)

export default Membership