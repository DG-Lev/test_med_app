const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');

// MongoDB Atlas URI (replace <db_password> with your actual password)
const mongoURI = "mongodb+srv://DG-Lev:k1cyCGnUF1yrbuPZ@cluster0.c2iuefl.mongodb.net/stayhealthybeta1?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient for testing connection
const client = new MongoClient(mongoURI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const connectToMongo = async (retryCount) => {
    const MAX_RETRIES = 3;
    const count = retryCount ?? 0;

    try {
        // Connect using mongoose for the application
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        
        // Test connection with ping
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB Atlas!");
        await client.close();
        
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
