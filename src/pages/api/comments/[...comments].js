import executeQuery from "@/Config/db4";
export default async function handler(req, res) {
  const uniidVid = req.query.comments
  try {
    // Exécuter la requête SQL pour récupérer les commentaires
    const rows = await executeQuery('CALL commentaire(?,?,?)', uniidVid);
    
    // Renvoyer les résultats de la requête sous forme de réponse JSON
    res.status(200).json(rows[0]);
  } catch (error) {
    // Gérer les erreurs de manière appropriée
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des commentaires.' });
  }
}