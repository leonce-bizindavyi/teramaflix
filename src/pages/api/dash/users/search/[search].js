import executeQuery from '@/Config/db4';

export default async function handler(req, res) {
  const {search} = req.query
 try {
    // Exécuter la requête SQL pour récupérer le video
    const rows = await executeQuery('CALL searchUser(?)', [search]);

    // Renvoyer les résultats de la requête sous forme de réponse JSON
    res.status(200).json(rows[0]);
  } catch (error) {
    // Gérer les erreurs de manière appropriée
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des commentaires.' });
  } 
}