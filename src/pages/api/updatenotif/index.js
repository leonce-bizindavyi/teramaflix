import executeQuery from '@/Config/db4';

export default async function  handler(req, res) {
  const {userid,columnName,value} = req.body
    try {
    const rows = await executeQuery(`UPDATE notification SET ${columnName} = ? WHERE user = ?`,[value, userid] )
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  } 
}