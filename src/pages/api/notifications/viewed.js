import executeQuery from "@/Config/db4";

export default async function handler(req, res) {
  try {
    await executeQuery('UPDATE listenotif SET notOpen = 0');
  } catch (error) {
    res.status(500).json(error);
  }
}
