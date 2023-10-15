import {
  existsSync,
  readdirSync,
  unlinkSync,
  rmdirSync,
  renameSync,
  createReadStream,
  createWriteStream,
  mkdirSync,
  writeFileSync,
  readFileSync,
} from 'fs';
import { join } from 'path';
import { createHash } from 'crypto';

import * as paths from '../../configs/paths';

/**
 * @function isDirectory
 * @description 判断当前路径是否为一个文件夹
 * @param {string} path 校验路径
 * @return {boolean} true -> 是一个文件夹；false -> 不是一个文件夹
 */
export function isDirectory(path: string): boolean {
  try {
    return existsSync(path) && readdirSync(path).length > 0;
  } catch (e) {
    return false;
  }
}

/**
 * @function removeDirectory
 * @description 删除一个文件夹
 * @description 文件夹是不能够直接删除的, 需要先:
 *   1. unlink file (删除所有的文件)
 *   2. rmdir directory (删除文件夹)
 * @description 考虑递归的情况
 * @param {string} path
 * @return {void} 没有返回值
 */
export function removeDirectory(path: string, clearSelf: boolean = false): void {
  if (!isDirectory(path)) return;

  const files = readdirSync(path);

  for (let file of files) {
    const curPath = join(path, file);
    if (isDirectory(file)) {
      removeDirectory(curPath);
    } else {
      unlinkSync(curPath);
    }
  }

  clearSelf && rmdirSync(path);
}

/**
 * 把符合视频要求的文件写入到 target 临时文件夹中
 */
export async function writeFileStreams(
  files: string[],
  targetFiles: string[]
): Promise<void> {
  for (let file of files) {
    const originAbsolutePath: string = join(paths.originDir, file);
    const targetAbsolutePath: string = join(paths.targetDir, file);

    targetFiles.push(targetAbsolutePath);

    if (/\.m4s$/.test(file)) {
      // 普通文件操作
      // const content: string = readFileSync(originAbsolutePath, 'binary');
      // writeFileSync(targetAbsolutePath, content);
      // writeFileSync(targetAbsolutePath, content.replace(/^0+/, ''));

      // 大文件操作
      const res = await copyFileStream(originAbsolutePath, targetAbsolutePath);
      console.log(res);
    }
  }
}

/**
 * 拷贝文件流
 */
export function copyFileStream(originAbsolutePath: string, targetAbsolutePath: string) {
  const rs = createReadStream(originAbsolutePath, { encoding: 'binary' });
  const ws = createWriteStream(targetAbsolutePath, { encoding: 'binary' });

  return new Promise((resolve, reject) => {
    let lock = false;

    rs.on('data', (chunk: string) => {
      let writeChunk = chunk;
      if (!lock) {
        writeChunk = writeChunk.replace(/^0+/, '');
        lock = true;
      }
      if (!ws.write(writeChunk)) { //如果还没写就先暂停
        // console.log('读取暂停');
        rs.pause();
      }
    });

    ws.on('drain', () => {
        // console.log('读取继续');
        rs.resume();
    });

    rs.on('err', (err: Error) => {
      reject(false);
    });

    rs.on('end', () => {
      console.log('读取完成');
      ws.end();
      resolve(true);
    });
  });
}

/**
 * 修改文件名称
 */
export function transferFileName(originFile: string, targetFile: string) {
  renameSync(originFile, targetFile);
}

/**
 * 创建一个本身并不存在的文件夹
 */
export function mkdirIfNotExist(path: string) {
  if (!existsSync(path)) {
    mkdirSync(path);
  }
}

/**
 * 创建一个本身不存在的文件
 */
export function touchFileIfNotExist(path: string, json: Record<string, any>) {
  if (!existsSync(path)) {
    writeFileSync(path, JSON.stringify(json));
  }
}

/**
 * 读取 JSON 文件的内容
 */
export function readJsonFileSync<T extends Record<string, any>>(path: string) {
  const str: string = readFileSync(path, 'utf8');
  const json: T = JSON.parse(str);
  return json;
}

/**
 * 写入内容到 JSON 文件
 */
export function writeJsonFileSync<T extends Record<string, any>>(data: T, path: string) {
  const dataStr: string = JSON.stringify(data);
  writeFileSync(path, dataStr);
}

/**
 * 加密文件名称
 */
export function encryptFileName(filename: string) {
  const hash = createHash('sha256');
  const input = createReadStream(filename);
  let targetName = '';
  
  return new Promise<string>((resolve, reject) => {
    input.on('readable', () => {
      const data = input.read();
      if (data)
        hash.update(data);
      else {
        const message: string = `${hash.digest('hex')} ${filename}`;
        console.log('can\'t read', message);
        reject(new Error(message));
      }
    });

    input.on('data', (chunk: string) => {
      targetName += chunk;
    });

    input.on('end', () => {
      resolve(targetName);
    });

    input.on('error', (err: Error) => {
      reject(err);
    })
  });
}
