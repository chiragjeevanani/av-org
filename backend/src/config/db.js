import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/av_org');
    console.log(`[MongoDB] Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`[MongoDB] Critical Database Connection Error: ${error.message}`);
    console.error(`[MongoDB] URI Attempted: ${process.env.MONGODB_URI ? '[Configured]' : 'mongodb://127.0.0.1:27017/av_org'}`);
    process.exit(1);
  }
};
