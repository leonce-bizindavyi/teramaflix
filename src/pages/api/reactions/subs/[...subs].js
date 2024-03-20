import executeQuery from '@/Config/db4';

export default async function handler(req, res) {
  const [user,sub] = req.query.subs
  try {

    // Exécuter la requête SQL pour récupérer le video
    const rows = await executeQuery('SELECT * FROM subscribes WHERE User=? AND Subscriber=?', [user,sub]);
    // Renvoyer les résultats de la requête sous forme de réponse JSON
    res.status(200).json(rows);
  } catch (error) {
    // Gérer les erreurs de manière appropriée
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des commentaires.' });
  }
}