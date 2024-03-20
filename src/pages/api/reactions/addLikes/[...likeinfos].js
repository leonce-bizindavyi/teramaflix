import executeQuery from '@/Config/db4';

export default async function deleteVideo(req, res) {
  // Récupérez l'ID de la vidéo à supprimer à partir des paramètres de la requête
  const like = req.query.likeinfos
    try {
    // Exécutez la requête SQL pour supprimer la like dans la base de données
    const rows = await executeQuery('INSERT INTO likes(Post,User,Etat) VALUES(?,?,?)',like)

    res.status(200).json(rows);
  } catch (error) {
    console.error('error', error);
    res.status(500).json({ message: 'Internal server error' });
  } 
}