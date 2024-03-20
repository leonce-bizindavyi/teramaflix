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

    // Créez un répertoire "Thumbnails" s'il n'existe pas déjà
    await fs.ensureDir(thumbnailsFolderPath);

    // Parsez la requête
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Une erreur s\'est produite lors de l\'upload des vidéos.' });
      }
       // Récupérez les informations des fichiers uploadés
      const images = Array.isArray(files.image) ? files.image : [files.image];

     // Déplacez chaque fichier uploadé dans le répertoire de destination
      if (images[0] === undefined) {
        await insertVideo(fields.oldimage, fields);
        res.status(200).json({Success:true, message: 'Upload réussi !' });
      } else {
        const movePromises = images.map(async (image) => {
          if (image.newFilename) {
            await deleteIfExists(`${thumbnailsFolderPath}/${fields.oldimage}`)
            await moveVideo(image, fields);
          } else {
            await insertVideo(fields.oldimage, fields);
          }
        });

        try {
          await Promise.all(movePromises);
          
          // Répondez au client une fois que tous les fichiers ont été traités
        res.status(200).json({Success:true, message: 'Upload réussi !' });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Une erreur s\'est produite lors de l\'enregistrement des vidéos.' });
        }
      }
    });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Méthode non autorisée');
  }
}

async function moveVideo(image, fields) {
  // Modifier dans le dossier
  const oldPath = image.filepath;
  const newFilename = image.newFilename+".png";
  const newPath = path.join(thumbnailsFolderPath, newFilename);
  await fs.ensureDir(path.dirname(newPath));
  await fs.move(oldPath, newPath);
  const post = await insertVideo(newFilename, fields);
  return post;
}

async function insertVideo(image, fields) {
  const { title, desc, cat, id,short } = fields;
  try {
    // Exécutez la requête SQL pour insérer une vidéo dans la base de données
    const rows = await executeQuery('CALL editPost(?,?,?,?,?,?)', [title, image, desc, cat, short ,id]);
    // Autres opérations après l'insertion de la vidéo
  } catch (error) {
    console.error(error);
    // Gérer l'erreur ici
    throw error; // Propager l'erreur pour que Promise.all le capture
  }
}

// Fonction utilitaire pour supprimer un fichier s'il existe
async function deleteIfExists(filePath) {
  try {
    await fs.access(filePath); // Vérifie l'existence du fichier
    await fs.unlink(filePath); // Supprime le fichier
  } catch (error) {
    // Ignore les erreurs si le fichier n'existe pas
    if (error.code !== 'ENOENT') {
      console.log(error);
    }
  }
}