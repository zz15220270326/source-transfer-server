import {
  readdirSync,
  existsSync,
  mkdirSync,
  copyFileSync
} from 'fs';
import { join } from 'path';
import { createHash } from 'crypto';

import Ffmpeg from 'fluent-ffmpeg';

import * as paths from '../../configs/paths';
import { readJsonFileSync, touchFileIfNotExist } from './fsExtensions';
import { getFormatTime } from './date';

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
  touchFileIfNotExist(paths.videoJsonPath, []);
  const videoList = readJsonFileSync<Record<string, any>[]>(paths.videoJsonPath);

  return videoList;
}

/**
 * 存储 video 的封面图片
 * @param {} videoName 视频的名称
 * @param {} files 所有原目录下的文件
 */
export function saveVideoCover(videoName: string, files: string[]) {
  const bannerPaths = files.filter(item => /\.(jpg|png|jpeg)$/.test(item));

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
export function formatVideoName(originVideoName: string): string {
  let videoName = '';
  const originVideoNameList = originVideoName.split('');

  for (let str of originVideoNameList) {
    videoName += str.codePointAt(0) ^ 2;
    videoName += '-';
  }
  videoName = videoName.replace(/\-$/, '');
  videoName += '.mp4';

  return videoName;
}

/**
 * 获取过滤后的视频数据列表
 */
export function filterSourceList(
  originList: Record<string, any>[],
  keyword?: string,
  sourceType?: string
): Record<string, any>[] {
  const filterVideoList = originList
    .map(item => {
      const {
        id,        
        originalname,
        playUrl,
        size,
        banner,
        createTime,
        updateTime,
        ...restStats
      } = item;
      const sourceType = id.includes('video')
                       ? 'video'
                       : id.includes('audio')
                       ? 'audio'
                       : '';
      
      return {
        id,
        sourceType,
        name: 'originalname',
        originalname,
        playUrl,
        size: (size / 1024 / 1024).toFixed(2) + 'GB',
        createTime,
        banner,
        ctime: getFormatTime(createTime),
        mtime: typeof updateTime === 'number' && updateTime !== -1 ? getFormatTime(updateTime) : '--',
        ...restStats,
        operations: [
          {
            key: 'remove',
            label: '删除',
          },
        ],
      };
    })
    .filter(item => {
      if (!!keyword) {
        const { originalname } = item;
        return originalname.includes(keyword) || keyword.includes(originalname);
      }
      return true;
    })
    .filter(item => {
      if (!sourceType) {
        return true;
      }
      if (item.sourceType !== sourceType) {
        return false;
      }
      return true;
    })
    .sort((a, b) => b.createTime - a.createTime);

  return filterVideoList;
}

/**
 * @function createVideoId
 * @description 创建视频 id
 * @param {string} originalname 音频原来到的名称
 */
export function createVideoId(originalname: string) {
  const md5 = createHash('md5');
  md5.update(originalname);
  return `video-${md5.digest('hex')}`;
}
