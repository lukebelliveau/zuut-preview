export interface Adapter<T> {
  select(): T;
  selectById(id: string): T;
  create(item: T): void;
  update(item: T): void;
}