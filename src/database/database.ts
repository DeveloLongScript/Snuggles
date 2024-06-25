import {Collection, Db, MongoClient} from 'mongodb';

interface IDatabase {
  connect(uri: string, dbName: string): Promise<void>;
  disconnect(): Promise<void>;
  getCollection<T extends Document>(name: string): Collection<T>;
  measureLatency(): Promise<number>;
}

class Database implements IDatabase {
  private client: MongoClient | null = null;
  private db: Db | null = null;

  public async connect(uri: string, dbName: string): Promise<void> {
    this.client = new MongoClient(uri);
    await this.client.connect();
    this.db = this.client.db(dbName);
  }

  public async disconnect(): Promise<void> {
    await this.client?.close();
  }

  public getCollection<T extends Document>(name: string): Collection<T> {
    return this.db!.collection<T>(name);
  }

  public async measureLatency(): Promise<number> {
    const start = Date.now();
    await this.db?.command({ping: 1});
    return Date.now() - start;
  }
}

export default Database;
