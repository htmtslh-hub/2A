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

  const isGreenScreen = bgG >= 110 && bgG > bgR * 1.35 && bgG > bgB * 1.35;
  const isMagentaScreen = bgR >= 110 && bgB >= 110 && bgG < Math.min(bgR, bgB) * 0.65;

  if (isGreenScreen || isMagentaScreen) {
    // Global chroma distance + specialized green/magenta dominance matting
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
        const maxRB = Math.max(r, b);
        const greenExcess = Math.max(g - maxRB, (g > b + 40 ? g - r : -999));
        if (dist < tolerance || (greenExcess > 28 && g > 85)) {
          alpha = 0;
        } else if (dist < tolerance + softEdge || greenExcess > 6) {
          const ratioDist = Math.max(0, Math.min(1, (dist - tolerance) / softEdge));
          const ratioGreen = greenExcess > 6 ? Math.max(0, Math.min(1, 1 - (greenExcess - 6) / 22)) : 1;
          alpha = Math.round(255 * Math.min(ratioDist, ratioGreen));
        }
        if (g > maxRB) {
          out[i + 1] = Math.round(maxRB * 0.95 + g * 0.05);
        }
      } else {
        const minRB = Math.min(r, b);
        const magentaExcess = minRB - g;
        if (dist < tolerance || (magentaExcess > 42 && minRB > 95)) {
          alpha = 0;
        } else if (dist < tolerance + softEdge || magentaExcess > 15) {
          const ratioDist = Math.max(0, Math.min(1, (dist - tolerance) / softEdge));
          const ratioMag = magentaExcess > 15 ? Math.max(0, Math.min(1, 1 - (magentaExcess - 15) / 35)) : 1;
          alpha = Math.round(255 * Math.min(ratioDist, ratioMag));
        }
        if (minRB > g + 18 && alpha < 250) {
          out[i] = Math.min(r, Math.round((r + g) * 0.52));
          out[i + 2] = Math.min(b, Math.round((b + g) * 0.52));
        }
      }
      out[i + 3] = alpha;
    }
  } else {
    // True Edge-Seeded BFS Flood-Fill so interior highlights/shadows of the subject are NEVER hollowed out
    const totalPixels = width * height;
    const visited = new Uint8Array(totalPixels);
    const isBg = new Uint8Array(totalPixels);
    const distArr = new Float32Array(totalPixels);

    for (let idx = 0; idx < totalPixels; idx++) {
      const off = idx * channels;
      const dr = out[off] - bgR;
      const dg = out[off + 1] - bgG;
      const db = out[off + 2] - bgB;
      distArr[idx] = Math.sqrt(dr * dr + dg * dg + db * db);
    }

    const floodThreshold = tolerance * 0.72;
    const queue = new Int32Array(totalPixels);
    let head = 0;
    let tail = 0;

    const pushSeed = (x, y) => {
      const idx = y * width + x;
      if (!visited[idx] && distArr[idx] <= floodThreshold + softEdge * 0.5) {
        visited[idx] = 1;
        queue[tail++] = idx;
      }
    };

    for (let x = 0; x < width; x++) {
      pushSeed(x, 0);
      pushSeed(x, height - 1);
    }
    for (let y = 0; y < height; y++) {
      pushSeed(0, y);
      pushSeed(width - 1, y);
    }

    while (head < tail) {
      const curr = queue[head++];
      isBg[curr] = 1;
      const cx = curr % width;
      const cy = (curr - cx) / width;

      // 4-connected neighbors
      if (cx > 0) {
        const n = curr - 1;
        if (!visited[n] && distArr[n] <= floodThreshold) {
          visited[n] = 1;
          queue[tail++] = n;
        }
      }
      if (cx < width - 1) {
        const n = curr + 1;
        if (!visited[n] && distArr[n] <= floodThreshold) {
          visited[n] = 1;
          queue[tail++] = n;
        }
      }
      if (cy > 0) {
        const n = curr - width;
        if (!visited[n] && distArr[n] <= floodThreshold) {
          visited[n] = 1;
          queue[tail++] = n;
        }
      }
      if (cy < height - 1) {
        const n = curr + width;
        if (!visited[n] && distArr[n] <= floodThreshold) {
          visited[n] = 1;
          queue[tail++] = n;
        }
      }
    }

    // Apply alpha to flood-filled exterior background and feather 1px boundary ring
    for (let idx = 0; idx < totalPixels; idx++) {
      const off = idx * channels;
      if (isBg[idx]) {
        const d = distArr[idx];
        if (d < floodThreshold * 0.85) {
          out[off + 3] = 0;
        } else {
          out[off + 3] = Math.round(255 * Math.min(1, Math.max(0, (d - floodThreshold * 0.85) / (softEdge + 8))));
        }
      } else {
        // Check if adjacent to background for smooth anti-aliased contour edge
        const cx = idx % width;
        const cy = (idx - cx) / width;
        const adjBg =
          (cx > 0 && isBg[idx - 1]) ||
          (cx < width - 1 && isBg[idx + 1]) ||
          (cy > 0 && isBg[idx - width]) ||
          (cy < height - 1 && isBg[idx + width]);
        if (adjBg && distArr[idx] < floodThreshold + softEdge) {
          out[off + 3] = Math.round(255 * Math.min(1, Math.max(0.25, (distArr[idx] - floodThreshold) / softEdge)));
        } else {
          out[off + 3] = 255;
        }
      }
    }
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
