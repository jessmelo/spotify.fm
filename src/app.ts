import {getUserProfile} from "./data/userData";

require('dotenv').config();

import express, { Request, Response } from 'express';
import LoginController from './controller/loginController';
import {refreshToken} from "./middleware/refreshToken";
import UserTopController from "./controller/userTopController";

const app = express();
const session = require('express-session');
const PORT = process.env.PORT || 3000;
export const { CLIENT_ID, CLIENT_SECRET, SESSION_SECRET, SERVER_URL } = process.env;
export const APP_URL = `${SERVER_URL}:${PORT}`;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 } // 24 hours
}));

// View Engine
app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);
app.use(express.static(`${__dirname}/public`));
app.use(express.static(`${__dirname}/dist`));

// Controllers
const loginController = new LoginController();
const userTopController = new UserTopController();

// Routes
app.get('/', async (req: Request& { session: any }, res: Response) => {
    const token = req.session.accessToken;
    let currentUser;
    try {
        currentUser = token ? await getUserProfile(token) : null;
    } catch (error) {
        console.error(`Error: ${error}`);
    }
    res.render('index', { loggedIn: Boolean(currentUser), userName: currentUser });
});

app.get('/login', loginController.loginWithSpotify);

app.get('/callback', loginController.loginCallback);

app.get('/logout', loginController.logout);

app.get('/topArtists', userTopController.getTopArtists);

app.get('/topTracks', userTopController.getTopTracks);

// Initialize Server
app.listen(PORT, () => {
    console.log(`Server running on port ${APP_URL}`);
});
