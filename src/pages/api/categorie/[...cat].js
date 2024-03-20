import executeQuery from "@/Config/db4";

export default async function handler(req, res) {
  const [cat,start,limit] = req.query.cat
  try {
    const rows = await executeQuery('CALL byCat(?,?,?)', [cat,start,limit]);
    res.status(200).json(rows[0]);
  } catch (eror) {
    console.error(eror);
    res.status(500).json({ message: 'Erreur lors de la récupération des commentaires.',error:true });
  }
}