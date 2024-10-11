import { DataTypes, Model } from "sequelize";
import { sequelize } from "../utils/db";


class User extends Model {}
User.init(
    {
        id:{
            type:DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate : {
                isEmail:true // checks for email format (foo@bar.com)
            }
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: 'users',
        timestamps: true,
        modelName: 'user'
    }
)

export default User