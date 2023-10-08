import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.setHeader('Access-Control-Allow-Headers', '*');
  
  if (req.method.toLowerCase() !== 'get') {
    res.setHeader('Content-Type', 'application/json');
  }

  await next();
}
