import * as jwt from "jsonwebtoken";
import { Secret } from "jsonwebtoken";
import cookie from "cookie";
import axios from "axios";
import { cookies } from "next/headers";

export function createToken(user) {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET as Secret, {
    expiresIn: "1d",
  });
}

export function setTokenCookie(res, token) {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 86400,
      path: "/",
    })
  );
}

export function generateRandomString(length: number): string {
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

export async function fetchTokens(authCode) {
  const SERVER_URL =
    process.env.SERVER_URL || `${process.env.SERVER_HOST}:${process.env.PORT}`;

  const authOptions = {
    method: "post",
    url: "https://accounts.spotify.com/api/token",
    params: {
      code: authCode,
      redirect_uri: `${SERVER_URL}/login/callback`,
      grant_type: "authorization_code",
    },
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`
      ).toString("base64")}`,
    },
    json: true,
  };

  try {
    const response = await axios(authOptions);

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to fetch tokens");
    }
  } catch (error) {
    console.error(`Error: ${error}`);
    throw error;
  }
}

export async function refreshToken() {
  const cookieStorage = cookies();
  const refreshToken = cookieStorage.get("refreshToken")?.value;

  const authOptions = {
    method: "post",
    url: "https://accounts.spotify.com/api/token",
    params: {
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    },
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`
      ).toString("base64")}`,
    },
    json: true,
  };

  try {
    const response = await axios(authOptions);

    if (response.status === 200) {
      cookieStorage.set("accessToken", response.data.access_token);
      cookieStorage.set("refreshToken", response.data.refresh_token);
      return true;
    } else {
      return false;
      throw new Error("Failed to refresh token");
    }
  } catch (error) {
    console.error(`Error: ${error}`);
    console.error(
      "Error Details:",
      error.response ? error.response.data : "No additional error details"
    );
    return false;
  }
}

module.exports = {
  createToken,
  setTokenCookie,
  generateRandomString,
  fetchTokens,
  refreshToken,
};
