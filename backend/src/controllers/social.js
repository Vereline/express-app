import passport from 'passport';
import Strategy from 'passport-github';
import config from '../config';
import User from '../models/user';


passport.use(new Strategy(
  {
    clientID: config.GITHUB_CLIENT_ID,
    clientSecret: config.GITHUB_CLIENT_SECRET,
    callbackURL: config.GITHUB_CALLBACK_URL,
  },
  ((accessToken, refreshToken, profile, cb) => {
    User.findOrCreate({ githubId: profile.id }, (err, user) => cb(err, user));
  }),
));

export default {
  loginGithub(req, res, next) {
    passport.authenticate('github');
  },

  loginGithubCallback(req, res, next) {
    passport.authenticate('github', { failureRedirect: '/login' }),
    // Successful authentication, redirect home. TODO return user information as in the login success
    res.redirect('/');
  },
};
