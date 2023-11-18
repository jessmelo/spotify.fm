import { cookies } from "next/headers";
import querystring from "querystring";
import { generateRandomString } from "../api/utils/auth";

export async function GET(req: Request) {
  try {
    const cookieStore = cookies();
    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");
    cookieStore.delete("stateKey");

    return Response.redirect(
      process.env.SERVER_URL + ":" + process.env.PORT + "/"
    );
  } catch (error) {
    console.error("Error logging out.", error);
    return Response.redirect(`${process.env.SERVER_URL}:${process.env.PORT}/`); // TODO: Change to `return Response.redirect("/");` when using a custom domain.
  }
}
