import axios from "axios";
import { cookies } from "next/headers";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    console.log("Getting top songs...");
    const cookieStorage = cookies();
    const accessToken = cookieStorage.get("accessToken")?.value;
    const { searchParams } = new URL(req.url);
    const timeRange = searchParams.get("time_range");

    console.log("Time range:", timeRange);
    const { data } = await axios.get(
      "https://api.spotify.com/v1/me/top/artists",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: { time_range: timeRange },
      }
    );

    let topGenres: string[] = [];

    for (let i = 0; i < data.items.length; i++) {
      const trackGenres: string[] = data.items[i].genres;

      topGenres.push(...trackGenres);
    }
    console.log("Top genres:", topGenres);
    console.log("Got top tracks.");
    return Response.json(topGenres);
  } catch (error) {
    console.error("Error fetching top tracks.");
    return Response.json({ error: error });
  }
}
