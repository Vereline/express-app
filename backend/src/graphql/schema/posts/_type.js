import { gql } from 'apollo-server-express';

const Post = gql`
 type PostAuthor {
  _id: String
  firstName: String
  lastName: String
  email: String
  isAdmin: String
}

 type Post {
   _id: String!
   title: String!
   postText: String!
   image: String
   author: PostAuthor
   createdAt: String!
   updatedAt: String!
   comments: [Comment]
 }`;

export const types = () => [Post];

export const typeResolvers = {

};
