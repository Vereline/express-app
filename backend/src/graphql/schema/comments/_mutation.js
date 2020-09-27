import { gql, AuthenticationError } from 'apollo-server-express';
import Comment from '../../../models/comment';
import Post from '../../../models/post';

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
  Mutation: { // TODO also test this flow?????
    createComment: async (root, args, context, info) => {
      const user = await context.user;
      if (user === null) {
        throw new AuthenticationError('User is not authentiated');
      }
      const post = await Post.findById(args.commentData.post)
      const res = await Comment.create(...args.commentData, post);
      post.comments.push(res);
      return prepare(await Comment.findOne({ _id: res._id }));
    },
    updateComment: async (root, args, context, info) => {
      const user = await context.user;
      if (user === null) {
        throw new AuthenticationError('User is not authentiated');
      }

      const commentId = args._id;
      const updateData = {
        updatedAt: new Date(Date.now()),
        ...args.commentData,
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
