import mongoose from "mongoose";

const db = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("DB connected successfully.");
  } catch (error) {
    console.error("DB connection error: ", error.message);
  }
};

export default db;
