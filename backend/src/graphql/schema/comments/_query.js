import { gql, AuthenticationError } from 'apollo-server-express';
import Comment from '../../../models/comment';

const prepare = (o) => {
  o._id = o._id.toString();
  return o;
};

const Query = gql`
 extend type Query {
   comments: [Comment],
   comment(_id: String!): Comment
 }
`;

export const queryTypes = () => [Query];

export const queryResolvers = {
  Query: {
    comments: async (root, args, context, info) => {
      if (context.user === null) {
        throw new AuthenticationError('User is not authentiated');
      }
      return (await Comment.find({}).populate('author').select('-__v')).map(prepare);
    },
    comment: async (root, args, context, info) => {
      if (context.user === null) {
        throw new AuthenticationError('User is not authentiated');
      }
      return prepare(await Comment.findById(args._id).populate('author'));
    },
  },
};
