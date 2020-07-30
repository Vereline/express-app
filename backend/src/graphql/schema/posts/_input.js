import { gql } from 'apollo-server-express';

const Input = gql`
   input File {
      filename: String!
      mimetype: String!
      encoding: String!
   }

   input PostInput {
      title: String!
      postText: String!
      image: File
      author: String
   } 
`;

export default () => [Input];
