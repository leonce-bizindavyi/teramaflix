import executeQuery from "@/Config/db4";

export default async function handler(req, res) {
  const [userId] = req.query.notifInfo
  
  try {
    const results = await executeQuery('SELECT * FROM notification WHERE user = ?',[userId])
    res.status(200).json({results})
  } catch (error) {
    console.log(error)
  }
}