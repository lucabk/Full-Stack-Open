import { DataTypes, Model } from "sequelize";
import { sequelize } from "../utils/db";


// user model interface
interface UserAttributes {
    id?: number;
    username: string;
    name: string;
    password: string;
    disabled?: boolean;
}
  
class User extends Model<UserAttributes> implements UserAttributes {
    public id!: number;
    public username!: string;
    public name!: string;
    public password!: string;
    public disabled!: boolean;
}
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
        },
        disabled: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },
    {
        sequelize,
        tableName: 'users',
        timestamps: true,
        modelName: 'user',

        defaultScope: {
            where: {
                disabled: false
            }
        },
        /*the query caused by the function call User.findAll() has the following WHERE condition:
        WHERE "user". "disabled" = false;*/

        scopes: {
            disabled: {
                where: {
                    disabled: true
                }
            }
        }
        /* to fetch all inactive users:
        const disabledUsers = await User.scope('disabled').findAll()*/
    }
)

export default User