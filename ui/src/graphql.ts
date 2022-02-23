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
};

export type Mutation = {
  __typename?: 'Mutation';
  createPlan?: Maybe<Scalars['ID']>;
};


export type MutationCreatePlanArgs = {
  plan: PlanInput;
};

export type Plan = {
  __typename?: 'Plan';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  room?: Maybe<Room>;
};

export type PlanInput = {
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
  room: RoomInput;
};

export type Query = {
  __typename?: 'Query';
  plans?: Maybe<Array<Maybe<Plan>>>;
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