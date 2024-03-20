import { transporter } from "@/Config/Email";

export default async function handler(req, res) {
  const {message,mail} = req.body
  console.log(req.body)
  const mailOptions = {
    from: 'teramaflix@gmail.com',
    to: mail,
    subject: 'testMail',
    text: message
  }
  if(mail!=" "){
    transporter.sendMail(mailOptions,function(error,info){
      if(error){
       console.log(error)
      }
      else{
       res.status(200).json(true)
      }
     });
  }
}