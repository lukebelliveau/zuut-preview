import { gql } from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Modifiers: any;
};

export type AmazonProduct = {
  __typename?: 'AmazonProduct';
  ASIN: Scalars['String'];
  name: Scalars['String'];
};

export type Item = {
  __typename?: 'Item';
  amazonProducts?: Maybe<Array<Maybe<AmazonProduct>>>;
  description?: Maybe<Scalars['String']>;
  height?: Maybe<Scalars['Float']>;
  id: Scalars['ID'];
  length?: Maybe<Scalars['Float']>;
  modifiers?: Maybe<Scalars['Modifiers']>;
  name: Scalars['String'];
  rotation?: Maybe<Scalars['Float']>;
  type?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Float']>;
  x?: Maybe<Scalars['Float']>;
  y?: Maybe<Scalars['Float']>;
};

export type ItemInput = {
  amazonProducts?: InputMaybe<Array<InputMaybe<AmazonProduct>>>;
  description?: InputMaybe<Scalars['String']>;
  height?: InputMaybe<Scalars['Float']>;
  id: Scalars['ID'];
  length?: InputMaybe<Scalars['Float']>;
  modifiers?: InputMaybe<Scalars['Modifiers']>;
  name: Scalars['String'];
  rotation?: InputMaybe<Scalars['Float']>;
  type: Scalars['String'];
  width?: InputMaybe<Scalars['Float']>;
  x?: InputMaybe<Scalars['Float']>;
  y?: InputMaybe<Scalars['Float']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createPlan: Scalars['ID'];
  deleteAllPlans?: Maybe<Array<Maybe<Plan>>>;
  updatePlan: Plan;
};


export type MutationCreatePlanArgs = {
  plan: PlanInput;
};


export type MutationUpdatePlanArgs = {
  plan: PlanInput;
};

export type Plan = {
  __typename?: 'Plan';
  id: Scalars['ID'];
  items: Array<Item>;
  name?: Maybe<Scalars['String']>;
  room?: Maybe<Room>;
};

export type PlanInput = {
  id?: InputMaybe<Scalars['ID']>;
  items: Array<ItemInput>;
  name?: InputMaybe<Scalars['String']>;
  room: RoomInput;
};

export type Query = {
  __typename?: 'Query';
  plans?: Maybe<Array<Plan>>;
};

export type Room = {
  __typename?: 'Room';
  length: Scalars['Float'];
  width: Scalars['Float'];
};

export type RoomInput = {
  length: Scalars['Float'];
  width: Scalars['Float'];
};
