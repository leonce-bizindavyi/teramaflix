import fs from 'fs-extra';
import formidable from 'formidable';
import path from 'path';
import executeQuery from '@/Config/db4';

export const config = {
  api: {
    bodyParser: false,
  },
};
const thumbnailsFolderPath = path.join(process.env.NEXT_UPLOADS_FOLDERS,`/Thumbnails`);

export default async function uploadHandler(req, res) {
  if (req.method === 'POST') {
    const form = new formidable.IncomingForm();
    // Parsez la requête
    form.parse(req, async (err, fields, files) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Une erreur s\'est produite lors de l\'upload des vidéos.' });
        }
        // Récupérez les informations des fichiers uploadés
        const data = Object.values(files);
        const coverInfos = await Promise.all(data.map(async (cover) => {
          const newPath = await moveImage(cover,fields.user,fields.oldCover); 
          return {
            title: cover.originalFilename,
            path: newPath
          };
        }));
        
        res.status(200).json({ message: 'Upload réussi !', cover: coverInfos });
      });
    } else {
      res.setHeader('Allow', 'POST');
      res.status(405).end('Méthode non autorisée');
    }
}

 async function moveImage(image,user,oldCover) {
    const oldPath = image.filepath;
    const extension = path.extname(image.originalFilename);
    const filename = image.newFilename+extension;
    const newPath = path.join(thumbnailsFolderPath, filename);
    await fs.ensureDir(path.dirname(newPath));
    if(oldCover !== 'null'){
      try {
        await fs.unlink(`${thumbnailsFolderPath}/${oldCover}`);
      } catch (err) {
          console.error("Erreur lors de la suppression de l'ancienne image :", err);
      }
    }
    await fs.move(oldPath, newPath);
    await insertImage(filename,user); 
    return newPath;
}

async function insertImage(cover,user) {
  try {
    // Exécutez la requête SQL pour insérer une vidéo dans la base de données
    const rows = await executeQuery('UPDATE pages SET Cover=? WHERE ID=?',
    [cover,user]);

    return rows[0]
  } catch (error) {
  }
}