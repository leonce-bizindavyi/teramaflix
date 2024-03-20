import bcrypt from 'bcryptjs/dist/bcrypt';
import { sign } from 'jsonwebtoken';
import executeQuery from "@/Config/db4";


export default async function handler(req, res) {
  try {
    const secret="N33U8477474473"
    const [mail,password] = req.query.loginInfos
    const [results] = await executeQuery('CALL login(?)',[mail])
  // Vérifier les informations d'identification de l'utilisateur
  
  if (results.length === 0) {
    return res.status(404).json({ message: 'Email introuvable' });
  }
  const isMatch=await bcrypt.compare(password,results[0].Password)
   if(!isMatch){
    return res.status(404).json({ message: 'Password incorrect' });
   }
   const active=results[0].Actif
   if(active===0)
   return res.status(404).json({ message: 'Le compte n\'est pas Activé verifier dans ta boîte d\'Email le message qu\'on vous a envoyé pour l\'activer' });
   
          // Générer un jeton JWT pour l'utilisateur
          const user=results[0];
          const token = sign(
            {
              exp: 60 * 60 * 24 * 30,
              User:user.ID,
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
          res.status(201).json({admin: user.Admin, token, message: 'Success' });
  }catch(error){
    res.status(401).json({error,message:'validationError'});
  }
}