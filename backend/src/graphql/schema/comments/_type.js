import { gql } from 'apollo-server-express';

const Comment = gql`
 type Comment {
   _id: String!
   text: String!
   post: String!
   author: String!
   createdAt: String!
   updatedAt: String!
 }`;

export const types = () => [Comment];

export const typeResolvers = {

};
