import { gql } from 'apollo-server-express';
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
    comments: async () => (await Comment.find({}).populate('author').select('-__v')).map(prepare),
    comment: async (root, { _id }) => prepare(await Comment.findbyId(_id)),
  },
};
