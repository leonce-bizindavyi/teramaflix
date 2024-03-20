import executeQuery from "@/Config/db4";

export default async function handler(req, res) {
  const [userId] = req.query.eachNotification 
  try {
    const feedback = await executeQuery('SELECT listenotif.id as id,pages.PageName as Prenom,pages.Photo as photo,listenotif.typenotif as typenotif, listenotif.postId as postid,posts.Title  as title,listenotif.created_at as delay, posts.uniid as uniid FROM listenotif INNER JOIN pages ON listenotif.reacteduser = pages.ID LEFT JOIN posts ON listenotif.postId = posts.ID WHERE listenotif.notOpen=1 AND listenotif.userid= ?',[userId]);
    res.json(feedback);
  } catch (error) {
    res.status(500).json(error);
  }
}