import { gql } from 'apollo-server-express';

const Post = gql`
 type Post {
   _id: String!
   title: String!
   postText: String!
   image: String!
   author: String!
   createdAt: Date!
   updatedAt: Date!
 }`;

export const types = () => [Post];

export const typeResolvers = {

};
