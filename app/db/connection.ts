import Mongoose from 'mongoose';
import { Error as InternalError } from '../utils';

export const connect = () => {
  const connectionString = process.env.DB_CONNECTION_STRING;

  if (!connectionString) {
    throw new Error('No connection string');
  }

  return Mongoose.createConnection(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
};

export const DB_ERROR = InternalError('ERROR_DB', 'Database connection error');
