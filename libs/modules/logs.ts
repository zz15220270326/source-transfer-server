import {
  existsSync,
  mkdirSync,
  writeFileSync
} from 'fs';
import { join } from 'path';

import { isAddZero, getYMD } from './date';

/**
 * 创建接口访问日志
 */
export function createLog(logJson: Record<string, any>) {
  const timestamp = Date.now();
  const { year, month, dayOfMonth } = getYMD(timestamp);
  const logDirPath = join(
    __dirname, '../../logs',
    `${year}-${isAddZero(month)}-${isAddZero(dayOfMonth)}`
  );
  if (!existsSync(logDirPath)) {
    mkdirSync(logDirPath, { recursive: true });
  }

  const logInfo = JSON.stringify({
    ...logJson,
    __logTimestamp__: timestamp,
    __logTime__: `${year}-${isAddZero(month)}-${isAddZero(dayOfMonth)}`,
  });

  console.log({ logInfo, logDirPath });
  const logFilePath = join(logDirPath, Date.now().toString() + '.json');
  writeFileSync(logFilePath, logInfo);
}
