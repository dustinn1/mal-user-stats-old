import jwt from "jsonwebtoken";

interface userJWT {
  mal_id: number;
  username: string;
  iat: string;
  exp: string;
}

export function JWTverify(jwtString: string): userJWT {
  return jwt.verify(
    jwtString,
    process.env.JWT_TOKEN_SECRET as string
  ) as userJWT;
}

export function JWTsign(mal_id: string, username: string): string {
  return jwt.sign(
    { mal_id, username },
    process.env.JWT_TOKEN_SECRET as string,
    { expiresIn: "1h" }
  );
}
