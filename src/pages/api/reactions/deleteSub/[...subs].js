import executeQuery from '@/Config/db4';

export default async function deleteVideo(req, res) {
  // Récupérez l'ID de la vidéo à supprimer à partir des paramètres de la requête
  const sub = req.query.subs
    try {
    // Exécutez la requête SQL pour supprimer la like dans la base de données
    const rows = await executeQuery('DELETE FROM subscribes WHERE User=? AND Subscriber=?',sub)
    
    res.status(200).json(rows);
  } catch (error) {
    console.error('error', error);
    res.status(500).json({ message: 'Internal server error'});
  } 
}