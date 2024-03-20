import formidable from 'formidable';
import fs from 'fs-extra';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const videosFolderPath = path.join(process.cwd(), 'upload');

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '2gb'
    },
  },
};

export default async function handler(req, res) {
  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Erreur lors de l\'analyse du formulaire :', err);
      return res.status(500).end();
    }
    const videos  = [files]
    const videoInfos = await Promise.all(videos.map(async (video) => {
      const newPath = await moveVideo(files.file, fields);
      return {
        title: video.originalFilename,
        path: newPath
      };
    }));
    

  });
}


async function moveVideo(video, fields) {
  const oldPath = video.filepath;
  const extension = ".mp4";
  const newFilename = uuidv4() + extension;
  const newPath = path.join(videosFolderPath, newFilename);
  try {
    await fs.ensureDir(path.dirname(newPath));
    await fs.move(oldPath, newPath);
    return newPath;
  } catch (error) {
    console.error(error);
  }
}