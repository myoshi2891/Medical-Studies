import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

const configDir = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: {
    // リポジトリルート（web-next の親）をワークスペースルートとして固定する
    root: path.resolve(configDir, ".."),
  },
};

export default nextConfig;
