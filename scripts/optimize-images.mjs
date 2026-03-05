import sharp from 'sharp';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const images = [
  {
    input: join(root, 'frontend/public/images/doutor-alessandro.png'),
    output: join(root, 'public/images/doutor-alessandro.webp'),
    outputBlur: join(root, 'public/images/doutor-alessandro-blur.webp'),
    heroWidth: 1200,
  },
  {
    input: join(root, 'frontend/public/images/doutora-lattes.png'),
    output: join(root, 'public/images/doutora-lattes.webp'),
    outputBlur: join(root, 'public/images/doutora-lattes-blur.webp'),
    heroWidth: 600,
  },
];

for (const img of images) {
  console.log(`Processing: ${img.input}`);

  // Main optimized WebP
  await sharp(img.input)
    .resize(img.heroWidth, null, { withoutEnlargement: true })
    .webp({ quality: 85 })
    .toFile(img.output);
  console.log(`  -> ${img.output}`);

  // Blur placeholder
  await sharp(img.input)
    .resize(32)
    .webp({ quality: 20 })
    .toFile(img.outputBlur);
  console.log(`  -> ${img.outputBlur}`);
}

// Also copy logo
await sharp(join(root, 'frontend/public/images/logo_endostart_transparente.png'))
  .resize(400, null, { withoutEnlargement: true })
  .webp({ quality: 90 })
  .toFile(join(root, 'public/images/logo_endostart.webp'));
console.log('Logo optimized.');

console.log('Done!');
