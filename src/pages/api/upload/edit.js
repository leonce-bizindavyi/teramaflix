import fs from 'fs-extra';
import formidable from 'formidable';
import path from 'path';
import executeQuery from '@/Config/db4';

export const config = {
    api: {
        bodyParser: false,
    },
};

const thumbnailsFolderPath = path.join(process.env.NEXT_UPLOADS_FOLDERS, `/Thumbnails`);


export default async function uploadHandler(req, res) {
    if (req.method === 'POST') {
        const form = new formidable.IncomingForm();

        // Créez un répertoire "Thumbnails" s'il n'existe pas déjà
        await fs.ensureDir(thumbnailsFolderPath);

        // Parsez la requête
        form.parse(req, async (err, fields, files) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Une erreur s\'est produite lors de l\'upload des images.' });
            }

            // Récupérez les informations des fichiers uploadés
            const images = Array.isArray(files.image) ? files.image : [files.image];
            const movePromises = images.map(async (image) => {
                if (!image) {
                    res.status(500).json({ error: 'Une erreur s\'est produite lors de l\'upload des images.' });
                }
                await moveImage(image, fields)
            });
            try {
                await Promise.all(movePromises);

                // Répondez au client une fois que tous les fichiers ont été traités
                res.status(200).json({ message: true });
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Une erreur s\'est produite lors de l\'enregistrement des vidéos.' });
            }

        });
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Méthode non autorisée');
    }
}

async function moveImage(image, fields) {
    // Modifier dans le dossier
    try {
        const oldPath = image.filepath;
        const newFilename = image.newFilename + '.png';
        const newPath = path.join(thumbnailsFolderPath, newFilename);
        const parsedPath = path.parse(fields.title);
        const title = parsedPath.name;
        await fs.ensureDir(path.dirname(newPath));
        await fs.move(oldPath, newPath);
        const post = await insertVideo(newFilename, fields, title);
        return post;
    } catch (error) {
        console.error(error);
        return Promise.reject(error); // Rejeter la promesse avec l'erreur
    }
}

async function insertVideo(image, fields, title) {
    const { desc, cat, video, short, user } = fields;
    try {
        // Exécutez la requête SQL pour insérer une vidéo dans la base de données
        const rows = await executeQuery('UPDATE posts SET Title = ?, Image = ?, Categorie =?, Body = ?, User = ?, Short = ?, Visible = ? WHERE Video = ?', [title, image, cat, desc, user, short, 1, video]);
        // Autres opérations après l'insertion de la vidéo
        return rows
    } catch (error) {
        console.error(error);
        // Gérer l'erreur ici
        throw error; // Propager l'erreur pour que Promise.all le capture
    }
}
