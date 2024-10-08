import * as path from "node:path";
import { readFileSync } from "node:fs";
import { randomBytes } from "node:crypto";

const __document_dirname = "./src/components/managersPage/docs";

export function getIntroduction(filename: string): string {
  const resolvedPath = path.resolve(__document_dirname, filename);
  const text = readFileSync(resolvedPath, 'utf-8');
  return text.trim();
}
export const getIntroductionSeparateLine: (filename: string) => string[] = (filename) => getIntroduction(filename).split("\n");

export function separateImageFormats<T extends { format: P }, P extends string>(
  images: T[],
  formatTypes: P[],
): {
  [key in P]: any
} {
  function filter(formatType: string) {
    return images.filter(img => img.format === formatType)[0];
  }

  const obj: { [K in P]: any } = {} as { [K in P]: any }
  formatTypes.forEach(f => {
    obj[f] = filter(f);
  })

  return obj;
}

export function generateRandomID(bytes: number = 8) {
  return randomBytes(bytes).toString("hex");
}

const root = process.env.ROOT_NAME || "/";

export function resolveRoot(publicFile: string = "") {
  const filePath = path.resolve(root, publicFile);
  return filePath;
}