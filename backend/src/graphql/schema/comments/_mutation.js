import { gql } from 'apollo-server-express';
import Comment from '../../../models/comment';

const prepare = (o) => {
  o._id = o._id.toString();
  return o;
};

const Mutation = gql`
  extend type Mutation { 
    createComment(commentData: CommentInput): Comment,
    updateComment(_id: String!, commentData: CommentInput): Comment
  }
`;

export const mutationTypes = () => [Mutation];

export const mutationResolvers = {
  Mutation: { // ?????
    createComment: async (root, args, context, info) => {
      const res = await Comment.insert(args);
      return prepare(await Comment.findOne({ _id: res.insertedIds[1] }));
    },
    updateComment: async (root, args, context, info) => {
      const res = await Comment.insert(args);
      return prepare(await Comment.findOne({ _id: res.insertedIds[1] }));
    },
  },
};
