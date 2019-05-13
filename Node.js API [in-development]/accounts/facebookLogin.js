import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';

import {
  FACEBOOK_APP_ID,
  FACEBOOK_APP_SECRET,
} from '../local/facebookKeys';

export function setUpFacebookLogin(app) {

  //Authenticate
  app.get('/auth/facebook/:callbackDomain', function(req, res, next){
    app.set("callbackUrl", "http://"+req.params.callbackDomain+"/auth/callback/facebook");
    setUpFacebookStrategy(app);
    next();
  });

  app.get('/auth/facebook/:callbackDomain', passport.authenticate('facebook', { authType: 'rerequest', scope: ['email'] }));

  //Callback
  app.get('/auth/callback/facebook', function(req, res, next){
    setUpFacebookStrategy(app);
    next();
  });

  app.get('/auth/callback/facebook',
    passport.authenticate('facebook', { failureRedirect: '/' }),
    (req, res) => res.redirect('/'));
}

function setUpFacebookStrategy(app){
  passport.use(new FacebookStrategy({
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: app.settings.callbackUrl || 'http://localhost:3000/auth/callback/facebook',
      profileFields: ['id', 'displayName', 'email']
    } , (accessToken, refreshToken, profile, cb) => {
    console.log(profile);
    cb(null, profile);
  }));
}