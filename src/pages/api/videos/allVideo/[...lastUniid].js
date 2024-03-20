import executeQuery from '@/Config/db4';

export default async function handler(req, res) {
    const [uniid] =  req.query.lastUniid
  try {
    const rows = await executeQuery(' CALL adAllvideo(?, ?, ?)',[uniid,0,16]);
    res.status(200).json(rows[0]);

  } catch (error) {

    res.status(500).json({ message: 'Erreur lors de la récupération des commentaires.' });
  }
}
