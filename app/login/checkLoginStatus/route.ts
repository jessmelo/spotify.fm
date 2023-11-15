import { cookies } from 'next/headers';

export async function GET(req: Request) {
    try {
        const cookieStore = cookies();
        const token = cookieStore.get('access_token');

        if (token.value) {
            return Response
            .json({ isLoggedIn: true });
        } else {
            return Response
            .json({ isLoggedIn: false });
        }
    } catch (error) {
        return Response
            .json({ isLoggedIn: false });
    }
};