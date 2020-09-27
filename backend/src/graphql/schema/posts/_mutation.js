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
      const user = await context.user;
      if (user === null) {
        throw new AuthenticationError('User is not authentiated');
      }
      if (user.isAdmin === false) {
        throw new ForbiddenError('Only admins are allowed to perform this action');
      }

      const res = await Post.create({ author: user, ...args.postData });
      user.posts.push(res);
      return prepare(await Post.findOne({ _id: res._id })); 
    },
    updatePost: async (root, args, context, info) => {
      // TODO: before process file correctly
      const user = await context.user;
      if (user === null) {
        throw new AuthenticationError('User is not authentiated');
      }

      if (user.isAdmin === false) {
        throw new ForbiddenError('Only admins are allowed to perform this action');
      }

      const postId = args._id;
      const updateData = {
        updatedAt: new Date(Date.now()),
        ...args.postData,
      };

      const res = await Post.update({ _id: postId }, {
        $set: {
          ...updateData,
        },
      }).exec();
      return prepare(await Post.findById(postId));
    },
  },
};
