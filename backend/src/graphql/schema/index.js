import fs from 'fs';
import path from 'path';
import { ApolloServer, gql } from 'apollo-server-express';
import { merge } from 'lodash';

const Query = gql`
 type Query {
   status: String
 }
`;

const Mutation = gql`
 type Mutation {
   _empty: String
 }
`;

let resolvers = {
  Query: {
    status: () => 'ok',
  },
};

const typeDefs = [Query, Mutation];

// Read the current directory and load types and resolvers automatically
fs.readdirSync(__dirname)
  .filter(dir => (dir.indexOf('.') < 0))
  .forEach((dir) => {
    const tmp = require(path.join(__dirname, dir)).default; // eslint-disable-line
    resolvers = merge(resolvers, tmp.resolvers);
    const types = tmp.types();
    // eslint-disable-next-line no-unused-vars
    types.forEach((item, _) => {
      typeDefs.push(item()[0]);
    });
  });

const schema = new ApolloServer({
  typeDefs,
  resolvers,
  playground: {
    // endpoint: '/graphql',
    settings: {
      'editor.theme': 'dark',
    },
  },
});

export default schema;
