import { IItem } from '../item';
import { Item as GraphqlItem } from '../../graphql';

export default class ItemGraphqlAdapter {
  public static itemToGraphql(item: IItem): GraphqlItem {
    return {
      id: item.id,
      type: item.type,
      name: item.name,
      x: item.x,
      y: item.y,
      width: item.width,
      length: item.length,
      height: item.height,
    };
  }
}