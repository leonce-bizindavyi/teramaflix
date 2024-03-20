import executeQuery from '@/Config/db4';

export default async function handler(req, res) {
  const uuid = req.query.uuid
  try {
    // Exécuter la requête SQL pour récupérer le video
    const rows = await executeQuery('CALL catStatic(?)', [uuid]);

    // Renvoyer les résultats de la requête sous forme de réponse JSON
    res.status(200).json(rows);
  } catch (error) {
    // Gérer les erreurs de manière appropriée
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des commentaires.' });
  }
}