import { gql, AuthenticationError } from 'apollo-server-express';
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
      if (context.user === null) {
        throw new AuthenticationError('User is not authentiated');
      }

      const res = await Comment.create(...args);
      return prepare(res);
    },
    updateComment: async (root, args, context, info) => {
      if (context.user === null) {
        throw new AuthenticationError('User is not authentiated');
      }

      const commentId = args._id;
      const updateData = {
        updatedAt: new Date(Date.now()),
        ...args,
      };

      const res = await Comment.update({ _id: commentId }, {
        $set: {
          ...updateData,
        },
      });
      return prepare(res);
    },
  },
};
