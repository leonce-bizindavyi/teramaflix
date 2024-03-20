import { sign } from 'jsonwebtoken';
import { serialize } from 'cookie';
import { v4 as uuidv4 } from 'uuid';
import * as z from "zod";
import fs from "fs-extra";
import formidable from "formidable";
import path from 'path';
import executeQuery from "@/Config/db4";

export const config = {
  api: {
    bodyParser: false,
  },
};

const thumbnailsFolderPath = path.join(process.env.NEXT_UPLOADS_FOLDERS, `/Thumbnails`);

const saveChannel = z.object({
  pageName: z
    .string()
    .min(3, {
      message: 'le nom  doit être supérieur ou égal à 3 caractères'
    })
    .max(15, {
      message: 'le nom ne doit pas être supérieur à 15 caractères'
    }),
  descriptio: z
    .string()
    .min(3, {
      message: 'la description  doit être supérieur ou égal à 3 caractères'
    })
    .max(500, {
      message: 'la description ne doit pas être supérieur à 500 caractères'
    })
})
export default async function handler(req, res) {
  if (req.method === "POST") {
    const secret = "N33U8477474473"
    const form = new formidable.IncomingForm();
    // Créez un répertoire "uploads" s'il n'existe pas déjà
    await fs.ensureDir(thumbnailsFolderPath);
    // Parsez la requête
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).json({ err, fields, files, error: "Error parsing form data", message: "Error" });
      }
      const images = [files.photo]
      try {

        const { descriptio, pageName } = fields
        const verifyChannelFields = saveChannel.parse({ pageName, descriptio })
        const movePromises = await Promise.all(images.map(async (image) => {
          const user = await moveImage(image, fields);
          return user
        }));

        const user = movePromises[0]

        const token = sign(
          {
            exp: 60 * 60 * 24 * 30,
            User: user.ID,
            ID: user.pageId,
            uniid: user.uniid,
            PageName: user.PageName,
            description: user.Description,
            categorie: user.Categorie,
            Photo: user.Photo,
            Mail: user.Mail,
            Active: user.Actif,
            Admin: user.Admin,
          },
          secret
        );
        res.status(200).json({ token, uniid: user.uniid, message: 'Success' })
      } catch (error) {
        res.status(400).json({ message: "Error", error })
      }

    })
  }
  else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Méthode non autorisée');
  }
}
async function moveImage(image, fields) {
  if (image) {
    const oldPath = image.filepath;
    const extension = path.extname(image.originalFilename);
    const newFilename = image.newFilename + extension;
    const newPath = path.join(thumbnailsFolderPath, newFilename);
    await fs.ensureDir(path.dirname(newPath));
    try {
      if (fields.image) {
        await deleteIfExists(`${thumbnailsFolderPath}/${fields.image}`);
      }
    } catch (err) {
      console.error("Erreur lors de la suppression de l'ancienne image :", err);
    }
    await fs.move(oldPath, newPath);
    const user = await updatePage(newFilename, fields);
    return user;
  } else {
    const user = await updatePage(null, fields);
    return user;
  }


}
async function updatePage(photo, fields) {
  try {
    const { pageName, descriptio, category, userId, user } = fields

    // Exécuter la requête SQL pour récupérer les videos
    const result = await executeQuery(`CALL editChannel(?,?,?,?,?,?)`, [userId, user, pageName, descriptio, photo, category]);

    if (result[0] != " ") {
      const user = result[0];
      return user[0]
    }
  } catch (error) {
    console.log(error);
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