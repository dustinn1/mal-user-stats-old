import cookie from "cookie";
import jwt from "jsonwebtoken";

export function setUserCookie(mal_id: number, username: string) {
  const usernameJWT = jwt.sign(
    { mal_id, username },
    process.env.JWT_TOKEN_SECRET,
    { expiresIn: "1h" }
  );
  return cookie.serialize("user", usernameJWT, {
    secure: true,
    sameSite: true,
    path: "/",
    maxAge: 3600, // 1 hour
  });
}
