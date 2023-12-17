import axios from "axios";
import { cookies } from "next/headers";

export async function GET(req: Request) {
  try {
    console.log("Getting top songs...");
    const cookieStorage = cookies();
    const accessToken = cookieStorage.get("accessToken")?.value;
    const { searchParams } = new URL(req.url);
    const timeRange = searchParams.get("time_range");

    console.log("Time range:", timeRange);
    const { data } = await axios.get(
      "https://api.spotify.com/v1/me/top/tracks",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: { time_range: timeRange },
      }
    );
    console.log("Got top tracks.");
    return Response.json(data);
  } catch (error) {
    console.error("Error fetching top tracks.");
    return Response.json({ error: error });
  }
}
