// import config from '../config';
import schema from './schema';
import middlewares from '../middlewares';

const { upload } = middlewares;
export default (app) => {
  schema.applyMiddleware({
    app,
    path: '/graphql',
  }, upload.any());
};
