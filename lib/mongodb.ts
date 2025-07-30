import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('⚠️ Please define the MONGODB_URI in .env.local');
}

type MongooseCache = { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };
declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

const globalAny = global as typeof globalThis & { mongooseCache?: MongooseCache };

if (!globalAny.mongooseCache) {
  globalAny.mongooseCache = { conn: null, promise: null };
}

const cached = globalAny.mongooseCache!;

export async function connectToDatabase() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI);
  }
  cached.conn = await cached.promise;
  return cached.conn;
} 