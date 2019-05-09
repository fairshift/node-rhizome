import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import dummyUsers from './users'

export function setUpEmailLogin(app) {

  passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'plainPassword',
    },
    function(username, password, cb) {

      dummyUsers.findByEmail(username, function (err, user) {
        if (err) { return cb(err); }
        if (!user) { return cb(null, false); }
        if (user.password != password) { return cb(null, false); }
        console.log(user);
        return cb(null, user);
      });
  }));

  app.get('/auth/email/:email/:plainPassword', function(req, res, next){
    req.body.email = req.params.email; // GET to POST simulator!
    req.body.plainPassword = req.params.plainPassword; // GET to POST simulator!
    /*req.query.email = req.params.email; // GET to POST simulator!
    req.query.plainPassword = req.params.plainPassword; // GET to POST simulator!*/

    passport.authenticate('local', function(err, user, info){

      req.user = user;
      console.log("post-auth: "+req.user.email+req.user.password);

      if (err) {console.log('Error info: ', info);}
      else if (!user) {console.log('User not found: ' , info)}
      else {console.log('User activated')}
      res.redirect('/');
    })(req, res, next)
  });

}