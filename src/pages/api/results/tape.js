import executeQuery from '@/Config/db4';

export default async function handler(req, res) {
  const {search} = req.body
 try {
    const rows = await executeQuery('CALL tape_search(?)',[search]);
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des resultats.' });
  }
}