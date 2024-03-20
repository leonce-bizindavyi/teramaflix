import executeQuery from '@/Config/db4';

export default async function handler(req, res) {
  const UserId = req.query.UserId
  try {
    // Exécuter la requête SQL pour récupérer le video
    const rows = await executeQuery('SELECT pages.*,users.Actif,users.Mail FROM pages,users WHERE pages.user_id = users.ID AND pages.uniid=?', [UserId]);

    // Renvoyer les résultats de la requête sous forme de réponse JSON
    res.status(200).json(rows);
  } catch (error) {
    // Gérer les erreurs de manière appropriée
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des commentaires.' });
  }
}