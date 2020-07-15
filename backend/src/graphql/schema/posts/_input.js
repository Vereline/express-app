import { gql } from 'apollo-server-express';

const Input = gql`
   input PostInput {
      title: String!
      postText: String!
      image: String!
      author: String!
   } 
`;

export default () => [Input];
