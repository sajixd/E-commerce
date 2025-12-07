const User = require('../models/User');

const seedAdmin = async () => {
      try {
            // Check if admin already exists
            const adminExists = await User.findOne({ email: 'sajid@admin.com' });

            if (!adminExists) {
                  await User.create({
                        name: 'sajid',
                        email: 'sajid@admin.com',
                        password: 'sajid786',
                        role: 'admin'
                  });
                  console.log('✅ Default admin created: sajid@admin.com / sajid786');
            } else {
                  console.log('✅ Admin user already exists');
            }
      } catch (error) {
            console.error('Error seeding admin:', error.message);
      }
};

module.exports = seedAdmin;
