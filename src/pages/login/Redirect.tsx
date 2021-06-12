import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import axios from 'axios';

export default function LoginRedirect() {
  const { search } = useLocation();
  const queries = queryString.parse(search);

  const code: string = queries.code as string;
  const state: string = queries.state as string;

  function getJWTCookie(): string | null {
    const decodedCookie: string = decodeURIComponent(document.cookie);
    const cookies: string[] = decodedCookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      let splitCookie = cookies[i].split('=');
      if (splitCookie[0] === 'jwt') {
        return splitCookie[1];
      }
    }
    return null;
  }

  function deleteCookies(): void {
    const decodedCookie: string = decodeURIComponent(document.cookie);
    const cookies: string[] = decodedCookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      let cookieName = cookies[i].split('=')[0];
      document.cookie = `${cookieName}=; expires=Thu, 18 Dec 2013 12:00:00 UTC; path=/;`
    }
  }

  axios.post('https://myanimelist.net/v1/oauth2/token', {
    client_id: process.env.REACT_APP_MAL_CLIENT_ID,
    grant_type: 'authorization_code',
    code: code,
    code_verifier: ''
  }, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${process.env.REACT_APP_MAL_CLIENT_ID}:${process.env.REACT_APP_MAL_CLIENT_SECRET}`
    },
    
  })

  return (
    <>
      <Helmet>
        <title>Login Redirect</title>
      </Helmet>
      <h1>{code}</h1>
      <h1>{state}</h1>
    </>
  )
}
