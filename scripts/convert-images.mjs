/**
 * convert-images.mjs — Convert public mascot PNGs to WebP
 * Run automatically as "prebuild" before every vite build.
 */
import sharp from 'sharp';
import { readdir } from 'fs/promises';
import { join, extname, basename } from 'path';

const PUBLIC = 'public';
const QUALITY = 82;

// Only convert the runtime-served images (not app icons / splash)
const TARGETS = ['mascot.png', 'mascot-happy.png', 'mascot-ok.png', 'mascot-sad.png'];

const fs = await import('fs');
let converted = 0;
for (const file of TARGETS) {
  const src  = join(PUBLIC, file);
  try { await fs.promises.access(src); } catch { continue; } // skip if PNG removed
  const dest = join(PUBLIC, basename(file, '.png') + '.webp');
  await sharp(src).webp({ quality: QUALITY }).toFile(dest);
  const { size: s } = await fs.promises.stat(src);
  const { size: d } = await fs.promises.stat(dest);
  console.log(`  ${file} → ${basename(dest)}  ${(s/1024).toFixed(0)}kB → ${(d/1024).toFixed(0)}kB`);
  converted++;
}
console.log(converted ? '✓ WebP conversion done' : '✓ No PNG sources to convert (WebP assets used directly)');
