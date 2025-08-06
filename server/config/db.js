const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // MongoDB 연결 옵션 업데이트
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // 5초 타임아웃
      socketTimeoutMS: 45000, // 소켓 타임아웃
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
  } catch (error) {
    console.error('Database connection error:'.red.bold, error.message);
    
    // 개발 환경에서는 더 자세한 에러 정보 출력
    if (process.env.NODE_ENV === 'development') {
      console.error('Full error:', error);
    }
    
    process.exit(1);
  }
};

module.exports = connectDB;
