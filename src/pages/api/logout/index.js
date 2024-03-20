// export default function handler(req, res) {
//     res.setHeader('Set-Cookie', `token=; Path=/; HttpOnly; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`);
//     res.status(200).json({ name: true })
//   }
  import { serialize } from 'cookie';

export default async function handler(req, res) {
  const { cookies } = req;
  const jwt = cookies.Cookie;
  if (!jwt) {
    return res.status(200).json({ message: 'You are not logged' });
  } else {
    const serialised = serialize('Cookie', null, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: -1,
      path: '/',
    });
    res.setHeader('Set-Cookie', serialised);
    res.status(200).json({name: true, message: 'you are logged out successfuly' });
  }
}