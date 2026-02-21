import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fija la raíz del proyecto para que Turbopack no use otro package-lock.json
  turbopack: {
    root: process.cwd(),
  },
  // Permite acceso desde la IP de la red local (evita el warning Cross origin)
  allowedDevOrigins: ["http://192.168.56.1:3000", "http://localhost:3000"],
};

export default nextConfig;
