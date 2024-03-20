import executeQuery from '@/Config/db4';

export default async function handler(req, res) {
  try {
    // Exécuter la requête SQL pour récupérer les videos
    const rows = await executeQuery('CALL dashStat()');
    // Renvoyer les résultats de la requête sous forme de réponse JSON
    res.status(200).json({'count': rows[0],'stats': rows});
  } catch (error) {
    // Gérer les erreurs de manière appropriée
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des commentaires.' });
  }
}