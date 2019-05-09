import passport from 'passport';
import knex from '../sql/connector';
import session from 'express-session';

import { setUpEmailLogin } from './emailLogin'
import { setUpFacebookLogin } from './facebookLogin'
import { setUpGitHubLogin } from './githubLogin'

const KnexSessionStore = require('connect-session-knex')(session);
const sessionStore = new KnexSessionStore({
  knex,
});

function runAuth(app){
	app.use(session({
	  secret: 'your secret',
	  resave: true,
	  saveUninitialized: true,
	  store,
	}));

	app.use(passport.initialize());
	app.use(passport.session());

	setUpFacebookLogin(app);
	setUpGitHubLogin(app);
	setUpEmailLogin(app);

	app.get('/logout', (req, res) => {
	  req.logout();
	  res.redirect('/');
	});

	return store;
}

export { runAuth, session, store }

passport.serializeUser((user, cb) => cb(null, user));
passport.deserializeUser((obj, cb) => cb(null, obj));