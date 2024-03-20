import executeQuery from '@/Config/db4';

export default async function ChangeVisibilityVideo(req, res) {
    const { value,uniid} = req.body
    const inverseValue = !value;
    try {
    const rows = await executeQuery('UPDATE posts SET Visible = ? WHERE uniid = ?',[inverseValue,uniid])
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  } 
}