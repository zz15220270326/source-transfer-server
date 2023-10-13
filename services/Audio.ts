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
  getPaginationListData
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
      playUrl: paths.audioBaseUrl + filename + '.mp3',
      banner: paths.audioBaseUrl + 'img/' + filename + '.png',
      createTime: Date.now(),
      updateTime: -1
    };
    const newFileList = [...prevFileList, fileInfo];
    writeJsonFileSync(newFileList, paths.audioJsonPath);

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