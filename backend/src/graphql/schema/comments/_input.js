import { gql } from 'apollo-server-express';

const Input = gql`
   input CommentInput {
       _id: String
       text: String!
       post: String
       author: String!
   } 
`;

export default () => [Input];
