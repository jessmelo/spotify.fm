import querystring from 'querystring';
import { fetchTokens } from '../../api/utils/auth';
import { cookies } from 'next/headers';

export async function GET(req: Request) {
    const params = new URLSearchParams(req.url.split('?')[1]);
    const code = params.get('code');
    const state = params.get('state');

    const cookieStore = cookies();
    const stateKeyCookie = cookieStore.get('stateKey').value;

    if (state === null || state !== stateKeyCookie) {
        return Response.redirect('http://localhost:300/#' +
            querystring.stringify({
                error: 'state_mismatch'
            }));
    } else {
        try {
            const data = await fetchTokens(code);
            cookieStore.set('accessToken', data.access_token);
            cookieStore.set('refreshToken', data.refresh_token);
            return Response.redirect('http://localhost:3000/home');
        } catch (error) {
            console.error("Error fetching tokens:", error);
            return Response.redirect('http://localhost:3000');
        }
    }
}