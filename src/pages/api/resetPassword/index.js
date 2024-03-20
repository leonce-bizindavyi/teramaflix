import executeQuery from "@/Config/db4";
import bcrypt from 'bcryptjs/dist/bcrypt';

export default async function reset(req,res){
    if(req.method==='PUT'){
        const email=req.body.mail
        const password=req.body.password
        const saltrounds=10
        const salt=await bcrypt.genSalt(saltrounds)
        const hashedPassword=await bcrypt.hash(password,salt)
        const mail=email.mail
        const resul = await executeQuery(`UPDATE users SET Password=? WHERE users.Mail =?`, [hashedPassword,mail])
          if (resul.changedRows==1) {
            res.status(201).json({response:{ message: 'Password Reseted successfully',res:'updated' }});
          } 
          else if(!mail){
            res.status(400).json({response:{ message: 'No changement,Click again the link sent in your Mail',res:'notUpdated' }});
          }
          else {
            console.log('res',resul.changedRows);
            res.status(500).json({response:{ message: 'Password not reseted',res:'notUpdated' }});
          }
    }
    

}