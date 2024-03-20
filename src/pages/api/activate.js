import executeQuery from "@/Config/db4";

export default async function active(req,res){
    if(req.method==='PUT'){
        const {id}=req.body.id
        
      
        const resul = await executeQuery(`UPDATE users SET Actif=1 WHERE ID =(SELECT user_id FROM pages WHERE uniid=?)`, [id])
          if (resul.changedRows==1) {
            res.status(201).json({response:{ message: 'user activated successfully',res:'updated' }});
          } 
          else if(!id){
            res.status(400).json({response:{ message: 'Veuillez d\'abord cliquer le link envoyer dans votre Mail',res:'notUpdated' }});
          }
          else {
            res.status(500).json({response:{ message: 'Aucun changement sur ton compte',res:'notUpdated' }});
          }
    }
    

}