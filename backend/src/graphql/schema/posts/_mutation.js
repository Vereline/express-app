import { gql } from 'apollo-server-express';
import Post from '../../../models/post';

const prepare = (o) => {
  o._id = o._id.toString();
  return o;
};

const Mutation = gql`
  extend type Mutation { 
    createPost(postData: PostInput): Post,
    updatePost(_id: String!, postData: PostInput): Post
  }
`;

export const mutationTypes = () => [Mutation];

export const mutationResolvers = {
  Mutation: { // ?????
    createPost: async (root, args, context, info) => {
      // TODO: before process file correctly
      const res = await Post.insert(args);
      return prepare(await Post.findOne({ _id: res.insertedIds[1] }));
    },
    updatePost: async (root, args, context, info) => {
      // TODO: before process file correctly
      const res = await Post.insert(args);
      return prepare(await Post.findOne({ _id: res.insertedIds[1] }));
    },
  },
};
