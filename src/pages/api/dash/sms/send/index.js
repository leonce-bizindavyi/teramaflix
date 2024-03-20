import executeQuery from '@/Config/db4'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const {body,user,sent} = req.body
    //console.log(req.body)
    try {
      await executeQuery('INSERT INTO messages(Body,User,Sent) VALUES(?,?,?)',[body,user,sent] )
      res.status(201).end()
    } catch (err) {
      console.error(err)
      res.status(500).end()
    }
  } else {
    res.status(404).end()
  }
}
