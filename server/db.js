const mongoose = require('mongoose');

// Local/self-hosted MongoDB URI (from your credentials)
const mongoURI = "mongodb://root:jfXDg9CeRVzQmTFaeUjQmsC6@172.21.148.166:27017/stayhealthybeta1";

const connectToMongo = async (retryCount) => {
    const MAX_RETRIES = 3;
    const count = retryCount ?? 0;

    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            authSource: "admin", // assuming root user is in admin DB
        });
        console.info('✅ Connected to Mongo Successfully');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error.message);
        const nextRetryCount = count + 1;
        if (nextRetryCount >= MAX_RETRIES) {
            throw new Error('Unable to connect to Mongo after multiple attempts.');
        }
        console.info(`Retrying... Attempt ${nextRetryCount}`);
        return await connectToMongo(nextRetryCount);
    }
};

module.exports = connectToMongo;
