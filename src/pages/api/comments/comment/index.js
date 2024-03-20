import executeQuery from "@/Config/db4"

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const {body,user,post} = req.body
    try {
      await executeQuery('INSERT INTO comments(Post,User,Body) VALUES(?,?,?)',[post,user,body] )
      res.status(201).end()
    } catch (err) {
      console.error(err)
      res.status(500).end()
    }
  } else {
    res.status(404).end()
  }
}
