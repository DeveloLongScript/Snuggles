import { connect, disconnect, connection } from 'mongoose';

export async function databaseConnect(mongoUri: string): Promise<void> {
  await connect(mongoUri);
}

export async function databaseDisconnect(): Promise<void> {
  await disconnect();
}

export async function databaseLatency(): Promise<number> {
  const start = Date.now();
  await connection.db.command({ping: 1});
  return Date.now() - start;
}
