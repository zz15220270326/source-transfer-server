import * as qiniu from 'qiniu';
import { createHash } from 'crypto';
import qiniuConfig from '../../configs/qiniu';

interface IQiniuUploadOptions {
  ak?: string;
  sk?: string;
  bucket?: string;
  url?: string;
  type?: 'video' | 'audio' | 'imgs' | 'source';
}

/**
 * 使用 qiniu 上传远程的资源到远程七牛服务器
 */
export function qiniuUploadOriginUrl(options: IQiniuUploadOptions): Promise<Record<string, any>> {
  const mac = new qiniu.auth.digest.Mac(options.ak, options.sk);
  // const putPolicy = new qiniu.rs.PutPolicy({
  //   scope: options.bucket,
  //   expires: 72000
  // });
  const conf = new qiniu.conf.Config();
  const client = new qiniu.rs.BucketManager(mac, conf);
  const md5 = createHash('md5');
  md5.update(options.url);
  const key = `${options.type || 'source'}/${md5.digest('hex')}`;
  console.log('== 启动上传函数 ==', {
    mac,
    conf,
    client,

    url: options.url,
    key,
  });

  return new Promise((resolve, reject) => {
    client.fetch(options.url, options.bucket, key, (error, ret, info) => {
      if (error) {
        reject(error);
        return;
      } else {
        if (info.statusCode === 200) {
          resolve({ key });
        } else {
          reject(info);
        }
      }
    });
  });
}

/**
 * 使用 qiniu 上传本地文件到远程的服务器
 * @param {string} file 文件的完整路径
 * @param {} options qiniu 上传配置
 * @return {} 返回上传的结果
 */
export function qiniuUploadFile(file: string, userOptions: IQiniuUploadOptions): Promise<Record<string, any>> {
  const md5 = createHash('md5');
  md5.update(file);
  const options = {
    ak: qiniuConfig.ak,
    sk: qiniuConfig.sk,
    bucket: qiniuConfig.buckets['video-and-audio'].name,
    ...userOptions,
  };
  
  const mac = new qiniu.auth.digest.Mac(options.ak, options.sk);
  const key = `${options.type || 'source'}/${md5.digest('hex')}` || null;
  const expires = 3600 * 24;
  const putPolicy = new qiniu.rs.PutPolicy({
    scope: options.bucket,
    returnBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}',
    expires
  });
  const uploadToken = putPolicy.uploadToken(mac);
  const putExtra = new qiniu.form_up.PutExtra();
  const conf = new qiniu.conf.Config();

  const formUploader = new qiniu.form_up.FormUploader(conf);

  return new Promise((resolve, reject) => {
    formUploader.putFile(uploadToken, key, file, putExtra, (err, data, info) => {
      if (err) {
        reject(err);
        return;
      }
      console.log({
        file,
        key,
        uploadToken
      });
      if (info.statusCode === 200) {
        const url = getPreviewDownloadUrl(mac, conf, key);
        const res = {
          ...data,
          key,
          url
        };
        resolve(res);
      } else {
        reject(info);
      }
    });
  });
}

/**
 * @function getPreviewDownloadUrl
 */
export function getPreviewDownloadUrl(mac: qiniu.auth.digest.Mac, conf: qiniu.conf.Config, key: string) {
  try {
    const bucketManager = new qiniu.rs.BucketManager(mac, conf);
    const privateBucketDomain = qiniuConfig.upload_url;
    const deadline = parseInt(String(Date.now() / 1000)) + (3600 * 30);
    return bucketManager.privateDownloadUrl(privateBucketDomain, key, deadline);
  } catch (e) {
    console.log(e);
    return '';
  }
}

// ------------------------- 下面是一段测试 qiniu 上传的代码

// // const testVideoUrl = 'http://localhost:9240/videos/118-103-113-118-44-111-114-54.mp4';
// const testAudioUrl = 'http://tools.bklove-zz.cn/audios/87d885d541eee428f8ebf99a95dc5e6c.mp3';

// qiniuUploadOriginUrl({
//   ak: qiniuConfig.ak,
//   sk: qiniuConfig.sk,
//   bucket: qiniuConfig.buckets['video-and-audio'].name,
//   // url: testVideoUrl,
//   url: testAudioUrl,
//   type: 'audio',
// }).then((res) => {
//   console.log('qiniu上传成功了, 上传结果：\n', res);
// }).catch(err => {
//   console.log('qiniu上传失败了, 错误原因 ：\n', err);
// }).finally(() => {
//   console.log('整体上传完毕');
// });

// qiniuUploadFile('/Volumes/crazy_mama/projects/source-transfer/server/public/audios/0b3727fe75786a239de1415075e592a3.mp3', {
//   ak: qiniuConfig.ak,
//   sk: qiniuConfig.sk,
//   bucket: qiniuConfig.buckets['video-and-audio'].name,
//   type: 'audio',
// }).then((res) => {
//   console.log('qiniu上传成功了, 上传结果：\n', res);
// }).catch(err => {
//   console.log('qiniu上传失败了, 错误原因 ：\n', err);
// }).finally(() => {
//   console.log('整体上传完毕');
// });
