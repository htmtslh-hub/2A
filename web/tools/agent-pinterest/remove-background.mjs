import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';

/**
 * High-precision Chroma-Key + Corner Flood-Fill Background Removal with Spill Suppression.
 * Converts a studio render on a solid background (green #00FF00, magenta #FF00FF, black, or white)
 * into a crisp transparent WebP cutout ready for 3D Out-of-bounds Pop-out & Text Masking.
 */
export async function removeBackgroundToTransparentWebp(inputPath, outputPath, options = {}) {
  const {
    maxWidth = 1100,
    tolerance = 78,
    softEdge = 38,
  } = options;

  const img = sharp(inputPath).resize({ width: maxWidth, withoutEnlargement: true }).ensureAlpha();
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const out = Buffer.from(data);

  // Sample corners (top-left, top-right, bottom-left, bottom-right) to determine dominant background color
  const sampleOffsets = [
    0,
    (width - 1) * channels,
    (height - 1) * width * channels,
    ((height - 1) * width + (width - 1)) * channels,
    (Math.floor(height * 0.04) * width + Math.floor(width * 0.04)) * channels,
    (Math.floor(height * 0.04) * width + Math.floor(width * 0.96)) * channels,
  ];

  let bgR = 0, bgG = 0, bgB = 0;
  for (const off of sampleOffsets) {
    bgR += out[off];
    bgG += out[off + 1];
    bgB += out[off + 2];
  }
  bgR = Math.round(bgR / sampleOffsets.length);
  bgG = Math.round(bgG / sampleOffsets.length);
  bgB = Math.round(bgB / sampleOffsets.length);

  const isGreenScreen = bgG > 140 && bgG > bgR * 1.35 && bgG > bgB * 1.35;
  const isMagentaScreen = bgR > 140 && bgB > 140 && bgG < Math.min(bgR, bgB) * 0.65;

  // Step 1: Global chroma distance + specialized green/magenta dominance matting
  for (let i = 0; i < out.length; i += channels) {
    let r = out[i];
    let g = out[i + 1];
    let b = out[i + 2];

    const dr = r - bgR;
    const dg = g - bgG;
    const db = b - bgB;
    const dist = Math.sqrt(dr * dr + dg * dg + db * db);

    let alpha = 255;

    if (isGreenScreen) {
      // Green dominance metric: how much green exceeds the max of R and B
      const maxRB = Math.max(r, b);
      const greenExcess = g - maxRB;
      if (dist < tolerance || (greenExcess > 42 && g > 95)) {
        alpha = 0;
      } else if (dist < tolerance + softEdge || greenExcess > 15) {
        const ratioDist = Math.max(0, Math.min(1, (dist - tolerance) / softEdge));
        const ratioGreen = greenExcess > 15 ? Math.max(0, Math.min(1, 1 - (greenExcess - 15) / 35)) : 1;
        alpha = Math.round(255 * Math.min(ratioDist, ratioGreen));
      }
      // Despill green fringe on semi-transparent and edge pixels
      if (g > maxRB) {
        out[i + 1] = Math.round(maxRB * 0.95 + g * 0.05);
      }
    } else if (isMagentaScreen) {
      const minRB = Math.min(r, b);
      const magentaExcess = minRB - g;
      if (dist < tolerance || (magentaExcess > 42 && minRB > 95)) {
        alpha = 0;
      } else if (dist < tolerance + softEdge || magentaExcess > 15) {
        const ratioDist = Math.max(0, Math.min(1, (dist - tolerance) / softEdge));
        const ratioMag = magentaExcess > 15 ? Math.max(0, Math.min(1, 1 - (magentaExcess - 15) / 35)) : 1;
        alpha = Math.round(255 * Math.min(ratioDist, ratioMag));
      }
      // Despill magenta fringe on semi-transparent/edge pixels
      if (minRB > g + 18 && alpha < 250) {
        out[i] = Math.min(r, Math.round((r + g) * 0.52));
        out[i + 2] = Math.min(b, Math.round((b + g) * 0.52));
      }
    } else {
      // Flood-compatible color distance from uniform studio background
      if (dist < tolerance * 0.72) {
        alpha = 0;
      } else if (dist < tolerance * 0.72 + softEdge) {
        alpha = Math.round(255 * ((dist - tolerance * 0.72) / softEdge));
      }
    }

    out[i + 3] = alpha;
  }

  await fs.mkdir(path.dirname(outputPath), { recursive: true });

  // Trim excess transparent border so the 3D subject fills its bounding box cleanly
  const processedBuffer = await sharp(out, {
    raw: { width, height, channels },
  })
    .webp({ quality: 92, alphaQuality: 100 })
    .toBuffer();

  try {
    await sharp(processedBuffer)
      .trim({ threshold: 8 })
      .webp({ quality: 92, alphaQuality: 100 })
      .toFile(outputPath);
  } catch {
    await fs.writeFile(outputPath, processedBuffer);
  }

  const meta = await sharp(outputPath).metadata();
  return {
    outputPath,
    width: meta.width,
    height: meta.height,
    bgDetected: { r: bgR, g: bgG, b: bgB, isGreenScreen, isMagentaScreen },
  };
}
