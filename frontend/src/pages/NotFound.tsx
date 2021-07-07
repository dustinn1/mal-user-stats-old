import { Helmet } from 'react-helmet-async';

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>404 Page Not Found</title>
      </Helmet>
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <h1>404 Page Not Found</h1>
      </div>
    </>
  )
}
