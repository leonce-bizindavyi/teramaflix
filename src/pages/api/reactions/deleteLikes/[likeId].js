import executeQuery from '@/Config/db4';

export default async function deleteVideo(req, res) {
  // Récupérez l'ID de la vidéo à supprimer à partir des paramètres de la requête
  const likeId = req.query.likeId
   try {
    // Exécutez la requête SQL pour supprimer la like dans la base de données
    const rows = await executeQuery('DELETE FROM likes WHERE ID = ?', [likeId])
    
    res.status(200).json(rows);
  } catch (error) {
    console.error('error', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}