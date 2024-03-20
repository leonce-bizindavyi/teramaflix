import executeQuery from "@/Config/db4";

export default async function handler(req,res){
  try {
    const results = await executeQuery(' CALL displayUser(?)',req.query.updateInfo)
    res.status(200).json({results})
  } catch (error) {
    console.log(error)
  }
   
   
}