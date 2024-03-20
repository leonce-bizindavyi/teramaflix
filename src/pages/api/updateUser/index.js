import executeQuery from '@/Config/db4';
import { sign } from 'jsonwebtoken';

export default async function handler(req, res) {
  const secret="N33U8477474473"
  const { id, nom, mail, password } = req.body;
  try {
    const rows = await executeQuery("CALL updateUser(?, ?, ?, ?)",
      [id, nom, mail, password])
    // Générer un jeton JWT pour l'utilisateur
    const data = rows[0];
    if (data.length > 0) {
      const user = data[0]
      const token = sign(
        {
          exp: 60 * 60 * 24 * 30,
          User: user.ID,
          ID: user.Page,
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
      res.status(200).json({token, success: true });
    }else{
      res.status(200).json({success: false });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' ,'error': error});
  }
}