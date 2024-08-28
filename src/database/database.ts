import { connect, disconnect, connection } from 'mongoose';
import { PingError } from '../errors/pingError';
import { dbError } from '../errors/dbError';

export async function databaseConnect(mongoUri: string): Promise<void> {
  try {
    await connect(mongoUri);
  } catch {
    throw new dbError();
  }
}

export async function databaseDisconnect(): Promise<void> {
  await disconnect();
}

export async function databaseLatency(): Promise<number> {
  const start = Date.now();
  try {
    await connection.db?.command({ping: 1})
  } catch {
    throw new PingError()
  }
  return Date.now() - start;
}
