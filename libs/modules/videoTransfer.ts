import {
  readdirSync,
  existsSync,
  mkdirSync,
  copyFileSync
} from 'fs';
import { join } from 'path';

import Ffmpeg from 'fluent-ffmpeg';

import * as paths from '../../configs/paths';

/**
 * @function doTransferVideoCommand
 * @description 执行转换视频的命令
 * @refer ffmpeg -i xxx.m4s -i yyy.m4s -codec copy zzz.mp4
 * @param {string[]} targetFiles 目标视频的文件夹
 * @param {outputPath} outputPath 需要输出到的文件夹路径
 */
export async function doTransferVideoCommand(targetFiles: string[], outputPath: string) {
  const ffmpeg = Ffmpeg();
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

  return new Promise((resolve, reject) => {
    for (let file of commandFiles) {
      ffmpeg.input(file);
    }
    ffmpeg
      .outputOptions(['-codec copy'])
      // .videoBitrate('1000k', true)
      .output(join(paths.targetDir, String(outputPath)))
      .on('end', () => {
        console.log('🏅️🏅️🏅️🏅️🏅️🏅️ ＝＝＝＝＝＝＝＝＝＝　执行完成 ＝＝＝＝＝＝＝＝＝＝ 🏅️🏅️🏅️🏅️🏅️🏅️');
        resolve('');
      })
      .on('error', (e: Error) => {
        reject(e);
      })
      .run();
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
