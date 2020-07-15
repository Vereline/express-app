import { gql } from 'apollo-server-express';

const Mutation = gql`
  extend type Mutation { 
    _: Boolean
  }
`;

export const mutationTypes = () => [Mutation];

export const mutationResolvers = {

};
