import { cookies } from "next/headers";
import querystring from "querystring";
import { generateRandomString } from "../api/utils/auth";

export async function GET() {
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
          redirect_uri: `${process.env.SERVER_URL}:${process.env.PORT}/login/callback`,
          state: state,
        })
    );
  } catch (error) {
    console.error("Error redirecting to Spotify authentication.", error);
    return Response.redirect(`${process.env.SERVER_URL}:${process.env.PORT}/`); // TODO: Change to `return Response.redirect("/");` when using a custom domain.
  }
}
