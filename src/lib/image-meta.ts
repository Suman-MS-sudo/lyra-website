import fs from "node:fs";
import path from "node:path";

/**
 * Reads the real pixel size of a PNG in /public from its header, so OG tags and
 * ImageObject schema declare true dimensions instead of guessed ones.
 * Runs at build time only (pages are statically generated). Returns undefined
 * for non-PNG or unreadable files, and callers simply omit the dimensions.
 */
export function getPngSize(publicPath: string): { width: number; height: number } | undefined {
  try {
    if (!publicPath.toLowerCase().endsWith(".png")) return undefined;
    const file = path.join(process.cwd(), "public", publicPath);
    const fd = fs.openSync(file, "r");
    try {
      const header = Buffer.alloc(24);
      fs.readSync(fd, header, 0, 24, 0);
      return { width: header.readUInt32BE(16), height: header.readUInt32BE(20) };
    } finally {
      fs.closeSync(fd);
    }
  } catch {
    return undefined;
  }
}
