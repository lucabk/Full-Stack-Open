import { DataTypes, QueryInterface } from 'sequelize';

module.exports = {
  up: async ({ context: queryInterface }: { context: QueryInterface }) => {
    await queryInterface.createTable('user_sessions', {
      
        sid:{
            type:DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        expires: {
            type: DataTypes.DATE,
        },
        data: {
            type: DataTypes.TEXT,
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
    await queryInterface.dropTable('user_sessions');
  },
};