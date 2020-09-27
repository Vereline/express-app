import { gql, AuthenticationError } from 'apollo-server-express';
import Post from '../../../models/post';

const prepare = (o) => {
  o._id = o._id.toString();
  return o;
};

const Query = gql`
 extend type Query {
   posts: [Post], 
   post(_id: String!): Post
 }
`;

export const queryTypes = () => [Query];

export const queryResolvers = {
  Query: {
    posts: async (root, args, context, info) => {
      const user = await context.user;
      if (user === null) {
        throw new AuthenticationError('User is not authentiated');
      }
      return (await Post.find({}).populate('author').select('-__v')).map(prepare);
    },
    post: async (root, args, context, info) => {
      const user = await context.user;
      if (user === null) {
        throw new AuthenticationError('User is not authentiated');
      }
      return prepare(await Post.findById(args._id).populate('author').populate({
        path: 'comments',
        populate: { path: 'author' },
      }).select('-__v'));
    },
  },
};
