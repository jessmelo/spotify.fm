import axios from "axios";

export async function refreshToken(req, res, next) {
    const refreshToken = req.session.refreshToken;

    const authOptions = {
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        params: {
            grant_type: 'refresh_token',
            refresh_token: refreshToken
        },
        headers: {
            'Authorization':
                `Basic ${Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`)
                    .toString('base64')}`
        },
        json: true
    };

    try {
        const response = await axios(authOptions);

        if (response.status === 200) {
            req.session.accessToken = response.data.access_token;
            req.session.refreshToken = response.data.refresh_token;
            next();
        } else {
            throw new Error('Failed to refresh token');
        }
    } catch (error) {
        console.error(`Error: ${error}`);
        console.error('Error Details:', error.response ? error.response.data : 'No additional error details');
        res.redirect('/login');
    }
}