import { QueryInterface } from 'sequelize';
import bcrypt from 'bcrypt';

module.exports = {
  up: async ({ context: queryInterface }: { context: QueryInterface }) => {
    const users = await queryInterface.sequelize.query(
      `SELECT id FROM users WHERE username = 'user1@example.com' OR username = 'user2@example.com';`
    );

    if (users[0].length === 0) {
      await queryInterface.bulkInsert('users', [
        {
          username: 'user1@example.com',
          name: 'User One',
          password: await bcrypt.hash('password1', 10),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: 'user2@example.com',
          name: 'User Two',
          password: await bcrypt.hash('password2', 10),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    }

    const blogs = await queryInterface.sequelize.query(
      `SELECT id FROM blogs WHERE title = 'Blog One' OR title= 'Blog Two';`
    );

    if (blogs[0].length === 0) {
      await queryInterface.bulkInsert('blogs', [
        {
          author: 'Author One',
          url: 'http://example.com/blog1',
          title: 'Blog One',
          likes: 10,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          author: 'Author Two',
          url: 'http://example.com/blog2',
          title: 'Blog Two',
          likes: 20,
          userId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    }
  },

  down: async ({ context: queryInterface }: { context: QueryInterface }) => {
    await queryInterface.bulkDelete('blogs', {}, {});
    await queryInterface.bulkDelete('users', {}, {});
  },
};