import { MongoDataSource } from "apollo-datasource-mongodb";
import { ObjectId } from 'mongodb';
import { GraphqlContext } from "../server";

interface PlanDocument {
  _id: ObjectId
  username: string
  password: string
  email: string
  interests: [string]
}

export default class Plans extends MongoDataSource<PlanDocument, GraphqlContext> {
  getPlan(id: string) {
    return this.findOneById(id);
  }

  create(id: string, name?: string) {
    this.collection.insertOne({
      _id: id,
      userId: this.context.user.sub,
      name,
    });
  }
}