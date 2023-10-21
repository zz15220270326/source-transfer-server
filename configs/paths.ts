import { networkInterfaces } from 'os';
import { resolve, join } from 'path';

const isProduction: boolean = process.env.NODE_ENV !== 'development';

const ipv4Address: string = (() => {
  const interfaces = networkInterfaces();

  for (const devName in interfaces) {
    const iface = interfaces[devName];

    for (let i = 0; i < iface.length; i++) {
      const alias = iface[i];

      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address;
      }
    }
  }

  return '0.0.0.0';
})();

/** 视频读取的路径 */
export const originDir = isProduction ? resolve(__dirname, '../../origin') : resolve(__dirname, '../origin');

/** 视频输出的临时路径 */
export const targetDir = isProduction ? resolve(__dirname, '../../target') : resolve(__dirname, '../target');

/** 视频存储的路径 */
export const videoDir = isProduction ? resolve(__dirname, '../../public/videos') : resolve(__dirname, '../public/videos');

/** 视频图片存储的路径 */
export const videoImgDir = isProduction ? resolve(__dirname, '../../public/videos/img') : resolve(__dirname, '../public/videos/img');

/** 视频访问的基础路径 */
export const videoBaseUrl = isProduction ? '/videos/' : `http://${ipv4Address}:9240/videos/`;

/** 记录视频信息的 JSON 文件路径 */
export const videoJsonPath = videoDir + '/' + 'data.json';

/** 动态获取视频 */
export const getPathByVideoName = (videoName: string) => {
  if (isProduction) {
    return join(__dirname, `../../public/videos/${videoName}`);
  }
  return join(__dirname, `../public/videos/${videoName}`);
}

/** 音频存储的路径 */
export const audioDir = isProduction ? resolve(__dirname, '../../public/audios') : resolve(__dirname, '../public/audios');

/** 音频图片存储的路径 */
export const audioImgDir = isProduction ? resolve(__dirname, '../../public/audios/img') : resolve(__dirname, '../public/audios/img');

/** 音频访问的基础路径 */
export const audioBaseUrl = isProduction ? '/videos/' : `http://${ipv4Address}:9240/audios/`;

/** 记录音频信息的 JSON 文件路径 */
export const audioJsonPath = audioDir + '/' + 'data.json';
