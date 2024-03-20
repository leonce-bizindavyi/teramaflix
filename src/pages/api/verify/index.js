import jwt_decode from 'jwt-decode'

const secret = process.env.SECRET;

export default async function handler(req, res) {
  const { cookies } = req;
  const jwt = cookies.Cookie;

  if (jwt) {
    const tokenDecoded=jwt_decode(jwt)
    return res.status(201).json({ logged: true,token:jwt,tokenDecod:tokenDecoded });
  } else {
    return res.status(200).json({ logged: false });
  }
}