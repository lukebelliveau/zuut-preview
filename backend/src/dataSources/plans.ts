import { MongoDataSource } from "apollo-datasource-mongodb";
import { ObjectId } from 'mongodb';
import { Plan, PlanInput } from "../graphql";
import { GraphqlContext } from "../server";

interface PlanDocument {
  _id: ObjectId
  userId: string | undefined
  name: string | undefined
  room: Room
}

interface Room {
  width: number
  length: number
}

export default class Plans extends MongoDataSource<PlanDocument, GraphqlContext> {
  async all(): Promise<Plan[]> {
    const list = await this.findByFields({
      userId: this.userId || '0'
    });

    const filteredList: PlanDocument[] = [];
    list.forEach(item => item ? filteredList.push(item) : undefined);
    
    return filteredList.map(planDocument => ({
      id: planDocument._id.toString(),
      name: planDocument.name,
      room: {
        width: planDocument.room.width,
        length: planDocument.room.length,
      }
    }));
  }

  getPlan(id: string) {
    return this.findOneById(id);
  }

  async create(planInput: PlanInput) {
    return this.collection.insertOne(
      {
        _id: planInput.id,
        userId: this.userId,
        name: planInput.name,
        room: {
          width: planInput.room.width,
          length: planInput.room.length,
        }
      }
    )
  }

  get userId() {
    return this.context.user.sub;
  }
}