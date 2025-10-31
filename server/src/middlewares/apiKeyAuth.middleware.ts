import type { NextFunction, Request, Response } from 'express';

const apiKeyValidator = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const xApiKey = req.headers['x-api-key'];

  const apiKey = authHeader?.startsWith("Api-Key ")
    ? authHeader.split(" ")[1]
    : xApiKey;

  if (!apiKey) {
    return res.status(401).json({
      success: false,
      error: "Unauthorized: Missing API key",
      message: "You do not have permission to access this resource."
    });
  }

  if (apiKey !== process.env.API_KEY) {
    return res.status(403).json({
      success: false,
      error: "Unauthorized: Invalid API key",
      message: "You must provide a valid API key to access this resource."
    });
  }

  next();
}

export default apiKeyValidator; 