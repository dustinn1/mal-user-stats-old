import { useLocation } from "react-router";
import Cookies from "js-cookie";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function setCookie(jwt: string) {
  Cookies.set("user", jwt, {
    sameSite: "strict",
    path: "/",
    expires: new Date(new Date().getTime() + 60 * 60 * 1000),
  });
}

export default function Auth() {
  const jwtQuery = useQuery().get("jwt");
  const redirectQuery = useQuery().get("redirect");

  if (jwtQuery !== null && jwtQuery !== "") {
    setCookie(jwtQuery);
  } else {
    window.location.replace("/");
  }

  if (redirectQuery === "stats") {
    window.location.replace("/stats");
  } else {
    window.location.replace("/");
  }

  return null;
}
