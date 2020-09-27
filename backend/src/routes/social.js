import express from 'express';
import mongoose from 'mongoose';

import passport from 'passport';
import Strategy from 'passport-github';
import socialController from '../controllers';
import config from '../config';
import User from '../models/user';

const { Router } = express;
const { social } = socialController;

const api = Router();


// used to serialize the user for the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});


passport.use(new Strategy(
  {
    clientID: config.GITHUB_CLIENT_ID,
    clientSecret: config.GITHUB_CLIENT_SECRET,
    callbackURL: config.GITHUB_CALLBACK_URL,
  },
  ((accessToken, refreshToken, profile, done) => {
    // done();
    // make the code asynchronous
    // User.findOne won't fire until we have all our data back from Github

    process.nextTick(() => {
      // try to find the user based on their Github id

      // TODO check for unique emails
      User.findOne({
        githubId: profile.id,
      }, (err, user) => {
        if (err) { return done(err); }

        if (user) {
          // if a user is found, log them in
          return done(null, user);
        }
        // if the user isnt in our database, create a new user
        let email = profile._json.email;
        if (!email) {
          email = `${Date.now().toString()}@express.app`;
        }
        const newUser = new User({
          _id: new mongoose.Types.ObjectId(),
          githubId: profile.id,
          email, // pull the first email
          password: profile.node_id,
          firstName: profile.displayName,
          lastName: profile.username,
          birthDate: profile._json.created_at,
          photo: profile.photos[0].value,
          isAdmin: false,
        });
        // save the user
        newUser.save((error) => {
          if (error) { throw error; }
          return done(null, newUser);
        });
      });
    });
  }),
));


/**
 * @swagger
 * /api/social/github:
 *   get:
 *     tags: ["Social"]
 *     description: Login with OAuth via github application
 *     produces:
 *      - application/json
 *     responses:
 *       201:
 *         description: Success
 */
api.get('/github', passport.authenticate('github', { scope: ['user:email'] }), social.loginGithub);


/**
 * @swagger
 * /api/social/github/callback:
 *   get:
 *     tags: ["Social"]
 *     description: Login callback with OAuth via github application
 *     produces:
 *      - application/json
 *     responses:
 *       201:
 *         description: Success
 */
api.get('/github/callback', passport.authenticate('github', { failureRedirect: 'http://localhost:4200/login' }), social.loginGithubCallback);

export default api;
