import executeQuery from "@/Config/db4";
import * as z from 'zod'
import { transporter } from "@/Config/Email";

const changPassValidator=z.object({
  userMail:z
  .string()
  .email({
    message:'saisissez un email valide'
  }),
 })
export default async function handler(req, res) {


    async function checkEmailExist(email) {
        // Vérifier si l'email est unique dans la base de données
        try {
           // Exécuter la requête SQL pour récupérer les videos
           const rows = await executeQuery( `SELECT * FROM users WHERE Mail=? `, [email]);
    
           // Retourner true si l'email est unique, false sinon
           let mess=""
           console.log('user0:',rows)
           if(rows[0]==null){
            mess="false"
            console.log("2:MAil n'existe pas")
            return mess
           }
           else{
            mess="true"
            console.log('user:',rows[0])
            console.log("1:MAil existe")
            return mess
           }
        } catch (error) {
          console.log('error in sql for checking Mail',error)
        }
      }
      try {
        const userMail=req.body.mail
        console.log('us',userMail);
        const changePassValidation=changPassValidator.parse({userMail})
        
        const isExist=await checkEmailExist(userMail);
        if(isExist=="false"){  
        res.status(402).json({response:{data:'errorMail',message:"Error",error:'Email doesn\'t exist.'}});
        }
       else{
              //Envoie d'Email pour la validation du compte
              const mailOptions = {
                from: 'teramaflix@gmail.com',
                to: userMail,
                subject: 'Reset password',
                html: `
                <html>
                  <head>
                    <style>
                      body {
                        font-family: Arial, sans-serif;
                        font-size: 16px;
                        color: black;
                        line-height: 1.5;
                      }
                      
                      .container {
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 20px;
                      }
                      
                      .header {
                        color:black;
                        margin-bottom: 20px;
                      }
                      
                      .button {
                        display: inline-block;
                        padding: 10px 20px;
                        background-color: #3a86ff;
                        color: white;
                        text-decoration: none;
                        border-radius: 4px;
                        font-size: 16px;
                        border: none;
                        cursor: pointer;
                      }
                      
                      .image {
                        margin-bottom: 20px;
                      }
                    </style>
                  </head>
                  <body>
                    <div class="container">
                      <div class="header">
                      <h2>Password change</h2>
                      <p>click the link below to reset your password account</p>
                      </div>
                      <div class="button">
                        <a href="${process.env.NEXT_PUBLIC_URL}/resetPassword?mail=${userMail}" style="text-decoration: none; color: white;">
                        Click here
                        </a>
                      </div>
                      <div class="image">
                        <img src="cid:unique@image" alt="Image description" style="width: 200px; height: auto;">
                      </div>
                    </div>
                  </body>
                </html>
              `,
              attachments: [
                {
                  filename: 'TeramaFlix -logo.jpg',
                  path: 'public/logo/TeramaFlix -logo.jpg',
                  cid: 'unique@image'
                }
              ]
            };          
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                  res.status(500).json({response:{data:error,message:'Error in sendMail'} });
                } else {
                  console.log('E-mail envoyé: ' + info.response);
                }
              });
              // Renvoyer les résultats de la requête sous forme de réponse JSON
              res.status(200).json({response:{message:'success'}})
       }
        } catch (error) {
          console.log(error);
          res.status(500).json({response:{data:error,message:'validationError'} });
        }
}
