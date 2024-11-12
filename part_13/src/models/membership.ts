import { DataTypes, Model} from "sequelize";
import { sequelize } from "../utils/db";


class Membership extends Model {}

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