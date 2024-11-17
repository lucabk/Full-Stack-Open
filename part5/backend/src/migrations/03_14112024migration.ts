import { DataTypes, QueryInterface } from 'sequelize';

module.exports = {
    up: async ({ context: queryInterface }: { context: QueryInterface }) => {
        await queryInterface.addColumn('users', 'disabled', {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        })
    }
}