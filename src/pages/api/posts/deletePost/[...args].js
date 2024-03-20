import fs from 'fs/promises';
import path from 'path';
import executeQuery from '@/Config/db4';

export default async function handler(req, res) {
  const [id, video, image] = req.query.args;
  const thumbnailsFolderPath = path.join(process.env.NEXT_UPLOADS_FOLDERS,`/Thumbnails`);
  const videosFolderPath = path.join(process.env.NEXT_UPLOADS_FOLDERS,`/Videos`);
  try {
    // Suppression de l'entrée dans la base de données
    const dbResult = await executeQuery('DELETE FROM posts WHERE posts.ID = ?', [id]);

    // Vérification et suppression du fichier vidéo
    const videoPath = path.join(videosFolderPath, video);
    await deleteIfExists(videoPath);

    // Vérification et suppression du fichier image
    const imagePath = path.join(thumbnailsFolderPath, image);
    await deleteIfExists(imagePath);

    res.status(200).json({ success: true, message: 'Post and associated files deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
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
