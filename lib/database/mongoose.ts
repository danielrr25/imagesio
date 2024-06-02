// Setting up our connection with our database for a serveless architecture
import mongoose, { Mongoose } from 'mongoose'

const MONGODB_URL = process.env.MONGODB_URL

interface MongooseConnection {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
}

// Initializing the Cached Connection 
let cached: MongooseConnection = (global as any).mongoose

// Checls if a cached connection already exists. If not, initializes the cache
if(!cached) {
    cached = (global as any).mongoose = { 
        conn: null,
        promise: null 
    }
}

// Connects to the Database
export const connectToDatabase = async () => {

    // If we have a cache connection; exit out immediately 
    if(cached.conn) return cached.conn;

    if(!MONGODB_URL) throw new Error('Missing MONGODB_URL');

    cached.promise = cached.promise || mongoose.connect(MONGODB_URL, {
        dbName: 'Rumba', bufferCommands: false
    })

    cached.conn = await cached.promise;

    return cached.conn

}