import { config as loadEnvFile } from "dotenv";

loadEnvFile();

type NodeEnv = "development" | "test" | "production";

const DEFAULT_PORT = 4000;
const DEFAULT_ALLOWED_ORIGINS = ["http://localhost:5173"];

const parsePort = (value: string | undefined): number => {
  const numericPort = Number(value);

  if (!Number.isNaN(numericPort) && numericPort > 0) {
    return numericPort;
  }

  return DEFAULT_PORT;
};

const parseOrigins = (
  value: string | undefined,
  fallback: string | undefined
): string[] => {
  if (value && value.trim().length > 0) {
    return value
      .split(",")
      .map((origin) => origin.trim())
      .filter(Boolean);
  }

  if (fallback && fallback.trim().length > 0) {
    return [fallback.trim()];
  }

  return DEFAULT_ALLOWED_ORIGINS;
};

const nodeEnv = (process.env.NODE_ENV ?? "development") as NodeEnv;

const getDatabaseUrl = (): string => {
  const url = process.env.DATABASE_URL?.trim();

  if (!url) {
    throw new Error("DATABASE_URL must be provided");
  }

  return url;
};

export const env = {
  nodeEnv,
  port: parsePort(process.env.PORT),
  allowedOrigins: parseOrigins(
    process.env.ALLOWED_ORIGINS,
    process.env.FRONTEND_URL
  ),
  databaseUrl: getDatabaseUrl()
};

export const isDevelopment = env.nodeEnv === "development";
