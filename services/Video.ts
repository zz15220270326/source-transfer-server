import { readdirSync, unlinkSync } from 'fs';
import { join } from 'path';

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
  touchFileIfNotExist,
  mkdirIfNotExist,
  readJsonFileSync,
  writeJsonFileSync,
  getFormatTime,
  filterSourceList,
  createVideoId,
} from '../libs/utils';

/**
 * 转换单个文件夹的 m4s 文件并得到 videoUrl
 * @param {string} videoName 视频的名称（需要带上 .mp4）
 * @return {Promise<string>} 完整的 videoUrl
 * @param {boolean} clear 是否执行完成后需要清除文件夹
 */
export async function transferVideoFileAndGetVideoUrl(
  originVideoName: string,
  clear: boolean = true
): Promise<string> {
  const files: string[] = readdirSync(paths.originDir, 'utf8');
  const targetFiles: string[] = [];
  const filename = formatVideoName(originVideoName);

  mkdirIfNotExist(paths.videoImgDir);
  touchFileIfNotExist(paths.videoJsonPath, []);

  // 初始化临时文件路径
  initTargetDir();

  // 写入文件
  await writeFileStreams(files, targetFiles);

  // 使用绝对路径运行
  await doTransferVideoCommand(targetFiles, filename);

  // 存储 banner 图片
  saveVideoCover(filename, files);

  // const size = statSync(paths.videoBaseUrl).size;

  const prevFileList = readJsonFileSync<Record<string, any>[]>(paths.videoJsonPath);
  const fileInfo = {
    id: createVideoId(originVideoName),
    originalname: originVideoName,
    filename,
    size: 'unknown',
    type: 'video',
    playUrl: `${paths.videoBaseUrl}${filename}`,
    banner: paths.videoBaseUrl + 'img/' + filename.replace(/\.mp4$/, '') + '.jpg',
    createTime: Date.now(),
    updateTime: -1
  };
  const fileIdx = prevFileList.findIndex(item => item.originalname === fileInfo.originalname);
  if (fileIdx !== -1) {
    const newFileList = prevFileList.map((item, index) => {
      if (index === fileIdx) {
        fileInfo.id = item.id;
        fileInfo.createTime = item.createTime;
        fileInfo.updateTime = Date.now();
        return fileInfo;
      }
      return item;
    });
    writeJsonFileSync(newFileList, paths.videoJsonPath);
  } else {
    const newFileList = [...prevFileList, fileInfo];
    writeJsonFileSync(newFileList, paths.videoJsonPath);
  }

  if (clear) {
    initTargetDir();
    initOriginDir();
  }

  return `${paths.videoBaseUrl}${filename}`;
}

/**
 * 获取视频列表
 */
export function getVideoList() {
  const videoList: Record<string, any>[] = getAllVideos();

  return videoList;
}

/**
 * 获取被过滤的视频列表
 * @param {} keyword 搜索过滤的搜索关键词
 */
export function getFilterVideos(keyword?: string, sourceType?: string) {
  const list = filterSourceList(getVideoList(), keyword, sourceType);
  return list;
}

/**
 * 获取分页的视频列表
 */
export function getPaginationList(page = 1, pageSize = 10, keyword?: string) {
  const filterVideoList = getFilterVideos(keyword);

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
export function removeVideoFile(id: string) {
  const prevFileList = readJsonFileSync<Record<string, any>[]>(paths.videoJsonPath);
  const nextFileList = prevFileList.filter(item => {
    if (item.id == id) {
      // 删除图片、删除视频
      const filename: string = item.filename,
            videoFileUrl: string = paths.videoDir + '/' + filename,
            imgFileUrl: string = paths.videoImgDir + '/' + filename.replace(/\.mp4$/, '.jpg');
      unlinkSync(videoFileUrl);
      unlinkSync(imgFileUrl);
      return false;
    }
    return true;
  });
  writeJsonFileSync(nextFileList, paths.videoJsonPath);
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
