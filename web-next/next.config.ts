import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: {
    // リポジトリルート（web-next の親）をワークスペースルートとして固定する
    root: path.resolve(__dirname, ".."),
  },
};

export default nextConfig;
