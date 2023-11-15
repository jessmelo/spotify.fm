import { cookies } from "next/headers";
import querystring from 'querystring';
import { generateRandomString } from "../api/utils/auth";

export async function GET(req: Request, res: Response) {
    try {
        const cookieStore = cookies();
        cookieStore.delete('accessToken');
        cookieStore.delete('refreshToken');
        cookieStore.delete('stateKey');
        return Response.redirect('http://localhost:3000');
    } catch (error) {
        console.error("Error logging out.");
    }
}
