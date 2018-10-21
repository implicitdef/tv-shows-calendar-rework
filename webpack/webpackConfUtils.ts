import * as path from "path";

export function buildPath(relativePath: string) {
  return path.resolve(__dirname, relativePath);
}
