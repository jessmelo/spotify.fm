import { cookies } from "next/headers";
import querystring from "querystring";
import { generateRandomString } from "../api/utils/auth";

export async function GET(req: Request) {
  const SERVER_URL =
    process.env.SERVER_URL || `${process.env.SERVER_HOST}:${process.env.PORT}`;

  try {
    const cookieStore = cookies();
    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");
    cookieStore.delete("stateKey");

    return Response.redirect(SERVER_URL);
  } catch (error) {
    console.error("Error logging out.", error);
    // TODO: change logout redirect
    return Response.redirect(SERVER_URL);
  }
}
