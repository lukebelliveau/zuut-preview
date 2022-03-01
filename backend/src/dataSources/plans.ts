import { MongoDataSource } from "apollo-datasource-mongodb";
import { ObjectId } from "mongodb";

import { Plan, PlanInput } from "../graphql";
import { assertDefined } from "../graphqlInput";
import { GraphqlContext } from "../server";
import { PlanDocument, planDocumentFromGraphql, planDocumentToGraphql } from "./plans/planDocument";

export default class Plans extends MongoDataSource<PlanDocument, GraphqlContext> {
  async all(): Promise<Plan[]> {
    const list = await this.findByFields({
      userId: this.userId
    });

    const filteredList: PlanDocument[] = list.map(assertDefined);
    
    return filteredList.map(planDocumentToGraphql);
  }

  async getPlan(id: string) {
    const planDocument = assertDefined(await this.findOneById(id));

    return planDocumentToGraphql(planDocument);
  }

  async create(planInput: PlanInput): Promise<string> {
    const planDocument = planDocumentFromGraphql(planInput, this.userId);
    const result = await this.collection.insertOne(planDocument);
    return result.insertedId.toString();
  }

  async update(planInput: PlanInput): Promise<Plan> {
    const planId = assertDefined(planInput.id);
    await this.collection.replaceOne({
      _id: new ObjectId(planId),
      userId: this.userId,
    }, planDocumentFromGraphql(planInput, this.userId));
    
    return this.getPlan(planId);
  }

  get userId() {
    return assertDefined(this.context.user.sub);
  }
}