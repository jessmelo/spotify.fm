import { cookies } from "next/headers";

export async function GET() {
  console.log("Checking login status...");
  try {
    console.log("Checking login status...");
    const cookieStore = cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (token) {
      return Response.json({ isLoggedIn: true });
    } else {
      return Response.json({ isLoggedIn: false });
    }
  } catch (error) {
    console.error("Error checking login status.", error);
    return Response.json({ isLoggedIn: false });
  }
}
