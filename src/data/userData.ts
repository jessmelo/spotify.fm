import axios from "axios";
import {data} from "browserslist";
import {refreshToken} from "../middleware/refreshToken";

export const getUserProfile = async (accessToken: string) => {
    try {
        const { data } = await axios.get('https://api.spotify.com/v1/me', {
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        return data.display_name;
    } catch (error) {
        throw new Error('Error fetching user data.');
    }
};
