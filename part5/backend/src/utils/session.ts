import session from 'express-session';
import { sequelize } from './db';
import connectSessionSequelize from 'connect-session-sequelize';
import { COOKIES_KEY } from './config';


// Initialize Sequelize store
const SequelizeStore = connectSessionSequelize(session.Store);
const sessionStore = new SequelizeStore({
  db: sequelize,
  tableName: 'user_sessions',
  checkExpirationInterval: 15 * 60 * 1000, // The interval at which to cleanup expired sessions in milliseconds (15 minutes)
  //expiration: 2 * 60 * 1000,             // The maximum age in ms of a valid session (2 minutes) [server side] (if cookie is set the value of expiration is taken from there)
});


// middleware session configuration
const sessionMiddleware = session({
  store: sessionStore,                       // Use connect-session-sequelize to store sessions in the PostgreSQL database
  secret: COOKIES_KEY,                       // Secret key for signing session cookies
  resave: false,                             // Do not save session if unmodified
  saveUninitialized: false,                  // Do not create session until something is stored
  cookie: { maxAge: 20 * 60 * 1000 }         // Set cookie expiration in ms [client side]
})

export default sessionMiddleware