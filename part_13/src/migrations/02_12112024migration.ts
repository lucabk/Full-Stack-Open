import { DataTypes, QueryInterface } from 'sequelize';
import { blogStatus } from '../utils/type';

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
            defaultValue: blogStatus.UNREAD
        
        }, 
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: 'users',
              key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
          updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
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
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
          updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        }
    });


  },

  down: async ({ context: queryInterface }: { context: QueryInterface }) => {
    await queryInterface.dropTable('readingLists');
    await queryInterface.dropTable('memberships');
  },
};