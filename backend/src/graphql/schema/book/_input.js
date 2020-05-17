import { gql } from 'apollo-server-express';

const Input = gql`
   input BookInput {
       author: String!
   } 
`;

export default () => [Input];
