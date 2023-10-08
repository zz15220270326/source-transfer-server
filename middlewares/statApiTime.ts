import { Request, Response, NextFunction } from 'express';

import { createLog } from '../libs/utils';

/**
 * 统计 api 运行的时长
 */
export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const startTime = Date.now();

    await next();

    const endTime = Date.now();

    const responseTime = endTime - startTime;

    const params = req.method === 'GET' ? req.query : req.body;

    res.setHeader('X-Send-Log-Id', Date.now());

    const logJson = {
      '接口路径 : ': req.path,
      '接口参数 : ': params,
      '预估接口响应时长': responseTime,
      // '响应信息 ：': JSON.parse(JSON.stringify(res)),
    };
    createLog(logJson);
  } catch (e) {
    const message: string = e instanceof Error ? e.message : String(e);
    console.log(message);
  }
}
