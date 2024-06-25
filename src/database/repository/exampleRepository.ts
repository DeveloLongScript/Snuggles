import {Collection, InsertOneResult} from "mongodb";
import Database from "../database";

interface Example extends Document {
  name: string;
  value: number;
}

class ExampleRepository {
  private collection: Collection<Example>;

  constructor(db: Database) {
    this.collection = db.getCollection<Example>("example");
  }

  public async insertExample(example: Example): Promise<InsertOneResult<Example>> {
    return this.collection.insertOne(example);
  }

  public async findExampleByName(name: string): Promise<Example | null> {
    return this.collection.findOne({name});
  }

  /* ... */
}

export default ExampleRepository;
export {Example};