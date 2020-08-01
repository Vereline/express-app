import { gql, AuthenticationError, ForbiddenError } from 'apollo-server-express';
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
  Mutation: {
    createPost: async (root, args, context, info) => {
      // TODO: before process file correctly
      if (context.user === null) {
        throw new AuthenticationError('User is not authentiated');
      }
      if (context.user.isAdmin === false) {
        throw new ForbiddenError('Only admins are allowed to perform this action');
      }

      const res = await Post.create(...args);
      return prepare(await Post.findOne({ _id: res._id })); // return res ???
    },
    updatePost: async (root, args, context, info) => {
      // TODO: before process file correctly

      if (context.user === null) {
        throw new AuthenticationError('User is not authentiated');
      }

      if (context.user.isAdmin === false) {
        throw new ForbiddenError('Only admins are allowed to perform this action');
      }

      const postId = args._id;
      const updateData = {
        updatedAt: new Date(Date.now()),
        ...args,
      };

      const res = await Post.update({ _id: postId }, {
        $set: {
          ...updateData,
        },
      });
      return prepare(res);
    },
  },
};
