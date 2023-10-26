import axios from 'axios';
import querystring from 'querystring';
import { generateRandomString, storeTokensInSession } from '../utils/utilFunctions';
import { APP_URL, CLIENT_ID, CLIENT_SECRET } from '../app';

class LoginController {
    async loginWithSpotify(req, res)  {
        const SPOTIFY_SCOPES = 'user-read-private user-top-read user-read-recently-played user-library-read';
        let state = generateRandomString(16);
        req.session.stateKey = state;
        res.redirect('https://accounts.spotify.com/authorize?' +
            querystring.stringify({
                response_type: 'code',
                client_id: CLIENT_ID,
                scope: SPOTIFY_SCOPES,
                redirect_uri: APP_URL + '/callback',
                state: state
            })
        );
    }

    async loginCallback(req, res) {
        const code = req.query.code || null;
        const state = req.query.state || null;

        if (state === null || state !== req.session.stateKey) {
            res.redirect('/#' +
                querystring.stringify({
                    error: 'state_mismatch'
                }));
        } else {
            try {
                const data = await fetchTokens(code);
                storeTokensInSession(req, data);
                console.log("Storing tokens in session:", req.session);
                res.redirect('/');
            } catch (error) {
                res.redirect(`/#${querystring.stringify({ error })}`);
            }
        }
    }

    async logout(req, res) {
        req.session.destroy(err => {
            if (err) console.error(`Error: ${err}`);
            res.redirect('/');
        });
    }
}

async function fetchTokens(authCode) {
    console.log("Fetching tokens with authCode:", authCode);

    const authOptions = {
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        params: {
            code: authCode,
            redirect_uri: APP_URL + '/callback',
            grant_type: 'authorization_code'
        },
        headers: {
            'Authorization': `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`
        },
        json: true
    };

    try {
        const response = await axios(authOptions);

        console.log("Response Status:", response.status);
        console.log("Response Data:", response.data);

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Failed to fetch tokens');
        }
    } catch (error) {
        console.error(`Error: ${error}`);
        console.error('Error Details:', error.response ? error.response.data : 'No additional error details');
        throw error;
    }
}

export default LoginController;
