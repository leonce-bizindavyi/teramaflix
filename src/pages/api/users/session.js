import { sign } from 'jsonwebtoken';
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const user = req.body
    const secret="N33U8477474473"
    const token = sign(
        {
          exp: 60 * 60 * 24 * 30,
          User:user.User,
          ID: user.ID,
          uniid: user.uniid,
          PageName: user.PageName,
          description: user.Description,
          Photo: user.Photo,
          Mail: user.Mail,
          Active: user.Actif,
          Admin: user.Admin,
          Cover: user.Cover,
          Categorie: user.Categorie
        },
        secret
      );
    res.status(200).json({'success':true,'token':token})
  } else {
    res.status(404).end()
  }
}
