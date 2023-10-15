import * as paths from '../configs/paths';
import {
  outputMp3ByNCM,
  initOriginDir,
  initTargetDir,
  mkdirIfNotExist,
  touchFileIfNotExist,
  readJsonFileSync,
  writeJsonFileSync,
  encryptFileName,
  getPaginationListData,
  filterSourceList
} from '../libs/utils';

/**
 * @function transferNcmAudio
 * @description 将 NCM 视频转成 Mp3
 * @param { boolean | undefined } multiple 是否上传多个
 */
export async function transferNcmAudio(file: Express.Multer.File, multiple: boolean = false) {
  if (multiple) {
    throw new Error('暂时不支持批量上传 ncm 文件!');
  } else {
    // 上传单个音频
    const { originalname, filename, size, path } = file;
    const outputMp3Path: string = paths.audioDir + '/' + filename + '.mp3';
    const outputMp3BannerPath: string = paths.audioImgDir + '/' + filename + '.png';

    mkdirIfNotExist(paths.audioImgDir);
    touchFileIfNotExist(paths.audioJsonPath, []);

    outputMp3ByNCM(path, outputMp3Path, outputMp3BannerPath);

    const prevFileList = readJsonFileSync<Record<string, any>[]>(paths.audioJsonPath);
    const fileInfo = {
      id: `audio-${prevFileList.length + 1}`,
      originalname,
      filename,
      size,
      type: 'audio',
      playUrl: paths.audioBaseUrl + filename + '.mp3',
      banner: paths.audioBaseUrl + 'img/' + filename + '.png',
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
      writeJsonFileSync(newFileList, paths.audioJsonPath);
    } else {
      const newFileList = [...prevFileList, fileInfo];
      writeJsonFileSync(newFileList, paths.audioJsonPath);
    }

    initOriginDir();
    initTargetDir();

    return {
      code: 0,
      msg: '上传成功',
      data: {
        playUrl: fileInfo.playUrl,
        banner: fileInfo.banner,
      }
    };
  }
}

/**
 * 获取所有的 audios
 * @param {boolean} pagination 是否需要分页 ? 是 : 否
 */
export function getAllAudios(
  pagination: boolean = true,
  options?: { page: number, pageSize: number }
) {
  const audioList = readJsonFileSync<Record<string, any>[]>(paths.audioJsonPath);

  if (!pagination) {
    return audioList;
  }

  const {
    page = 1,
    pageSize = 10
  } = options || {};
  const data = getPaginationListData(audioList, page, pageSize);
  return data;
}

/**
 * 获取被过滤的音频列表
 * @param {} keyword 搜索过滤的搜索关键词
 */
export function getFilterAudios(keyword?: string, sourceType?: string) {
  try {
    const list = filterSourceList(
      readJsonFileSync<Record<string, any>[]>(paths.audioJsonPath),
      keyword,
      sourceType
    );
    return list;
  } catch (error) {
    console.log(error);
    return [];
  }
}
