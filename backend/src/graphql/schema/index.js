import fs from 'fs';
import path from 'path';
import { ApolloServer, gql } from 'apollo-server-express';
// import { GraphQLUpload } from 'graphql-upload';
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
  // Upload: GraphQLUpload,
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
    const context = {};
    // https://www.apollographql.com/docs/apollo-server/security/authentication/
    let userData = null;
    // TODO: save the image from stream (I give up doing this, as GQL cannot upload file by
    // itself -> I have no idea how to handle stream)
    if (req.body.variables && req.body.variables.postData) {
      try {
        const image = await req.body.variables.postData.image;
        console.log(image);
        context.image = image;
      } catch (error) {
        console.log('Image in this request is missing');
      }
    }

    try {
      const token = req.headers.authorization.split(' ')[1];
      userData = jwt.verify(token, config.JWT_KEY);
      const user = getUser(userData.userId);
      context.user = user;
      return context;
    } catch (error) {
      console.log('Token is missing or incorrect');
    }
    context.user = userData;
    return context;
  },
});

export default schema;
