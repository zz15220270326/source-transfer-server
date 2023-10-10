import { existsSync, readdirSync, statSync, rmSync, copyFileSync } from 'fs';
import { join } from 'path';
import { parse } from 'url';

import * as paths from '../configs/paths';

import {
  initTargetDir,
  writeFileStreams,
  doTransferVideoCommand,
  getAllVideos,
  getPaginationListData,
  saveVideoCover,
  formatVideoName,
  transferFileName,
  initOriginDir,
} from '../libs/utils';
import { execSync } from 'child_process';

/**
 * 转换单个文件夹的 m4s 文件并得到 videoUrl
 * @param {string} videoName 视频的名称（需要带上 .mp4）
 * @return {Promise<string>} 完整的 videoUrl
 * @param {boolean} clear 是否执行完成后需要清除文件夹
 */
export async function transferVideoFileAndGetVideoUrl(
  originVideoName: string,
  clear: boolean = false
): Promise<string> {
  const files: string[] = readdirSync(paths.originDir, 'utf8');
  const targetFiles: string[] = [];
  const videoName = formatVideoName(originVideoName);

  // 初始化临时文件路径
  initTargetDir();

  // 写入文件
  await writeFileStreams(files, targetFiles);

  // 使用绝对路径运行
  doTransferVideoCommand(targetFiles, videoName);

  // 存储 banner 图片
  saveVideoCover(videoName, files);

  console.log({ clear });

  if (clear) {
    initTargetDir();
    initOriginDir();
  }

  return `${paths.videoBaseUrl}${videoName}`;
}

/**
 * 获取视频列表
 */
export function getVideoList() {
  const videoList: string[] = getAllVideos();

  return videoList;
}

/**
 * 获取分页的视频列表
 */
export function getPaginationVideoList(page = 1, pageSize = 10, keyword?: string) {
  const videoList: string[] = getVideoList();

  const filterVideoList = videoList
    .map(videoLink => {
      const videoFrags = videoLink.split('/');
      const videoName = videoFrags[videoFrags.length - 1];
      const {
        size,
        uid,

        ...restStats
      } = statSync(paths.videoDir + '/'+ videoName);
      const videoCover = existsSync(paths.videoDir + '/img/'+ videoName.replace(/\.mp4$/, '') + '.jpg')
                      ? '/videos/img/'+ videoName.replace(/\.mp4$/, '') + '.jpg'
                      : '/videos/img/' + 'default.jpg';
      
      return {
        videoName,
        videoLink: parse(videoLink).path,
        size: (size / 1024 / 1024).toFixed(2) + 'GB',
        ...restStats,
        videoCover,
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
        const { videoName } = item;
        return videoName.includes(keyword) || keyword.includes(videoName);
      }
      return true;
    })
    .sort((a, b) => b.ctimeMs - a.ctimeMs);

  const data = getPaginationListData(
    filterVideoList,
    page,
    pageSize
  );

  return data;
}

/**
 * 删除某一个视频文件
 */
export function removeVideoFile(filename: string) {
  let _filename: string = filename;
  if (!/\.mp4$/.test(filename)) {
    _filename += '.mp4';
  }
  const absouluteFileName = paths.videoDir + '/' + _filename;

  console.log({
    absouluteFileName,
    existsSync: existsSync(absouluteFileName),
  })

  if (!existsSync(absouluteFileName)) {
    return;
  }
  rmSync(absouluteFileName);
}

/**
 * 上传单个视频文件
 */
export function uploadVideoFile(file?: Express.Multer.File, clean: boolean = false): boolean {
  if (clean) {
    // const removeFiles = readdirSync(file.destination).filter(name => name != file.filename);
    // removeFiles.forEach(name => {
    //   rmSync(join(file.destination, '/', name));
    // });
  }
  try {
    transferFileName(file.path, join(file.destination, '/', file.originalname));
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}
