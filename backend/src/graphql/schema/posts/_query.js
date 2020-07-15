import { gql } from 'apollo-server-express';
import Post from '../../../models/post';

const Query = gql`
 extend type Query {
   posts: [Post]
 }
`;

export const queryTypes = () => [Query];

export const queryResolvers = {
  Query: {
    posts: () => ([
      {
        title: "Harry Potter and the Sorcerer's stone",
        author: 'J.K. Rowling',
      },
      {
        title: 'Jurassic Park',
        author: 'Michael Crichton',
      },
    ]),
  },
};
