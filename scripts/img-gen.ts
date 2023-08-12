import * as fs from 'fs';
import { join } from 'path';
import sharp from 'sharp';
import { imageSizes } from './constants';

const imagesPath = join(process.cwd(), '/src/images');
const generatedPath = join(process.cwd(), '/public/images');

fs.readdir(imagesPath, (err, files) => {
  files.forEach(async (file) => {
    const promises = [
      generateImage(file, imageSizes[0]),
      generateImage(file, imageSizes[1]),
      generateImage(file, imageSizes[2]),
      generateImage(file, imageSizes[3]),
      generateImage(file, imageSizes[4]),
    ];
    await Promise.all(promises);
  });
});

async function generateImage(file, size = 1100) {
  const [id] = file.split('.');
  const outputFile = `${generatedPath}/${id}-${size}.jpg`;
  await sharp(join(imagesPath, file))
    .rotate()
    .resize(size)
    .jpeg({ mozjpeg: true })
    .toFile(outputFile);

  console.log('Generated: ', outputFile);
}
