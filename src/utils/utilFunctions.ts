export function generateRandomString(length: number): string  {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

export function storeTokensInSession(req, body) {
    req.session.accessToken = body.access_token;
    req.session.refreshToken = body.refresh_token;
    req.session.expiresIn = body.expires_in;
}