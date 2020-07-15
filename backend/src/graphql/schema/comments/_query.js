import { gql } from 'apollo-server-express';
import Comment from '../../../models/comment';

const Query = gql`
 extend type Query {
   comments: [Comment]
 }
`;

export const queryTypes = () => [Query];

export const queryResolvers = {
  Query: {
    comments: () => ([
      {
        text: "Harry Potter and the Sorcerer's stone",
        author: 'J.K. Rowling',
      },
      {
        text: 'Jurassic Park',
        author: 'Michael Crichton',
      },
    ]),
  },
};
