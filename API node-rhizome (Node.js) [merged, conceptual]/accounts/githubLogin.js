import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github';
import GitHubConnector from '../github/connector';

import {
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
} from '../local/githubKeys';

export function setUpGitHubLogin(app) {

  //Authenticate
  app.get('/auth/github/:callbackDomain', function(req, res, next){
    console.log()
    app.set("callbackUrl", "http://"+req.params.callbackDomain+"/auth/callback/github");
    setUpGitHubStrategy(app);
    next();
  });
  app.get('/auth/github/:callbackDomain',
    passport.authenticate('github', { scope: 'user:email'}));
  
  //Callback
  app.get('/auth/callback/github', function(req, res, next){
    setUpGitHubStrategy(app);
    next();
  });

  app.get('/auth/callback/github',
    passport.authenticate('github', { failureRedirect: '/' }),
    (req, res) => res.redirect('/'));
}

function setUpGitHubStrategy(app){

  console.log(app.settings.callbackUrl);

  passport.use(new GitHubStrategy({
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: app.settings.callbackUrl || 'http://localhost:3000/auth/callback/github',
    }, (accessToken, refreshToken, profile, cb) => {
      console.log(profile);
      cb(null, profile);
  }));
}

/*const gitHubStrategyOptions = {
  clientID: GITHUB_CLIENT_ID,
  clientSecret: GITHUB_CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/auth/github/callback',
  scope: 'user:email'
};*/