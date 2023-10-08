import {
  createReadStream,
  createWriteStream,
  existsSync,
  readdirSync,
  mkdirSync,
  writeFileSync,
  copyFileSync,
  renameSync
} from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';

import * as paths from '../configs/paths';

/**
 * 初始化临时文件的路径
 */
export function initTargetDir() {
  if (existsSync(paths.targetDir)) {
    // 1. 将原来的 mp4 文件拷贝到对应的 videos 文件夹里面
    const prevVideoFiles: string[] = readdirSync(paths.targetDir, 'utf8').filter(file => file.endsWith('.mp4'));
    prevVideoFiles.forEach(mp4File => {
      const mp4FilePath: string = join(paths.targetDir, mp4File);
      
      if (!existsSync(join(paths.videoDir, mp4File))) {
        execSync(`cp -r ${mp4FilePath} ${paths.videoDir}`);
      }
    });
    // 2. 删除掉原来的 target 文件夹
    execSync('rm -rf target');
  }
  mkdirSync(paths.targetDir);
}

/**
 * 初始化源文件夹路径
 */
export function initOriginDir() {
  console.log(`rm -rf ${paths.originDir}`, `mkdir ${paths.originDir}`);

  execSync(`rm -rf ${paths.originDir}`);
  execSync(`mkdir ${paths.originDir}`);
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
 * 执行转换视频的命令
 * @param {string[]} targetFiles 目标视频的文件夹
 * @param {outputPath} outputPath 需要输出到的文件夹路径
 */
export function doTransferVideoCommand(targetFiles: string[], outputPath: string): void {
  const commandFiles = targetFiles.filter(file => /\.m4s$/.test(file));
  const command = commandFiles.reduce((cmd, file, fileIdx) => {
    cmd += ` -i ${file}`;

    if (fileIdx === commandFiles.length - 1) {
      cmd += ` -codec copy ${join(paths.targetDir, String(outputPath))}`;
      // cmd += ` -threads 2 -preset veryfast -crf 20 ${join(paths.targetDir, 'video.mp4')}`;
    }

    return cmd;
  }, 'ffmpeg');

  console.log('执行命令 ：', command);
  execSync(command);

  console.log('🏅️🏅️🏅️🏅️🏅️🏅️ ＝＝＝＝＝＝＝＝＝＝　执行完成 ＝＝＝＝＝＝＝＝＝＝ 🏅️🏅️🏅️🏅️🏅️🏅️');
}

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

    rs.on('err', (err) => {
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
 * 获取所有的 video (*.mp4)
 */
export function getAllVideos() {
  const videoList = readdirSync(paths.videoDir)
    .filter(item => item.endsWith('.mp4'))
    .map(item => paths.videoBaseUrl + item);

  return videoList;
}

/**
 * 存储 video 的封面图片
 * @param {} videoName 视频的名称
 * @param {} files 所有原目录下的文件
 */
export function saveVideoCover(videoName: string, files: string[]) {
  const bannerPaths = files.filter(item => /\.(jpg|png|jpeg)$/.test(item));

  if (!existsSync(paths.videoImgDir)) {
    mkdirSync(paths.videoImgDir);
  }

  if (bannerPaths) {
    const image = bannerPaths.find(item => item.includes('image'));
    if (image) {
      copyFileSync(`${paths.originDir}/${image}`, `${paths.videoImgDir}/${videoName.replace(/\.mp4$/, '')}.jpg`);
    } else {
      copyFileSync(`${paths.originDir}/${bannerPaths[0]}`, `${paths.videoImgDir}/${videoName.replace(/\.mp4$/, '')}.jpg`);
    }
  }
}

/**
 * 根据列表获取分页数据
 */
export function getPaginationListData<T>(origin: T[], page: number, pageSize: number) {
  const start = (page - 1) * pageSize;
  const end = page * pageSize;
  const total = origin.length;
  const totalPage = Math.ceil(total / pageSize);

  const list = origin.slice(start, end);

  return {
    page,
    pageSize,
    page_size: pageSize,
    list,
    total,
    totalPage,
    total_page: totalPage,
  };
}

/**
 * export function
 */
export function createLog(logJson: Record<string, any>) {
  const timestamp = Date.now();
  const { year, month, dayOfMonth } = getYMD(timestamp);
  const logDirPath = join(
    __dirname, '../logs',
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

/**
 * 格式化视频名称
 */
export function formatVideoName(originVideoName: string, encrypt?: boolean): string {
  let videoName = originVideoName;
  
  videoName.replace(/\s/ig, '');

  if (!/\.mp4$/.test(videoName)) {
    videoName += '.mp4';
  }

  if (encrypt) {
    videoName = encodeURIComponent(videoName);
  }

  return videoName;
}

export function getYMD(timestamp = Date.now()) {
  const year = new Date(timestamp).getFullYear();
  const month = new Date(timestamp).getMonth() + 1;
  const dayOfMonth = new Date(timestamp).getDate();

  return {
    year,
    month,
    dayOfMonth,
  };
}

export function isAddZero(num: number): string {
  if (num < 10) {
    return '0' + num;
  }
  return String(num);
}

export function transferFileName(originFile: string, targetFile: string) {
  renameSync(originFile, targetFile);
}
