const mongoose = require('mongoose');
const config = require('./config');

//const mongoURI = "mongodb+srv://sumitnegi9667:m17gUxaKtppVvpke@cluster0.710ftpb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.MONGODB_URI);
    console.log(`✅ MongoDB connected successfully: ${conn.connection.host}`);
    return conn;
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    throw err;
  }
};

module.exports = connectDB;
