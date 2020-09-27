import fs from 'fs';
import path from 'path';
import { ApolloServer, gql } from 'apollo-server-express';
// import { graphqlUploadExpress } from 'graphql-upload';
import { merge } from 'lodash';
import jwt from 'jsonwebtoken';
import config from '../../config';
import User from '../../models/user';

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


async function getUser(userId) {
  const user = await User.findById(userId);
  return user;
}

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
  context: async ({ req, res }) => {
    // https://www.apollographql.com/docs/apollo-server/security/authentication/
    let userData = null;
    try {
      const token = req.headers.authorization.split(' ')[1];
      userData = jwt.verify(token, config.JWT_KEY);
      const user = getUser(userData.userId);
      return { user };
    } catch (error) {
      console.log('Token is missing or incorrect');
    }
    return { user: userData };
  },
});

export default schema;
