import multer from 'multer';

import * as paths from '../configs/paths';

const formVideoUpload = multer({
  dest: paths.originDir,
  fileFilter: (req, file, callback) => {
    const { originalname } = file;
    // if (!req.files) {
    //   file.originalname = Buffer.from(originalname, 'latin1').toString('utf8');
    // }
    file.originalname = Buffer.from(originalname, 'latin1').toString('utf8');
    console.log('=== transfer ===', {
      prev: originalname,
      cur: file.originalname
    });
    callback(null, true);
  },
  // storage: multer.diskStorage({
  //   destination: (req, file, cb) => {
  //     cb(null, paths.originDir); // 这里指定上传文件保存的目录，确保该目录存在
  //   },
  //   filename: (req, file, cb) => {
  //     cb(null, file.originalname);
  //   }
  // })
});

/** 导出单个视频需要注册的中间件 */
export const uploadSingleVideo = formVideoUpload.single('file');

/** 导出多个视频需要注册的中间件 */
export const uploadMultipleVideos = formVideoUpload.array('files', 16);
