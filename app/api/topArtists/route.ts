import { cookies } from 'next/headers';
import { refreshToken } from '../utils/auth';
import axios from 'axios';

export async function GET(req: Request) {
    console.log("Getting top artists...");
    const cookieStorage = cookies();
    const accessToken = cookieStorage.get('accessToken')?.value;
    try {
        const { data }  = await axios.get('https://api.spotify.com/v1/me/top/artists', {
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (data.status === 401) {
            const refreshed = await refreshToken();
            if (refreshed) {
                const newAccessToken = cookieStorage.get('accessToken')?.value;
                const { data }  = await axios.get('https://api.spotify.com/v1/me/top/artists', {
                    headers: { Authorization: `Bearer ${accessToken}` },
                });
                return Response.json(data);
            } else {
                throw new Error('Failed to refresh token');
            }
        }
        console.log("Got top artists.");
       return Response.json(data);
    } catch (error) {
        console.error("Error fetching top artists.");
        return Response.json({ error: error });
    }
};