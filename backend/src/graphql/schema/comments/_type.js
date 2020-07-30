import { gql } from 'apollo-server-express';

const Comment = gql`
 type CommentAuthor {
  _id: String
  firstName: String
  lastName: String
  email: String
  isAdmin: String
 }

 type Comment {
   _id: String!
   text: String!
   post: String
   author: CommentAuthor
   createdAt: String!
   updatedAt: String!
 }`;

export const types = () => [Comment];

export const typeResolvers = {

};
