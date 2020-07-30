import { gql } from 'apollo-server-express';
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
    posts: async () => (await Post.find({}).populate('author').select('-__v')).map(prepare),
    post: async (root, { _id }) => prepare(await Post.findbyId(_id).select('-__v')),
  },
};
