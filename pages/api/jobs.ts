import { withApiAuthRequired, getAccessToken } from '@auth0/nextjs-auth0'

// Serverless function
// Protected API, requests to '/api/protected' without a valid session cookie will fail

async function handle2(req, res) {

  
  const accessTokenPromise = getAccessToken(req, res)
  const accessToken = (await accessTokenPromise).accessToken
  const response = fetch('http://localhost:8080/api/private', {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  const jobs = await (await response).json();
  res.status(200).json(jobs);
  
}

export default withApiAuthRequired(handle2)

