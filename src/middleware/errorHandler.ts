import { NextFunction, Request, Response } from "express";
import { isDevelopment } from "../config/env.js";

// Centralized error handler that normalizes JSON responses
export const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  if (isDevelopment) {
    console.error(error);
  }

  const statusCode = res.statusCode >= 400 ? res.statusCode : 500;

  res.status(statusCode).json({
    message: error.message || "Internal server error"
  });
};
