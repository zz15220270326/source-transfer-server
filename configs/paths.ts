import { resolve, join } from 'path';

/** 视频读取的路径 */
export const originDir = resolve(__dirname, '../origin');

/** 视频输出的临时路径 */
export const targetDir = resolve(__dirname, '../target');

/** 视频存储的路径 */
export const videoDir = resolve(__dirname, '../public/videos');

/** 视频图片存储的路径 */
export const videoImgDir = resolve(__dirname, '../public/videos/img');

/** 视频访问的基础路径 */
export const videoBaseUrl = process.env.NODE_ENV === 'production' ? '/videos/' : 'http://localhost:9240/videos/';

/** 记录视频信息的 JSON 文件路径 */
export const videoJsonPath = videoDir + '/' + 'data.json';

/** 动态获取视频 */
export const getPathByVideoName = (videoName: string) => {
  return join(__dirname, `../public/videos/${videoName}`);
}

/** 音频存储的路径 */
export const audioDir = resolve(__dirname, '../public/audios');

/** 音频图片存储的路径 */
export const audioImgDir = resolve(__dirname, '../public/audios/img');

/** 音频访问的基础路径 */
export const audioBaseUrl = process.env.NODE_ENV === 'production' ? '/videos/' : 'http://localhost:9240/audios/';

/** 记录音频信息的 JSON 文件路径 */
export const audioJsonPath = audioDir + '/' + 'data.json';
