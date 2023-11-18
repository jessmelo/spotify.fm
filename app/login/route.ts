import { cookies } from "next/headers";
import querystring from "querystring";
import { generateRandomString } from "../api/utils/auth";

export async function GET() {
  const SERVER_URL = process.env.SERVER_URL;

  try {
    const SPOTIFY_SCOPES =
      "user-read-private user-top-read user-read-recently-played user-library-read";
    let state = generateRandomString(16);
    const cookieStore = cookies();
    cookieStore.set("stateKey", state);

    return Response.redirect(
      "https://accounts.spotify.com/authorize?" +
        querystring.stringify({
          response_type: "code",
          client_id: process.env.CLIENT_ID,
          scope: SPOTIFY_SCOPES,
          redirect_uri: `${SERVER_URL}/login/callback`,
          state: state,
        })
    );
  } catch (error) {
    console.error("Error redirecting to Spotify authentication.", error);
    // TODO: change redirect to error page
    return Response.redirect(`${SERVER_URL}`);
  }
}
