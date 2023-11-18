import { cookies } from "next/headers";

export async function GET(req: Request) {
  const SERVER_URL = process.env.SERVER_URL;

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
