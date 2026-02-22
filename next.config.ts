import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Fija la raíz del proyecto para que la resolución de módulos (tailwindcss, etc.)
  // sea siempre desde startBCN y no desde una carpeta padre que tenga otro package.json.
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
