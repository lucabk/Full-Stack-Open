import { DataTypes, QueryInterface } from 'sequelize';
import { bookStatus } from '../utils/type';

module.exports = {
  up: async ({ context: queryInterface }: { context: QueryInterface }) => {
    await queryInterface.createTable('readingLists', {
      
        id:{
            type:DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        status:{
            type:DataTypes.STRING,
            defaultValue: bookStatus.UNREAD
        
        }
    });

    await queryInterface.createTable('memberships', {
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
    });


  },

  down: async ({ context: queryInterface }: { context: QueryInterface }) => {
    await queryInterface.dropTable('readingLists');
    await queryInterface.dropTable('memberships');
  },
};