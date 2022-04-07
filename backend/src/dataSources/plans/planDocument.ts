import { Plan, PlanInput } from '../../graphql';
import { assertDefined, unwrapOrUndefined } from '../../graphqlInput';

export interface PlanDocument {
  _id?: string;
  userId: string;
  name?: string;
  room: Room;
  items: PlanDocumentItem[];
}

interface Modifiers {
  [key: string]: string[];
}

interface PlanDocumentItem {
  id: string;
  type: string;
  name: string;
  x?: number;
  y?: number;
  width?: number;
  length?: number;
  height?: number;
  rotation?: number;
  modifiers: Modifiers;
}

interface Room {
  width: number;
  length: number;
}

export function planDocumentToGraphql(planDocument: PlanDocument): Plan {
  return {
    id: assertDefined(planDocument._id).toString(),
    name: planDocument.name,
    room: {
      width: planDocument.room.width,
      length: planDocument.room.length,
    },
    items: planDocument.items.map((item) => ({
      id: item.id,
      type: item.type,
      name: item.name,
      x: item.x,
      y: item.y,
      width: item.width,
      length: item.length,
      height: item.height,
      rotation: item.rotation,
      modifiers: item.modifiers,
    })),
  };
}

export function planDocumentFromGraphql(
  plan: PlanInput,
  userId: string
): PlanDocument {
  return {
    userId,
    name: unwrapOrUndefined(plan.name),
    room: {
      width: plan.room.width,
      length: plan.room.length,
    },
    items: plan.items.map((item) => ({
      id: item.id,
      type: item.type,
      name: item.name,
      x: unwrapOrUndefined(item.x),
      y: unwrapOrUndefined(item.y),
      width: unwrapOrUndefined(item.width),
      length: unwrapOrUndefined(item.length),
      height: unwrapOrUndefined(item.height),
      rotation: unwrapOrUndefined(item.rotation),
      modifiers: unwrapOrUndefined(item.modifiers),
    })),
  };
}
