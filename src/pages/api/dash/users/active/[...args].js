import executeQuery from '@/Config/db4';

export default async function handler(req, res) {
  const [status, user] = req.query.args;

  // Convert status to boolean
  const actif = status === 'true';

  try {
    // Execute the SQL query to update the user's status
    const rows = await executeQuery('UPDATE users SET users.Actif = ? WHERE users.ID = ?', [actif, user]);
    // Return the query results as a JSON response
    res.status(200).json(rows);
  } catch (error) {
    // Handle errors appropriately
    console.error(error);
    res.status(500).json({ message: 'Error retrieving comments.' });
  }
}