import { withApiAuthRequired, getAccessToken } from '@auth0/nextjs-auth0'

// Serverless function
// Protected API, requests to '/api/protected' without a valid session cookie will fail

async function handle(req, res) {

  
  const accessTokenPromise = getAccessToken(req, res)
  const accessToken = (await accessTokenPromise).accessToken
  console.log(accessToken)
  var raw = JSON.stringify({
    "title": "Jiu Jitsu instructor in Amsterdam",
    "paymentAmount": 99.95,
    "currency": "EUR",
    "paymentType": "MONTHLY",
    "description": "Our martial arts studio is seeking a Jiu Jitsu Instructor to join our team. The successful candidate will be responsible for",
    "startingDate": "2023-04-09",
    "endingDate": "2023-04-09"
  });
  
  
  const response = fetch('http://localhost:8080/api/jobs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: raw
  });
  const job = await (await response).json();
  res.status(200).json(job);
  
}

export default withApiAuthRequired(handle)

