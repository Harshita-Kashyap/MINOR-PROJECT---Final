require("dotenv").config();
const bcrypt = require("bcryptjs");
const connectDB = require("./config/db");
const User = require("./models/User");

const seedUsers = async () => {
  try {
    await connectDB();

    const users = [
      {
        name: "Admin",
        email: "admin@gmail.com",
        phone: "9000000001",
        password: "admin123",
        role: "admin",
      },
      {
        name: "Selector",
        email: "selector@gmail.com",
        phone: "9000000002",
        password: "selector123",
        role: "selector",
      },
    ];

    for (const item of users) {
      const passwordHash = await bcrypt.hash(item.password, 10);

      await User.findOneAndUpdate(
        { email: item.email },
        {
          name: item.name,
          email: item.email,
          phone: item.phone,
          passwordHash,
          role: item.role,
        },
        {
          upsert: true,
          new: true,
          runValidators: true,
        }
      );

      console.log(`${item.role} user ready: ${item.email}`);
    }

    console.log("Seed completed successfully ✅");
    process.exit(0);
  } catch (error) {
    console.error("Seed failed ❌", error.message);
    process.exit(1);
  }
};

seedUsers();