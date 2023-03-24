import express from "express";
import querystring from "querystring";
import request from "request";
import cookie_parser from "cookie-parser";

const app = express();
const port = process.env.PORT || 8888;
const server = process.env.WEB_URL;

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = server + '/callback';
const SPOTIFY_SCOPES = 'user-read-private user-top-read user-read-recently-played user-library-read';

const stateKey = 'spotify_auth_state';
const accessToken = 'access_token';
const refreshToken = 'refresh_token';

app.use(cookie_parser());
app.set('view engine', 'ejs');
app.set('views',__dirname + '/views');
app.use(express.static(__dirname + '/public'));

function generateRandomString(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

app.get('/', async function (req, res) {
    let token = req.cookies[accessToken];
    let tokenValid = false;
    let currentUser = "";
    if (token != null) {
        tokenValid = true;
        try {
            currentUser = await getUserProfile(token);
        } catch {
            token = await refreshAccessToken(req.cookies[refreshToken]);
            res.clearCookie(accessToken);
            res.cookie(accessToken, token);
            currentUser = await getUserProfile(token);
        }
    }
    res.render('index', {loggedIn: tokenValid, userName: currentUser});
});

app.get('/login', function(req, res) {
    let state = generateRandomString(16);
    console.log(state);
    res.cookie(stateKey, state);
    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: CLIENT_ID,
            scope: SPOTIFY_SCOPES,
            redirect_uri: REDIRECT_URI,
            state: state
        }));
});

app.get('/logout', function(req, res) {
    res.clearCookie(accessToken);
    res.clearCookie(refreshToken);
    res.redirect('/');
});

app.get('/callback', function(req, res) {
    let authCode = req.query.code || null;
    let state = req.query.state || null;
    let storedState = req.cookies[stateKey];

    if (state === null || state !== storedState) {
        res.redirect('/#' +
            querystring.stringify({
                error: 'state_mismatch'
            }));
    } else {
        res.clearCookie(stateKey);
        let authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
                code: authCode,
                redirect_uri: REDIRECT_URI,
                grant_type: 'authorization_code'
            },
            headers: {
                'Authorization': 'Basic ' +
                    (new Buffer(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'))
            },
            json: true
        };

        request.post(authOptions, function(error, response, body) {
            if (!error && response.statusCode === 200) {
                res.cookie(accessToken, body.access_token)
                res.cookie(refreshToken, body.refresh_token)

                let options = {
                    url: 'https://api.spotify.com/v1/me',
                    headers: { 'Authorization': 'Bearer ' + req.cookies[accessToken] },
                    json: true
                };

                // use the access token to access the Spotify Web API
                request.get(options, function(error, response, body) {
                    console.log(body);
                });

                // we can also pass the token to the browser to make requests from there
                res.redirect('/');
            } else {
                res.redirect('/#' +
                    querystring.stringify({
                        error: 'invalid_token'
                    }));
            }
        });
    }
});

app.get('/top_artists', async function (req, res) {
    let token = req.cookies[accessToken];
    let result;
    try {
        result = await getUserTopArtists(token);
    } catch (error) {
        token = await refreshAccessToken(req.cookies[refreshToken]);
        res.clearCookie(accessToken);
        res.cookie(accessToken, token);
        result = await getUserTopArtists(token);
    }
    res.render('topArtists', {topArtists: result});
});

async function getUserProfile(accessToken): Promise<string> {
    const response = await fetch('https://api.spotify.com/v1/me/', {
        method: "GET",
        headers: { 'Authorization': 'Bearer ' + accessToken }
    });
    const result = await response.json();
    if (response.ok) {
        return result.display_name;
    } else {
        throw new Error(`Failed to fetch user profile: ${result.status.toString()}`);
    }
}

async function getUserTopArtists(accessToken): Promise<Object> {
    const response = await fetch('https://api.spotify.com/v1/me/top/artists?limit=50', {
        method: "GET",
        headers: { 'Authorization': 'Bearer ' + accessToken }
    });
    const result = await response.json();
    if (response.ok) {
        return result.items;
    } else {
        throw new Error(`Failed to fetch top artists: ${result.status.toString()}`);
    }
}

async function refreshAccessToken(refreshToken): Promise<string>  {
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: "POST",
        headers: {
            'Authorization': 'Basic ' +
                (new Buffer(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64'))
        },
        body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: refreshToken
        })
    });
    const json = await response.json();
    if (response.ok) {
        return json.access_token;
    } else {
        throw new Error(`Failed to get access token: ${json.error}`);
    }
}

app.listen(port, () => {
    console.log(`Spotify.FM is listening on port ${port}`);
});
